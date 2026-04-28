// theme-cyberpunk.jsx — 賽博龐克霓虹 / synthwave-meets-glitch
//
// Style notes:
//   - magenta / cyan / yellow neon over near-black, with subtle CRT scanlines
//   - hand-drawn-ish "INSERT COIN" arcade chrome
//   - large 7-seg-style date with a pulsing aura
//   - omens rendered as competing P1 / P2 leaderboards

(function() {
  'use strict';

  const styleId = 'theme-cyberpunk-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tcb-root{
  --tcb-bg-1:#0a0418; --tcb-bg-2:#1a0833; --tcb-magenta:#ff2bd6; --tcb-cyan:#34f4e7;
  --tcb-yellow:#ffd83a; --tcb-pink:#ff5fa8; --tcb-purple:#7a3dff; --tcb-grid:#3a1565;
  --tcb-text:#f6e8ff; --tcb-mute:#9a76d4; --tcb-glow-c:rgba(52,244,231,.55);
  --tcb-glow-m:rgba(255,43,214,.6);
  font-family:'JetBrains Mono','VT323','SF Mono',monospace;
  color:var(--tcb-text);position:absolute;inset:0;overflow:hidden;
  background:radial-gradient(ellipse at 30% 0%, var(--tcb-bg-2) 0%, var(--tcb-bg-1) 70%);
  display:flex;flex-direction:column;
}
.tcb-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:60;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 1px,transparent 1px 3px);
}
.tcb-root::after{
  content:'';position:absolute;left:0;right:0;bottom:0;height:55%;pointer-events:none;z-index:1;
  background:
    linear-gradient(180deg,transparent 0%,rgba(255,43,214,.06) 60%,rgba(52,244,231,.12) 100%),
    repeating-linear-gradient(180deg,transparent 0 18px,rgba(255,43,214,.18) 18px 19px),
    repeating-linear-gradient(90deg,transparent 0 18px,rgba(52,244,231,.12) 18px 19px);
  mask-image:linear-gradient(180deg,transparent 0%,#000 50%);
  transform:perspective(800px) rotateX(58deg);transform-origin:bottom;
}

.tcb-bar{display:flex;align-items:center;gap:14px;padding:10px 18px;
  background:linear-gradient(90deg,rgba(255,43,214,.12),rgba(52,244,231,.12));
  border-bottom:1px solid rgba(52,244,231,.4);z-index:5;position:relative;flex-shrink:0;
  font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--tcb-cyan);
}
.tcb-bar .logo{font-family:'Press Start 2P','VT323',monospace;font-size:14px;color:var(--tcb-magenta);
  text-shadow:0 0 8px var(--tcb-glow-m),0 0 18px var(--tcb-glow-m)}
.tcb-bar .ip{margin-left:auto;color:var(--tcb-yellow);font-size:11px;letter-spacing:.15em}
.tcb-bar .blip{display:inline-block;width:8px;height:8px;background:var(--tcb-yellow);border-radius:50%;
  box-shadow:0 0 8px var(--tcb-yellow);animation:tcb-blip 1.4s infinite}
@keyframes tcb-blip{50%{opacity:.3}}

.tcb-stage{flex:1;overflow:auto;padding:24px 28px 90px;z-index:3;position:relative;display:flex;flex-direction:column;gap:20px}

.tcb-screen{
  position:relative;border:2px solid var(--tcb-magenta);background:rgba(8,4,20,.7);
  box-shadow:0 0 0 1px rgba(0,0,0,.5),0 0 30px rgba(255,43,214,.25),0 0 60px rgba(255,43,214,.1) inset;
  padding:18px 22px;
}
.tcb-screen::before{
  content:'';position:absolute;inset:-2px;border:2px solid var(--tcb-cyan);
  clip-path:polygon(0 0,12px 0,12px 4px,0 4px,0 100%,12px 100%,12px calc(100% - 4px),100% calc(100% - 4px),100% 100%,calc(100% - 12px) 100%,calc(100% - 12px) calc(100% - 4px),100% calc(100% - 4px),100% 12px,calc(100% - 12px) 12px);
  pointer-events:none;opacity:.3
}
.tcb-screen .corners{position:absolute;inset:0;pointer-events:none}
.tcb-screen .corners i{position:absolute;width:14px;height:14px;border:2px solid var(--tcb-yellow);}
.tcb-screen .corners i:nth-child(1){top:-4px;left:-4px;border-right:none;border-bottom:none}
.tcb-screen .corners i:nth-child(2){top:-4px;right:-4px;border-left:none;border-bottom:none}
.tcb-screen .corners i:nth-child(3){bottom:-4px;left:-4px;border-right:none;border-top:none}
.tcb-screen .corners i:nth-child(4){bottom:-4px;right:-4px;border-left:none;border-top:none}

.tcb-hd{display:flex;align-items:baseline;gap:14px;border-bottom:1px dashed rgba(52,244,231,.3);
  padding-bottom:10px;margin-bottom:14px;font-size:11px;letter-spacing:.18em;color:var(--tcb-cyan);text-transform:uppercase}
.tcb-hd .id{color:var(--tcb-magenta)}
.tcb-hd .id b{font-family:'VT323',monospace;font-size:14px}
.tcb-hd .session{margin-left:auto;color:var(--tcb-yellow)}

.tcb-grid{display:grid;grid-template-columns:auto 1fr 1.2fr;gap:22px;align-items:stretch}

.tcb-meta{display:flex;flex-direction:column;gap:6px;font-size:11.5px;
  border-right:1px dashed rgba(255,43,214,.3);padding-right:16px;color:var(--tcb-mute);min-width:130px}
.tcb-meta .k{color:var(--tcb-cyan);letter-spacing:.1em;text-transform:uppercase;font-size:10px}
.tcb-meta .v{color:var(--tcb-text);font-weight:500}
.tcb-meta .gz{font-size:22px;color:var(--tcb-magenta);text-align:center;
  border:1px solid var(--tcb-magenta);padding:6px;letter-spacing:.18em;font-weight:700;
  text-shadow:0 0 8px var(--tcb-glow-m);margin-bottom:4px;
  background:linear-gradient(180deg,rgba(255,43,214,.05),rgba(255,43,214,.15))}
.tcb-meta .zodiac{font-size:32px;text-align:center;line-height:1;margin:6px 0;color:var(--tcb-yellow);
  text-shadow:0 0 10px rgba(255,216,58,.5)}

.tcb-date{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:4px;position:relative}
.tcb-date::before{
  content:'';position:absolute;inset:-10% -10%;border-radius:50%;
  background:radial-gradient(circle,rgba(255,43,214,.25) 0%,transparent 60%);z-index:-1
}
.tcb-date .ym{color:var(--tcb-yellow);font-size:13px;letter-spacing:.4em;font-weight:600}
.tcb-date .day{font-size:160px;line-height:.85;font-weight:900;
  background:linear-gradient(180deg,var(--tcb-cyan) 0%,var(--tcb-magenta) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 12px var(--tcb-glow-m)) drop-shadow(0 0 4px var(--tcb-glow-c));
  letter-spacing:-.06em;font-family:'VT323','JetBrains Mono',monospace}
.tcb-date .wd{color:var(--tcb-cyan);font-size:14px;letter-spacing:.5em;font-weight:600;margin-top:6px;
  text-shadow:0 0 6px var(--tcb-glow-c)}
.tcb-date .iso{color:var(--tcb-mute);font-size:10.5px;letter-spacing:.1em;margin-top:4px}

.tcb-board{display:flex;flex-direction:column;gap:10px;font-size:12.5px;line-height:1.55;justify-content:center}
.tcb-row{
  display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;
  padding:6px 8px;background:rgba(0,0,0,.45);border:1px solid;
}
.tcb-row.yi{border-color:var(--tcb-cyan);box-shadow:0 0 10px rgba(52,244,231,.18) inset}
.tcb-row.ji{border-color:var(--tcb-magenta);box-shadow:0 0 10px rgba(255,43,214,.2) inset}
.tcb-row .badge{font-family:'Press Start 2P','VT323',monospace;font-size:10px;color:var(--tcb-bg-1);
  padding:5px 8px;letter-spacing:.1em;align-self:start}
.tcb-row.yi .badge{background:var(--tcb-cyan);box-shadow:0 0 8px var(--tcb-glow-c)}
.tcb-row.ji .badge{background:var(--tcb-magenta);color:#fff;box-shadow:0 0 8px var(--tcb-glow-m)}
.tcb-row ul{list-style:none;margin:0;padding:0}
.tcb-row li{padding:1px 0}
.tcb-row.yi li::before{content:'▸ ';color:var(--tcb-cyan)}
.tcb-row.ji li::before{content:'▸ ';color:var(--tcb-magenta)}

.tcb-warn{
  display:flex;gap:14px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--tcb-yellow);background:rgba(255,216,58,.08);border:1px dashed var(--tcb-yellow);
  padding:6px 12px;margin-bottom:14px;animation:tcb-warn-pulse 2s ease-in-out infinite
}
.tcb-warn b{color:var(--tcb-magenta)}
@keyframes tcb-warn-pulse{50%{background:rgba(255,216,58,.16)}}

.tcb-hours{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;padding-top:10px;
  border-top:1px dashed rgba(255,43,214,.3)}
.tcb-hours .h{font-size:11px;color:var(--tcb-text);
  border:1px solid var(--tcb-purple);padding:3px 8px;background:rgba(122,61,255,.15);letter-spacing:.05em}
.tcb-hours .h b{color:var(--tcb-yellow);margin-right:6px}

.tcb-quote{
  border:1px solid var(--tcb-cyan);background:linear-gradient(90deg,rgba(52,244,231,.06),rgba(255,43,214,.06));
  padding:14px 18px;font-size:13px;color:var(--tcb-text);line-height:1.6;
  position:relative;
}
.tcb-quote .lbl{display:block;color:var(--tcb-magenta);font-size:10px;letter-spacing:.25em;
  text-transform:uppercase;margin-bottom:6px;font-weight:700;text-shadow:0 0 4px var(--tcb-glow-m)}
.tcb-quote .txt code{color:var(--tcb-cyan);background:rgba(52,244,231,.12);padding:0 6px;border-radius:2px}

.tcb-controls{display:flex;gap:8px;align-items:center;justify-content:center;font-size:11.5px;
  letter-spacing:.1em;text-transform:uppercase}
.tcb-controls button,.tcb-controls input{
  font-family:inherit;font-size:11.5px;color:var(--tcb-cyan);background:rgba(0,0,0,.5);
  border:1px solid var(--tcb-cyan);padding:7px 14px;cursor:pointer;letter-spacing:.15em;
}
.tcb-controls button:hover{background:rgba(52,244,231,.1);box-shadow:0 0 8px var(--tcb-glow-c)}
.tcb-controls .today{background:var(--tcb-magenta);color:#fff;border-color:var(--tcb-magenta);font-weight:700;
  box-shadow:0 0 8px var(--tcb-glow-m)}
.tcb-controls .today:hover{background:#ff52e0}

/* tear animations */
.tcb-screen[data-tear="up"]{animation:tcb-up 1s ease-out}
.tcb-screen[data-tear="down"]{animation:tcb-down 1s ease-out}
.tcb-screen[data-tear="left"]{animation:tcb-left 1s ease-out}
.tcb-screen[data-tear="right"]{animation:tcb-right 1s ease-out}
.tcb-screen[data-tear="fold"]{animation:tcb-fold 1s ease-out}
@keyframes tcb-up{
  0%{opacity:0;transform:translateY(40px);filter:hue-rotate(180deg) blur(6px)}
  30%{opacity:.6;filter:hue-rotate(60deg) blur(2px)}
  100%{opacity:1;transform:none;filter:none}
}
@keyframes tcb-down{
  0%{opacity:0;transform:translateY(-40px);filter:hue-rotate(-180deg) blur(6px)}
  30%{opacity:.6;filter:hue-rotate(-60deg) blur(2px)}
  100%{opacity:1;transform:none;filter:none}
}
@keyframes tcb-left{
  0%{opacity:0;transform:translateX(60px) skewX(-12deg);filter:hue-rotate(120deg)}
  100%{opacity:1;transform:none;filter:none}
}
@keyframes tcb-right{
  0%{opacity:0;transform:translateX(-60px) skewX(12deg);filter:hue-rotate(-120deg)}
  100%{opacity:1;transform:none;filter:none}
}
@keyframes tcb-fold{
  0%{opacity:0;transform:scaleX(.04);filter:brightness(2.5) hue-rotate(180deg) blur(3px)}
  35%{transform:scaleX(.04);filter:brightness(2.5)}
  100%{opacity:1;transform:scaleX(1);filter:none}
}

@media (max-width:820px){
  .tcb-grid{grid-template-columns:auto 1fr;gap:16px}
  .tcb-meta{border-right:1px dashed rgba(255,43,214,.3)}
  .tcb-date .day{font-size:110px}
  .tcb-date .ym{font-size:11px}
  .tcb-screen{padding:14px 18px}
  .tcb-screen .corners i{width:10px;height:10px}
  .tcb-bar{padding:8px 14px;font-size:10.5px}
  .tcb-stage{padding:18px 20px 70px}
  .tcb-row{font-size:11.5px}
  .tcb-hd{font-size:10.5px}
  .tcb-controls{gap:6px}
  .tcb-controls button,.tcb-controls input{padding:6px 12px;font-size:10.5px}
}
@media (max-width:480px){
  .tcb-grid{grid-template-columns:1fr;gap:12px}
  .tcb-meta{border-right:none;border-bottom:1px dashed rgba(255,43,214,.3);padding-right:0;padding-bottom:12px;min-width:0}
  .tcb-meta .gz{font-size:18px;padding:4px}
  .tcb-meta .zodiac{font-size:24px}
  .tcb-date .day{font-size:90px}
  .tcb-date .ym{font-size:10px;letter-spacing:.2em}
  .tcb-date::before{display:none}
  .tcb-screen{padding:12px 14px}
  .tcb-screen .corners{display:none}
  .tcb-bar{padding:8px 12px;gap:10px;font-size:10px}
  .tcb-bar .logo{display:none}
  .tcb-bar .ip{display:none}
  .tcb-stage{padding:14px 12px 60px;gap:12px}
  .tcb-warn{padding:6px 8px;font-size:10px;flex-wrap:wrap;gap:6px}
  .tcb-hd{font-size:10px;flex-wrap:wrap;gap:6px}
  .tcb-row{padding:4px 6px;font-size:11px}
  .tcb-controls{gap:4px;flex-wrap:wrap}
  .tcb-controls button,.tcb-controls input{padding:5px 10px;font-size:10px}
  .tcb-root::after{display:none}
}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  function renderText(t) { return window.AlmanacRender.renderText(t); }

  function CyberpunkTheme(props) {
    const p = props;
    return (
      <div className="tcb-root">
        <div className="tcb-bar">
          <span className="logo">NERDY//CAL</span>
          <span>SECTOR 8 · NEO-BANQIAO</span>
          <span className="ip">UID:{p.unix} · PING <span className="blip"></span></span>
        </div>
        <div className="tcb-stage">
          {p.showEngChrome !== false && (
            <div className="tcb-warn">
              <span>⚠ <b>HOSTILE.PROC</b> 沖 {p.engChong} · {p.zodiac} CYCLE</span>
              <span>⚠ <b>NULL.ROUTE</b> 煞 {p.engSha}</span>
            </div>
          )}
          <div className="tcb-screen" data-tear={props.phase === 'tearing' ? props.tearKind : null} key={p.iso}>
            <div className="corners"><i></i><i></i><i></i><i></i></div>
            <div className="tcb-hd">
              <span className="id">RUN <b>#{String(p.unix).slice(-6)}</b></span>
              <span>almanac.exe — DAILY.MODE</span>
              <span className="session">SESSION W{String(p.iso_week).padStart(2,'0')} / DOY {p.doy}</span>
            </div>
            <div className="tcb-grid">
              {p.showLunar !== false && (
                <div className="tcb-meta">
                  <div className="gz">{p.ganzhi}</div>
                  <div className="zodiac">{p.zodiac}</div>
                  <div><span className="k">LUNAR</span><br/><span className="v">{p.lunarMonthCN}{p.lunarDayCN}</span></div>
                  <div><span className="k">CHONG</span><br/><span className="v">{p.chong}</span></div>
                  <div><span className="k">UID</span><br/><span className="v">{p.unix}</span></div>
                </div>
              )}
              <div className="tcb-date">
                <div className="ym">{p.year}.{String(p.month).padStart(2,'0')}</div>
                <div className="day">{String(p.day).padStart(2,'0')}</div>
                <div className="wd">{p.weekday}</div>
                <div className="iso">{p.iso} · ISO-W{String(p.iso_week).padStart(2,'0')}</div>
              </div>
              <div className="tcb-board">
                <div className="tcb-row yi">
                  <span className="badge">P1·宜</span>
                  <ul>{p.yi.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
                </div>
                <div className="tcb-row ji">
                  <span className="badge">P2·忌</span>
                  <ul>{p.ji.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
                </div>
                {p.showEngChrome !== false && (
                  <div className="tcb-hours">
                    {p.hours.map(h => (
                      <span className="h" key={h.dz}><b>{h.dz}時</b>{h.range} · {h.act}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="tcb-quote">
            <span className="lbl">// SYSTEM.MOTD</span>
            <span className="txt">{renderText(p.quote)}</span>
          </div>
          <div className="tcb-controls">
            <button onClick={p.onPrev}>◂◂ PREV</button>
            <input type="date" value={p.iso} onChange={e => p.onPickDate(e.target.value)} />
            <button onClick={p.onNext}>NEXT ▸▸</button>
            <button className="today" onClick={p.onToday}>● NOW</button>
          </div>
        </div>
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'cyberpunk',
    label: '賽博龐克霓虹',
    desc: 'synthwave 紫紅+青色，CRT scanlines',
    render: CyberpunkTheme,
  });
})();
