// ── Teams, Framework, Sources, Validation, Results, Approvals ──
// Relies on globals from data.jsx

const {useState: useStateB, useMemo: useMemoB} = React;

// ════════════════ TEAMS (Team Utilisation) ════════════════
function TeamsScreen({navigate, role}) {
  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>Team Utilisation</h2>
          <div className="subtitle">Aggregate billable hours over capacity · feeds Individual Monthly Utilisation (AUTS-24)</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-2</span>
          <span className="ticket-pill">AUTS-3</span>
          <span className="ticket-pill">AUTS-24</span>
          <button className="btn btn-secondary btn-sm"><Icon name="refresh" size={14}/>Sync now</button>
          <button className="btn btn-secondary btn-sm"><Icon name="download" size={14}/>Export</button>
        </div>
      </div>

      <div className="card" style={{padding:'16px 20px', marginBottom:18}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <div>
            <div style={{fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Organization utilisation</div>
            <div style={{fontSize:26,fontWeight:600,letterSpacing:'-0.02em',marginTop:3}}>82.1%</div>
          </div>
          <div style={{flex:1,marginLeft:24}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text-3)',marginBottom:6}}>
              <span>5,033 billable hrs</span><span>6,120 capacity hrs</span>
            </div>
            <div className="progress-bar" style={{height:10}}><div className="progress-fill orange" style={{width:'82.1%'}}/></div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <span className="chip chip-green"><span className="chip-dot"/>Above org target (80%)</span>
            <span className="chip chip-navy">PI 2026.1</span>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <span className="search-icon"><Icon name="search" size={14}/></span>
          <input className="search-input" placeholder="Search team…"/>
        </div>
        <select className="filter-select"><option>All status</option><option>Above target</option><option>Below target</option></select>
        <select className="filter-select"><option>Monthly view</option><option>Sprint view</option><option>PI view</option></select>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:14}}>
        {TEAMS.map(t => {
          const delta = (t.utilisation - t.target).toFixed(1);
          const above = t.utilisation >= t.target;
          return (
            <div key={t.id} className="card" style={{padding:18}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:14}}>
                <div className="team-avatar" style={{background:t.color,width:38,height:38,fontSize:12,borderRadius:8}}>{t.id.replace('T-','')}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600,letterSpacing:'-0.01em'}}>{t.name}</div>
                  <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{t.members} members · aggregated from ClockIT</div>
                </div>
                {above ? <span className="chip chip-green"><span className="chip-dot"/>On target</span> : <span className="chip chip-amber"><span className="chip-dot"/>Below</span>}
              </div>
              <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:4}}>
                <div style={{fontSize:28,fontWeight:600,letterSpacing:'-0.02em',color:above ? 'var(--text)' : 'var(--amber)'}}>{t.utilisation.toFixed(1)}%</div>
                <div style={{fontSize:12,color: above ? 'var(--green)' : 'var(--amber)',fontWeight:500}}>{above ? '+' : ''}{delta} pts vs target</div>
              </div>
              <div className="progress-bar" style={{marginBottom:14}}>
                <div className={'progress-fill ' + (above ? 'orange' : 'amber')} style={{width:`${Math.min(t.utilisation,100)}%`}}/>
              </div>
              <div style={{display:'flex',gap:18,marginBottom:14}}>
                <div>
                  <div style={{fontSize:10,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Billable</div>
                  <div className="mono" style={{fontSize:14,fontWeight:500,marginTop:2}}>{t.billable}h</div>
                </div>
                <div>
                  <div style={{fontSize:10,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Capacity</div>
                  <div className="mono" style={{fontSize:14,fontWeight:500,marginTop:2}}>{t.capacity}h</div>
                </div>
                <div>
                  <div style={{fontSize:10,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Target</div>
                  <div className="mono" style={{fontSize:14,fontWeight:500,marginTop:2}}>{t.target}%</div>
                </div>
              </div>
              <div>
                <div style={{fontSize:10,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>10-week trend</div>
                <div className="sparkbar">
                  {t.trend.map((v,i) => {
                    const h = Math.max(6, (v / 100) * 32);
                    return <div key={i} className={'sparkbar-col ' + (v >= t.target ? 'fill' : 'medium')} style={{height:h}} title={`Week ${i+1}: ${v}%`}/>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════ FRAMEWORK (Scoring config) ════════════════
function FrameworkScreen({navigate, role}) {
  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>Scoring Framework</h2>
          <div className="subtitle">Standardized objectives and tiers applied across PIs</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-4</span>
          <span className="ticket-pill">AUTS-17</span>
          <span className="ticket-pill">AUTS-18</span>
          {role.perms.configPI && <button className="btn btn-primary btn-sm"><Icon name="edit" size={14}/>Edit framework</button>}
        </div>
      </div>

      <div className="alert alert-navy">
        <Icon name="info" size={15}/>
        <div>
          <div className="alert-title">Framework v2.3 · Active across all PIs</div>
          Changes apply to future PIs only. Closed PIs are immutable. Utilisation &amp; Target Achievement objectives are locked to ensure consistency. <a href="#" style={{color:'var(--navy)',fontWeight:600}}>View change history →</a>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:18}}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">PI Objectives · {FRAMEWORK.objectives.length} total</span>
            <span style={{fontSize:11,color:'var(--text-3)'}}>Weights total: {FRAMEWORK.objectives.reduce((a,o)=>a+o.weight,0)}%</span>
          </div>
          <div>
            {FRAMEWORK.objectives.map((o,i) => (
              <div key={o.id} style={{padding:'16px 18px',borderBottom: i===FRAMEWORK.objectives.length-1 ? 'none' : '1px solid var(--border)'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                  <div style={{width:32,height:32,borderRadius:8,background:'var(--navy)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>{o.id.replace('OBJ-','').slice(0,3)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontSize:14,fontWeight:600}}>{o.name}</span>
                      {o.locked && <span className="chip chip-navy" style={{fontSize:10}}><Icon name="lock" size={10}/>Locked</span>}
                      <span className="ticket-pill">{o.ticket}</span>
                    </div>
                    <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>Source: <b>{o.source}</b> · Unit: {o.unit}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:10,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Weight</div>
                    <div style={{fontSize:18,fontWeight:600,color:'var(--orange)'}}>{o.weight}%</div>
                  </div>
                </div>
                <div style={{display:'flex',gap:0,border:'1px solid var(--border)',borderRadius:6,overflow:'hidden'}}>
                  {o.targets.map((tg,ti) => {
                    const colors = ['var(--green-bg)','#D7EADD','var(--surface-2)','var(--amber-bg)','var(--red-bg)'];
                    const text = ['var(--green)','var(--green)','var(--text-2)','var(--amber)','var(--red)'];
                    return (
                      <div key={ti} style={{flex:1,padding:'8px 10px',background:colors[ti],borderRight: ti<4 ? '1px solid var(--border)' : 'none'}}>
                        <div style={{fontSize:10,fontWeight:600,color:text[ti],textTransform:'uppercase',letterSpacing:'0.04em'}}>Tier {tg.tier}</div>
                        <div className="mono" style={{fontSize:12,fontWeight:500,marginTop:2,color:text[ti]}}>{tg.at}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{marginBottom:14}}>
            <div className="card-header"><span className="card-title">How it computes</span></div>
            <div style={{padding:'14px 18px',fontSize:12,color:'var(--text-2)',lineHeight:1.6}}>
              <div style={{marginBottom:12}}>
                1. Each <b>objective</b> produces a raw metric from its source (ClockIT, Jira, surveys).
              </div>
              <div style={{marginBottom:12}}>
                2. Raw metric is <b>normalized</b> to a 1–5 tier using configured bands.
              </div>
              <div style={{marginBottom:12}}>
                3. Tier × weight &rarr; <b>weighted score</b> per objective.
              </div>
              <div>
                4. Sum of weighted scores = <b>PI Objective Score</b> for the team or PI.
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">Example calculation</span></div>
            <div style={{padding:'12px 18px'}}>
              <div className="breakdown-row"><span className="breakdown-label">Utilisation 86.4%</span><span className="breakdown-val">Tier 4 × 30%</span></div>
              <div className="breakdown-row"><span className="breakdown-label">Target Ach. 98.2%</span><span className="breakdown-val">Tier 4 × 25%</span></div>
              <div className="breakdown-row"><span className="breakdown-label">Quality 0.4</span><span className="breakdown-val">Tier 4 × 20%</span></div>
              <div className="breakdown-row"><span className="breakdown-label">CSAT 4.2</span><span className="breakdown-val">Tier 4 × 15%</span></div>
              <div className="breakdown-row"><span className="breakdown-label">Innovation 3.5</span><span className="breakdown-val">Tier 3 × 10%</span></div>
              <div className="breakdown-row" style={{paddingTop:12}}>
                <span style={{fontWeight:600}}>Team score</span>
                <span className="breakdown-final">3.90</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════ DATA SOURCES ════════════════
function SourcesScreen({navigate, role}) {
  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>Data Sources</h2>
          <div className="subtitle">External integrations that feed the calculator · auto-sync on schedule</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-2</span>
          <span className="ticket-pill">AUTS-3</span>
          <span className="ticket-pill">AUTS-23</span>
          <span className="ticket-pill">AUTS-8</span>
          <button className="btn btn-secondary btn-sm"><Icon name="refresh" size={14}/>Sync all</button>
        </div>
      </div>

      <div className="card" style={{padding:'16px 20px',marginBottom:18,background:'linear-gradient(90deg, #08283B, #0E3651)',color:'#fff',border:'none'}}>
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <div style={{width:44,height:44,borderRadius:10,background:'rgba(255,90,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--orange)'}}>
            <Icon name="sync" size={22}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:600}}>Pipeline healthy · Next scheduled sync in 36 min</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.7)',marginTop:4}}>5 sources · 7,905 records processed today · 99.2% uptime this PI</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={()=>navigate('validation')}>Run validation <Icon name="arrow-right" size={12}/></button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14,marginBottom:14}}>
        {SOURCES.map(s => (
          <div key={s.id} className="card" style={{padding:18}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:14}}>
              <div style={{width:44,height:44,borderRadius:10,background:s.color+'22',display:'flex',alignItems:'center',justifyContent:'center',color:s.color}}>
                <Icon name="link" size={20}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:14,fontWeight:600}}>{s.name}</span>
                  <span className="ticket-pill">{s.ticket}</span>
                </div>
                <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{s.type} · {s.records.toLocaleString()} records</div>
              </div>
              {s.status === 'connected' ? <span className="chip chip-green"><span className="chip-dot"/>Live</span> : <span className="chip chip-amber"><span className="chip-dot"/>Stale</span>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14,padding:'12px 14px',background:'var(--surface-2)',borderRadius:6}}>
              <div>
                <div style={{fontSize:10,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Last sync</div>
                <div style={{fontSize:12,fontWeight:500,marginTop:2}}>{s.lastSync}</div>
              </div>
              <div>
                <div style={{fontSize:10,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Frequency</div>
                <div style={{fontSize:12,fontWeight:500,marginTop:2}}>{s.id === 'SRC-CLK' ? 'Every 15 min' : s.id === 'SRC-CSAT' ? 'Daily @ 02:00' : 'Hourly'}</div>
              </div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-secondary btn-sm" style={{flex:1,justifyContent:'center'}}><Icon name="refresh" size={12}/>Sync</button>
              <button className="btn btn-secondary btn-sm" style={{flex:1,justifyContent:'center'}}><Icon name="settings" size={12}/>Configure</button>
              <button className="btn btn-ghost btn-sm"><Icon name="chart" size={12}/></button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Sync schedule (AUTS-8)</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Source</th><th>Schedule</th><th>Next run</th><th>Avg duration</th><th>Success rate (7d)</th><th></th></tr></thead>
            <tbody>
              {SOURCES.map(s => (
                <tr key={s.id}>
                  <td style={{fontWeight:500}}>{s.name}</td>
                  <td className="muted">{s.id === 'SRC-CLK' ? 'Every 15 min' : s.id === 'SRC-CSAT' ? 'Daily @ 02:00 UTC' : 'Hourly @ :00'}</td>
                  <td className="mono">{s.id === 'SRC-CLK' ? '11:45 AM' : s.id === 'SRC-CSAT' ? '02:00 AM tomorrow' : '12:00 PM'}</td>
                  <td className="mono muted">{s.id === 'SRC-CLK' ? '8.2s' : s.id === 'SRC-JRA' ? '14.6s' : '3.1s'}</td>
                  <td><span className="mono" style={{color:s.status==='connected'?'var(--green)':'var(--amber)',fontWeight:600}}>{s.status==='connected'?'100%':'66%'}</span></td>
                  <td><button className="btn btn-ghost btn-sm">View logs</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ════════════════ VALIDATION ════════════════
function ValidationScreen({navigate, role}) {
  const [running, setRunning] = useStateB(false);

  const errors = VALIDATIONS.filter(v=>v.severity==='error').length;
  const warnings = VALIDATIONS.filter(v=>v.severity==='warn').length;
  const infos = VALIDATIONS.filter(v=>v.severity==='info').length;

  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>Data Validation &amp; Consistency</h2>
          <div className="subtitle">Automated checks ensure inputs are complete and comparable before scoring</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-6</span>
          <span className="ticket-pill">AUTS-19</span>
          <button className="btn btn-primary btn-sm" onClick={()=>{setRunning(true); setTimeout(()=>setRunning(false),1400);}}>
            <Icon name="play" size={14}/>
            {running ? 'Running…' : 'Run all checks'}
          </button>
        </div>
      </div>

      {running && (
        <div className="alert alert-blue">
          <div style={{width:16,height:16,border:'2px solid var(--blue-bg)',borderTopColor:'var(--blue)',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
          <div>Running validation checks across all sources… analyzing 7,905 records.</div>
        </div>
      )}

      <div className="metric-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
        <div className="metric-card">
          <div className="metric-label">Checks run</div>
          <div className="metric-value">42</div>
          <div className="metric-sub">Across 5 sources</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Errors</div>
          <div className="metric-value metric-red">{errors}</div>
          <div className="metric-sub">Block PI scoring</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Warnings</div>
          <div className="metric-value metric-amber">{warnings}</div>
          <div className="metric-sub">Advisory, review</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Informational</div>
          <div className="metric-value metric-green">{38}</div>
          <div className="metric-sub">Checks passed</div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">All issues ({VALIDATIONS.length})</div>
        <div className="tab">Errors ({errors})</div>
        <div className="tab">Warnings ({warnings})</div>
        <div className="tab">Passed (38)</div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {VALIDATIONS.map(v => (
          <div key={v.id} className="card" style={{padding:0}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:14,padding:'14px 18px'}}>
              <div style={{
                width:32,height:32,borderRadius:8,flexShrink:0,
                background: v.severity==='error' ? 'var(--red-bg)' : v.severity==='warn' ? 'var(--amber-bg)' : 'var(--blue-bg)',
                color: v.severity==='error' ? 'var(--red)' : v.severity==='warn' ? 'var(--amber)' : 'var(--blue)',
                display:'flex',alignItems:'center',justifyContent:'center'
              }}>
                {v.severity==='info' ? <Icon name="info" size={16}/> : <Icon name="alert" size={16}/>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                  <span style={{fontSize:14,fontWeight:600}}>{v.title}</span>
                  {v.severity==='error' && <span className="chip chip-red">Error</span>}
                  {v.severity==='warn' && <span className="chip chip-amber">Warning</span>}
                  {v.severity==='info' && <span className="chip chip-blue">Info</span>}
                  <span className="chip chip-gray" style={{fontSize:10}}>{v.source}</span>
                  <span className="ticket-pill">{v.ticket}</span>
                </div>
                <div style={{fontSize:12,color:'var(--text-2)',marginBottom:6}}>{v.detail}</div>
                <div style={{fontSize:11,color:'var(--text-3)'}}>Affected: <b>{v.affected}</b></div>
              </div>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                <button className="btn btn-ghost btn-sm">Ignore</button>
                <button className="btn btn-secondary btn-sm">Resolve →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════ RESULTS (PI Objective Score) ════════════════
function ResultsScreen({navigate, role, openModal}) {
  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>PI Objective Results — PI 2026.1</h2>
          <div className="subtitle">Computed team scores feeding the Utilisation Bonus pool</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-13</span>
          <span className="ticket-pill">AUTS-20</span>
          <span className="ticket-pill">AUTS-25</span>
          <button className="btn btn-secondary btn-sm"><Icon name="download" size={14}/>Export</button>
          {role.perms.approve ? <button className="btn btn-primary btn-sm" onClick={()=>navigate('approvals')}>Review for approval →</button> : <button className="btn btn-primary btn-sm" onClick={()=>navigate('approvals')}>Submit for approval →</button>}
        </div>
      </div>

      <div className="metric-grid" style={{gridTemplateColumns:'2fr 1fr 1fr 1fr'}}>
        <div className="metric-card hero" style={{padding:'20px 22px'}}>
          <div className="metric-label">PI Objective Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:12,marginTop:4,marginBottom:6}}>
            <div style={{fontSize:38,fontWeight:700,letterSpacing:'-0.02em',lineHeight:1}}>3.06</div>
            <div style={{fontSize:14,opacity:0.5}}>/ 5.00 · Target 3.20</div>
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center',marginTop:10}}>
            <span className="chip" style={{background:'rgba(255,90,0,0.2)',color:'#fff'}}>Within 96% of target</span>
            <span style={{fontSize:11,color:'rgba(255,255,255,0.6)'}}>Computed 12 min ago</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg team util</div>
          <div className="metric-value metric-accent">80.7%</div>
          <div className="metric-sub">PI 2025.4: 78.3%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Target Achievement</div>
          <div className="metric-value metric-green">95.2%</div>
          <div className="metric-sub">6 of 6 projects</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Bonus pool</div>
          <div className="metric-value">GHS 142k</div>
          <div className="metric-sub">vs. 150k budget</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:18}}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Team scores · sorted by bonus score</span>
            <div style={{display:'flex',gap:6}}>
              <select className="filter-select"><option>All teams</option></select>
              <select className="filter-select"><option>All tiers</option></select>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Team</th><th>Utilisation</th><th>Target Ach.</th><th>Quality</th><th>CSAT</th><th>Score</th><th>Bonus</th></tr></thead>
              <tbody>
                {TEAMS.map((t,i) => {
                  const score = (3.2 + (t.utilisation - 80) * 0.04 - i * 0.07).toFixed(2);
                  const bonus = Math.round(8000 + parseFloat(score) * 4500);
                  return (
                    <tr key={t.id} className="clickable" onClick={()=>openModal('teamBreakdown', t)}>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div className="team-avatar" style={{background:t.color,width:26,height:26,fontSize:10}}>{t.id.replace('T-','')}</div>
                          <span style={{fontWeight:500,fontSize:13}}>{t.name}</span>
                        </div>
                      </td>
                      <td className="mono">{t.utilisation.toFixed(1)}%</td>
                      <td className="mono">{(90 + i*1.4).toFixed(1)}%</td>
                      <td className="mono">{(0.4 + i*0.05).toFixed(2)}</td>
                      <td className="mono">{(4.5 - i*0.1).toFixed(1)}</td>
                      <td>
                        <span className="mono" style={{fontSize:13,fontWeight:700,color:parseFloat(score)>=3.5?'var(--green)':parseFloat(score)>=3.0?'var(--orange)':'var(--amber)'}}>{score}</span>
                      </td>
                      <td className="mono" style={{fontWeight:600,color:'var(--orange)'}}>GHS {bonus.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="card" style={{marginBottom:14}}>
            <div className="card-header"><span className="card-title">Score distribution</span></div>
            <div style={{padding:'14px 18px'}}>
              {[
                {l:'Tier 5 (≥ 4.0)', n:1, c:'var(--green)', w:12.5},
                {l:'Tier 4 (3.5–3.9)', n:2, c:'var(--orange)', w:25},
                {l:'Tier 3 (3.0–3.4)', n:3, c:'var(--navy)', w:37.5},
                {l:'Tier 2 (2.5–2.9)', n:2, c:'var(--amber)', w:25},
                {l:'Tier 1 (< 2.5)', n:0, c:'var(--red)', w:0},
              ].map((t,i)=>(
                <div key={i} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                    <span style={{color:'var(--text-2)'}}>{t.l}</span>
                    <span className="mono" style={{fontWeight:600}}>{t.n} {t.n===1?'team':'teams'}</span>
                  </div>
                  <div className="progress-bar"><div style={{height:'100%',background:t.c,width:`${t.w}%`,borderRadius:3}}/></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">Monthly utilisation trend</span></div>
            <div style={{padding:'14px 18px'}}>
              <div style={{display:'flex',alignItems:'flex-end',gap:6,height:100,marginBottom:10}}>
                {[76,78,80,79,82,85,86,84,82,81,83,80.7].map((v,i)=>{
                  const h = (v / 100) * 100;
                  return <div key={i} style={{flex:1,height:h,background:i===11?'var(--orange)':'var(--navy)',borderRadius:'3px 3px 0 0',minHeight:6}} title={`${v}%`}/>;
                })}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'var(--text-3)'}}>
                <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
              </div>
              <div style={{marginTop:14,padding:10,background:'var(--surface-2)',borderRadius:6,fontSize:12}}>
                <b>PI 2026.1 average: 80.7%</b> · up 2.4pts vs PI 2025.4
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════ APPROVALS ════════════════
function ApprovalsScreen({navigate, role}) {
  const [selected, setSelected] = useStateB(0);

  const items = [
    {title:'PI 2026.1 — Final PI Objective Scores', from:'HR & Quality', flagged: 1, teams: 8, total: 'GHS 142,400', age:'2 hrs ago', active: true, status: role.perms.approve ? 'Awaiting your review' : 'In review'},
    {title:'PI 2026.1 — Cloud Services team score', from:'Analyst', flagged: 0, teams: 1, total: 'GHS 32,800', age:'1 day ago', status:'Awaiting manager sign-off'},
    {title:'PI 2025.4 — Correction: Data team bonus', from:'HR & Quality', flagged: 0, teams: 1, total: 'GHS 4,100', age:'3 days ago', status:'Returned for revision'},
  ];

  const sel = items[selected];

  return (
    <div>
      <div className="section-hd">
        <div>
          <h2>Approval Queue</h2>
          <div className="subtitle">PI scores must be approved before bonus payout is released</div>
        </div>
        <div className="actions">
          <span className="ticket-pill">AUTS-19</span>
          <span className="chip chip-orange"><span className="chip-dot"/>{items.length} pending</span>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:18, height: 'calc(100vh - 60px - 150px)'}}>
        <div style={{display:'flex',flexDirection:'column',gap:10,overflowY:'auto',paddingRight:4}}>
          {items.map((it, i) => (
            <div key={i} onClick={()=>setSelected(i)} style={{
              background:'var(--surface)',
              border:'1px solid ' + (selected===i ? 'var(--orange)' : 'var(--border)'),
              borderRadius:10,
              padding:14,
              cursor:'pointer',
              boxShadow: selected===i ? '0 0 0 3px rgba(255,90,0,0.1)' : 'var(--shadow-sm)',
              transition:'all 0.15s'
            }}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                <div style={{fontSize:13,fontWeight:600,lineHeight:1.3}}>{it.title}</div>
              </div>
              <div style={{fontSize:11,color:'var(--text-3)',marginBottom:8}}>From {it.from} · {it.age}</div>
              <div style={{display:'flex',gap:14,fontSize:11,color:'var(--text-2)',marginBottom:8}}>
                <span>{it.teams} {it.teams===1?'team':'teams'}</span>
                <span className="mono">{it.total}</span>
              </div>
              {it.flagged > 0 && <span className="chip chip-amber" style={{fontSize:10}}><Icon name="flag" size={10}/>{it.flagged} flagged</span>}
              {it.flagged === 0 && <span className="chip chip-green" style={{fontSize:10}}><span className="chip-dot"/>{it.status}</span>}
            </div>
          ))}
        </div>

        <div className="card" style={{display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)',background:'var(--surface-2)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:14,fontWeight:600}}>{sel.title}</div>
                <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>Submitted by {sel.from} · {sel.age} · {sel.teams} {sel.teams===1?'team':'teams'}</div>
              </div>
              <span className="chip chip-amber"><span className="chip-dot"/>{sel.status}</span>
            </div>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:20}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))',gap:10,marginBottom:18}}>
              <div style={{background:'var(--surface-2)',borderRadius:8,padding:14,textAlign:'center'}}>
                <div style={{fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase'}}>PI Score</div>
                <div style={{fontSize:20,fontWeight:700,color:'var(--orange)',marginTop:3}}>3.06</div>
              </div>
              <div style={{background:'var(--surface-2)',borderRadius:8,padding:14,textAlign:'center'}}>
                <div style={{fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase'}}>Teams</div>
                <div style={{fontSize:20,fontWeight:700,marginTop:3}}>{sel.teams}</div>
              </div>
              <div style={{background:'var(--surface-2)',borderRadius:8,padding:14,textAlign:'center'}}>
                <div style={{fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase'}}>Total bonus</div>
                <div style={{fontSize:20,fontWeight:700,color:'var(--green)',marginTop:3}}>{sel.total}</div>
              </div>
              <div style={{background:'var(--surface-2)',borderRadius:8,padding:14,textAlign:'center'}}>
                <div style={{fontSize:10,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase'}}>Flagged</div>
                <div style={{fontSize:20,fontWeight:700,color:sel.flagged>0?'var(--amber)':'var(--green)',marginTop:3}}>{sel.flagged}</div>
              </div>
            </div>

            {sel.flagged > 0 && (
              <div style={{background:'var(--amber-bg)',border:'1px solid #EED9AA',borderRadius:8,padding:14,marginBottom:18}}>
                <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <Icon name="alert" size={15}/>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--amber)'}}>1 team flagged for review</div>
                    <div style={{fontSize:12,color:'var(--amber)',marginTop:4}}>Web Engineering utilisation 72.4% — below 80% target. Score 2.68 · triggers manager review before payout.</div>
                  </div>
                </div>
              </div>
            )}

            <div style={{fontSize:12,fontWeight:600,color:'var(--text-2)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Team summary</div>
            <table style={{fontSize:12,marginBottom:20}}>
              <thead><tr><th>Team</th><th>Util</th><th>Score</th><th>Bonus</th><th>Flag</th></tr></thead>
              <tbody>
                {TEAMS.slice(0,5).map((t,i) => {
                  const score = (3.2 + (t.utilisation - 80) * 0.04 - i * 0.07).toFixed(2);
                  const bonus = Math.round(8000 + parseFloat(score) * 4500);
                  return (
                    <tr key={t.id}>
                      <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="team-avatar" style={{background:t.color,width:22,height:22,fontSize:9}}>{t.id.replace('T-','')}</div>{t.name}</div></td>
                      <td className="mono">{t.utilisation.toFixed(1)}%</td>
                      <td className="mono" style={{fontWeight:600,color:parseFloat(score)>=3.5?'var(--green)':parseFloat(score)>=3.0?'var(--orange)':'var(--amber)'}}>{score}</td>
                      <td className="mono" style={{color:'var(--orange)',fontWeight:600}}>{bonus.toLocaleString()}</td>
                      <td>{t.name==='Web Engineering' ? <span className="chip chip-amber" style={{fontSize:10}}>Review</span> : <span className="chip chip-green" style={{fontSize:10}}>OK</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{fontSize:12,fontWeight:600,color:'var(--text-2)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Audit trail</div>
            <div style={{fontSize:12,color:'var(--text-2)',display:'flex',flexDirection:'column',gap:6}}>
              <div>• Computed by system at 10:38 AM · framework v2.3 · 7,905 records</div>
              <div>• Validation passed with 2 warnings (dismissed) · 0 errors</div>
              <div>• Submitted by Abena Boateng · 10:45 AM</div>
            </div>
          </div>
          <div style={{padding:14,borderTop:'1px solid var(--border)',background:'var(--surface-2)',display:'flex',gap:10,alignItems:'center'}}>
            <input className="form-input" placeholder="Add a comment (optional)…" style={{flex:1,height:34,fontSize:12}}/>
            {role.perms.approve ? (
              <>
                <button className="btn btn-secondary btn-sm">Return to HR</button>
                <button className="btn btn-primary btn-sm">Approve <Icon name="check" size={12}/></button>
              </>
            ) : (
              <>
                <button className="btn btn-secondary btn-sm">Save draft</button>
                <button className="btn btn-primary btn-sm" disabled>Awaiting Analyst</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {TeamsScreen, FrameworkScreen, SourcesScreen, ValidationScreen, ResultsScreen, ApprovalsScreen});
