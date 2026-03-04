import fs from 'fs';

// Fix DisasterAnalyzer.jsx
let dAnalyzer = fs.readFileSync('src/pages/DisasterAnalyzer.jsx', 'utf8');
dAnalyzer = dAnalyzer.replace(/const priorityMapping = \{[^}]*\};/, '');
dAnalyzer = dAnalyzer.replace(/useEffect\(\(\) => \{\s*if \(id\) fetchData\(\);\s*\}, \[id\]\);/, 'useEffect(() => { if (id) fetchData(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps');
fs.writeFileSync('src/pages/DisasterAnalyzer.jsx', dAnalyzer);

// Fix VolunteerLogin.jsx
let vLogin = fs.readFileSync('src/pages/VolunteerLogin.jsx', 'utf8');
// Fix the broken http://
vLogin = vLogin.replace(/"http:\n\/\//g, '"http://');
vLogin = vLogin.replace(/axios.post\("http:\n\/\/ localhost:8085\/api\/volunteer\/login", \{ volunteerId: id, password: pass \}\)\n.then\(\(response\) => \{\nif \(/g,
    'axios.post("http://localhost:8085/api/volunteer/login", { volunteerId: id, password: pass }).then((response) => { if (');
fs.writeFileSync('src/pages/VolunteerLogin.jsx', vLogin);

console.log('Fixed specifically.');
