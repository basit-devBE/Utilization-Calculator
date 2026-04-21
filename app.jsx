const {useState: useStateM, useEffect: useEffectM} = React;

function TopBar({role, setRole, current, navigate, openModal}) {
  const [showRoles, setShowRoles] = useStateM(false);
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">A</div>
        <div>
          <div className="brand-name">AmaliTech PI Calculator</div>
          <div className="brand-sub">AUTS · Staff Utilisation &amp; PI Scoring</div>
        </div>
      </div>
      <div className="topbar-center">
        <div className="crumbs">
          <span>Workspace</span>
          <span className="crumb-sep">/</span>
          <span>PI 2026.1</span>
          <span className="crumb-sep">/</span>
          <span style={{color:'var(--text)',fontWeight:500}}>{current.title}</span>
        </div>
      </div>
      <div className="topbar-right">
        <button className="iconbtn" onClick={()=>openModal('search')} title="Search"><Icon name="search" size={15}/></button>
        <button className="iconbtn" onClick={()=>openModal('notifications')} title="Notifications" style={{position:'relative'}}>
          <Icon name="bell" size={15}/>
          <span style={{position:'absolute',top:6,right:6,width:6,height:6,borderRadius:'50%',background:'var(--orange)'}}/>
        </button>
        <div style={{width:1,height:22,background:'var(--border)',margin:'0 6px'}}/>
        <div className="role-switch" onClick={()=>setShowRoles(!showRoles)}>
          <div className="role-avatar" style={{background:role.color}}>{role.initials}</div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
            <span style={{fontSize:12,fontWeight:600,lineHeight:1.2}}>{role.name}</span>
            <span style={{fontSize:10,color:'var(--text-3)'}}>{role.label}</span>
          </div>
          <Icon name="chevron-down" size={12}/>
          {showRoles && (
            <div className="role-menu" onClick={e=>e.stopPropagation()}>
              <div style={{padding:'10px 14px',borderBottom:'1px solid var(--border)',fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Switch role (AUTS-7)</div>
              {ROLES.map(r => (
                <div key={r.id} className="role-menu-item" onClick={()=>{setRole(r); setShowRoles(false);}}>
                  <div className="role-avatar" style={{background:r.color,width:28,height:28,fontSize:10}}>{r.initials}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500}}>{r.name}</div>
                    <div style={{fontSize:11,color:'var(--text-3)',marginTop:1}}>{r.label}</div>
                  </div>
                  {r.id === role.id && <Icon name="check" size={14}/>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Sidebar({current, navigate, role}) {
  const sections = [
    {label:'Workspace', items:[
      {id:'dashboard', name:'Dashboard', icon:'home'},
      {id:'pis', name:'Program Increments', icon:'target', badge:'3'},
    ]},
    {label:'Configuration', items:[
      {id:'framework', name:'Scoring Framework', icon:'settings'},
      {id:'projects', name:'Project Targets', icon:'folder'},
      {id:'teams', name:'Team Utilisation', icon:'users'},
    ]},
    {label:'Data & compute', items:[
      {id:'sources', name:'Data Sources', icon:'database', badge: '5'},
      {id:'validation', name:'Validation', icon:'validate', dot:'amber'},
      {id:'results', name:'PI Results', icon:'chart'},
    ]},
    {label:'Governance', items:[
      {id:'approvals', name:'Approvals', icon:'inbox', badge: role.perms.approve ? '3' : null, hot: role.perms.approve},
    ]},
  ];

  return (
    <aside className="sidebar">
      <div style={{padding:'14px 14px 8px'}}>
        <div style={{background:'var(--surface-2)',borderRadius:8,padding:'10px 12px',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:30,height:30,borderRadius:6,background:'var(--orange)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>PI</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:600,lineHeight:1.2}}>PI 2026.1</div>
            <div style={{fontSize:10,color:'var(--text-3)',marginTop:2}}>Jan 6 – Mar 28 · Active</div>
          </div>
          <Icon name="chevron-down" size={12}/>
        </div>
      </div>
      {sections.map((s,i) => (
        <div key={i} style={{marginBottom:6}}>
          <div className="nav-section">{s.label}</div>
          {s.items.map(it => (
            <div key={it.id} className={'nav-item ' + (current.id===it.id ? 'active' : '')} onClick={()=>navigate(it.id)}>
              <Icon name={it.icon} size={15}/>
              <span style={{flex:1}}>{it.name}</span>
              {it.dot && <span style={{width:6,height:6,borderRadius:'50%',background:it.dot==='amber'?'var(--amber)':'var(--red)'}}/>}
              {it.badge && <span className={'nav-badge ' + (it.hot ? 'hot' : '')}>{it.badge}</span>}
            </div>
          ))}
        </div>
      ))}
      <div style={{marginTop:'auto',padding:14}}>
        <div style={{background:'var(--navy)',color:'#fff',borderRadius:10,padding:14,fontSize:11,lineHeight:1.5}}>
          <div style={{fontWeight:600,marginBottom:4,fontSize:12}}>AUTS Epic · In progress</div>
          <div style={{color:'rgba(255,255,255,0.7)'}}>25 child tickets tracked. Last sync with Jira: 12 min ago.</div>
          <div style={{marginTop:8,display:'flex',gap:4,flexWrap:'wrap'}}>
            <span className="ticket-pill" style={{background:'rgba(255,255,255,0.15)',color:'#fff',border:'none'}}>AUTS-1…25</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ═══ Modals ═══
function Modal({title, subtitle, children, onClose, width=560, footer}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{width}}>
        <div className="modal-head">
          <div>
            <div className="modal-title">{title}</div>
            {subtitle && <div className="modal-sub">{subtitle}</div>}
          </div>
          <button className="iconbtn" onClick={onClose}><Icon name="x" size={14}/></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

function TeamBreakdownModal({team, onClose}) {
  const rows = FRAMEWORK.objectives.map((o,i) => {
    const values = [`${team.utilisation.toFixed(1)}%`, '96.8%', '0.42', '4.3', '3.6'];
    const tiers = [4, 4, 4, 4, 3];
    const weighted = (tiers[i] * o.weight / 100).toFixed(2);
    return {name: o.name, unit: o.unit, weight: o.weight, raw: values[i], tier: tiers[i], weighted};
  });
  const total = rows.reduce((a,r)=>a+parseFloat(r.weighted),0).toFixed(2);

  return (
    <Modal title={team.name + ' · Score breakdown'} subtitle={`PI 2026.1 · ${team.members} members · Team ${team.id}`} onClose={onClose} width={720}
      footer={<>
        <div style={{fontSize:12,color:'var(--text-3)'}}>Computed from framework v2.3 · 12 min ago</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-secondary btn-sm">Export PDF</button>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Done</button>
        </div>
      </>}
    >
      <div style={{display:'flex',gap:12,marginBottom:18}}>
        <div style={{flex:1,padding:'14px 16px',background:'var(--surface-2)',borderRadius:8}}>
          <div style={{fontSize:10,color:'var(--text-3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Final score</div>
          <div style={{fontSize:28,fontWeight:700,color:'var(--orange)',marginTop:3}}>{total}</div>
          <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>Tier {Math.round(parseFloat(total))} of 5</div>
        </div>
        <div style={{flex:1,padding:'14px 16px',background:'var(--surface-2)',borderRadius:8}}>
          <div style={{fontSize:10,color:'var(--text-3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Estimated bonus</div>
          <div style={{fontSize:28,fontWeight:700,marginTop:3}}>GHS 22,540</div>
          <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>Split across {team.members} members</div>
        </div>
        <div style={{flex:1,padding:'14px 16px',background:'var(--surface-2)',borderRadius:8}}>
          <div style={{fontSize:10,color:'var(--text-3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Rank</div>
          <div style={{fontSize:28,fontWeight:700,marginTop:3}}>3<span style={{fontSize:14,color:'var(--text-3)',fontWeight:400}}> / 8</span></div>
          <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>Across all teams in PI</div>
        </div>
      </div>

      <div style={{fontSize:11,fontWeight:600,color:'var(--text-2)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Objective breakdown</div>
      <table>
        <thead><tr><th>Objective</th><th>Raw</th><th>Tier</th><th>Weight</th><th>Weighted</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td><div style={{fontWeight:500}}>{r.name}</div><div style={{fontSize:10,color:'var(--text-3)',marginTop:2}}>{r.unit}</div></td>
              <td className="mono">{r.raw}</td>
              <td><span className="chip chip-navy" style={{fontSize:10}}>Tier {r.tier}</span></td>
              <td className="mono">{r.weight}%</td>
              <td className="mono" style={{fontWeight:600,color:'var(--orange)'}}>{r.weighted}</td>
            </tr>
          ))}
          <tr style={{background:'var(--surface-2)'}}>
            <td colSpan="4" style={{fontWeight:600}}>PI Objective Score (sum)</td>
            <td className="mono" style={{fontSize:15,fontWeight:700,color:'var(--orange)'}}>{total}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}

function NewTargetModal({onClose, project}) {
  const editing = !!project;
  return (
    <Modal
      title={editing ? 'Edit project target' : 'Set project target'}
      subtitle="AUTS-5 · Target achievement feeds PI Objective Score"
      onClose={onClose}
      width={540}
      footer={<>
        <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>{editing ? 'Save changes' : 'Create target'}</button>
      </>}
    >
      <div className="form-grid">
        <div className="form-group" style={{gridColumn:'span 2'}}>
          <label className="form-label">Project</label>
          <select className="form-input">
            {PROJECTS.map(p => <option key={p.id} selected={project && p.id===project.id}>{p.id} · {p.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Target hours</label>
          <input className="form-input" type="number" defaultValue={project ? project.targetHours : 400}/>
          <span className="form-hint">Budgeted billable hours</span>
        </div>
        <div className="form-group">
          <label className="form-label">Target completion</label>
          <input className="form-input" type="number" defaultValue="100" suffix="%"/>
          <span className="form-hint">% of scope at PI close</span>
        </div>
        <div className="form-group">
          <label className="form-label">PI</label>
          <select className="form-input"><option>PI 2026.1 (active)</option><option>PI 2026.2 (upcoming)</option></select>
        </div>
        <div className="form-group">
          <label className="form-label">Attached team</label>
          <select className="form-input">{TEAMS.map(t=><option key={t.id} selected={project && t.name===project.team}>{t.name}</option>)}</select>
        </div>
        <div className="form-group" style={{gridColumn:'span 2'}}>
          <label className="form-label">Notes (optional)</label>
          <textarea className="form-textarea" defaultValue="" placeholder="Context for this target, scope assumptions, risks…"/>
        </div>
      </div>
      <div className="alert alert-navy" style={{marginTop:14, marginBottom:0}}>
        <Icon name="info" size={15}/>
        <div style={{fontSize:12}}>Target achievement = <b>actual billable hours / target hours</b>. Tier mapping from framework v2.3.</div>
      </div>
    </Modal>
  );
}

function SearchModal({onClose, navigate}) {
  const items = [
    {label:'Dashboard', id:'dashboard', hint:'PI overview'},
    {label:'Program Increments', id:'pis', hint:'PI-2026.1, PI-2025.4, PI-2025.3'},
    {label:'Create new PI', id:'pi-create', hint:'PI wizard · AUTS-15'},
    {label:'Project targets', id:'projects', hint:'Acme Cloud Migration, Moniepoint Insights…'},
    {label:'Team utilisation', id:'teams', hint:'8 teams tracked'},
    {label:'Scoring framework', id:'framework', hint:'AUTS-4, AUTS-18'},
    {label:'Data validation', id:'validation', hint:'4 checks pending'},
    {label:'Approvals', id:'approvals', hint:'3 pending'},
  ];
  return (
    <div className="modal-backdrop" onClick={onClose} style={{alignItems:'flex-start',paddingTop:100}}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{width:560, borderRadius:12}}>
        <div style={{padding:14, display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--border)'}}>
          <Icon name="search" size={16}/>
          <input autoFocus placeholder="Search PIs, projects, teams, tickets…" style={{flex:1, border:'none', outline:'none', fontSize:14, background:'transparent'}}/>
          <span style={{fontSize:10,color:'var(--text-3)',padding:'2px 6px',background:'var(--surface-2)',borderRadius:4}}>ESC</span>
        </div>
        <div style={{maxHeight:380, overflowY:'auto'}}>
          <div style={{padding:'8px 16px 4px', fontSize:10, color:'var(--text-3)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em'}}>Jump to</div>
          {items.map((i,idx) => (
            <div key={idx} onClick={()=>{navigate(i.id); onClose();}} style={{padding:'10px 16px', display:'flex', alignItems:'center', gap:10, cursor:'pointer', borderLeft:'2px solid transparent'}}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--surface-2)'; e.currentTarget.style.borderLeftColor='var(--orange)';}}
              onMouseLeave={e=>{e.currentTarget.style.background=''; e.currentTarget.style.borderLeftColor='transparent';}}
            >
              <div style={{width:28,height:28,borderRadius:6,background:'var(--surface-2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Icon name="arrow-right" size={12}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500}}>{i.label}</div>
                <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{i.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsModal({onClose}) {
  const notifs = [
    {t:'12 min', icon:'sync', color:'var(--blue)', title:'ClockIT sync complete', body:'187 new time entries ingested for PI 2026.1'},
    {t:'2 hrs', icon:'alert', color:'var(--amber)', title:'Validation warning', body:'CSAT Survey data is 6 days old — refresh source'},
    {t:'3 hrs', icon:'inbox', color:'var(--orange)', title:'Approval request', body:'HR & Quality submitted PI 2026.1 scores for review'},
    {t:'5 hrs', icon:'check', color:'var(--green)', title:'Target updated', body:'Abena B. raised Acme Cloud target to 420h'},
    {t:'Yesterday', icon:'chart', color:'var(--navy)', title:'Monthly scores computed', body:'8 teams scored for Feb 2026 utilisation'},
  ];
  return (
    <Modal title="Notifications" subtitle="Last 5 events · auto-updated" onClose={onClose} width={460}>
      <div style={{marginTop:-6}}>
        {notifs.map((n,i)=>(
          <div key={i} style={{display:'flex',gap:12,padding:'12px 0',borderBottom:i===notifs.length-1?'none':'1px solid var(--border)'}}>
            <div style={{width:32,height:32,borderRadius:8,background:'var(--surface-2)',color:n.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <Icon name={n.icon} size={14}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:500}}>{n.title}</div>
              <div style={{fontSize:12,color:'var(--text-2)',marginTop:2}}>{n.body}</div>
              <div style={{fontSize:10,color:'var(--text-3)',marginTop:4}}>{n.t} ago</div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ═══ Tweaks panel ═══
function TweaksPanel({tweaks, setTweaks, onClose}) {
  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <div>
          <div style={{fontSize:13,fontWeight:600}}>Tweaks</div>
          <div style={{fontSize:10,color:'var(--text-3)',marginTop:2}}>Live design variations</div>
        </div>
        <button className="iconbtn" onClick={onClose}><Icon name="x" size={12}/></button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-group">
          <div className="tweak-label">Accent color</div>
          <div style={{display:'flex',gap:8}}>
            {[
              {k:'orange', c:'#FF5A00', label:'AmaliTech orange'},
              {k:'navy', c:'#0E3651', label:'Deep navy'},
              {k:'green', c:'#2E8B57', label:'Forest green'},
              {k:'violet', c:'#6E56CF', label:'Violet'},
            ].map(a=>(
              <div key={a.k} onClick={()=>setTweaks({...tweaks, accent:a.k})} title={a.label}
                style={{
                  width:34,height:34,borderRadius:8,background:a.c,cursor:'pointer',
                  border: tweaks.accent===a.k ? '3px solid var(--text)' : '3px solid var(--surface)',
                  boxShadow: tweaks.accent===a.k ? '0 0 0 1px var(--text)' : 'var(--shadow-sm)'
                }}/>
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Density</div>
          <div className="tweak-segment">
            {['compact','comfortable','spacious'].map(d=>(
              <button key={d} className={tweaks.density===d ? 'active' : ''} onClick={()=>setTweaks({...tweaks, density:d})}>{d}</button>
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Sidebar</div>
          <div className="tweak-segment">
            <button className={tweaks.sidebar==='expanded' ? 'active' : ''} onClick={()=>setTweaks({...tweaks, sidebar:'expanded'})}>Expanded</button>
            <button className={tweaks.sidebar==='collapsed' ? 'active' : ''} onClick={()=>setTweaks({...tweaks, sidebar:'collapsed'})}>Icons only</button>
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Badge style</div>
          <div className="tweak-segment">
            {['chip','pill','underline'].map(d=>(
              <button key={d} className={tweaks.badgeStyle===d ? 'active' : ''} onClick={()=>setTweaks({...tweaks, badgeStyle:d})}>{d}</button>
            ))}
          </div>
        </div>

        <div className="tweak-group">
          <div className="tweak-label">Ticket pills on pages</div>
          <label className="tweak-toggle">
            <input type="checkbox" checked={tweaks.showTickets} onChange={e=>setTweaks({...tweaks, showTickets: e.target.checked})}/>
            <span>Show AUTS-xx badges</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ═══ ROOT APP ═══
function App() {
  const screens = {
    dashboard:    {id:'dashboard', title:'Dashboard', C: DashboardScreen},
    pis:          {id:'pis', title:'Program Increments', C: PIListScreen},
    'pi-create':  {id:'pi-create', title:'Create PI', C: CreatePIScreen},
    framework:    {id:'framework', title:'Scoring Framework', C: FrameworkScreen},
    projects:     {id:'projects', title:'Project Targets', C: ProjectTargetsScreen},
    teams:        {id:'teams', title:'Team Utilisation', C: TeamsScreen},
    sources:      {id:'sources', title:'Data Sources', C: SourcesScreen},
    validation:   {id:'validation', title:'Validation', C: ValidationScreen},
    results:      {id:'results', title:'PI Results', C: ResultsScreen},
    approvals:    {id:'approvals', title:'Approvals', C: ApprovalsScreen},
  };

  const [screen, setScreen] = useStateM(() => localStorage.getItem('auts_screen') || 'dashboard');
  const [role, setRole] = useStateM(ROLES[0]);
  const [modal, setModal] = useStateM(null);
  const [modalData, setModalData] = useStateM(null);
  const [tweaksOpen, setTweaksOpen] = useStateM(false);

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "orange",
    "density": "comfortable",
    "sidebar": "expanded",
    "badgeStyle": "chip",
    "showTickets": true
  }/*EDITMODE-END*/;
  const [tweaks, setTweaks] = useStateM(TWEAK_DEFAULTS);

  useEffectM(() => {
    const handler = (e) => {
      if (e.data && e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data && e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({type:'__edit_mode_available'},'*');
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffectM(() => {
    window.parent.postMessage({type:'__edit_mode_set_keys', edits: tweaks}, '*');
    const accents = {orange:'#FF5A00', navy:'#0E3651', green:'#2E8B57', violet:'#6E56CF'};
    const accentSofts = {orange:'rgba(255,90,0,0.08)', navy:'rgba(14,54,81,0.08)', green:'rgba(46,139,87,0.08)', violet:'rgba(110,86,207,0.08)'};
    document.documentElement.style.setProperty('--orange', accents[tweaks.accent] || '#FF5A00');
    document.documentElement.style.setProperty('--orange-soft', accentSofts[tweaks.accent] || 'rgba(255,90,0,0.08)');
    document.documentElement.setAttribute('data-density', tweaks.density);
    document.documentElement.setAttribute('data-sidebar', tweaks.sidebar);
    document.documentElement.setAttribute('data-badge', tweaks.badgeStyle);
    document.documentElement.setAttribute('data-tickets', tweaks.showTickets ? 'on' : 'off');
  }, [tweaks]);

  const navigate = (id) => { setScreen(id); localStorage.setItem('auts_screen', id); };
  const openModal = (name, data) => { setModal(name); setModalData(data); };
  const closeModal = () => { setModal(null); setModalData(null); };

  const current = screens[screen] || screens.dashboard;
  const C = current.C;

  return (
    <div className="app-shell">
      <TopBar role={role} setRole={setRole} current={current} navigate={navigate} openModal={openModal}/>
      <div className="app-body">
        <Sidebar current={current} navigate={navigate} role={role}/>
        <main className="main" data-screen-label={current.title}>
          <C navigate={navigate} role={role} openModal={openModal}/>
        </main>
      </div>

      {modal==='teamBreakdown' && <TeamBreakdownModal team={modalData} onClose={closeModal}/>}
      {modal==='newTarget' && <NewTargetModal onClose={closeModal}/>}
      {modal==='editTarget' && <NewTargetModal onClose={closeModal} project={modalData}/>}
      {modal==='search' && <SearchModal onClose={closeModal} navigate={navigate}/>}
      {modal==='notifications' && <NotificationsModal onClose={closeModal}/>}

      {tweaksOpen && <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} onClose={()=>setTweaksOpen(false)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
