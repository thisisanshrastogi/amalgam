import os
import re

directory = 'src/pages'
for root_dir, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root_dir, file)
            with open(filepath, 'r') as f:
                content = f.read()

            new_content = content
            new_content = re.sub(r'\btext-paper\b', 'text-white', new_content)
            new_content = new_content.replace('text-[var(--paper)]', 'text-white')
            new_content = new_content.replace('245,242,234', '255,255,255')
            new_content = new_content.replace('245, 242, 234', '255, 255, 255')

            if content != new_content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
