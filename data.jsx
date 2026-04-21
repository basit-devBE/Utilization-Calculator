// Shared data + icons for the Utilisation Calculator mockup.

const Icon = ({name, size=16}) => {
  const s = {width: size, height: size, strokeWidth: 1.5, fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round'};
  switch(name) {
    case 'dashboard': return <svg {...s} viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>;
    case 'pi': return <svg {...s} viewBox="0 0 16 16"><path d="M2 2h12M4 2v12M10 2v12"/><path d="M4 6h6M4 10h6"/></svg>;
    case 'target': return <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="3"/><circle cx="8" cy="8" r="1" fill="currentColor"/></svg>;
    case 'framework': return <svg {...s} viewBox="0 0 16 16"><path d="M2 3h12M2 8h12M2 13h8"/><rect x="11" y="11" width="4" height="4" rx="1"/></svg>;
    case 'data': return <svg {...s} viewBox="0 0 16 16"><ellipse cx="8" cy="4" rx="5" ry="2"/><path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4"/><path d="M3 8c0 1.1 2.2 2 5 2s5-.9 5-2"/></svg>;
    case 'validate': return <svg {...s} viewBox="0 0 16 16"><path d="M8 1.5L2 4v5c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z"/><path d="M5.5 8l2 2 3-3.5"/></svg>;
    case 'results': return <svg {...s} viewBox="0 0 16 16"><path d="M2 13V3M13 13V7M7.5 13V5"/><path d="M2 13h12"/></svg>;
    case 'settings': return <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="2"/><path d="M13.5 8a5.5 5.5 0 01-.1 1.1l1.4 1.1-1.4 2.4-1.7-.5a5.6 5.6 0 01-2 1.1l-.3 1.8h-2.8l-.3-1.8a5.6 5.6 0 01-2-1.1l-1.7.5-1.4-2.4 1.4-1.1a5.5 5.5 0 010-2.2L.2 5.2 1.6 2.8l1.7.5a5.6 5.6 0 012-1.1L5.6.4h2.8l.3 1.8a5.6 5.6 0 012 1.1l1.7-.5 1.4 2.4-1.4 1.1c.06.35.1.72.1 1.1z"/></svg>;
    case 'approvals': return <svg {...s} viewBox="0 0 16 16"><path d="M13 7V13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h6"/><path d="M10 1l3 3-5 5H5V6l5-5z"/></svg>;
    case 'plus': return <svg {...s} viewBox="0 0 16 16"><path d="M8 3v10M3 8h10"/></svg>;
    case 'chevron-down': return <svg {...s} viewBox="0 0 16 16"><path d="M4 6l4 4 4-4"/></svg>;
    case 'chevron-right': return <svg {...s} viewBox="0 0 16 16"><path d="M6 4l4 4-4 4"/></svg>;
    case 'chevron-left': return <svg {...s} viewBox="0 0 16 16"><path d="M10 4l-4 4 4 4"/></svg>;
    case 'search': return <svg {...s} viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3"/></svg>;
    case 'check': return <svg {...s} viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 5"/></svg>;
    case 'x': return <svg {...s} viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>;
    case 'alert': return <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v3.5M8 10.5v.5"/></svg>;
    case 'info': return <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5"/><path d="M8 7v4M8 5v.5"/></svg>;
    case 'calendar': return <svg {...s} viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 1.5v3M11 1.5v3M2 7h12"/></svg>;
    case 'clock': return <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M8 5v3.5L10 10"/></svg>;
    case 'download': return <svg {...s} viewBox="0 0 16 16"><path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M3 13h10"/></svg>;
    case 'upload': return <svg {...s} viewBox="0 0 16 16"><path d="M8 11V2M4.5 5.5L8 2l3.5 3.5M3 13h10"/></svg>;
    case 'refresh': return <svg {...s} viewBox="0 0 16 16"><path d="M3 7a5 5 0 018.5-3L13 5.5M3 2v3.5H6.5M13 9a5 5 0 01-8.5 3L3 10.5M13 14v-3.5H9.5"/></svg>;
    case 'link': return <svg {...s} viewBox="0 0 16 16"><path d="M7 5L4 5a3 3 0 000 6h3M9 11h3a3 3 0 000-6H9M6 8h4"/></svg>;
    case 'play': return <svg {...s} viewBox="0 0 16 16"><path d="M4 2.5v11l10-5.5-10-5.5z"/></svg>;
    case 'bell': return <svg {...s} viewBox="0 0 16 16"><path d="M3.5 11V8a4.5 4.5 0 019 0v3l1 1.5H2.5L3.5 11z"/><path d="M7 14a1.5 1.5 0 003 0"/></svg>;
    case 'help': return <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5"/><path d="M6 6.5a2 2 0 114 0c0 1.5-2 1.5-2 3M8 11.5v.5"/></svg>;
    case 'user': return <svg {...s} viewBox="0 0 16 16"><circle cx="8" cy="6" r="3"/><path d="M2 14a6 6 0 0112 0"/></svg>;
    case 'arrow-right': return <svg {...s} viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>;
    case 'arrow-up-right': return <svg {...s} viewBox="0 0 16 16"><path d="M5 11L11 5M6 5h5v5"/></svg>;
    case 'filter': return <svg {...s} viewBox="0 0 16 16"><path d="M2 3h12L10 9v5l-4-2V9L2 3z"/></svg>;
    case 'edit': return <svg {...s} viewBox="0 0 16 16"><path d="M10 2l4 4-8 8H2v-4l8-8z"/></svg>;
    case 'trash': return <svg {...s} viewBox="0 0 16 16"><path d="M3 4h10M6 4V2h4v2M5 4l.5 10h5L11 4"/></svg>;
    case 'sync': return <svg {...s} viewBox="0 0 16 16"><path d="M12 3l-3 3h2a4 4 0 01-4 4 4 4 0 01-2.5-.9M4 13l3-3H5a4 4 0 014-4c1 0 1.8.3 2.5.9"/></svg>;
    case 'chart': return <svg {...s} viewBox="0 0 16 16"><path d="M2 13h12M4 10l3-3 2 2 3-4"/></svg>;
    case 'users': return <svg {...s} viewBox="0 0 16 16"><circle cx="6" cy="6" r="2.5"/><path d="M1 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/><circle cx="12" cy="5" r="2"/><path d="M10 13c0-2 1-3.5 3-3.5s2 1 2 1.5"/></svg>;
    case 'folder': return <svg {...s} viewBox="0 0 16 16"><path d="M2 4a1 1 0 011-1h3.5l1.5 1.5H13a1 1 0 011 1V12a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"/></svg>;
    case 'flag': return <svg {...s} viewBox="0 0 16 16"><path d="M3 14V2M3 2h8l-1.5 3L11 8H3"/></svg>;
    case 'dots': return <svg {...s} viewBox="0 0 16 16"><circle cx="4" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>;
    case 'menu': return <svg {...s} viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h12"/></svg>;
    case 'copy': return <svg {...s} viewBox="0 0 16 16"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M3 11V3a1 1 0 011-1h7"/></svg>;
    case 'sparkles': return <svg {...s} viewBox="0 0 16 16"><path d="M8 2l1.5 3.5L13 7l-3.5 1.5L8 12l-1.5-3.5L3 7l3.5-1.5L8 2z"/><path d="M13 11l.7 1.3L15 13l-1.3.7L13 15l-.7-1.3L11 13l1.3-.7L13 11z"/></svg>;
    case 'lock': return <svg {...s} viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="7" rx="1"/><path d="M5 7V5a3 3 0 016 0v2"/></svg>;
    default: return null;
  }
};

// ── ROLES ──
const ROLES = [
  {id:'hr', key:'hr', initials:'AB', name:'Abena Boateng', label:'HR & Quality Officer', role:'HR & Quality Officer', color:'#FF5A00',
    perms: {configPI: true, setTargets: true, approve: false, review: true}},
  {id:'analyst', key:'analyst', initials:'KA', name:'Kwame Asante', label:'Reviewer / Analyst', role:'Reviewer / Analyst', color:'#1A5AA8',
    perms: {configPI: false, setTargets: false, approve: true, review: true}},
  {id:'manager', key:'manager', initials:'EO', name:'Esi Owusu', label:'Manager — Cloud Services', role:'Manager — Cloud Services', color:'#5A37A8',
    perms: {configPI: false, setTargets: false, approve: false, review: true}},
];

// ── PI data ──
const PIs = [
  {id: 'PI-2026.1', name:'PI 2026.1 — Jan–Mar', status:'active', start:'2026-01-06', end:'2026-03-28', sprints: 6, teams: 8, targetScore: 3.2, currentScore: 3.06, objectives: 14, bonusPool: 'GHS 142k'},
  {id: 'PI-2025.4', name:'PI 2025.4 — Oct–Dec', status:'closed', start:'2025-10-07', end:'2025-12-20', sprints: 6, teams: 7, targetScore: 3.0, currentScore: 3.18, objectives: 12, bonusPool: 'GHS 128k'},
  {id: 'PI-2025.3', name:'PI 2025.3 — Jul–Sep', status:'closed', start:'2025-07-08', end:'2025-09-27', sprints: 6, teams: 7, targetScore: 3.0, currentScore: 2.84, objectives: 11, bonusPool: 'GHS 96k'},
  {id: 'PI-2026.2', name:'PI 2026.2 — Apr–Jun', status:'draft', start:'2026-04-07', end:'2026-06-28', sprints: 6, teams: 8, targetScore: 3.25, currentScore: null, objectives: 0, bonusPool: '—'},
];

// ── Teams (aggregate — no individuals!) ──
const TEAMS = [
  {id:'T-CLD', name:'Cloud Services', members: 12, color:'#08283B', utilisation: 86.4, target: 85, billable: 1245, capacity: 1440, status:'above', sourceReady: true, trend: [70,74,82,78,85,86,86,88,87,86]},
  {id:'T-DAT', name:'Data & Platform', members: 9, color:'#FF5A00', utilisation: 78.2, target: 80, billable: 843, capacity: 1080, status:'near', sourceReady: true, trend: [66,72,74,78,80,78,76,79,78,78]},
  {id:'T-MOB', name:'Mobile Engineering', members: 8, color:'#1A5AA8', utilisation: 91.0, target: 85, billable: 872, capacity: 960, status:'above', sourceReady: true, trend: [82,86,90,92,90,91,88,91,92,91]},
  {id:'T-WEB', name:'Web Engineering', members: 11, color:'#0E7C47', utilisation: 72.4, target: 80, billable: 955, capacity: 1320, status:'below', sourceReady: true, trend: [65,70,74,68,70,72,75,70,73,72]},
  {id:'T-DES', name:'Design & Research', members: 6, color:'#5A37A8', utilisation: 83.1, target: 80, billable: 598, capacity: 720, status:'above', sourceReady: true, trend: [74,78,80,82,84,85,82,83,83,83]},
  {id:'T-QA',  name:'Quality Assurance', members: 7, color:'#AA6A12', utilisation: 80.5, target: 80, billable: 676, capacity: 840, status:'at', sourceReady: false, trend: [72,74,76,78,80,82,81,80,80,80]},
  {id:'T-DEV', name:'DevOps & SRE', members: 5, color:'#1A4A4A', utilisation: 88.6, target: 85, billable: 532, capacity: 600, status:'above', sourceReady: true, trend: [80,82,84,86,88,90,89,88,89,88]},
  {id:'T-SUP', name:'Platform Support', members: 4, color:'#B32525', utilisation: 65.0, target: 75, billable: 312, capacity: 480, status:'below', sourceReady: false, trend: [60,62,64,66,68,66,64,65,65,65]},
];

// ── Projects ──
const PROJECTS = [
  {id:'P-001', name:'Acme Cloud Migration', client:'Acme Corp', team:'Cloud Services', health:'green', targetHours: 420, actualHours: 438, targetAchievement: 104.3, billable: 100, completion: 78, pi: 'PI-2026.1'},
  {id:'P-002', name:'MobilePay 2.0', client:'Zenith Bank', team:'Mobile Engineering', health:'green', targetHours: 380, actualHours: 342, targetAchievement: 90.0, billable: 100, completion: 62, pi: 'PI-2026.1'},
  {id:'P-003', name:'Customer 360°', client:'Databank', team:'Data & Platform', health:'amber', targetHours: 320, actualHours: 310, targetAchievement: 96.9, billable: 100, completion: 55, pi: 'PI-2026.1'},
  {id:'P-004', name:'ShopRite Commerce', client:'ShopRite', team:'Web Engineering', health:'red', targetHours: 460, actualHours: 384, targetAchievement: 83.5, billable: 100, completion: 48, pi: 'PI-2026.1'},
  {id:'P-005', name:'Design System v2', client:'Internal', team:'Design & Research', health:'green', targetHours: 220, actualHours: 215, targetAchievement: 97.7, billable: 0, completion: 82, pi: 'PI-2026.1'},
  {id:'P-006', name:'Order Mgmt API', client:'NovaLogic', team:'Cloud Services', health:'green', targetHours: 300, actualHours: 297, targetAchievement: 99.0, billable: 100, completion: 66, pi: 'PI-2026.1'},
];

// ── Scoring framework ──
const FRAMEWORK = {
  name: 'Standard PI Scoring Framework',
  version: 'v2.3',
  scale: '1–5',
  objectives: [
    {id: 'OBJ-UTL', name: 'Utilisation Rate', weight: 30, source: 'ClockIT + RMS', unit: '%', targets:[{tier:5,at:'≥ 90'},{tier:4,at:'80–89'},{tier:3,at:'70–79'},{tier:2,at:'60–69'},{tier:1,at:'< 60'}], locked: true, ticket:'AUTS-24'},
    {id: 'OBJ-TGT', name: 'Project Target Achievement', weight: 25, source: 'Project PM', unit: '%', targets:[{tier:5,at:'≥ 100'},{tier:4,at:'90–99'},{tier:3,at:'80–89'},{tier:2,at:'70–79'},{tier:1,at:'< 70'}], locked: true, ticket:'AUTS-20'},
    {id: 'OBJ-QUL', name: 'Quality & Defect Density', weight: 20, source: 'JIRA', unit: 'defects / 100 LOC', targets:[{tier:5,at:'< 0.3'},{tier:4,at:'0.3–0.5'},{tier:3,at:'0.5–0.8'},{tier:2,at:'0.8–1.2'},{tier:1,at:'> 1.2'}], locked: false, ticket:'AUTS-17'},
    {id: 'OBJ-CSAT', name: 'Client Satisfaction (CSAT)', weight: 15, source: 'Survey (Q-end)', unit: 'score', targets:[{tier:5,at:'≥ 4.5'},{tier:4,at:'4.0–4.4'},{tier:3,at:'3.5–3.9'},{tier:2,at:'3.0–3.4'},{tier:1,at:'< 3.0'}], locked: false, ticket:'AUTS-18'},
    {id: 'OBJ-INN', name: 'Innovation & Improvement', weight: 10, source: 'Manager rating', unit: 'score', targets:[{tier:5,at:'≥ 4.5'},{tier:4,at:'4.0–4.4'},{tier:3,at:'3.5–3.9'},{tier:2,at:'3.0–3.4'},{tier:1,at:'< 3.0'}], locked: false, ticket:'AUTS-18'},
  ]
};

// ── Data sources ──
const SOURCES = [
  {id:'SRC-CLK', name:'ClockIT', type:'Time tracking', status:'connected', lastSync:'24 min ago', records: 4812, color:'#1A5AA8', ticket:'AUTS-2'},
  {id:'SRC-RMS', name:'Resource Management System', type:'Assignments & capacity', status:'connected', lastSync:'1 hr ago', records: 186, color:'#FF5A00', ticket:'AUTS-3'},
  {id:'SRC-JRA', name:'Jira', type:'Defects & velocity', status:'connected', lastSync:'12 min ago', records: 2841, color:'#0E7C47', ticket:'AUTS-23'},
  {id:'SRC-CSAT',name:'CSAT Survey API', type:'Client satisfaction', status:'warning', lastSync:'6 days ago', records: 24, color:'#AA6A12', ticket:'AUTS-23'},
  {id:'SRC-PM', name:'Project Mgmt (Targets)', type:'Target achievement', status:'connected', lastSync:'3 hrs ago', records: 42, color:'#5A37A8', ticket:'AUTS-5'},
];

// ── Validation issues ──
const VALIDATIONS = [
  {id:'V-001', severity:'warn', source:'ClockIT', title:'Team QA — hours exceed capacity', detail:'13 entries logged above 8h/day threshold in week 4–5.', affected: 'Quality Assurance · 3 members', ticket:'AUTS-6'},
  {id:'V-002', severity:'error', source:'RMS', title:'Missing assignment for 2 projects', detail:'Acme Cloud Migration and ShopRite Commerce have unassigned resource allocations for Sprint 5.', affected: '2 projects', ticket:'AUTS-6'},
  {id:'V-003', severity:'warn', source:'CSAT Survey', title:'Stale data — 6 days old', detail:'Last sync older than 72h SLA. Score will use last known value; refresh before PI close.', affected: 'All teams', ticket:'AUTS-19'},
  {id:'V-004', severity:'info', source:'Jira', title:'Defect density normalised', detail:'Applied framework v2.3 normalisation. 8 raw metrics converted to standardized 1–5 scale.', affected: '8 teams', ticket:'AUTS-17'},
];

const AllData = {Icon, ROLES, PIs, TEAMS, PROJECTS, FRAMEWORK, SOURCES, VALIDATIONS};
Object.assign(window, AllData);
