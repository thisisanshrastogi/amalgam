import os
import re

directory = 'src/components'
for root_dir, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root_dir, file)
            with open(filepath, 'r') as f:
                content = f.read()

            new_content = content
            # Replace text-paper with text-white
            new_content = re.sub(r'\btext-paper\b', 'text-white', new_content)
            
            # Replace text-bg with text-white
            # Be careful with text-bg (could be bg colour? No, bg is a custom color in tailwind config)
            # Actually, let's just do text-paper and text-[var(--paper)]
            new_content = new_content.replace('text-[var(--paper)]', 'text-white')
            
            # rgba(245,242,234,X) to rgba(255,255,255,X)
            new_content = new_content.replace('245,242,234', '255,255,255')
            # 245, 242, 234 if there are spaces
            new_content = new_content.replace('245, 242, 234', '255, 255, 255')

            if content != new_content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
