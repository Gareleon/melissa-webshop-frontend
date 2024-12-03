import shutil
import os

# Path to the directory where the image is located
folder_path = '.'  # Assuming the script is running in the same directory as the images

# Original image file name
original_image = 'sapun-1.png'

# Loop to create copies with new names
for i in range(2, 21):  # Starts from 2 and goes up to 20
    new_image = f'sapun-{i}.png'
    
    # Copy the original image to the new image name
    shutil.copy(os.path.join(folder_path, original_image), os.path.join(folder_path, new_image))

    print(f"Copied {original_image} to {new_image}")
