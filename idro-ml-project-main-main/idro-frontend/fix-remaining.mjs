import fs from 'fs';

function regexFix(f, pairs) {
    try {
        let content = fs.readFileSync(f, 'utf8');
        let mod = false;
        for (const [r, t] of pairs) {
            if (r.test(content)) {
                content = content.replace(r, t);
                mod = true;
            } else {
                console.log('Regex fail:', r, 'in', f);
            }
        }
        if (mod) {
            fs.writeFileSync(f, content);
            console.log('Fixed', f);
        }
    } catch (e) { console.error(e); }
}

regexFix('src/components/IdroHome.jsx', [
    [/\/\/ Added for Response Modal\s*Siren,/, '\n// Added for Response Modal\nSiren,'],
    [/\/\/ Added for Deploy Button\s*Tent,/, '\n// Added for Deploy Button\nTent,'],
    [/\/\/ nominatim\.openstreetmap\.org([^`]+)`\);\s*cons/, '\n// nominatim.openstreetmap.org$1`);\ncons'],
    [/\/\/ server\.arcgisonline\.com\/ArcGIS\/rest\/services\/World_Imagery\/MapServer\/tile\/\{z\}\/\{y\}\/\{x\}"\s*attribution="/, '\n// server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"\nattribution="'],
    [/\/\/ server\.arcgisonline\.com\/ArcGIS\/rest\/services\/Reference\/World_Boundaries_and_Places\/MapServer\/tile\/\{z/, '\n// server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z']
]);

regexFix('src/pages/DeploymentStatus.jsx', [
    [/\/\/ Show OPEN and ASSIGNED missions for deployment status\s*const/, '\n// Show OPEN and ASSIGNED missions for deployment status\nconst']
]);

regexFix('src/pages/VolunteerForm.jsx', [
    [/\/\/ Urgency options specific for Camps now\s*const/, '\n// Urgency options specific for Camps now\nconst'],
    [/\/\/ Reverse geocoding function to fetch address from coordinates\s*const/, '\n// Reverse geocoding function to fetch address from coordinates\nconst'],
    [/\/\/ Using OpenStreetMap Nominatim API for reverse geocoding \(free, no API key needed\)\s*const/, '\n// Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed)\nconst'],
    [/\/\/ nominatim\.openstreetmap\.org\/reverse\?format=json&lat=\$\{lat\}&lon=\$\{lon\}&addressdetails=1`,\s*\{\s*headers:/, '\n// nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,\n{ headers:'],
    [/\/\/ Debounce for 1 second\s*return/, '\n// Debounce for 1 second\nreturn'],
    [/\/\/ New fields for UI compatibility\s*color/, '\n// New fields for UI compatibility\ncolor']
]);

regexFix('src/pages/VolunteerLogin.jsx', [
    [/\/\/ State for Searchable STATE Dropdown\s*const/, '\n// State for Searchable STATE Dropdown\nconst'],
    [/\/\/ Validation for NGO Organization flow\s*if/, '\n// Validation for NGO Organization flow\nif'],
    [/\/\/ localhost:8085\/api\/volunteer\/login",\s*\{\s*volunteerId:\s*id,\s*password:\s*pass\s*\}\)\s*\.then\(\(response\)\s*=>\s*\{\s*if\s*\(/, '\n// localhost:8085/api/volunteer/login", { volunteerId: id, password: pass })\n.then((response) => {\nif (']
]);
