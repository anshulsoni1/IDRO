import fs from 'fs';

const fixes = [
    {
        f: 'src/components/IdroHome.jsx',
        replacements: [
            { from: `// --- LEAFLET ICON FIX --- import`, to: `\n// --- LEAFLET ICON FIX ---\nimport` },
            { from: `// --- DIAMOND ICONS LOGIC --- const getIcon`, to: `\n// --- DIAMOND ICONS LOGIC ---\nconst getIcon` },
            { from: `// --- MARKER COMPONENT --- const AlertMarker`, to: `\n// --- MARKER COMPONENT ---\nconst AlertMarker` },
            { from: `// Donation Modal State useEffect`, to: `\n// Donation Modal State\nuseEffect` },
            { from: `// ✅ h-screen + overflow-hidden prevents the "White Blank Page" issue <div`, to: `\n// ✅ h-screen + overflow-hidden prevents the "White Blank Page" issue\n<div` },
            { from: `// BACKGROUND TEXTURE <div`, to: `\n// BACKGROUND TEXTURE\n<div` },
            { from: `// --- TICKER --- <div`, to: `\n// --- TICKER ---\n<div` },
            { from: `// --- HEADER --- <header`, to: `\n// --- HEADER ---\n<header` },
            { from: `// LEFT BRAND (ONLY THIS IS VISUALLY UPDATED) <div`, to: `\n// LEFT BRAND (ONLY THIS IS VISUALLY UPDATED)\n<div` },
            { from: `// Logo <img`, to: `\n// Logo\n<img` },
            { from: `// Text <div`, to: `\n// Text\n<div` },
            { from: `// IDRO (Improved font + glow) <h1`, to: `\n// IDRO (Improved font + glow)\n<h1` },
            { from: `// Full form (bigger) <span`, to: `\n// Full form (bigger)\n<span` },
            { from: `// Tagline unchanged <p`, to: `\n// Tagline unchanged\n<p` },
            { from: `// RIGHT NAVIGATION (UNCHANGED) <nav`, to: `\n// RIGHT NAVIGATION (UNCHANGED)\n<nav` },
            { from: `// --- STATS BAR --- <div`, to: `\n// --- STATS BAR ---\n<div` },
            { from: `// --- MAIN DASHBOARD AREA (Fills Remaining Space) --- <div`, to: `\n// --- MAIN DASHBOARD AREA (Fills Remaining Space) ---\n<div` },
            { from: `// TOP CARDS ROW <section`, to: `\n// TOP CARDS ROW\n<section` },
            { from: `// Card 1: Active Disasters <div`, to: `\n// Card 1: Active Disasters\n<div` },
            { from: `// Card 2: Threats <div`, to: `\n// Card 2: Threats\n<div` },
            { from: `// Card 2: Resources Deployed <div`, to: `\n// Card 2: Resources Deployed\n<div` },
            { from: `// Card 3: Response Unit - NOW CLICKABLE <div`, to: `\n// Card 3: Response Unit - NOW CLICKABLE\n<div` },
            { from: `// Card 4: AI <div`, to: `\n// Card 4: AI\n<div` },
            { from: `// BOTTOM SPLIT: MAP (Fills space) + LIST <div`, to: `\n// BOTTOM SPLIT: MAP (Fills space) + LIST\n<div` },
            { from: `// --- MAP CONTAINER (9 Cols) --- <div`, to: `\n// --- MAP CONTAINER (9 Cols) ---\n<div` },
            { from: `// --- RIGHT LIST (3 Cols, Internal Scroll) --- <div`, to: `\n// --- RIGHT LIST (3 Cols, Internal Scroll) ---\n<div` },
            { from: `// --- SOS BUTTON --- <div`, to: `\n// --- SOS BUTTON ---\n<div` },
            { from: `// --- MODAL 1: ACTIVE DISASTERS (FILTERED: Only Disasters, No Deploy Button) --- {`, to: `\n// --- MODAL 1: ACTIVE DISASTERS (FILTERED: Only Disasters, No Deploy Button) ---\n{` },
            { from: `// Only show CONFIRMED DISASTERS (Trust > 75) {`, to: `\n// Only show CONFIRMED DISASTERS (Trust > 75)\n{` },
            { from: `// NO DEPLOY BUTTON HERE </div>`, to: `\n// NO DEPLOY BUTTON HERE\n</div>` },
            { from: `// --- MODAL 2: RESPONSE UNIT DEPLOYMENT (All Missions + Deploy Button) --- {`, to: `\n// --- MODAL 2: RESPONSE UNIT DEPLOYMENT (All Missions + Deploy Button) ---\n{` },
            { from: `// --- DONATION MODAL --- <DonationModal`, to: `\n// --- DONATION MODAL ---\n<DonationModal` },
            { from: `// Added for Response Modal Siren, // Added for Deploy Button Tent,`, to: `\n// Added for Response Modal\nSiren,\n// Added for Deploy Button\nTent,` }
        ]
    },
    {
        f: 'src/pages/VolunteerLogin.jsx',
        replacements: [
            { from: `// State to track the selected user type const`, to: `\n// State to track the selected user type\nconst` },
            { from: `// 'volunteer' | 'government' | 'ngo' const`, to: `\n// 'volunteer' | 'government' | 'ngo'\nconst` },
            { from: `// For government agency type selection const`, to: `\n// For government agency type selection\nconst` },
            { from: `// State for Searchable STATE Dropdown const`, to: `\n// State for Searchable STATE Dropdown\nconst` },
            { from: `// Handle click outside to close dropdown useEffect`, to: `\n// Handle click outside to close dropdown\nuseEffect` },
            { from: `// Validation for NGO Organization flow if`, to: `\n// Validation for NGO Organization flow\nif` },
            { from: `// SEARCHABLE STATE DROPDOWN (NGO ONLY) {`, to: `\n// SEARCHABLE STATE DROPDOWN (NGO ONLY)\n{` },
            { from: `// Reset NGO selection when state changes setIsDropdownOpen`, to: `\n// Reset NGO selection when state changes\nsetIsDropdownOpen` },
            { from: `// RAJASTHAN {`, to: `\n// RAJASTHAN\n{` },
            { from: `// ASSAM {`, to: `\n// ASSAM\n{` },
            { from: `// GUJARAT {`, to: `\n// GUJARAT\n{` },
            { from: `// UTTAR PRADESH {`, to: `\n// UTTAR PRADESH\n{` },
            { from: `// --- PORTAL SELECTION --- {!userType`, to: `\n// --- PORTAL SELECTION ---\n{!userType` },
            { from: `// Volunteer Login Card <PortalCard`, to: `\n// Volunteer Login Card\n<PortalCard` },
            { from: `// NGO Card <PortalCard`, to: `\n// NGO Card\n<PortalCard` },
            { from: `// Government Card <PortalCard`, to: `\n// Government Card\n<PortalCard` },
            { from: `/* --- LOGIN FORM SECTION --- */ <div`, to: `\n/* --- LOGIN FORM SECTION --- */\n<div` },
            { from: `// Decorative Glow <div`, to: `\n// Decorative Glow\n<div` },
            { from: `// Government Agency Type Selection {`, to: `\n// Government Agency Type Selection\n{` },
            { from: `// Account Selection for Pre-Approved IDs {`, to: `\n// Account Selection for Pre-Approved IDs\n{` },
            { from: `// Legacy Manual Input (Fallback) {`, to: `\n// Legacy Manual Input (Fallback)\n{` }
        ]
    },
    {
        f: 'src/pages/GovernmentAgencyDashboard.jsx',
        replacements: [
            { from: `// Handle resource limit update if (newResourceCount`, to: `\n// Handle resource limit update\nif (newResourceCount` },
            { from: `// Mock Update import`, to: `\n// Mock Update\nimport` },
            { from: `// Handle deployment import`, to: `\n// Handle deployment\nimport` }
        ]
    },
    {
        f: 'src/pages/NGODashboard.jsx',
        replacements: [
            { from: `// Fetch profile if (storedProfile)`, to: `\n// Fetch profile\nif (storedProfile)` },
            { from: `// Handle resource limit update if (newResourceCount`, to: `\n// Handle resource limit update\nif (newResourceCount` },
            { from: `// Map resourceKey if (['foodPackets'`, to: `\n// Map resourceKey\nif (['foodPackets'` },
            { from: `// Mock Update const`, to: `\n// Mock Update\nconst` },
            { from: `// Handle deployment const`, to: `\n// Handle deployment\nconst` }
        ]
    },
    {
        f: 'src/pages/DisasterAnalyzer.jsx',
        replacements: [
            { from: `// Set loading states setLoading(true);`, to: `\n// Set loading states\nsetLoading(true);` },
            { from: `// Fetch Active Disasters from Real API const disastersRes`, to: `\n// Fetch Active Disasters from Real API\nconst disastersRes` },
            { from: `// Set active disasters (matching exact MongoDB fields) setActiveDisasters(`, to: `\n// Set active disasters (matching exact MongoDB fields)\nsetActiveDisasters(` },
            { from: `// Generate mock data since this API doesn't exist yet! generateFieldReports(`, to: `\n// Generate mock data since this API doesn't exist yet!\ngenerateFieldReports(` },
            { from: `// Auto refresh every 5s const interval `, to: `\n// Auto refresh every 5s\nconst interval ` },
            { from: `// Mock data generator (Simulating Intelligence Nodes) const generateFieldReports`, to: `\n// Mock data generator (Simulating Intelligence Nodes)\nconst generateFieldReports` },
            { from: `// Direct value from DB const getMissionStatus`, to: `\n// Direct value from DB\nconst getMissionStatus` },
            { from: `// Generate some dynamic metrics based on disasters const activeCount`, to: `\n// Generate some dynamic metrics based on disasters\nconst activeCount` },
            { from: `// 1. Analyze and format disasters data const criticalAlerts`, to: `\n// 1. Analyze and format disasters data\nconst criticalAlerts` },
            { from: `// 2. Intelligence Report Generation const generateReport`, to: `\n// 2. Intelligence Report Generation\nconst generateReport` }
        ]
    }
];

fixes.forEach(({ f, replacements }) => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        let modified = false;
        replacements.forEach(({ from, to }) => {
            // Find exact matches or matches with slight spacing differences
            // using simple string replacement over exact match
            const escapedFrom = from.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\*/g, '\\*');
            if (content.includes(from)) {
                content = content.replace(from, to);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(f, content);
            console.log('Fixed swallowed comments in', f);
        }
    } catch (e) {
        console.error('Failed', f, e);
    }
});
