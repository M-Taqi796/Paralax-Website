import os
import sys
import glob
from PIL import Image

def main():
    if len(sys.argv) < 2:
        image_dir = 'public/MobileAnimation'
    else:
        image_dir = sys.argv[1]
        
    files = glob.glob(os.path.join(image_dir, '*.webp'))
    
    if 'MobileAnimation' in image_dir:
        # For MobileAnimation
        # Watermark roughly at x=1715..1890, y=920..1050
        # Let's copy a region from y=790..920, x=1710..1900
        # and paste it at y=920..1050, x=1710..1900
        box_to_copy = (1710, 790, 1900, 920)
        box_to_paste = (1710, 920)
    else:
        # For BusAnimation (default/fallback)
        # Watermark roughly at x=1800..1889, y=1010..1047
        # We copy a region from y=950..1010, x=1780..1920
        # and paste it at y=1010..1070, x=1780..1920
        box_to_copy = (1780, 950, 1920, 1010)
        box_to_paste = (1780, 1010)

    for file in files:
        img = Image.open(file).convert('RGB')
        
        region = img.crop(box_to_copy)
        img.paste(region, box_to_paste)
        
        img.save(file, 'WEBP')
        print(f"Processed {file}")

    print(f"All watermarks removed from {image_dir}!")

if __name__ == '__main__':
    main()
