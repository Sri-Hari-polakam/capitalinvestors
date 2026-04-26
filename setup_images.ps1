$imgDir = Join-Path $PSScriptRoot "img"
if (-not (Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir }

$images = @(
    "C:/Users/23000/.gemini/antigravity/brain/4ce7e3f4-4c9d-4b25-925d-34b9d053c340/media__1777185247520.png",
    "C:/Users/23000/.gemini/antigravity/brain/4ce7e3f4-4c9d-4b25-925d-34b9d053c340/media__1777185378361.jpg",
    "C:/Users/23000/.gemini/antigravity/brain/4ce7e3f4-4c9d-4b25-925d-34b9d053c340/media__1777185660878.png",
    "C:/Users/23000/.gemini/antigravity/brain/4ce7e3f4-4c9d-4b25-925d-34b9d053c340/regal_city_clear_1777186702450.png",
    "C:/Users/23000/.gemini/antigravity/brain/4ce7e3f4-4c9d-4b25-925d-34b9d053c340/media__1777185782195.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/real_estate_plot_3_1777110906437.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/real_estate_plot_4_1777110921905.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/hero_luxury_villa_1777110633308.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/real_estate_plot_1_1777110874499.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/real_estate_plot_2_1777110889410.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/gallery_living_room_1777110669810.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/gallery_modern_bedroom_1777110703803.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/gallery_luxury_hallway_v2_1777110941411.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/gallery_home_cinema_v2_1777110956946.png",
    "C:/Users/23000/.gemini/antigravity/brain/049bbdc1-1ce0-477a-9e68-b87366b543a7/land_plot_1_1777110727496.png"
)

foreach ($img in $images) {
    $dest = Join-Path $imgDir (Split-Path $img -Leaf)
    if (Test-Path $img) {
        Copy-Item -Path $img -Destination $dest -Force
        Write-Host "Copied: $(Split-Path $img -Leaf)"
    } else {
        Write-Warning "Source not found: $img"
    }
}
Write-Host "`nAll images processed. You can now re-deploy your website."
pause
