import os
import sys
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

    bg_color = np.array([233, 231, 230])
    dist = np.linalg.norm(arr - bg_color, axis=-1)

    not_bg = dist > 20
    sub_not_bg = not_bg[-200:, -300:]

    row_mask = np.any(sub_not_bg, axis=1)
    col_mask = np.any(sub_not_bg, axis=0)

    if np.any(row_mask) and np.any(col_mask):
        min_r = np.argmax(row_mask)
        max_r = len(row_mask) - 1 - np.argmax(row_mask[::-1])
        min_c = np.argmax(col_mask)
        max_c = len(col_mask) - 1 - np.argmax(col_mask[::-1])
        print(f"Non-BG pixels in bottom right 200x300 at rows {min_r} to {max_r}, cols {min_c} to {max_c}")
    else:
        print("No non-bg pixels found")

if __name__ == '__main__':
    main()
