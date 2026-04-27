import sys
import numpy as np
from PIL import Image

img = Image.open('public/MobileAnimation/ezgif-frame-001.webp').convert('RGB')
arr = np.array(img)

# region above watermark
sub_arr = arr[790:920, 1710:1900]
print(f"Mean: {np.mean(sub_arr, axis=(0,1))}")
print(f"StdDev: {np.std(sub_arr, axis=(0,1))}")
