// theme-vscode.jsx — VS Code 編輯器風
//
// Style notes:
//   - Activity bar + sidebar file tree + tab strip + editor + status bar (full IDE chrome)
//   - the calendar IS a TypeScript file: const today: Almanac = { ... }
//   - syntax highlighting (One Dark Pro palette)
//   - line numbers, gutter, minimap stub
//   - omens are array literals, ✓ comments
//   - tear: tab swap with subtle slide

(function() {
  'use strict';

  const styleId = 'theme-vscode-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tvs-root{
  --tvs-bg:#1e1e1e; --tvs-panel:#252526; --tvs-side:#1e1e1e; --tvs-tab:#2d2d2d; --tvs-tab-active:#1e1e1e;
  --tvs-line:#3a3a3a; --tvs-text:#d4d4d4; --tvs-mute:#858585;
  --tvs-blue:#569cd6; --tvs-cyan:#4ec9b0; --tvs-green:#6a9955; --tvs-yellow:#dcdcaa;
  --tvs-orange:#ce9178; --tvs-purple:#c586c0; --tvs-red:#f48771;
  --tvs-bracket-1:#ffd700; --tvs-bracket-2:#da70d6; --tvs-bracket-3:#179fff;
  --tvs-status:#007acc;
  font-family:'JetBrains Mono','Cascadia Code','SF Mono','Menlo',monospace;
  font-size:13px;color:var(--tvs-text);position:absolute;inset:0;background:var(--tvs-bg);
  overflow:hidden;display:flex;flex-direction:column;
}

.tvs-titlebar{height:28px;background:#3c3c3c;border-bottom:1px solid #232323;
  display:flex;align-items:center;padding:0 12px;color:#cccccc;font-size:11px;flex-shrink:0;letter-spacing:.02em}
.tvs-titlebar .traffic{display:flex;gap:6px;margin-right:14px}
.tvs-titlebar .traffic i{width:12px;height:12px;border-radius:50%;display:block}
.tvs-titlebar .traffic i:nth-child(1){background:#ff5f56}
.tvs-titlebar .traffic i:nth-child(2){background:#ffbd2e}
.tvs-titlebar .traffic i:nth-child(3){background:#27c93f}
.tvs-titlebar .file{flex:1;text-align:center;color:#a0a0a0}

.tvs-body{flex:1;display:flex;min-height:0}

.tvs-activity{width:48px;background:#333333;display:flex;flex-direction:column;align-items:center;
  padding:8px 0;gap:14px;border-right:1px solid #232323;flex-shrink:0;color:#858585}
.tvs-activity .ic{width:24px;height:24px;border-left:2px solid transparent;display:flex;
  align-items:center;justify-content:center;font-size:18px;cursor:pointer}
.tvs-activity .ic.active{color:#fff;border-left-color:#fff}

.tvs-sidebar{width:230px;background:var(--tvs-panel);flex-shrink:0;
  border-right:1px solid #232323;overflow:auto;font-size:12px}
.tvs-sidebar .hd{padding:8px 16px;color:var(--tvs-mute);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;display:flex;justify-content:space-between}
.tvs-tree{padding:0 0 8px}
.tvs-tree .row{padding:2px 16px 2px 12px;display:flex;gap:6px;align-items:center;color:var(--tvs-text);cursor:pointer;font-size:12.5px}
.tvs-tree .row:hover{background:#2a2d2e}
.tvs-tree .row.active{background:#37373d;color:#fff}
.tvs-tree .row .ic{width:14px;font-size:11px;color:#858585;flex-shrink:0;text-align:center}
.tvs-tree .indent{padding-left:24px}
.tvs-tree .indent.d2{padding-left:36px}
.tvs-tree .row .meta{margin-left:auto;color:var(--tvs-mute);font-size:10.5px}
.tvs-tree .group{color:var(--tvs-mute);font-size:11px;padding:6px 16px 2px;text-transform:uppercase;letter-spacing:.1em}

.tvs-main{flex:1;display:flex;flex-direction:column;min-width:0}

.tvs-tabs{height:34px;background:#252526;display:flex;align-items:stretch;
  border-bottom:1px solid #232323;flex-shrink:0;font-size:12px;overflow:hidden}
.tvs-tabs .tab{padding:0 14px;display:flex;align-items:center;gap:8px;color:var(--tvs-mute);
  border-right:1px solid #232323;cursor:pointer;background:#2d2d2d;font-size:12.5px}
.tvs-tabs .tab.active{background:var(--tvs-bg);color:#fff;border-top:1px solid #007acc;padding-top:0}
.tvs-tabs .tab .ic{font-size:11px;color:var(--tvs-blue)}
.tvs-tabs .tab .x{margin-left:6px;color:#666;font-size:14px}
.tvs-tabs .tab.active .x{color:#aaa}
.tvs-tabs .tab.dirty .x::before{content:'●';color:#fff}
.tvs-tabs .right{margin-left:auto;display:flex;align-items:center;color:var(--tvs-mute);padding:0 12px;gap:14px;font-size:13px}

.tvs-breadcrumb{height:24px;display:flex;align-items:center;padding:0 16px;color:var(--tvs-mute);
  font-size:11px;border-bottom:1px solid #232323;flex-shrink:0;gap:6px;letter-spacing:.02em}
.tvs-breadcrumb .sep{color:#555}
.tvs-breadcrumb .sym{color:var(--tvs-yellow);margin-right:4px}

.tvs-editor{flex:1;display:flex;min-height:0;overflow:hidden;position:relative}
.tvs-editor .gutter{width:54px;text-align:right;color:#5a5a5a;font-size:12px;
  padding:8px 8px 8px 0;flex-shrink:0;line-height:1.55;user-select:none;
  border-right:0;background:var(--tvs-bg)}
.tvs-editor .gutter .ln{display:block;padding-right:8px}
.tvs-editor .gutter .ln.cur{color:#fff;background:rgba(255,255,255,.04)}
.tvs-editor .gutter .ln.diag{color:var(--tvs-red)}

.tvs-code{flex:1;overflow:auto;padding:8px 0 8px 6px;line-height:1.55;font-size:13px;
  white-space:pre;tab-size:2}
.tvs-code .row{display:block;padding:0 14px 0 6px;position:relative}
.tvs-code .row.cur{background:rgba(255,255,255,.035)}
.tvs-code .row.fold::before{
  content:'';position:absolute;left:-2px;top:0;bottom:0;width:1px;background:#404040
}

.tvs-minimap{width:90px;background:#1f1f1f;border-left:1px solid #2a2a2a;
  flex-shrink:0;padding:8px 6px;font-size:3px;line-height:1;overflow:hidden;color:#444;opacity:.85;
  white-space:pre;font-family:inherit;}
.tvs-minimap .vp{position:absolute;right:0;width:90px;height:120px;background:rgba(110,110,110,.18);pointer-events:none}

.tvs-status{height:22px;background:var(--tvs-status);color:#fff;display:flex;align-items:center;
  padding:0 10px;font-size:11px;gap:14px;flex-shrink:0;letter-spacing:.02em}
.tvs-status .seg{display:flex;align-items:center;gap:5px;padding:0 4px}
.tvs-status .right{margin-left:auto;display:flex;gap:14px}

/* syntax */
.tk-kw{color:var(--tvs-purple)}      /* const, function, return */
.tk-cn{color:var(--tvs-cyan)}        /* type name */
.tk-pr{color:var(--tvs-blue)}        /* property name */
.tk-st{color:var(--tvs-orange)}      /* string */
.tk-nm{color:var(--tvs-green)}       /* number */
.tk-fn{color:var(--tvs-yellow)}      /* function call */
.tk-cm{color:var(--tvs-green);font-style:italic}  /* comment */
.tk-pn{color:var(--tvs-text)}        /* punctuation default */
.tk-bn{color:#cccccc}                /* boolean */
.tk-b1{color:var(--tvs-bracket-1)}
.tk-b2{color:var(--tvs-bracket-2)}
.tk-b3{color:var(--tvs-bracket-3)}
.tk-vr{color:#9cdcfe}                /* variable */
.tk-warn{color:var(--tvs-red);text-decoration:underline wavy var(--tvs-red);text-underline-offset:3px}

.tvs-controls{position:absolute;bottom:34px;right:18px;display:flex;gap:6px;align-items:center;font-size:11.5px;
  background:#252526;border:1px solid #3c3c3c;padding:6px 8px;z-index:5;border-radius:3px}
.tvs-controls button,.tvs-controls input{
  font-family:inherit;font-size:11.5px;color:var(--tvs-text);background:#3c3c3c;
  border:1px solid #555;padding:4px 10px;cursor:pointer;border-radius:2px;
}
.tvs-controls button:hover{background:#4a4a4a}
.tvs-controls .today{background:#0e639c;color:#fff;border-color:#0e639c}

/* tear: tab content fade/slide */
.tvs-code-host[data-tear]{will-change:transform,opacity}
.tvs-code-host[data-tear="up"]{animation:tvs-up 1s cubic-bezier(.2,0,.2,1)}
.tvs-code-host[data-tear="down"]{animation:tvs-down 1s cubic-bezier(.2,0,.2,1)}
.tvs-code-host[data-tear="left"]{animation:tvs-left 1s cubic-bezier(.2,0,.2,1)}
.tvs-code-host[data-tear="right"]{animation:tvs-right 1s cubic-bezier(.2,0,.2,1)}
.tvs-code-host[data-tear="fold"]{animation:tvs-fold 1s cubic-bezier(.2,0,.2,1)}
@keyframes tvs-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes tvs-down{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:none}}
@keyframes tvs-left{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
@keyframes tvs-right{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}
@keyframes tvs-fold{0%{opacity:0;transform:scaleY(.04)}40%{transform:scaleY(.04)}100%{opacity:1;transform:none}}

@media (max-width:820px){
  .tvs-sidebar{width:160px;font-size:11px}
  .tvs-sidebar .row{padding:2px 12px 2px 10px;font-size:11px}
  .tvs-sidebar .hd{font-size:10px;padding:6px 12px}
  .tvs-activity{width:40px}
  .tvs-editor .gutter{width:40px;font-size:11px}
  .tvs-minimap{width:60px;font-size:2px}
  .tvs-code{font-size:12px}
  .tvs-tabs{font-size:11px}
  .tvs-tabs .tab{padding:0 10px}
  .tvs-breadcrumb{font-size:10px}
  .tvs-controls{bottom:28px;right:14px;font-size:10.5px}
  .tvs-controls button,.tvs-controls input{padding:4px 10px;font-size:10.5px}
  .tvs-root{font-size:12px}
  .tvs-status{font-size:10px}
}
@media (max-width:480px){
  .tvs-sidebar{display:none}
  .tvs-activity{display:none}
  .tvs-tabs{display:none}
  .tvs-breadcrumb{display:none}
  .tvs-minimap{display:none}
  .tvs-editor .gutter{width:32px;font-size:10px}
  .tvs-code{font-size:11px;line-height:1.4;padding:4px 0 4px 4px}
  .tvs-controls{bottom:20px;right:10px;padding:4px 6px;gap:4px;font-size:10px;flex-wrap:wrap}
  .tvs-controls button,.tvs-controls input{padding:3px 8px;font-size:10px}
  .tvs-root{font-size:11px}
  .tvs-status{font-size:9px;gap:8px}
  .tvs-status .seg{gap:3px;padding:0 2px}
  .tvs-titlebar{height:24px;font-size:10px}
}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  function renderText(t) { return window.AlmanacRender.renderText(t); }

  // Helper: build a line with classes; lines is array of (key, jsx)
  function l(...children) { return <span className="row">{children}</span>; }
  // Token factories
  const kw = (t,k) => <span key={k} className="tk-kw">{t}</span>;
  const cn = (t,k) => <span key={k} className="tk-cn">{t}</span>;
  const pr = (t,k) => <span key={k} className="tk-pr">{t}</span>;
  const st = (t,k) => <span key={k} className="tk-st">{t}</span>;
  const nm = (t,k) => <span key={k} className="tk-nm">{t}</span>;
  const fn = (t,k) => <span key={k} className="tk-fn">{t}</span>;
  const cm = (t,k) => <span key={k} className="tk-cm">{t}</span>;
  const pn = (t,k) => <span key={k} className="tk-pn">{t}</span>;
  const vr = (t,k) => <span key={k} className="tk-vr">{t}</span>;
  const bn = (t,k) => <span key={k} className="tk-bn">{t}</span>;
  const bk = (t, lvl, k) => <span key={k} className={`tk-b${lvl}`}>{t}</span>;

  function VSCodeTheme(props) {
    const p = props;
    // Build code-line array
    const lines = [];
    let n = 1;
    const push = (parts, opts={}) => { lines.push({n: n++, parts, ...opts}); };

    push([cm('// ~/nerdy-calendar/src/today.ts')]);
    push([cm('// auto-generated daily — do not edit')]);
    push([]);
    push([kw('import'), pn(' { '), cn('Almanac'), pn(', '), cn('Yi'), pn(', '), cn('Ji'), pn(', '), cn('AuspiciousHour'), pn(' } '), kw('from'), pn(' '), st("'./types'")]);
    push([]);
    push([cm('/** ' + p.weekday + '曜日 · seed=' + (p.year*10000+p.month*100+p.day) + ' */')]);
    push([kw('export const'), pn(' '), vr('today'), pn(': '), cn('Almanac'), pn(' = '), bk('{', 1)]);
    push([pn('  '), pr('iso'), pn(': '), st(`'${p.iso}'`), pn(',           '), cm('// ISO-8601')]);
    push([pn('  '), pr('year'), pn(': '), nm(String(p.year)), pn(', '), pr('month'), pn(': '), nm(String(p.month)), pn(', '), pr('day'), pn(': '), nm(String(p.day)), pn(',')]);
    push([pn('  '), pr('weekday'), pn(': '), st(`'${p.weekday}'`), pn(', '), pr('weekdayIdx'), pn(': '), nm(String(p.weekdayIdx)), pn(',')]);
    push([pn('  '), pr('unix'), pn(':    '), nm(String(p.unix)), pn(',  '), pr('isoWeek'), pn(': '), nm(String(p.iso_week)), pn(', '), pr('doy'), pn(': '), nm(String(p.doy)), pn(',')]);
    if (p.showLunar !== false) {
      push([]);
      push([pn('  '), cm('// — 農曆 / 干支 / 生肖')]);
      push([pn('  '), pr('lunar'), pn(': '), bk('{', 2), pn(' '), pr('y'), pn(': '), nm(String(p.lunar.y)), pn(', '), pr('m'), pn(': '), nm(String(p.lunar.m)), pn(', '), pr('dM'), pn(': '), nm(String(p.lunar.dM)), pn(', '), pr('leap'), pn(': '), bn(p.lunar.leap?'true':'false'), pn(' '), bk('}', 2), pn(',')]);
      push([pn('  '), pr('lunarMonthCN'), pn(': '), st(`'${p.lunarMonthCN}'`), pn(',  '), pr('lunarDayCN'), pn(': '), st(`'${p.lunarDayCN}'`), pn(',')]);
      push([pn('  '), pr('ganzhi'), pn(': '), st(`'${p.ganzhi}'`), pn(', '), pr('zodiac'), pn(': '), st(`'${p.zodiac}'`), pn(', '), pr('chong'), pn(': '), st(`'${p.chong}'`), pn(',')]);
    }
    if (p.showEngChrome !== false) {
      push([]);
      push([pn('  '), cm('// — engineer chrome')]);
      push([pn('  '), pr('engChong'), pn(': '), st(`'${p.engChong}'`), pn(',  '), cm('// ⚠ 沖')]);
      push([pn('  '), pr('engSha'), pn(':   '), st(`'${p.engSha}'`), pn(',  '), cm('// ⚠ 煞')], {diag:true});
    }
    push([]);
    push([pn('  '), pr('yi'), pn(': '), cn('Yi'), pn('[] = '), bk('[', 3)]);
    p.yi.forEach((x, i) => {
      push([pn('    '), bk('{ ', 1), pr('id'), pn(': '), st(`'${x.id}'`), pn(', '), pr('text'), pn(': '), st(`'${x.text.replace(/'/g,"\\'")}'`), pn(' '), bk('}', 1), pn(i < p.yi.length - 1 ? ',' : '')]);
    });
    push([pn('  '), bk('],', 3)]);
    push([]);
    push([pn('  '), pr('ji'), pn(': '), cn('Ji'), pn('[] = '), bk('[', 3)]);
    p.ji.forEach((x, i) => {
      push([pn('    '), bk('{ ', 1), pr('id'), pn(': '), st(`'${x.id}'`), pn(', '), pr('text'), pn(': '), st(`'${x.text.replace(/'/g,"\\'")}'`), pn(' '), bk('}', 1), pn(i < p.ji.length - 1 ? ',' : '')]);
    });
    push([pn('  '), bk('],', 3)]);

    if (p.showEngChrome !== false) {
      push([]);
      push([pn('  '), pr('hours'), pn(': '), cn('AuspiciousHour'), pn('[] = '), bk('[', 3)]);
      p.hours.forEach((h, i) => {
        push([pn('    '), bk('{ ', 1), pr('dz'), pn(': '), st(`'${h.dz}'`), pn(', '), pr('range'), pn(': '), st(`'${h.range}'`), pn(', '), pr('act'), pn(': '), st(`'${h.act}'`), pn(' '), bk('}', 1), pn(i < p.hours.length - 1 ? ',' : '')]);
      });
      push([pn('  '), bk('],', 3)]);
    }

    push([]);
    push([pn('  '), pr('quote'), pn(': '), st(`\`${p.quote.replace(/`/g,'\\`')}\``)]);
    push([bk('}', 1), pn(';')]);
    push([]);
    push([cm(`// $ ./almanac --date=${p.iso}`)]);
    push([cm(`// ✓ compiled in 0.${(p.unix % 89).toString().padStart(2,'0')}s`)]);

    const totalLines = lines.length;
    const errors = p.showEngChrome !== false ? 1 : 0;

    // Build a "minimap" — just a faint scaled-down version of the code (text-only, no syntax)
    const miniText = lines.map(l => '·'.repeat(Math.min(60, Math.floor((l.parts?.length || 0) * 4)))).join('\n');

    return (
      <div className="tvs-root">
        <div className="tvs-titlebar">
          <div className="traffic"><i></i><i></i><i></i></div>
          <div className="file">today.ts — nerdy-calendar — Visual Studio Code</div>
          <div style={{color:'#a0a0a0',fontSize:'11px'}}>—  ☐  ✕</div>
        </div>

        <div className="tvs-body">
          <div className="tvs-activity">
            <div className="ic active" title="Explorer">▤</div>
            <div className="ic" title="Search">⌕</div>
            <div className="ic" title="Source">⎇</div>
            <div className="ic" title="Run">▷</div>
            <div className="ic" title="Ext">▩</div>
          </div>

          <div className="tvs-sidebar">
            <div className="hd">EXPLORER<span>⋯</span></div>
            <div className="tvs-tree">
              <div className="row" style={{fontWeight:600}}><span className="ic">▾</span>📁 NERDY-CALENDAR</div>
              <div className="row indent"><span className="ic">▾</span>📁 src</div>
              <div className="row indent d2"><span className="ic">📄</span>almanac.ts <span className="meta">U</span></div>
              <div className="row indent d2 active"><span className="ic">📄</span>today.ts <span className="meta">M</span></div>
              <div className="row indent d2"><span className="ic">📄</span>types.ts</div>
              <div className="row indent d2"><span className="ic">📄</span>lunar.ts</div>
              <div className="row indent"><span className="ic">▸</span>📁 themes</div>
              <div className="row indent"><span className="ic">▸</span>📁 data</div>
              <div className="row indent"><span className="ic">▸</span>📁 tests</div>
              <div className="row"><span className="ic">📄</span>package.json</div>
              <div className="row"><span className="ic">📄</span>tsconfig.json</div>
              <div className="row"><span className="ic">📄</span>README.md</div>
              <div className="hd" style={{marginTop:'10px'}}>OUTLINE<span>⋯</span></div>
              <div className="row indent"><span className="ic" style={{color:'var(--tvs-purple)'}}>◆</span>today: <span style={{color:'var(--tvs-cyan)',marginLeft:'4px'}}>Almanac</span></div>
              <div className="row indent d2"><span className="ic" style={{color:'var(--tvs-blue)'}}>▾</span>yi: Yi[]</div>
              <div className="row indent d2"><span className="ic" style={{color:'var(--tvs-blue)'}}>▾</span>ji: Ji[]</div>
              <div className="row indent d2"><span className="ic" style={{color:'var(--tvs-blue)'}}>▾</span>hours: AuspiciousHour[]</div>
            </div>
          </div>

          <div className="tvs-main">
            <div className="tvs-tabs">
              <div className="tab"><span className="ic">📄</span>almanac.ts<span className="x">×</span></div>
              <div className="tab active dirty"><span className="ic">📄</span>today.ts<span className="x">●</span></div>
              <div className="tab"><span className="ic">📄</span>types.ts<span className="x">×</span></div>
              <div className="right"><span>⫶⫶⫶</span></div>
            </div>
            <div className="tvs-breadcrumb">
              <span>📁 src</span><span className="sep">›</span>
              <span>📄 today.ts</span><span className="sep">›</span>
              <span><span className="sym">◆</span>today</span><span className="sep">›</span>
              <span>day</span>
            </div>
            <div className="tvs-editor">
              <div className="gutter">
                {lines.map((line, i) => (
                  <span key={i} className={'ln ' + (i === 6 ? 'cur ' : '') + (line.diag ? 'diag' : '')}>{line.n}</span>
                ))}
              </div>
              <div className="tvs-code-host" data-tear={props.phase === 'tearing' ? props.tearKind : null} key={p.iso} style={{flex:1,display:'flex',minWidth:0,position:'relative'}}>
                <div className="tvs-code">
                  {lines.map((line, i) => (
                    <span key={i} className={'row' + (i === 6 ? ' cur' : '')}>
                      {line.parts.length === 0 ? '\n' : <>{line.parts}{'\n'}</>}
                    </span>
                  ))}
                </div>
                <div className="tvs-minimap">{miniText}</div>
              </div>
              <div className="tvs-controls">
                <button onClick={p.onPrev}>← prev</button>
                <input type="date" value={p.iso} onChange={e => p.onPickDate(e.target.value)} />
                <button onClick={p.onNext}>next →</button>
                <button className="today" onClick={p.onToday}>today</button>
              </div>
            </div>
          </div>
        </div>

        <div className="tvs-status">
          <span className="seg">⎇ main*</span>
          <span className="seg">⊕ {p.day} ⊖ 0</span>
          <span className="seg" style={{color:errors? '#ffaa9c':'#fff'}}>{errors? `⚠ ${errors}`:'⚠ 0'} <span style={{marginLeft:'6px'}}>●</span> 0</span>
          <span className="right">
            <span className="seg">Ln {totalLines}, Col 1</span>
            <span className="seg">Spaces: 2</span>
            <span className="seg">UTF-8</span>
            <span className="seg">LF</span>
            <span className="seg">{`{} TypeScript`}</span>
            <span className="seg">⊙ Prettier</span>
          </span>
        </div>
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'vscode',
    label: 'VS Code 編輯器',
    desc: '檔案樹 + tab + 語法高亮，本日資料是一支 .ts 檔案',
    render: VSCodeTheme,
  });
})();
