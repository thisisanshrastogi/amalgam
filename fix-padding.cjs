const fs = require('fs');
const path = '/home/blackdronzer/Documents/internship/amalgamic-site/amalgamic-react/src/components';
const files = fs.readdirSync(path);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    let content = fs.readFileSync(path + '/' + file, 'utf8');
    let changed = false;

    if (file === 'Footer.jsx') {
      content = content.replace(/className="py-24 bg-paper border-t border-border px-8"/, 'className="py-12 md:py-24 bg-paper border-t border-border px-8"');
      content = content.replace(/className="gap-20 md:col-span-3 flex flex-row-reverse"/, 'className="gap-10 sm:gap-20 md:col-span-3 flex flex-col sm:flex-row sm:flex-row-reverse"');
      changed = true;
    }

    if (file === 'FeaturesGrid.jsx') {
      content = content.replace(/className="features-root relative bg-\[var\(--ink\)\] pb-24 pt-12 lg:pb-32"/, 'className="features-root relative bg-[var(--ink)] pb-16 pt-12 lg:pb-32"');
      changed = true;
    }
    
    if (content.includes('py-24 sm:py-32')) {
      content = content.replace(/py-24 sm:py-32/g, 'py-16 sm:py-32');
      changed = true;
    }

    if (content.includes('py-24 lg:py-28')) {
      content = content.replace(/py-24 lg:py-28/g, 'py-16 lg:py-28');
      changed = true;
    }

    if (content.includes('py-32 ') || content.includes('py-32"')) {
      if (!content.includes('md:py-32') && !content.includes('sm:py-32') && !content.includes('lg:py-32')) {
        content = content.replace(/py-32/g, 'py-16 md:py-32');
        changed = true;
      }
    }
    
    if (content.includes('py-24 ') || content.includes('py-24"')) {
      if (!content.includes('md:py-24') && !content.includes('sm:py-24') && !content.includes('lg:py-24')) {
        // Double check it's not already py-16 sm:py-32 where we removed py-24
        if (content.match(/py-24/)) {
            content = content.replace(/py-24/g, 'py-16 md:py-24');
            changed = true;
        }
      }
    }
    
    if (file === 'DocLayout.jsx' && content.includes('pt-32 pb-32')) {
        content = content.replace('pt-32 pb-32', 'py-16 md:py-32');
        changed = true;
    }

    if (changed) {
      fs.writeFileSync(path + '/' + file, content);
      console.log(`Updated ${file}`);
    }
  }
});
