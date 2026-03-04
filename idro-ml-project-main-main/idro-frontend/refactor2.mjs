import fs from 'fs';
import path from 'path';

const dir = './src';

const classMappings = {
    // Backgrounds
    'bg-slate-950': 'bg-primary',
    'bg-slate-900': 'bg-primary',
    'bg-slate-850': 'bg-secondary',
    'bg-slate-800': 'bg-secondary',
    'bg-slate-700': 'bg-secondary',
    'bg-[#0f172a]': 'bg-primary',
    'bg-[#020617]': 'bg-primary',

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
    'border-white/5': 'border-subtle',
    'border-white/10': 'border-subtle',
    'border-white/20': 'border-subtle',

    // Danger
    'bg-red-500': 'bg-danger',
    'bg-red-600': 'bg-danger',
    'bg-rose-500': 'bg-danger',
    'bg-rose-600': 'bg-danger',
    'text-red-500': 'text-danger',
    'text-rose-400': 'text-danger',
    'text-rose-500': 'text-danger',

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
    'text-emerald-400': 'text-success',
    'text-emerald-500': 'text-success',
    'text-green-500': 'text-success',

    // Info
    'bg-blue-500': 'bg-info',
    'bg-blue-600': 'bg-info',
    'bg-cyan-500': 'bg-info',
    'bg-cyan-600': 'bg-info',
    'text-blue-400': 'text-info',
    'text-blue-500': 'text-info',
    'text-cyan-400': 'text-info',
    'text-cyan-500': 'text-info',
};

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

    Object.entries(classMappings).forEach(([oldClass, newClass]) => {
        // Escaping special regex chars safely
        const escapedOld = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // We only replace if bounded by typical tailwind boundaries 
        // i.e., space, quote, backtick, or string start/end
        const rx = new RegExp(`(?<=^|\\s|'|"|\`|:)${escapedOld}(?=\\s|'|"|\`|$|/|,)`, 'g');
        content = content.replace(rx, newClass);
    });

    // Also remove glows (shadow-xyz, shadow-2xl) that don't belong to alerts
    // Wait, the previous script removed shadow-xl but left the spaces. Let's just catch them all.
    const glows = [
        'shadow-2xl', 'shadow-xl', 'shadow-lg', 'shadow-md', 'shadow-sm', 'shadow',
        /shadow-blue-\d{3}(\/\d+)?/g,
        /shadow-purple-\d{3}(\/\d+)?/g,
        /shadow-cyan-\d{3}(\/\d+)?/g,
        /shadow-emerald-\d{3}(\/\d+)?/g,
        /shadow-slate-\d{3}(\/\d+)?/g,
        /shadow-gray-\d{3}(\/\d+)?/g,
        /drop-shadow-\[[^\]]+\]/g,
        /drop-shadow-\w+/g
    ];

    glows.forEach(glow => {
        if (typeof glow === 'string') {
            const rx = new RegExp(`(?<=^|\\s|'|"|\`)${glow}(?=\\s|'|"|\`|$)`, 'g');
            content = content.replace(rx, '');
        } else {
            content = content.replace(glow, '');
        }
    });

    // Strip arbitrary opacities off the new tokens
    // E.g., bg-primary/40 -> bg-primary
    content = content.replace(/(bg-primary|bg-secondary|border-subtle|text-primary|text-secondary|bg-danger|bg-warning|bg-success|bg-info)\/\d+/g, '$1');

    // Fix spaces
    content = content.replace(/  +/g, ' ');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
