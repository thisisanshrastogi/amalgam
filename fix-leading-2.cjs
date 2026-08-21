const fs = require('fs');
const path = '/home/blackdronzer/Documents/internship/amalgamic-site/amalgamic-react/src/components';
const files = fs.readdirSync(path);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    let content = fs.readFileSync(path + '/' + file, 'utf8');
    let changed = false;

    const targets = [
      'leading-[1.12]',
      'leading-[1.5]',
      'leading-[1.08]',
      'leading-[1.06]',
      'sm:leading-[1.12]',
      'sm:leading-[1.04]'
    ];

    targets.forEach(target => {
      if (content.includes(target)) {
        if (target.startsWith('sm:')) {
           content = content.replace(new RegExp(target.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'), 'sm:leading-[1.2]');
        } else {
           content = content.replace(new RegExp(target.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'), 'leading-[1.2]');
        }
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(path + '/' + file, content);
      console.log(`Updated ${file}`);
    }
  }
});
