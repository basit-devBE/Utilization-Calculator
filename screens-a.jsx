// ── Dashboard, PI list, PI detail, Create PI, Project Targets ──
// Relies on globals: Icon, ROLES, PIs, TEAMS, PROJECTS, FRAMEWORK, SOURCES, VALIDATIONS

const {useState, useMemo, useEffect} = React;

// ════════════════ DASHBOARD ════════════════
function DashboardScreen({navigate, role, activePI, openModal}) {
  const totalBillable = TEAMS.reduce((a,t)=>a+t.billable, 0);
  const totalCapacity = TEAMS.reduce((a,t)=>a+t.capacity, 0);
  const orgUtil = ((totalBillable / totalCapacity) * 100).toFixed(1);
  const healthyTeams = TEAMS.filter(t=>t.status==='above' || t.status==='at').length;
  const issues = VALIDATIONS.filter(v=>v.severity!=='info').length;

  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>PI 2026.1 Overview</h2>
          <div className="subtitle">Jan 6 – Mar 28 · Sprint 5 of 6 · {TEAMS.length} teams · {PROJECTS.length} active projects</div>
        </div>
        <div className="actions">
          <button className="btn btn-secondary btn-sm" onClick={()=>navigate('validation')}>
            <Icon name="validate" size={14}/>
            Run validation
          </button>
          <button className="btn btn-primary btn-sm" onClick={()=>navigate('results')}>
            <Icon name="chart" size={14}/>
            Compute PI scores
          </button>
        </div>
      </div>

      <div className="alert alert-amber">
        <Icon name="alert" size={15}/>
        <div>
          <div className="alert-title">2 data issues need attention before PI close</div>
          CSAT Survey data is 6 days old · 2 projects have missing RMS assignments. <a href="#" onClick={e=>{e.preventDefault();navigate('validation');}} style={{color:'var(--amber)',fontWeight:600}}>Review all →</a>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-card hero">
          <div className="metric-label">PI Objective Score</div>
          <div className="metric-value">3.06<span style={{fontSize:14,fontWeight:400,opacity:0.5,marginLeft:4}}>/ 5.0</span></div>
          <div className="metric-sub">Target 3.20 · 8 of 14 objectives on track</div>
          <div style={{marginTop:10}}><div className="progress-bar" style={{background:'rgba(255,255,255,0.14)'}}><div className="progress-fill orange" style={{width:`${(3.06/5)*100}%`}}/></div></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Org Utilisation</div>
          <div className="metric-value metric-accent">{orgUtil}%</div>
          <div className="metric-sub">{totalBillable.toLocaleString()} / {totalCapacity.toLocaleString()} billable hrs</div>
          <div style={{marginTop:10}}><div className="progress-bar"><div className="progress-fill orange" style={{width:`${orgUtil}%`}}/></div></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Teams on Target</div>
          <div className="metric-value metric-green">{healthyTeams}<span style={{fontSize:14,color:'var(--text-3)',fontWeight:400}}> / {TEAMS.length}</span></div>
          <div className="metric-sub">{TEAMS.length - healthyTeams} teams below target</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Est. Bonus Pool</div>
          <div className="metric-value">GHS 142k</div>
          <div className="metric-sub">Within 95% of forecast</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:18,marginBottom:18}}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Team utilisation — current PI</span>
            <button className="btn btn-ghost btn-sm" onClick={()=>navigate('teams')}>View all <Icon name="arrow-right" size={12}/></button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Team</th><th>Members</th><th style={{width:200}}>Utilisation</th><th>vs Target</th><th>Status</th></tr></thead>
              <tbody>
                {TEAMS.slice(0,6).map(t=>(
                  <tr key={t.id} className="clickable" onClick={()=>navigate('teams')}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div className="team-avatar" style={{background:t.color}}>{t.id.replace('T-','')}</div>
                        <span style={{fontWeight:500}}>{t.name}</span>
                      </div>
                    </td>
                    <td className="muted">{t.members}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{flex:1}}>
                          <div className="progress-bar"><div className={'progress-fill ' + (t.utilisation >= t.target ? 'navy' : 'amber')} style={{width:`${Math.min(t.utilisation,100)}%`}}/></div>
                        </div>
                        <span className="mono" style={{fontSize:12,fontWeight:600,minWidth:44,textAlign:'right'}}>{t.utilisation.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="mono" style={{color: t.utilisation >= t.target ? 'var(--green)' : 'var(--amber)'}}>
                      {t.utilisation >= t.target ? '+' : ''}{(t.utilisation - t.target).toFixed(1)}pts
                    </td>
                    <td>
                      {t.status === 'above' && <span className="chip chip-green"><span className="chip-dot"/>Above target</span>}
                      {t.status === 'at' && <span className="chip chip-blue"><span className="chip-dot"/>On target</span>}
                      {t.status === 'near' && <span className="chip chip-amber"><span className="chip-dot"/>Near target</span>}
                      {t.status === 'below' && <span className="chip chip-red"><span className="chip-dot"/>Below target</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Data sources</span>
            <span style={{fontSize:11,color:'var(--text-3)'}}>Auto-sync every 1h</span>
          </div>
          <div style={{padding:'4px 0'}}>
            {SOURCES.map(s=>(
              <div key={s.id} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 18px',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:s.color}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,color:'var(--text)',display:'flex',alignItems:'center',gap:6}}>
                    {s.name}
                  </div>
                  <div style={{fontSize:11,color:'var(--text-3)'}}>{s.type} · {s.records.toLocaleString()} records</div>
                </div>
                <div style={{textAlign:'right'}}>
                  {s.status === 'connected' ? <span className="chip chip-green"><span className="chip-dot"/>Live</span> : <span className="chip chip-amber"><span className="chip-dot"/>Stale</span>}
                  <div style={{fontSize:10,color:'var(--text-3)',marginTop:3}}>{s.lastSync}</div>
                </div>
              </div>
            ))}
            <div style={{padding:'10px 18px'}}>
              <button className="btn btn-ghost btn-sm" onClick={()=>navigate('sources')} style={{width:'100%',justifyContent:'center'}}>
                Manage sources → 
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">PI Objective Progress</span>
            <span className="chip chip-orange"><span className="chip-dot"/>3.06 / 3.20 target</span>
          </div>
          <div style={{padding:'16px 18px'}}>
            {FRAMEWORK.objectives.map((o,i) => {
              const score = [3.8, 3.2, 2.9, 3.1, 2.6][i];
              return (
                <div key={o.id} style={{marginBottom:i===FRAMEWORK.objectives.length-1?0:14}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                    <div style={{flex:1,fontSize:13,fontWeight:500}}>{o.name}</div>
                    <span className="chip chip-gray" style={{fontSize:10}}>Weight {o.weight}%</span>
                    <span className="mono" style={{fontSize:13,fontWeight:600,color: score >= 3.5 ? 'var(--green)' : score >= 3.0 ? 'var(--orange)' : 'var(--amber)'}}>{score.toFixed(2)}</span>
                  </div>
                  <div className="progress-bar"><div className={'progress-fill ' + (score >= 3.5 ? '' : score >= 3.0 ? 'orange' : 'amber')} style={{width:`${(score/5)*100}%`}}/></div>
                  <div style={{fontSize:10,color:'var(--text-3)',marginTop:4,display:'flex',gap:8}}>
                    <span>Source: {o.source}</span>
                    <span>·</span>
                    <span>Unit: {o.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent activity</span>
          </div>
          <div style={{padding:'6px 0'}}>
            {[
              {t:'12 min ago', who:'System', what:'Synced ClockIT · 187 new time entries ingested'},
              {t:'1 hr ago', who:'Abena B.', what:'Updated target for Acme Cloud Migration → 420h'},
              {t:'3 hrs ago', who:'System', what:'Validation run passed — 4 warnings recorded'},
              {t:'Yesterday', who:'Kwame A.', what:'Approved scoring framework v2.3 changes'},
              {t:'Yesterday', who:'System', what:'Computed monthly utilisation for 8 teams'},
            ].map((a,i)=>(
              <div key={i} style={{display:'flex',gap:12,padding:'11px 18px',borderBottom: i===4?'none':'1px solid var(--border)',fontSize:12}}>
                <div style={{color:'var(--text-3)',minWidth:66,fontSize:11}}>{a.t}</div>
                <div style={{flex:1}}>
                  <span style={{fontWeight:500,color:'var(--text)'}}>{a.who}</span>
                  <span style={{color:'var(--text-2)',marginLeft:4}}>{a.what}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════ PI LIST ════════════════
function PIListScreen({navigate, role, openModal}) {
  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>Program Increments</h2>
          <div className="subtitle">Configure PIs, attach teams &amp; projects, manage scoring windows</div>
        </div>
        <div className="actions">
          {role.perms.configPI && <button className="btn btn-primary btn-sm" onClick={()=>navigate('pi-create')}><Icon name="plus" size={14}/>New PI</button>}
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <span className="search-icon"><Icon name="search" size={14}/></span>
          <input className="search-input" placeholder="Search PI name or ID…" defaultValue=""/>
        </div>
        <select className="filter-select"><option>All status</option><option>Active</option><option>Closed</option><option>Draft</option></select>
        <select className="filter-select"><option>All years</option><option>2026</option><option>2025</option></select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>PI</th><th>Window</th><th>Teams</th><th>Objectives</th><th>Target</th><th>Current</th><th>Bonus pool</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {PIs.map(p=>(
                <tr key={p.id} className="clickable" onClick={()=>navigate('framework')}>
                  <td>
                    <div style={{fontWeight:600}}>{p.id}</div>
                    <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{p.name.split('—')[1]?.trim() || p.name}</div>
                  </td>
                  <td className="muted" style={{fontSize:12}}>{p.start} → {p.end}<div style={{fontSize:10,color:'var(--text-3)',marginTop:2}}>{p.sprints} sprints</div></td>
                  <td className="mono">{p.teams}</td>
                  <td className="mono">{p.objectives}</td>
                  <td className="mono">{p.targetScore.toFixed(2)}</td>
                  <td className="mono" style={{fontWeight:600,color: p.currentScore==null ? 'var(--text-3)' : p.currentScore >= p.targetScore ? 'var(--green)' : 'var(--amber)'}}>
                    {p.currentScore!=null ? p.currentScore.toFixed(2) : '—'}
                  </td>
                  <td className="mono">{p.bonusPool}</td>
                  <td>
                    {p.status==='active' && <span className="chip chip-orange"><span className="chip-dot"/>Active</span>}
                    {p.status==='closed' && <span className="chip chip-green"><span className="chip-dot"/>Closed</span>}
                    {p.status==='draft' && <span className="chip chip-gray"><span className="chip-dot" style={{background:'var(--text-3)'}}/>Draft</span>}
                  </td>
                  <td><button className="btn btn-ghost btn-sm"><Icon name="chevron-right" size={12}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ════════════════ CREATE PI (modal-style full-page wizard) ════════════════
function CreatePIScreen({navigate, role}) {
  const [step, setStep] = useState(1);
  const [pi, setPi] = useState({
    id: 'PI-2026.2', name: 'PI 2026.2', start: '2026-04-07', end: '2026-06-28', sprints: 6,
    teams: ['T-CLD','T-DAT','T-MOB','T-WEB','T-DES','T-QA','T-DEV'],
    framework: 'standard-v2.3', targetScore: 3.25,
  });

  const steps = [
    {n:1, label:'PI details'},
    {n:2, label:'Teams & projects'},
    {n:3, label:'Scoring framework'},
    {n:4, label:'Review & create'},
  ];

  const toggleTeam = (id) => {
    setPi(p => ({...p, teams: p.teams.includes(id) ? p.teams.filter(x=>x!==id) : [...p.teams, id]}));
  };

  return (
    <div style={{maxWidth: 860, margin: '0 auto'}}>
      <div style={{marginBottom:16}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>navigate('pis')} style={{paddingLeft:4}}>
          <Icon name="chevron-left" size={14}/> Back to PIs
        </button>
      </div>
      <div className="section-hd">
        <div>
          <h2>Create Program Increment</h2>
          <div className="subtitle">AUTS-15 · Configure PI with scoring framework and attached teams</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-15</span>
          <span className="ticket-pill">AUTS-16</span>
        </div>
      </div>

      <div className="card" style={{padding:'20px 26px'}}>
        <div className="stepper">
          {steps.map((s,i) => (
            <React.Fragment key={s.n}>
              <div className={'step ' + (step===s.n ? 'active' : step>s.n ? 'done' : '')}>
                <div className="step-num">{step>s.n ? <Icon name="check" size={12}/> : s.n}</div>
                <div className="step-label">{s.label}</div>
              </div>
              {i < steps.length - 1 && <div className="step-line"/>}
            </React.Fragment>
          ))}
        </div>

        {step===1 && (
          <div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">PI ID</label>
                <input className="form-input" value={pi.id} onChange={e=>setPi({...pi, id:e.target.value})}/>
                <span className="form-hint">Auto-generated; edit if needed</span>
              </div>
              <div className="form-group">
                <label className="form-label">PI Name</label>
                <input className="form-input" value={pi.name} onChange={e=>setPi({...pi, name:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Start date</label>
                <input className="form-input" type="date" value={pi.start} onChange={e=>setPi({...pi, start:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">End date</label>
                <input className="form-input" type="date" value={pi.end} onChange={e=>setPi({...pi, end:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Sprints</label>
                <input className="form-input" type="number" value={pi.sprints} onChange={e=>setPi({...pi, sprints:+e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">PI objective target</label>
                <input className="form-input" type="number" step="0.05" value={pi.targetScore} onChange={e=>setPi({...pi, targetScore:+e.target.value})}/>
                <span className="form-hint">Scale 1–5 · Org benchmark 3.20</span>
              </div>
            </div>
            <div className="form-group" style={{marginTop:14}}>
              <label className="form-label">Description (optional)</label>
              <textarea className="form-textarea" placeholder="Strategic focus for this PI, e.g. 'Scale cloud practice, onboard 2 new clients'…"></textarea>
            </div>
          </div>
        )}

        {step===2 && (
          <div>
            <div className="alert alert-navy" style={{marginBottom:18}}>
              <Icon name="info" size={15}/>
              <div>Teams are pulled from Resource Management System. Select the teams whose utilisation and projects will be measured in this PI. <span className="ticket-pill">AUTS-3</span></div>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:'var(--text-2)',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.06em'}}>Teams ({pi.teams.length} selected)</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
              {TEAMS.map(t => (
                <label key={t.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',border:'1px solid var(--border)',borderRadius:8,cursor:'pointer',background: pi.teams.includes(t.id) ? 'var(--orange-soft)' : 'var(--surface)'}}>
                  <input type="checkbox" checked={pi.teams.includes(t.id)} onChange={()=>toggleTeam(t.id)} style={{width:16,height:16,accentColor:'var(--orange)'}}/>
                  <div className="team-avatar" style={{background:t.color,width:24,height:24,fontSize:9}}>{t.id.replace('T-','')}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500}}>{t.name}</div>
                    <div style={{fontSize:11,color:'var(--text-3)'}}>{t.members} members · cap {t.capacity}h</div>
                  </div>
                </label>
              ))}
            </div>
            <div style={{fontSize:12,fontWeight:600,color:'var(--text-2)',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.06em'}}>Projects auto-attached</div>
            <div style={{background:'var(--surface-2)',borderRadius:8,padding:'12px 14px',fontSize:12,color:'var(--text-2)'}}>
              6 active projects will be pulled from assigned teams. Project-level targets can be configured on the next PI step or on the Projects page.
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{flex:1,fontSize:13,fontWeight:500}}>Apply scoring framework</div>
              <select className="filter-select" value={pi.framework} onChange={e=>setPi({...pi, framework:e.target.value})} style={{height:36,width:300}}>
                <option value="standard-v2.3">Standard PI Scoring Framework v2.3</option>
                <option value="standard-v2.2">Standard PI Scoring Framework v2.2</option>
                <option value="custom">Custom (clone from v2.3)…</option>
              </select>
            </div>

            <div className="card" style={{border:'none',boxShadow:'none'}}>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Objective</th><th>Source</th><th>Weight</th><th>Unit</th><th>Tier 5 (max)</th><th>Tier 1 (min)</th><th></th></tr></thead>
                  <tbody>
                    {FRAMEWORK.objectives.map(o=>(
                      <tr key={o.id}>
                        <td>
                          <div style={{fontWeight:500}}>{o.name}</div>
                          <div style={{fontSize:10,color:'var(--text-3)',marginTop:2}}>{o.id}</div>
                        </td>
                        <td className="muted" style={{fontSize:12}}>{o.source}</td>
                        <td className="mono" style={{fontWeight:600}}>{o.weight}%</td>
                        <td className="muted" style={{fontSize:12}}>{o.unit}</td>
                        <td className="mono" style={{fontSize:11,color:'var(--green)'}}>{o.targets[0].at}</td>
                        <td className="mono" style={{fontSize:11,color:'var(--red)'}}>{o.targets[4].at}</td>
                        <td>{o.locked ? <span className="chip chip-navy"><Icon name="lock" size={10}/>Locked</span> : <span className="chip chip-gray">Editable</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="alert alert-navy" style={{marginTop:14, marginBottom:0}}>
              <Icon name="info" size={15}/>
              <div><b>Framework enforcement.</b> Utilisation and Target Achievement objectives are locked across all PIs to ensure consistency. <span className="ticket-pill">AUTS-4</span> <span className="ticket-pill">AUTS-18</span></div>
            </div>
          </div>
        )}

        {step===4 && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div style={{padding:'14px 16px',background:'var(--surface-2)',borderRadius:8}}>
                <div style={{fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>PI details</div>
                <div style={{fontSize:20,fontWeight:600,margin:'6px 0 2px'}}>{pi.id}</div>
                <div style={{fontSize:13,color:'var(--text-2)'}}>{pi.name}</div>
                <div style={{fontSize:12,color:'var(--text-3)',marginTop:8}}>{pi.start} → {pi.end} · {pi.sprints} sprints</div>
                <div style={{fontSize:12,color:'var(--text-3)',marginTop:2}}>Target score: <b style={{color:'var(--orange)'}}>{pi.targetScore.toFixed(2)} / 5.00</b></div>
              </div>
              <div style={{padding:'14px 16px',background:'var(--surface-2)',borderRadius:8}}>
                <div style={{fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Scope</div>
                <div style={{fontSize:20,fontWeight:600,margin:'6px 0 2px'}}>{pi.teams.length} teams</div>
                <div style={{fontSize:13,color:'var(--text-2)'}}>{TEAMS.filter(t=>pi.teams.includes(t.id)).reduce((a,t)=>a+t.members,0)} people · 6 projects</div>
                <div style={{fontSize:12,color:'var(--text-3)',marginTop:8}}>Framework: Standard v2.3</div>
                <div style={{fontSize:12,color:'var(--text-3)',marginTop:2}}>{FRAMEWORK.objectives.length} objectives applied</div>
              </div>
            </div>
            <div className="alert alert-green" style={{marginTop:16, marginBottom:0}}>
              <Icon name="check" size={15}/>
              <div>
                <div className="alert-title">Ready to create PI</div>
                Data pipelines (ClockIT, RMS, Jira) will begin ingestion for this period automatically. Scores compute continuously and finalize at PI close.
              </div>
            </div>
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-between',marginTop:24,paddingTop:18,borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-secondary" onClick={()=>step===1 ? navigate('pis') : setStep(step-1)}>
            {step===1 ? 'Cancel' : '← Back'}
          </button>
          <div style={{display:'flex',gap:10}}>
            {step<4 ? (
              <button className="btn btn-primary" onClick={()=>setStep(step+1)}>Continue <Icon name="arrow-right" size={14}/></button>
            ) : (
              <button className="btn btn-primary" onClick={()=>navigate('pis')}>Create PI <Icon name="check" size={14}/></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════ PROJECT TARGETS ════════════════
function ProjectTargetsScreen({navigate, role, openModal}) {
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>Project Target Achievement</h2>
          <div className="subtitle">Set and track project-level targets. Achievement feeds into PI scoring.</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-5</span>
          <span className="ticket-pill">AUTS-20</span>
          {role.perms.setTargets && <button className="btn btn-primary btn-sm" onClick={()=>openModal('newTarget')}><Icon name="plus" size={14}/>Set target</button>}
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-label">Active Projects</div>
          <div className="metric-value">{PROJECTS.length}</div>
          <div className="metric-sub">Across 5 teams</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Target Achievement</div>
          <div className="metric-value metric-green">{(PROJECTS.reduce((a,p)=>a+p.targetAchievement,0)/PROJECTS.length).toFixed(1)}%</div>
          <div className="metric-sub">Weighted by project hours</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">On or Above Target</div>
          <div className="metric-value">{PROJECTS.filter(p=>p.targetAchievement>=95).length}<span style={{fontSize:14,color:'var(--text-3)',fontWeight:400}}> / {PROJECTS.length}</span></div>
          <div className="metric-sub">≥ 95% achievement</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">At Risk</div>
          <div className="metric-value metric-red">{PROJECTS.filter(p=>p.health==='red').length}</div>
          <div className="metric-sub">Below 90% achievement</div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <span className="search-icon"><Icon name="search" size={14}/></span>
          <input className="search-input" placeholder="Search project or client…"/>
        </div>
        <select className="filter-select"><option>All teams</option>{TEAMS.map(t=><option key={t.id}>{t.name}</option>)}</select>
        <select className="filter-select"><option>All health</option><option>On track</option><option>At risk</option></select>
        <select className="filter-select"><option>PI 2026.1</option><option>PI 2025.4</option></select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>Team</th><th>Target (hrs)</th><th>Actual (hrs)</th><th style={{width:180}}>Target Achievement</th><th>Completion</th><th>Health</th><th></th></tr></thead>
            <tbody>
              {PROJECTS.map(p => {
                const health = p.targetAchievement >= 95 ? 'green' : p.targetAchievement >= 85 ? 'amber' : 'red';
                return (
                  <tr key={p.id} className="clickable">
                    <td>
                      <div style={{fontWeight:500}}>{p.name}</div>
                      <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{p.client} · {p.id}</div>
                    </td>
                    <td className="muted">{p.team}</td>
                    <td className="mono">{p.targetHours}</td>
                    <td className="mono">{p.actualHours}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{flex:1}}>
                          <div className="progress-bar"><div className={'progress-fill ' + (health==='green'?'':health==='amber'?'amber':'red')} style={{width:`${Math.min(p.targetAchievement,100)}%`}}/></div>
                        </div>
                        <span className="mono" style={{fontSize:12,fontWeight:600,minWidth:52,textAlign:'right',color:health==='green'?'var(--green)':health==='amber'?'var(--amber)':'var(--red)'}}>{p.targetAchievement.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="mono muted">{p.completion}%</td>
                    <td>
                      {p.health==='green' && <span className="chip chip-green"><span className="chip-dot"/>On track</span>}
                      {p.health==='amber' && <span className="chip chip-amber"><span className="chip-dot"/>At risk</span>}
                      {p.health==='red' && <span className="chip chip-red"><span className="chip-dot"/>Behind</span>}
                    </td>
                    <td>
                      {role.perms.setTargets && <button className="btn btn-ghost btn-sm" onClick={(e)=>{e.stopPropagation();openModal('editTarget', p);}}><Icon name="edit" size={12}/></button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {DashboardScreen, PIListScreen, CreatePIScreen, ProjectTargetsScreen});
