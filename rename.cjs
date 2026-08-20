const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /\bbg-bg\b/g, replace: 'bg-paper' },
  { regex: /\btext-bg\b/g, replace: 'text-paper' },
  { regex: /\bborder-bg\b/g, replace: 'border-paper' },
  { regex: /\bbg-brand\b/g, replace: 'bg-ink' },
  { regex: /\btext-brand\b/g, replace: 'text-ink' },
  { regex: /\bborder-brand\b/g, replace: 'border-ink' },
  { regex: /\bbg-accent\b/g, replace: 'bg-mint' },
  { regex: /\btext-accent\b/g, replace: 'text-mint' },
  { regex: /\bborder-accent\b/g, replace: 'border-mint' },
  { regex: /\bbg-highlight\b/g, replace: 'bg-mint' },
  { regex: /\btext-highlight\b/g, replace: 'text-mint' },
  // specific to App.jsx selection
  { regex: /\bselection:bg-highlight\b/g, replace: 'selection:bg-mint/30' },
  { regex: /\bselection:text-accent\b/g, replace: 'selection:text-ink' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const { regex, replace } of replacements) {
        content = content.replace(regex, replace);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
