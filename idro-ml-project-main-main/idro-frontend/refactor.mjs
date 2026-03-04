import fs from 'fs';
import path from 'path';

const dir = './src';

const classMappings = {
    // Backgrounds
    'bg-slate-950': 'bg-primary',
    'bg-slate-900': 'bg-primary',
    'bg-\\[#0f172a\\]': 'bg-primary',
    'bg-\\[#020617\\]': 'bg-primary',
    'bg-slate-850': 'bg-secondary',
    'bg-slate-800': 'bg-secondary',
    'bg-slate-700': 'bg-secondary',
    'bg-slate-900\\/[0-9]+': 'bg-primary', // fallback any opacity to solid for these core tokens
    'bg-slate-800\\/[0-9]+': 'bg-secondary',
    'bg-black\\/[0-9]+': 'bg-primary',

    // Text
    'text-white': 'text-primary',
    'text-slate-50': 'text-primary',
    'text-slate-100': 'text-primary',
    'text-slate-200': 'text-primary',
    'text-slate-300': 'text-secondary',
    'text-slate-400': 'text-secondary',
    'text-slate-500': 'text-secondary',
    'text-slate-600': 'text-secondary',
    'text-slate-700': 'text-secondary',
    'text-gray-300': 'text-secondary',
    'text-gray-400': 'text-secondary',

    // Borders
    'border-slate-800': 'border-subtle',
    'border-slate-700': 'border-subtle',
    'border-white\\/[0-9]+': 'border-subtle',
    'border-slate-800\\/[0-9]+': 'border-subtle',

    // Danger
    'bg-red-500': 'bg-danger',
    'bg-red-600': 'bg-danger',
    'bg-rose-500': 'bg-danger',
    'bg-rose-600': 'bg-danger',
    'bg-red-500\\/[0-9]+': 'bg-danger',
    'text-red-500': 'text-danger',
    'text-rose-400': 'text-danger',
    'text-rose-500': 'text-danger',
    'border-rose-500\\/[0-9]+': 'border-danger',

    // Warning
    'bg-orange-500': 'bg-warning',
    'bg-amber-500': 'bg-warning',
    'bg-yellow-500': 'bg-warning',
    'text-orange-500': 'text-warning',
    'text-amber-500': 'text-warning',
    'text-yellow-500': 'text-warning',

    // Success
    'bg-emerald-500': 'bg-success',
    'bg-emerald-600': 'bg-success',
    'bg-green-500': 'bg-success',
    'bg-emerald-500\\/[0-9]+': 'bg-success',
    'bg-emerald-600\\/[0-9]+': 'bg-success',
    'text-emerald-400': 'text-success',
    'text-emerald-500': 'text-success',
    'text-green-500': 'text-success',

    // Info
    'bg-blue-500': 'bg-info',
    'bg-blue-600': 'bg-info',
    'bg-cyan-500': 'bg-info',
    'bg-cyan-600': 'bg-info',
    'bg-blue-500\\/[0-9]+': 'bg-info',
    'bg-blue-600\\/[0-9]+': 'bg-info',
    'bg-cyan-500\\/[0-9]+': 'bg-info',
    'text-blue-400': 'text-info',
    'text-blue-500': 'text-info',
    'text-cyan-400': 'text-info',
    'text-cyan-500': 'text-info',
};

// Regex for glows to REMOVE entirely (excessive glow)
const glowRegexes = [
    /shadow-blue-[0-9]{3}(?:\/[0-9]+)?/g,
    /shadow-purple-[0-9]{3}(?:\/[0-9]+)?/g,
    /shadow-cyan-[0-9]{3}(?:\/[0-9]+)?/g,
    /shadow-emerald-[0-9]{3}(?:\/[0-9]+)?/g,
    /shadow-slate-[0-9]{3}(?:\/[0-9]+)?/g,
    /drop-shadow-\\[.*?\\]/g,
    /drop-shadow-.*?(\s|$|'|"|`)/g, // this might be tricky, let's keep it simple
];

function walk(directory) {
    let results = [];
    const list = fs.readdirSync(directory);
    list.forEach(file => {
        file = path.join(directory, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.match(/\.(jsx|tsx|js|ts)$/)) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(dir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // 1. Replace class mappings
    Object.keys(classMappings).forEach(oldClass => {
        const rx = new RegExp(`(?<=^|\\s|'|"|\`)${oldClass}(?=\\s|'|"|\`|$)`, 'g');
        content = content.replace(rx, classMappings[oldClass]);
    });

    // 2. Remove non-alert glow effects explicitly
    content = content.replace(/shadow-blue-\d{3}(\/\d+)?/g, '');
    content = content.replace(/shadow-purple-\d{3}(\/\d+)?/g, '');
    content = content.replace(/shadow-cyan-\d{3}(\/\d+)?/g, '');
    content = content.replace(/shadow-emerald-\d{3}(\/\d+)?/g, '');
    content = content.replace(/shadow-slate-\d{3}(\/\d+)?/g, '');
    // also shadow-2xl, shadow-xl, shadow-lg if they are just generic blobs
    content = content.replace(/shadow-2xl/g, '');
    content = content.replace(/shadow-xl/g, '');
    content = content.replace(/shadow-lg/g, '');

    // fix multiple spaces that might have been created by removal
    content = content.replace(/\s{2,}/g, ' ');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log('Done mapping color tokens and removing glows.');
