import fs from 'fs';

const fixes = [
    {
        f: 'src/components/IdroHome.jsx', replacements: [
            { from: `// Added for Response Modal Siren,`, to: `\n// Added for Response Modal\nSiren,` },
            { from: `// Added for Deploy Button Tent,`, to: `\n// Added for Deploy Button\nTent,` },
            { from: `// nominatim.openstreetmap.org/reverse?format=json&lat=\${alert.latitude}&lon=\${alert.longitude}\`); cons`, to: `\n// nominatim.openstreetmap.org/reverse?format=json&lat=\${alert.latitude}&lon=\${alert.longitude}\`);\ncons` },
            { from: `// server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="`, to: `\n// server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="` },
            { from: `// server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z`, to: `\n// server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z` }
        ]
    },
    {
        f: 'src/components/Toast.jsx', replacements: [
            { from: `// Ensure unique ID const`, to: `\n// Ensure unique ID\nconst` },
            { from: `// Auto remove after duration if`, to: `\n// Auto remove after duration\nif` },
            { from: `// Match animation duration }; // Configuration for different toast types const`, to: `\n// Match animation duration\n};\n// Configuration for different toast types\nconst` },
            { from: `// Configuration for different toast types const`, to: `\n// Configuration for different toast types\nconst` }
        ]
    },
    {
        f: 'src/pages/DeploymentStatus.jsx', replacements: [
            { from: `// Show OPEN and ASSIGNED missions for deployment status const`, to: `\n// Show OPEN and ASSIGNED missions for deployment status\nconst` }
        ]
    },
    {
        f: 'src/pages/DisasterDetails2.jsx', replacements: [
            { from: `// This keeps IMMEDIATE assets available for IMMEDIATE camps. viableProviders.sort(`, to: `\n// This keeps IMMEDIATE assets available for IMMEDIATE camps.\nviableProviders.sort(` },
            { from: `// Priority 1: Strategic Conservation (Desc rank: 12h preferred over 6h for 12h camp) if`, to: `\n// Priority 1: Strategic Conservation (Desc rank: 12h preferred over 6h for 12h camp)\nif` },
            { from: `// SECTOR_7 </h1> <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mt-1"`, to: `\n// SECTOR_7\n</h1> <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mt-1"` },
            { from: `// SCANNING_REGIONAL_NODES</p> </div>)} </section> {/* 🚚 AUTO ALLOCATION PANEL */} <section className=`, to: `\n// SCANNING_REGIONAL_NODES\n</p> </div>)} </section> {/* 🚚 AUTO ALLOCATION PANEL */} <section className=` },
            { from: `// No_Active_Missions</p> </div>)} </section> <section className="animate-in fade-in slide-in-from-bott`, to: `\n// No_Active_Missions\n</p> </div>)} </section> <section className="animate-in fade-in slide-in-from-bott` }
        ]
    },
    {
        f: 'src/pages/GovernmentAgencyDashboard.jsx', replacements: [
            { from: `// Resource states - using Map structure const`, to: `\n// Resource states - using Map structure\nconst` },
            { from: `// localhost:8085/api/government/\${agencyProfile.agencyId}/resources\`, resources ); localStorage.setIte`, to: `\n// localhost:8085/api/government/\${agencyProfile.agencyId}/resources\`, resources );\nlocalStorage.setIte` },
            { from: `// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus, respons`, to: `\n// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus, respons` },
            { from: `// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus: "AVAILA`, to: `\n// localhost:8085/api/government/\${agencyProfile.agencyId}/availability\`, { availabilityStatus: "AVAILA` }
        ]
    },
    {
        f: 'src/pages/GovernmentAgencyLogin.jsx', replacements: [
            { from: `// localhost:8085/api/government/login", { agencyId, password }); if (response.data.success) { localSto`, to: `\n// localhost:8085/api/government/login", { agencyId, password });\nif (response.data.success) { localSto` }
        ]
    },
    {
        f: 'src/pages/NGODashboard.jsx', replacements: [
            { from: `// Initialize resource states setReliefSupplies`, to: `\n// Initialize resource states\nsetReliefSupplies` }
        ]
    },
    {
        f: 'src/pages/NGOLogin.jsx', replacements: [
            { from: `// Store NGO profile in localStorage localStorage.set`, to: `\n// Store NGO profile in localStorage\nlocalStorage.set` },
            { from: `// Redirect to dashboard navigate("/ngo-dashboard"); } else { setError(response.message || "Login faile`, to: `\n// Redirect to dashboard\nnavigate("/ngo-dashboard"); } else { setError(response.message || "Login faile` }
        ]
    },
    {
        f: 'src/pages/VolunteerDashboard.jsx', replacements: [
            { from: `// Load volunteer profile from localStorage const `, to: `\n// Load volunteer profile from localStorage\nconst ` },
            { from: `// Fetch all volunteers for the scrollable list fetchAllVolunteers(); }, [navigate]); const fetchAllVol`, to: `\n// Fetch all volunteers for the scrollable list\nfetchAllVolunteers(); }, [navigate]); const fetchAllVol` },
            { from: `// localhost:8085/api/volunteer/all"); setVolunteers(response.data); setLoading(false); } catch (error)`, to: `\n// localhost:8085/api/volunteer/all");\nsetVolunteers(response.data); setLoading(false); } catch (error)` },
            { from: `// localhost:8085/api/volunteer/\${volunteerId}\`); setSelectedVolunteer(response.data); localStorage.set`, to: `\n// localhost:8085/api/volunteer/\${volunteerId}\`);\nsetSelectedVolunteer(response.data); localStorage.set` }
        ]
    },
    {
        f: 'src/pages/VolunteerForm.jsx', replacements: [
            { from: `// Urgency options specific for Camps now const`, to: `\n// Urgency options specific for Camps now\nconst` },
            { from: `// Reverse geocoding function to fetch address from coordinates const`, to: `\n// Reverse geocoding function to fetch address from coordinates\nconst` },
            { from: `// Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed) const`, to: `\n// Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed)\nconst` },
            { from: `// nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lon}&addressdetails=1\`, { headers:`, to: `\n// nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lon}&addressdetails=1\`, { headers:` },
            { from: `// Debounce for 1 second return`, to: `\n// Debounce for 1 second\nreturn` },
            { from: `// New fields for UI compatibility color`, to: `\n// New fields for UI compatibility\ncolor` }
        ]
    },
    {
        f: 'src/pages/VolunteerLogin.jsx', replacements: [
            { from: `// State for Searchable STATE Dropdown const`, to: `\n// State for Searchable STATE Dropdown\nconst` },
            { from: `// Validation for NGO Organization flow if`, to: `\n// Validation for NGO Organization flow\nif` },
            { from: `// localhost:8085/api/volunteer/login", { volunteerId: id, password: pass }) .then((response) => { if (`, to: `\n// localhost:8085/api/volunteer/login", { volunteerId: id, password: pass }) .then((response) => { if (` }
        ]
    },
    {
        f: 'src/services/apiService.js', replacements: [
            { from: `// localhost:8085/api"; class ApiService { async request`, to: `\n// localhost:8085/api";\nclass ApiService { async request` },
            { from: `// ---------- AUTH ---------- login`, to: `\n// ---------- AUTH ----------\nlogin` },
            { from: `// ---------- ALERTS ---------- getAlerts`, to: `\n// ---------- ALERTS ----------\ngetAlerts` },
            { from: `// ---------- ANALYTICS ---------- getImpact`, to: `\n// ---------- ANALYTICS ----------\ngetImpact` },
            { from: `// ---------- CAMPS ---------- getCamps`, to: `\n// ---------- CAMPS ----------\ngetCamps` },
            { from: `// ---------- ACTIONS ---------- getActions`, to: `\n// ---------- ACTIONS ----------\ngetActions` }
        ]
    },
    {
        f: 'src/services/ngoApi.js', replacements: [
            { from: `// localhost:8085/api/ngo'; export const ngoApi =`, to: `\n// localhost:8085/api/ngo';\nexport const ngoApi =` },
            { from: `// Login NGO loginNGO:`, to: `\n// Login NGO\nloginNGO:` },
            { from: `// Get NGO profile getNGOProfile:`, to: `\n// Get NGO profile\ngetNGOProfile:` },
            { from: `// Update resources updateResources:`, to: `\n// Update resources\nupdateResources:` },
            { from: `// Update availability updateAvailability:`, to: `\n// Update availability\nupdateAvailability:` },
            { from: `// Get all NGOs (for government visibility) getAllNGOs:`, to: `\n// Get all NGOs (for government visibility)\ngetAllNGOs:` }
        ]
    },
    {
        f: 'src/services/websocketService.js', replacements: [
            { from: `// WebSocket Service for real-time updates using STOMP over SockJS class`, to: `\n// WebSocket Service for real-time updates using STOMP over SockJS\nclass` },
            { from: `// localhost:8085/ws/coordination'; try { const`, to: `\n// localhost:8085/ws/coordination';\ntry { const` },
            { from: `// Subscribe to topics this.subscribeToTopics();`, to: `\n// Subscribe to topics\nthis.subscribeToTopics();` },
            { from: `// Attempt to reconnect if (this.reconnectAttempts`, to: `\n// Attempt to reconnect\nif (this.reconnectAttempts` },
            { from: `// Subscribe to alerts this.stompClient.subscribe`, to: `\n// Subscribe to alerts\nthis.stompClient.subscribe` },
            { from: `// Subscribe to coordination messages this.stompClient.subscribe`, to: `\n// Subscribe to coordination messages\nthis.stompClient.subscribe` },
            { from: `// Subscribe to camp updates this.stompClient.subscribe`, to: `\n// Subscribe to camp updates\nthis.stompClient.subscribe` },
            { from: `// Subscribe to actions this.stompClient.subscribe`, to: `\n// Subscribe to actions\nthis.stompClient.subscribe` },
            { from: `// handleMessage is no longer needed as messages are handled in subscribeToTopics notifySubscribers(top`, to: `\n// handleMessage is no longer needed as messages are handled in subscribeToTopics\nnotifySubscribers(top` },
            { from: `// Send to the coordination endpoint this.stompClient.publish`, to: `\n// Send to the coordination endpoint\nthis.stompClient.publish` },
            { from: `// Prevent auto-reconnect this.stompClient.deactivate`, to: `\n// Prevent auto-reconnect\nthis.stompClient.deactivate` },
            { from: `// Clear all subscribers Object.keys`, to: `\n// Clear all subscribers\nObject.keys` }
        ]
    },
    {
        f: 'src/setupTests.js', replacements: [
            { from: `// jest-dom adds custom jest matchers for asserting on DOM nodes. import`, to: `\n// jest-dom adds custom jest matchers for asserting on DOM nodes.\nimport` }
        ]
    },
    {
        f: 'src/utils/impactEngine.js', replacements: [
            { from: `// Base calculations const`, to: `\n// Base calculations\nconst` },
            { from: `// 2 meals per person const waterPerDay`, to: `\n// 2 meals per person\nconst waterPerDay` },
            { from: `// 3L per person const medicalTeams`, to: `\n// 3L per person\nconst medicalTeams` },
            { from: `// Camp-based needs aggregation const campNeeds`, to: `\n// Camp-based needs aggregation\nconst campNeeds` }
        ]
    },
    {
        f: 'src/utils/indianCities.js', replacements: [
            { from: `// Major Metropolitan Cities {`, to: `\n// Major Metropolitan Cities\n{` },
            { from: `// State Capitals & Major Cities {`, to: `\n// State Capitals & Major Cities\n{` },
            { from: `// Tier-2 Cities {`, to: `\n// Tier-2 Cities\n{` },
            { from: `// Coastal & Disaster-Prone Areas {`, to: `\n// Coastal & Disaster-Prone Areas\n{` },
            { from: `// Other Important Cities {`, to: `\n// Other Important Cities\n{` }
        ]
    }
];

fixes.forEach(({ f, replacements }) => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        let modified = false;
        for (const r of replacements) {
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
