const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content
                .replace(/(?<!-)\bbg-black\b(?!\/)/g, 'bg-page-bg')
                .replace(/bg-white\/\[0\.02\]/g, 'bg-glass-subtle')
                .replace(/bg-white\/5\b/g, 'bg-glass')
                .replace(/border-white\/10\b/g, 'border-glass-border')
                .replace(/border-white\/5\b/g, 'border-glass')
                .replace(/bg-black\/\[0\.02\]/g, 'bg-glass-subtle');
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}
replaceInFiles('./src');
