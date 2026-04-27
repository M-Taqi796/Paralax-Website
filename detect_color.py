import sys
import os
import numpy as np
from PIL import Image

def main():
    if len(sys.argv) < 2:
        image_dir = 'public/MobileAnimation'
    else:
        image_dir = sys.argv[1]
        
    filepath = os.path.join(image_dir, 'ezgif-frame-001.webp')
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    img = Image.open(filepath).convert('RGB')
    arr = np.array(img)
    h, w, c = arr.shape
    print(f"Image shape: {h}x{w}")
    print(f"Bottom right pixel: {arr[-1, -1]}")
    print(f"Top left pixel: {arr[0, 0]}")
    print(f"Bottom left pixel: {arr[-1, 0]}")
    
    sub_arr = arr[-150:, -250:]
    print(f"Bottom right 150x250 Mean: {np.mean(sub_arr, axis=(0,1))}")
    print(f"Bottom right 150x250 StdDev: {np.std(sub_arr, axis=(0,1))}")

if __name__ == '__main__':
    main()
