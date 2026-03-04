import fs from 'fs';
import path from 'path';

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // find //
                let idx = line.indexOf('//');
                while (idx !== -1) {
                    // get the comment part
                    const commentPart = line.substring(idx + 2).trim();
                    // if comment part has any standard react/js keywords, flag it
                    if (/(const |let |var |import |export |return |if |for |while |switch |function |\<div|\<span|\<p|\} |\{ )/.test(commentPart)) {
                        console.log(`POTENTIAL SWALLOW in ${fullPath}:${i + 1} : ${commentPart.substring(0, 100)}`);
                    }
                    idx = line.indexOf('//', idx + 2);
                }
            }
        }
    }
}

scanDir('src');
