import fs from 'fs';

const replacements = [
    { f: 'src/index.js', from: `// ✅ This imports the file you just created const `, to: `\n// ✅ This imports the file you just created\nconst ` },

    { f: 'src/pages/ActiveDisasters.jsx', from: `// Normalize MongoDB _id → id const normalized`, to: `\n// Normalize MongoDB _id → id\nconst normalized` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// Filtered OPEN alerts:", active); const uniqueDisasters`, to: `\n// Filtered OPEN alerts:", active);\nconst uniqueDisasters` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// first load const interval`, to: `\n// first load\nconst interval` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// refresh every 3 seconds }, 3000);`, to: `\n// refresh every 3 seconds\n}, 3000);` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// cleanup }, [fetchDisasters]);`, to: `\n// cleanup\n}, [fetchDisasters]);` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// DELETE FUNCTION const handleDelete`, to: `\n// DELETE FUNCTION\nconst handleDelete` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// High / Immediate if (urgency`, to: `\n// High / Immediate\nif (urgency` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// Medium if (urgency`, to: `\n// Medium\nif (urgency` },
    { f: 'src/pages/ActiveDisasters.jsx', from: `// Low / Default return "bg-green`, to: `\n// Low / Default\nreturn "bg-green` },

    { f: 'src/pages/DeploymentStatus.jsx', from: `// Normalize MongoDB _id → id const normalized`, to: `\n// Normalize MongoDB _id → id\nconst normalized` },
    { f: 'src/pages/DeploymentStatus.jsx', from: `// Show OPEN and ASSIGNED missions for deployment status const active`, to: `\n// Show OPEN and ASSIGNED missions for deployment status\nconst active` },
    { f: 'src/pages/DeploymentStatus.jsx', from: `// High / Immediate if (urgency`, to: `\n// High / Immediate\nif (urgency` },
    { f: 'src/pages/DeploymentStatus.jsx', from: `// Medium if (urgency`, to: `\n// Medium\nif (urgency` },
    { f: 'src/pages/DeploymentStatus.jsx', from: `// Low / Default return "bg-green`, to: `\n// Low / Default\nreturn "bg-green` },

    { f: 'src/pages/DisasterAnalyzer.jsx', from: `// DIRECT MAPPING FROM BACKEND (ZERO LOGIC ON FRONTEND) const enrichedCamps`, to: `\n// DIRECT MAPPING FROM BACKEND (ZERO LOGIC ON FRONTEND)\nconst enrichedCamps` },
    { f: 'src/pages/DisasterAnalyzer.jsx', from: `// Aggregated Intelligence Metrics // Mission Status Logic const getMissionStatus`, to: `\n// Aggregated Intelligence Metrics\n// Mission Status Logic\nconst getMissionStatus` },

    { f: 'src/pages/DisasterDetails2.jsx', from: `// 1. Sort Camps by Priority Window (Urgent First) const sortedCamps`, to: `\n// 1. Sort Camps by Priority Window (Urgent First)\nconst sortedCamps` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// 2. Filter Providers (ETA matching: Provider ETA <= Camp Window) const campWindowRank`, to: `\n// 2. Filter Providers (ETA matching: Provider ETA <= Camp Window)\nconst campWindowRank` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// This keeps IMMEDIATE assets available for IMMEDIATE camps. viableProviders.sort`, to: `\n// This keeps IMMEDIATE assets available for IMMEDIATE camps.\nviableProviders.sort` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Priority 1: Strategic Conservation (Desc rank: 12h preferred over 6h for 12h camp) if `, to: `\n// Priority 1: Strategic Conservation (Desc rank: 12h preferred over 6h for 12h camp)\nif ` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Priority 2: Status Available if `, to: `\n// Priority 2: Status Available\nif ` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Priority 3: Highest Capacity return `, to: `\n// Priority 3: Highest Capacity\nreturn ` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// 4. Resource Assignment (Splitting support) viableProviders.forEach`, to: `\n// 4. Resource Assignment (Splitting support)\nviableProviders.forEach` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Deplete inventory remainingNeed `, to: `\n// Deplete inventory\nremainingNeed ` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Convert grouped provider assignments into final allocation blocks Object.values`, to: `\n// Convert grouped provider assignments into final allocation blocks\nObject.values` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Fetch Disaster Header Data const alertsRes`, to: `\n// Fetch Disaster Header Data\nconst alertsRes` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Fetch Camp Matrix Data const impactRes`, to: `\n// Fetch Camp Matrix Data\nconst impactRes` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Fetch Provider Resource Pool let ngoList`, to: `\n// Fetch Provider Resource Pool\nlet ngoList` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// 🛰️ Mission Log Observer - Automatically generates logs when allocations are created useEffect`, to: `\n// 🛰️ Mission Log Observer - Automatically generates logs when allocations are created\nuseEffect` },
    { f: 'src/pages/DisasterDetails2.jsx', from: `// Prepend new logs to the feed return `, to: `\n// Prepend new logs to the feed\nreturn ` },

    { f: 'src/pages/ImpactList.jsx', from: `// Import Real API export default function`, to: `\n// Import Real API\nexport default function` },
    { f: 'src/pages/ImpactList.jsx', from: `// ✅ NEW: Track Errors const navigate`, to: `\n// ✅ NEW: Track Errors\nconst navigate` },
    { f: 'src/pages/ImpactList.jsx', from: `// Normalize MongoDB _id → id const normalized`, to: `\n// Normalize MongoDB _id → id\nconst normalized` },
    { f: 'src/pages/ImpactList.jsx', from: `// first load with loading state const interval`, to: `\n// first load with loading state\nconst interval` },
    { f: 'src/pages/ImpactList.jsx', from: `// auto refresh without loading state }, 3000); return`, to: `\n// auto refresh without loading state\n}, 3000);\nreturn` },
    { f: 'src/pages/ImpactList.jsx', from: `// cleanup }, []); const handleDelete`, to: `\n// cleanup\n}, []);\nconst handleDelete` },
    { f: 'src/pages/ImpactList.jsx', from: `// Avoid navigating to details if (!id)`, to: `\n// Avoid navigating to details\nif (!id)` },

    { f: 'src/pages/VolunteerForm.jsx', from: `// urgency removed from here as per request affectedCount`, to: `// urgency removed from here as per request\naffectedCount` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Urgency options specific for Camps now const campUrgencyLevels`, to: `\n// Urgency options specific for Camps now\nconst campUrgencyLevels` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Load logged-in volunteer from localStorage const storedVolunteer`, to: `\n// Load logged-in volunteer from localStorage\nconst storedVolunteer` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Reverse geocoding function to fetch address from coordinates const fetchAddressFromCoordinates`, to: `\n// Reverse geocoding function to fetch address from coordinates\nconst fetchAddressFromCoordinates` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed) const response`, to: `\n// Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed)\nconst response` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Update form location with the fetched address setForm`, to: `\n// Update form location with the fetched address\nsetForm` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Debounce for 1 second return () => clearTimeout`, to: `\n// Debounce for 1 second\nreturn () => clearTimeout` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Get current location using browser Geolocation API const getCurrentLocation`, to: `\n// Get current location using browser Geolocation API\nconst getCurrentLocation` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Added injuredCount and urgency fields to new camp object setCamps`, to: `\n// Added injuredCount and urgency fields to new camp object\nsetCamps` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Removed urgency check from form validation if (!form.latitude`, to: `\n// Removed urgency check from form validation\nif (!form.latitude` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Camp Validations for (const camp `, to: `\n// Camp Validations\nfor (const camp ` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// New fields for UI compatibility color:`, to: `\n// New fields for UI compatibility\ncolor:` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// urgency removed from payload impact:`, to: `\n// urgency removed from payload\nimpact:` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Trigger address fetch when both coordinates are filled useEffect`, to: `\n// Trigger address fetch when both coordinates are filled\nuseEffect` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// ✅ CRITICAL } for (const camp`, to: `\n// ✅ CRITICAL\n}\nfor (const camp` },
    { f: 'src/pages/VolunteerForm.jsx', from: `// Sending the new urgency field stock:`, to: `\n// Sending the new urgency field\nstock:` }
];

replacements.forEach(({ f, from, to }) => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        if (content.includes(from)) {
            content = content.replace(from, to);
            fs.writeFileSync(f, content);
            console.log(`Fixed ${from} in ${f}`);
        } else {
            console.log(`Failed to find ${from} in ${f}`);
        }
    } catch (err) {
        console.error(`Error reading ${f}`, err);
    }
});

console.log('Done executing manual comment fixes.');
