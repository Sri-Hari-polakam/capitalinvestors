const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getFiles(dir, exts, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, exts, fileList);
        } else {
            const ext = path.extname(filePath).toLowerCase();
            if (exts.includes(ext)) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

async function optimizeImages() {
    const imagesDir = 'images';
    if (!fs.existsSync(imagesDir)) {
        console.error("images directory not found");
        return;
    }
    
    const images = getFiles(imagesDir, ['.png', '.jpg', '.jpeg']);
    console.log(`Found ${images.length} images to process...`);
    
    const fileMap = {};

    for (const imgPath of images) {
        const parsed = path.parse(imgPath);
        const newPath = path.join(parsed.dir, parsed.name + '.webp');
        
        try {
            await sharp(imgPath)
                .webp({ quality: 80, effort: 6 })
                .toFile(newPath);
                
            console.log(`Converted: ${imgPath} -> ${newPath}`);
            fileMap[parsed.base] = parsed.name + '.webp';
            
            fs.unlinkSync(imgPath); // Delete original file
        } catch (err) {
            console.error(`Error processing ${imgPath}:`, err);
        }
    }
    
    console.log("\nUpdating HTML and JS files to use new WebP images...");
    
    function updateFiles(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            
            // Skip node_modules, git, and other irrelevant folders
            if (filePath.includes('node_modules') || filePath.includes('.git') || filePath.includes('pdf')) continue;
            
            if (fs.statSync(filePath).isDirectory()) {
                updateFiles(filePath);
            } else if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                for (const oldName of Object.keys(fileMap)) {
                    const newName = fileMap[oldName];
                    
                    // Replace standard filename
                    if (content.includes(oldName)) {
                        content = content.split(oldName).join(newName);
                        modified = true;
                    }
                    
                    // Replace URI encoded filename (e.g. spaces as %20)
                    const encodedOld = encodeURI(oldName);
                    const encodedNew = encodeURI(newName);
                    if (content.includes(encodedOld)) {
                        content = content.split(encodedOld).join(encodedNew);
                        modified = true;
                    }
                }
                
                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`Updated references in ${filePath}`);
                }
            }
        }
    }
    
    updateFiles('.');
    console.log("\nDone! All images have been successfully compressed and converted to WebP.");
}

optimizeImages();
