import fs from 'fs';

const p = [
    {
        f: 'src/components/IdroHome.jsx', items: [
            { from: `// Added for Response Modal `, to: `\n// Added for Response Modal\n` },
            { from: `// Added for Deploy Button `, to: `\n// Added for Deploy Button\n` },
            { from: `// nominatim.openstreetmap.org/reverse?format=json&lat=\${alert.latitude}&lon=\${alert.longitude}\`); cons`, to: `\n// nominatim.openstreetmap.org/reverse?format=json&lat=\${alert.latitude}&lon=\${alert.longitude}\`);\ncons` },
            { from: `// server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="`, to: `\n// server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"\nattribution="` },
            { from: `// server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z`, to: `\n// server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z` }
        ]
    },
    {
        f: 'src/components/Toast.jsx', items: [
            { from: `// Configuration for different toast types `, to: `\n// Configuration for different toast types\n` }
        ]
    },
    {
        f: 'src/pages/DeploymentStatus.jsx', items: [
            { from: `// Show OPEN and ASSIGNED missions for deployment status `, to: `\n// Show OPEN and ASSIGNED missions for deployment status\n` }
        ]
    },
    {
        f: 'src/pages/DisasterDetails2.jsx', items: [
            { from: `// This keeps IMMEDIATE assets available for IMMEDIATE camps. `, to: `\n// This keeps IMMEDIATE assets available for IMMEDIATE camps.\n` },
            { from: `// Priority 1: Strategic Conservation (Desc rank: 12h preferred over 6h for 12h camp) `, to: `\n// Priority 1: Strategic Conservation (Desc rank: 12h preferred over 6h for 12h camp)\n` }
        ]
    },
    {
        f: 'src/pages/GovernmentAgencyDashboard.jsx', items: [
            { from: `// localhost:8085/api/government/\${agencyProfile.agencyId}/resources\`, resources ); localStorage.setIte`, to: `\n// localhost:8085/api/government/\${agencyProfile.agencyId}/resources\`, resources );\nlocalStorage.setIte` },
            { from: `// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus, respons`, to: `\n// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus, respons` },
            { from: `// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus: "AVAILA`, to: `\n// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus: "AVAILA` }
        ]
    },
    {
        f: 'src/pages/GovernmentAgencyLogin.jsx', items: [
            { from: `// localhost:8085/api/government/login", { agencyId, password }); if (response.data.success) { localSto`, to: `\n// localhost:8085/api/government/login", { agencyId, password });\nif (response.data.success) { localSto` }
        ]
    },
    {
        f: 'src/pages/VolunteerDashboard.jsx', items: [
            { from: `// Fetch all volunteers for the scrollable list `, to: `\n// Fetch all volunteers for the scrollable list\n` },
            { from: `// localhost:8085/api/volunteer/all"); setVolunteers(response.data); setLoading(false); } catch (error)`, to: `\n// localhost:8085/api/volunteer/all");\nsetVolunteers(response.data); setLoading(false); } catch (error)` },
            { from: `// localhost:8085/api/volunteer/\${volunteerId}\`); setSelectedVolunteer(response.data); localStorage.set`, to: `\n// localhost:8085/api/volunteer/\${volunteerId}\`);\nsetSelectedVolunteer(response.data); localStorage.set` }
        ]
    },
    {
        f: 'src/pages/VolunteerForm.jsx', items: [
            { from: `// Urgency options specific for Camps now `, to: `\n// Urgency options specific for Camps now\n` },
            { from: `// Reverse geocoding function to fetch address from coordinates `, to: `\n// Reverse geocoding function to fetch address from coordinates\n` },
            { from: `// Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed) `, to: `\n// Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed)\n` },
            { from: `// nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lon}&addressdetails=1\`, { headers:`, to: `\n// nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lon}&addressdetails=1\`,\n{ headers:` },
            { from: `// Debounce for 1 second `, to: `\n// Debounce for 1 second\n` },
            { from: `// New fields for UI compatibility `, to: `\n// New fields for UI compatibility\n` }
        ]
    },
    {
        f: 'src/pages/VolunteerLogin.jsx', items: [
            { from: `// State for Searchable STATE Dropdown `, to: `\n// State for Searchable STATE Dropdown\n` },
            { from: `// Validation for NGO Organization flow `, to: `\n// Validation for NGO Organization flow\n` },
            { from: `// localhost:8085/api/volunteer/login", { volunteerId: id, password: pass }) .then((response) => { if (`, to: `\n// localhost:8085/api/volunteer/login", { volunteerId: id, password: pass })\n.then((response) => {\nif (` }
        ]
    },
    {
        f: 'src/services/apiService.js', items: [
            { from: `// localhost:8085/api"; class ApiService { async request`, to: `\n// localhost:8085/api";\nclass ApiService { async request` }
        ]
    },
    {
        f: 'src/services/ngoApi.js', items: [
            { from: `// localhost:8085/api/ngo'; export const ngoApi = {`, to: `\n// localhost:8085/api/ngo';\nexport const ngoApi = {` },
            { from: `// Get all NGOs (for government visibility) `, to: `\n// Get all NGOs (for government visibility)\n` }
        ]
    },
    {
        f: 'src/services/websocketService.js', items: [
            { from: `// WebSocket Service for real-time updates using STOMP over SockJS `, to: `\n// WebSocket Service for real-time updates using STOMP over SockJS\n` },
            { from: `// localhost:8085/ws/coordination'; try { const socket = new SockJS(wsUrl); this.stompClient = new Clie`, to: `\n// localhost:8085/ws/coordination';\ntry { const socket = new SockJS(wsUrl); this.stompClient = new Clie` }
        ]
    },
    {
        f: 'src/setupTests.js', items: [
            { from: `// jest-dom adds custom jest matchers for asserting on DOM nodes. `, to: `\n// jest-dom adds custom jest matchers for asserting on DOM nodes.\n` }
        ]
    }
];

p.forEach(({ f, items }) => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        let modified = false;
        for (const r of items) {
            if (content.includes(r.from)) {
                content = content.replace(r.from, r.to);
                modified = true;
            }
        }
        if (modified) {
            fs.writeFileSync(f, content);
            console.log('Fixed', f);
        }
    } catch (e) {
        console.error('Failed', f, e);
    }
});
