const fs = require('fs');
const path = '/home/blackdronzer/Documents/internship/amalgamic-site/amalgamic-react/src/components';
const files = fs.readdirSync(path);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    let content = fs.readFileSync(path + '/' + file, 'utf8');
    let changed = false;

    // replace leading-[1.08] with leading-[1.12]
    if (content.includes('leading-[1.08]')) {
      content = content.replace(/leading-\[1\.08\]/g, 'leading-[1.12]');
      changed = true;
    }
    
    // replace leading-[1.06] with leading-[1.12]
    if (content.includes('leading-[1.06]')) {
      content = content.replace(/leading-\[1\.06\]/g, 'leading-[1.12]');
      changed = true;
    }
    
    // remove sm:leading-[1.04] entirely or replace with sm:leading-[1.12]
    if (content.includes('sm:leading-[1.04]')) {
      content = content.replace(/sm:leading-\[1\.04\]/g, 'sm:leading-[1.12]');
      changed = true;
    }
    
    // for Insights.jsx, if leading-tight is used on the h2, replace it with leading-[1.12]
    if (file === 'Insights.jsx' && content.includes('leading-tight mb-8')) {
      content = content.replace('leading-tight mb-8', 'leading-[1.12] mb-8');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(path + '/' + file, content);
      console.log(`Updated ${file}`);
    }
  }
});
