import os
import re

directories = ['src/components', 'src/pages']
for directory in directories:
    for root_dir, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                filepath = os.path.join(root_dir, file)
                with open(filepath, 'r') as f:
                    content = f.read()

                new_content = re.sub(r'\btext-muted\b', 'text-[rgba(255,255,255,0.72)]', content)

                if content != new_content:
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f'Updated {filepath}')
