const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const docsDir = path.join(__dirname, '..', 'docs');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// remove docs if exists
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}

copyRecursive(buildDir, docsDir);
console.log('Copied build/ -> docs/');
