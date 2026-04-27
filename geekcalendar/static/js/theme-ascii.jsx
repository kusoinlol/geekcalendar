// theme-ascii.jsx — ASCII / 純字元藝術
//
// Style notes:
//   - everything wrapped in box-drawing characters (╔═╗║╚╝├┤├)
//   - monochrome cream-on-charcoal, like an old DOS docs viewer
//   - giant ASCII-art day number assembled from block characters
//   - omens shown as plain bullet lists with `*` and `!` prefixes
//   - tear: characters dissolve/scramble before settling

(function() {
  'use strict';

  const styleId = 'theme-ascii-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tas-root{
  --tas-bg:#1a1a18; --tas-panel:#1f1f1c; --tas-text:#e8e2c8; --tas-mute:#8a8676;
  --tas-amber:#f0c14b; --tas-red:#e26a5e; --tas-green:#9bc26b; --tas-blue:#7fb6d0;
  font-family:'JetBrains Mono','Cascadia Code','SF Mono','Menlo',monospace;
  color:var(--tas-text);position:absolute;inset:0;background:var(--tas-bg);overflow:hidden;
  display:flex;flex-direction:column;font-size:13px;line-height:1.3;
  letter-spacing:.01em;
}
.tas-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:60;
  background:repeating-linear-gradient(0deg,rgba(232,226,200,.025) 0 1px,transparent 1px 3px);
}

.tas-bar{padding:8px 16px;border-bottom:1px solid #2a2a25;color:var(--tas-mute);
  font-size:11px;flex-shrink:0;display:flex;gap:14px;letter-spacing:.04em}
.tas-bar .label{color:var(--tas-amber)}
.tas-bar .right{margin-left:auto}

.tas-stage{flex:1;overflow:auto;padding:18px 22px 90px;position:relative;display:flex;flex-direction:column;gap:14px}

.tas-page{
  position:relative;border:1px solid #3a3a32;background:var(--tas-panel);
  padding:0;
}

.tas-frame{padding:14px 18px;font-size:13px;line-height:1.45;white-space:pre;color:var(--tas-mute)}
.tas-frame b{color:var(--tas-amber);font-weight:600}
.tas-frame .accent{color:var(--tas-blue)}

.tas-grid{display:grid;grid-template-columns:1.05fr 1.4fr;gap:16px;padding:0 18px 4px}

.tas-day-block pre{
  margin:0;font-size:14.5px;line-height:1;color:var(--tas-amber);font-weight:700;
  text-shadow:0 0 12px rgba(240,193,75,.25);letter-spacing:0;
}
.tas-day-meta{font-size:12px;color:var(--tas-mute);margin-top:14px;padding-top:10px;
  border-top:1px dashed #3a3a32;display:flex;flex-direction:column;gap:3px}
.tas-day-meta .k{color:var(--tas-blue);min-width:88px;display:inline-block}
.tas-day-meta .v{color:var(--tas-text)}

.tas-omens{display:flex;flex-direction:column;gap:14px;font-size:13px}
.tas-omen .hd{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--tas-mute);
  border-bottom:1px dashed #3a3a32;padding-bottom:6px;margin-bottom:6px;letter-spacing:.04em}
.tas-omen.yi .hd{color:var(--tas-green)}
.tas-omen.ji .hd{color:var(--tas-red)}
.tas-omen .hd b{font-size:14px;letter-spacing:.05em;font-weight:700}
.tas-omen ul{list-style:none;margin:0;padding:0}
.tas-omen li{padding:2px 0;color:var(--tas-text);line-height:1.55}
.tas-omen.yi li::before{content:'  *  ';color:var(--tas-green);white-space:pre}
.tas-omen.ji li::before{content:'  !  ';color:var(--tas-red);font-weight:700;white-space:pre}
.tas-omen li code{color:var(--tas-amber);background:rgba(240,193,75,.1);padding:0 4px}

.tas-warn{
  margin:0 18px 6px;padding:6px 10px;border:1px dashed var(--tas-red);
  color:var(--tas-red);font-size:11.5px;letter-spacing:.05em;
  background:rgba(226,106,94,.06);display:flex;gap:18px;flex-wrap:wrap
}
.tas-warn .k{color:var(--tas-amber);margin-right:6px;font-weight:700}

.tas-hours{margin:0 18px;padding:8px 12px;border-top:1px dashed #3a3a32;
  display:flex;gap:14px;flex-wrap:wrap;font-size:11.5px;color:var(--tas-mute)}
.tas-hours .h{color:var(--tas-text)}
.tas-hours .h b{color:var(--tas-amber);margin-right:4px}

.tas-quote{
  margin:0 18px 18px;border:1px solid #3a3a32;padding:12px 14px;font-size:12.5px;
  background:rgba(0,0,0,.25);color:var(--tas-text);line-height:1.6;position:relative;
}
.tas-quote::before{
  content:'> ';color:var(--tas-amber);font-weight:700;position:absolute;left:6px;top:12px
}
.tas-quote .txt{padding-left:14px;display:block}
.tas-quote .lbl{color:var(--tas-amber);font-size:11px;letter-spacing:.05em;display:block;
  padding-left:14px;margin-bottom:4px}
.tas-quote .txt code{color:var(--tas-blue);background:rgba(127,182,208,.1);padding:0 4px}

.tas-controls{display:flex;gap:8px;align-items:center;justify-content:center;font-size:11.5px;
  margin-top:0;padding:0 18px 12px}
.tas-controls button,.tas-controls input{
  font-family:inherit;font-size:11.5px;color:var(--tas-text);background:transparent;
  border:1px solid #3a3a32;padding:5px 12px;cursor:pointer;letter-spacing:.05em;
}
.tas-controls button:hover{background:rgba(232,226,200,.06);border-color:var(--tas-amber);color:var(--tas-amber)}
.tas-controls .today{color:var(--tas-amber);border-color:var(--tas-amber)}

/* tear: char dissolve effect */
.tas-page[data-tear]{animation:tas-scramble 1s steps(8,end)}
@keyframes tas-scramble{
  0%{opacity:0;filter:blur(2px) brightness(2);transform:translateY(-4px);clip-path:inset(0 0 100% 0)}
  20%{clip-path:inset(0 0 80% 0)}
  40%{clip-path:inset(0 0 60% 0);filter:blur(1px) brightness(1.5)}
  60%{clip-path:inset(0 0 30% 0);filter:none}
  100%{opacity:1;clip-path:inset(0);transform:none}
}
.tas-page[data-tear="up"]{animation-name:tas-up}
.tas-page[data-tear="down"]{animation-name:tas-down}
.tas-page[data-tear="left"]{animation-name:tas-left}
.tas-page[data-tear="right"]{animation-name:tas-right}
.tas-page[data-tear="fold"]{animation-name:tas-fold}
@keyframes tas-up{0%{opacity:0;clip-path:inset(0 0 100% 0)}100%{opacity:1;clip-path:inset(0)}}
@keyframes tas-down{0%{opacity:0;clip-path:inset(100% 0 0 0)}100%{opacity:1;clip-path:inset(0)}}
@keyframes tas-left{0%{opacity:0;clip-path:inset(0 0 0 100%)}100%{opacity:1;clip-path:inset(0)}}
@keyframes tas-right{0%{opacity:0;clip-path:inset(0 100% 0 0)}100%{opacity:1;clip-path:inset(0)}}
@keyframes tas-fold{
  0%{opacity:0;transform:scaleY(.04);filter:brightness(2)}
  35%{transform:scaleY(.04);filter:brightness(2)}
  100%{opacity:1;transform:scaleY(1);filter:none}
}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  // Block-style numerals 5 lines × 4 cols, only `█` and ` ` for guaranteed
  // monospace alignment (box-drawing chars rendered uneven widths in some fonts).
  const DIGITS = {
    '0': ['████','█  █','█  █','█  █','████'],
    '1': [' ██ ','███ ',' ██ ',' ██ ','████'],
    '2': ['███ ','   █',' ██ ','█   ','████'],
    '3': ['███ ','   █',' ██ ','   █','███ '],
    '4': ['█  █','█  █','████','   █','   █'],
    '5': ['████','█   ','███ ','   █','███ '],
    '6': [' ███','█   ','███ ','█  █',' ██ '],
    '7': ['████','   █','  █ ',' █  ','█   '],
    '8': [' ██ ','█  █',' ██ ','█  █',' ██ '],
    '9': [' ██ ','█  █',' ███','   █','███ '],
  };
  function asciiDay(n) {
    const s = String(n).padStart(2, '0');
    const lines = ['', '', '', '', ''];
    for (const ch of s) {
      const block = DIGITS[ch];
      for (let i = 0; i < 5; i++) lines[i] += block[i] + '  ';
    }
    return lines.join('\n');
  }

  function renderText(t) { return window.AlmanacRender.renderText(t); }

  function AsciiTheme(props) {
    const p = props;
    const cb = (s, n) => '─'.repeat(n - s.length);
    const titleBar = `╔═══[ NERDY-CAL v1.0 ]${cb('═[ NERDY-CAL v1.0 ]═', 56)}═══╗`;
    return (
      <div className="tas-root">
        <div className="tas-bar">
          <span className="label">FILE</span><span>almanac.txt</span>
          <span className="label">FORMAT</span><span>UTF-8 BOX</span>
          <span className="label">SIZE</span><span>78 cols</span>
          <span className="right">ESC=quit  ←/→=nav</span>
        </div>
        <div className="tas-stage">
          <div className="tas-page" data-tear={props.phase === 'tearing' ? props.tearKind : null} key={p.iso}>
            <div className="tas-frame">{`╔══════════════════════════════════════════════════════════════════════════╗
║   `}<b>NERDY ALMANAC</b>{`   ┃  ${p.iso}  ┃  ${p.weekday}曜  ┃  W${String(p.iso_week).padStart(2,'0')}/DOY${p.doy}        ║
╠══════════════════════════════════════════════════════════════════════════╣`}</div>

            {p.showEngChrome !== false && (
              <div className="tas-warn">
                <span><span className="k">! WARN</span>沖 {p.engChong} ({p.zodiac}年 {p.lunar.y})</span>
                <span><span className="k">! CRIT</span>煞 {p.engSha}</span>
              </div>
            )}

            <div className="tas-grid">
              <div className="tas-day-block">
                <div style={{fontSize:'11px',color:'var(--tas-mute)',marginBottom:'8px',letterSpacing:'.1em'}}>
                  ── {p.year}.{String(p.month).padStart(2,'0')} ──────────────
                </div>
                <pre>{asciiDay(p.day)}</pre>
                {p.showLunar !== false && (
                  <div className="tas-day-meta">
                    <div><span className="k">[lunar]</span><span className="v">{p.lunarMonthCN}{p.lunarDayCN}</span></div>
                    <div><span className="k">[ganzhi]</span><span className="v">{p.ganzhi}</span></div>
                    <div><span className="k">[zodiac]</span><span className="v">{p.zodiac}年</span></div>
                    <div><span className="k">[chong]</span><span className="v">{p.chong}</span></div>
                    <div><span className="k">[unix]</span><span className="v">{p.unix}</span></div>
                  </div>
                )}
              </div>
              <div className="tas-omens">
                <div className="tas-omen yi">
                  <div className="hd">┌──[ <b>YI · 宜</b> ]──── SHOULD ─────────────────────┐</div>
                  <ul>{p.yi.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
                </div>
                <div className="tas-omen ji">
                  <div className="hd">┌──[ <b>JI · 忌</b> ]──── AVOID ──────────────────────┐</div>
                  <ul>{p.ji.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
                </div>
              </div>
            </div>

            {p.showEngChrome !== false && (
              <div className="tas-hours">
                <span style={{color:'var(--tas-blue)',fontWeight:600}}>├── HOURS ──</span>
                {p.hours.map(h => (
                  <span className="h" key={h.dz}><b>{h.dz}時</b>{h.range} → {h.act}</span>
                ))}
              </div>
            )}

            <div className="tas-quote">
              <span className="lbl">$ fortune | cowsay</span>
              <span className="txt">{renderText(p.quote)}</span>
            </div>

            <div className="tas-controls">
              <button onClick={p.onPrev}>← prev</button>
              <input type="date" value={p.iso} onChange={e => p.onPickDate(e.target.value)} />
              <button onClick={p.onNext}>next →</button>
              <button className="today" onClick={p.onToday}>[today]</button>
            </div>

            <div className="tas-frame" style={{padding:'2px 18px 12px'}}>{`╚══════════════════════════════════════════════════════════════════════════╝`}</div>
          </div>
        </div>
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'ascii',
    label: 'ASCII 純字元',
    desc: '一切都用 box-drawing 字元組合的 manpage 風',
    render: AsciiTheme,
  });
})();
