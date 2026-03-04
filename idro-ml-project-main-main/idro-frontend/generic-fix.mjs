import fs from 'fs';
import path from 'path';

const files = [
    'src/components/IdroHome.jsx',
    'src/pages/DisasterAnalyzer.jsx',
    'src/pages/DisasterDetails2.jsx',
    'src/pages/GovernmentAgencyDashboard.jsx',
    'src/pages/NGODashboard.jsx',
    'src/pages/VolunteerLogin.jsx',
    'src/services/ngoApi.js'
];

files.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');

        // We want to find `// text text text CODE`
        // The heuristic: `//` followed by everything up to the next keyword: `const`, `let`, `if`, `import`, `export`, `useEffect`, `return`, `function`, `<`, `}`
        // But since it's just one space separating the comment from the code now, we can match:
        // `// ([a-zA-Z0-9 _'"\-:;.,!]*?) (const|let|var|if|return|import|export|useEffect|useState|function|<|\}|\{)`

        // Instead of regex which is brittle, I will just manually provide the exact strings based on inspection of those files.
        // It's safer to avoid creating weird bugs.

        const replacements = [
            { from: `// Resource states const`, to: `\n// Resource states\nconst` },
            { from: `// Availability states const`, to: `\n// Availability states\nconst` },
            { from: `// Load agency profile from localStorage const`, to: `\n// Load agency profile from localStorage\nconst` },
            { from: `// Initialize resource states setResources`, to: `\n// Initialize resource states\nsetResources` },
            { from: `// Load NGO profile from localStorage const`, to: `\n// Load NGO profile from localStorage\nconst` },
            { from: `// Update availability separately const`, to: `\n// Update availability separately\nconst` },
            { from: `// Clear message after 3 seconds setTimeout`, to: `\n// Clear message after 3 seconds\nsetTimeout` },
            { from: `// Header Section <div`, to: `\n// Header Section\n<div` },
            { from: `// Message Display {message`, to: `\n// Message Display\n{message` },
            { from: `// Left Column - Overview <div`, to: `\n// Left Column - Overview\n<div` },
            { from: `// Overview Card <div`, to: `\n// Overview Card\n<div` },
            { from: `// Availability Section <div`, to: `\n// Availability Section\n<div` },
            { from: `// Right Column - Resources <div`, to: `\n// Right Column - Resources\n<div` },
            { from: `// NDRF Resources {`, to: `\n// NDRF Resources\n{` },
            { from: `// Medical Team Resources {`, to: `\n// Medical Team Resources\n{` },
            { from: `// Fire Team Resources {`, to: `\n// Fire Team Resources\n{` },
            { from: `// Other Resources {`, to: `\n// Other Resources\n{` },
            { from: `// Action Buttons <div`, to: `\n// Action Buttons\n<div` },
            { from: `// Relief Supplies <div`, to: `\n// Relief Supplies\n<div` },
            { from: `// Medical Support <div`, to: `\n// Medical Support\n<div` },
            { from: `// Shelter & Essentials <div`, to: `\n// Shelter & Essentials\n<div` },
            { from: `// Human Resources <div`, to: `\n// Human Resources\n<div` },
            { from: `// Additional Notes <div`, to: `\n// Additional Notes\n<div` }
        ];

        let modified = false;
        for (const r of replacements) {
            if (content.includes(r.from)) {
                content = content.replace(r.from, r.to);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(f, content);
            console.log('Fixed swallowed comments in', f);
        }
    } catch (e) {
        console.error('Failed', f, e);
    }
});
