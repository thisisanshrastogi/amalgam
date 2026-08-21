const fs = require('fs');
const path = '/home/blackdronzer/Documents/internship/amalgamic-site/amalgamic-react/src/components';
const files = [
  'Assistant.jsx',
  'CardsAndBillPay.jsx',
  'Subscriptions.jsx',
  'DelegatedTasks.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(path + '/' + file, 'utf8');
  let changed = false;

  // These files currently have text-[34px] sm:text-[42px] lg:text-[48px] (or lg:text-[46px])
  // We want to replace text-[34px] with text-[2rem]
  if (content.includes('text-[34px]')) {
    content = content.replace(/text-\[34px\]/g, 'text-[2rem]');
    changed = true;
  }
  
  if (content.includes('sm:text-[42px]')) {
    content = content.replace(/sm:text-\[42px\]/g, 'sm:text-[48px]');
    changed = true;
  }
  
  if (content.includes('lg:text-[48px]')) {
    content = content.replace(/lg:text-\[48px\]/g, 'lg:text-[3.4rem]');
    changed = true;
  }
  
  if (content.includes('lg:text-[46px]')) {
    content = content.replace(/lg:text-\[46px\]/g, 'lg:text-[3.4rem]');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(path + '/' + file, content);
    console.log(`Updated ${file}`);
  }
});
