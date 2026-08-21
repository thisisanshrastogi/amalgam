const fs = require('fs');
const path = '/home/blackdronzer/Documents/internship/amalgamic-site/amalgamic-react/src/components';
const files = fs.readdirSync(path);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    let content = fs.readFileSync(path + '/' + file, 'utf8');
    let changed = false;

    if (content.includes('lg:text-5xl')) {
      content = content.replace(/lg:text-5xl/g, 'lg:text-[48px] lg:leading-[1.2]');
      changed = true;
    }

    if (content.includes('sm:text-5xl')) {
      content = content.replace(/sm:text-5xl/g, 'sm:text-[48px] sm:leading-[1.2]');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(path + '/' + file, content);
      console.log(`Updated ${file}`);
    }
  }
});
