// theme-terminal.jsx — 深色終端機 / hacker noir

(function() {
  'use strict';

  const styleId = 'theme-terminal-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tt-root{
  --tt-bg:#0a0e0a; --tt-panel:#0e1410; --tt-line:#1a2820;
  --tt-green:#7afc6e; --tt-green-dim:#3aa848; --tt-amber:#f4b942;
  --tt-red:#ff4f4f; --tt-cyan:#69d6e0; --tt-mute:#4a6a55; --tt-text:#cfe8d2;
  font-family:'JetBrains Mono','SF Mono','Menlo',monospace;
  color:var(--tt-text);position:absolute;inset:0;background:var(--tt-bg);
  display:flex;flex-direction:column;overflow:hidden;
}
.tt-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:50;
  background:repeating-linear-gradient(0deg,rgba(122,252,110,.025) 0 1px,transparent 1px 3px);
}
.tt-root::after{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:51;
  background:radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,.55) 100%);
}
.tt-bar{display:flex;align-items:center;padding:8px 14px;
  border-bottom:1px solid var(--tt-line);background:#070a07;color:var(--tt-green-dim);
  font-size:12px;gap:14px;flex-shrink:0;letter-spacing:.05em;z-index:2;position:relative}
.tt-bar .dots{display:flex;gap:6px}
.tt-bar .dots i{width:11px;height:11px;border-radius:50%;display:block}
.tt-bar .dots i:nth-child(1){background:#ff5f56}
.tt-bar .dots i:nth-child(2){background:#ffbd2e}
.tt-bar .dots i:nth-child(3){background:#27c93f}
.tt-bar .title{flex:1;text-align:center;color:var(--tt-text);opacity:.65}
.tt-bar .meta{color:var(--tt-mute);font-size:11px}
.tt-stage{flex:1;overflow:auto;padding:18px 22px 90px;z-index:2;position:relative}
.tt-prompt{color:var(--tt-green);font-size:13px;margin-bottom:10px;display:flex;gap:0;align-items:center;flex-wrap:wrap}
.tt-prompt .user{color:var(--tt-cyan)}
.tt-prompt .at{color:var(--tt-mute)}
.tt-prompt .host{color:var(--tt-amber)}
.tt-prompt .path{color:var(--tt-green-dim)}
.tt-prompt .cmd{color:var(--tt-text);margin-left:8px}
.tt-prompt .blink{display:inline-block;width:8px;height:14px;background:var(--tt-green);
  margin-left:6px;animation:tt-blink 1s steps(1) infinite;vertical-align:-2px}
@keyframes tt-blink{50%{opacity:0}}

.tt-window{
  border:1px solid var(--tt-green-dim);background:var(--tt-panel);
  margin-bottom:14px;font-size:12.5px;
  box-shadow:0 0 0 1px rgba(122,252,110,.08),0 0 24px rgba(122,252,110,.06) inset;
}
.tt-window .hd{display:flex;align-items:center;gap:8px;padding:6px 10px;
  background:rgba(122,252,110,.08);border-bottom:1px solid var(--tt-line);
  color:var(--tt-green);font-size:11px;letter-spacing:.1em;text-transform:uppercase}
.tt-window .hd .id{color:var(--tt-mute);margin-left:auto;font-size:10.5px;letter-spacing:0}
.tt-window .body{padding:14px 16px}

.tt-grid{display:grid;grid-template-columns:auto 1fr 1.3fr;gap:18px;align-items:stretch}
.tt-aside{display:flex;flex-direction:column;gap:8px;font-size:11.5px;
  border-right:1px dashed var(--tt-line);padding-right:14px;color:var(--tt-mute);min-width:130px}
.tt-aside .k{color:var(--tt-amber)}
.tt-aside .v{color:var(--tt-text)}
.tt-aside .gz{color:var(--tt-red);font-size:18px;font-weight:700;letter-spacing:.1em;
  border:1px solid var(--tt-red);padding:6px 10px;text-align:center;margin-bottom:4px;
  text-shadow:0 0 8px rgba(255,79,79,.4)}

.tt-date{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:2px}
.tt-date .ym{color:var(--tt-amber);font-size:14px;letter-spacing:.1em}
.tt-date .day{font-size:140px;line-height:.95;color:var(--tt-green);
  font-weight:700;text-shadow:0 0 20px rgba(122,252,110,.5),0 0 40px rgba(122,252,110,.2);
  font-family:'JetBrains Mono',monospace;letter-spacing:-.04em}
.tt-date .wd{color:var(--tt-cyan);font-size:14px;letter-spacing:.5em;
  border-top:1px solid var(--tt-green-dim);padding-top:6px;margin-top:4px}
.tt-date .iso{color:var(--tt-mute);font-size:10.5px;letter-spacing:.1em;margin-top:6px}

.tt-omens{display:flex;flex-direction:column;gap:14px;font-size:12.5px;line-height:1.6;justify-content:center}
.tt-omen{display:flex;gap:10px;align-items:flex-start}
.tt-omen .tag{flex:0 0 auto;color:var(--tt-bg);font-weight:900;font-size:11px;
  padding:3px 7px;border-radius:2px;letter-spacing:.1em;margin-top:2px}
.tt-omen.yi .tag{background:var(--tt-green)}
.tt-omen.ji .tag{background:var(--tt-red);color:#fff}
.tt-omen ul{list-style:none;padding:0;margin:0}
.tt-omen li{padding:1px 0}
.tt-omen.yi li::before{content:'+ ';color:var(--tt-green);font-weight:900}
.tt-omen.ji li::before{content:'- ';color:var(--tt-red);font-weight:900}

.tt-hours{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;padding-top:8px;
  border-top:1px dashed var(--tt-line)}
.tt-hours .h{font-size:11px;color:var(--tt-text);
  border:1px solid var(--tt-line);padding:3px 8px;background:rgba(0,0,0,.4)}
.tt-hours .h b{color:var(--tt-amber);font-weight:600;margin-right:4px}

.tt-chong{font-size:11.5px;color:var(--tt-mute);display:flex;gap:14px;
  padding:6px 12px;background:rgba(255,79,79,.08);border:1px solid rgba(255,79,79,.25);
  margin-bottom:10px}
.tt-chong b{color:var(--tt-red);margin-right:6px}

.tt-quote{
  border:1px solid var(--tt-amber);background:rgba(244,185,66,.06);
  padding:10px 14px;font-size:12.5px;color:var(--tt-text);line-height:1.6;
  position:relative;
}
.tt-quote .lbl{color:var(--tt-amber);font-size:10.5px;letter-spacing:.15em;
  text-transform:uppercase;margin-bottom:4px;display:block}
.tt-quote .txt code{color:var(--tt-cyan);background:rgba(105,214,224,.1);padding:0 4px;border-radius:2px}

.tt-toolbar{position:fixed;display:none}
.tt-controls{display:flex;gap:6px;align-items:center;font-size:11.5px;
  padding-top:8px;color:var(--tt-mute)}
.tt-controls button,.tt-controls input[type=date]{
  font-family:inherit;font-size:11.5px;color:var(--tt-green);background:#0a0a0a;
  border:1px solid var(--tt-green-dim);padding:5px 10px;cursor:pointer;letter-spacing:.05em;
}
.tt-controls button:hover{background:rgba(122,252,110,.1)}
.tt-controls .today{background:var(--tt-green);color:var(--tt-bg);border-color:var(--tt-green);font-weight:700}

.tt-page-old{position:absolute;inset:0;animation:tt-glitch 1s ease-out forwards}
@keyframes tt-glitch{
  0%{opacity:1;clip-path:inset(0 0 0 0);transform:translate(0,0)}
  20%{transform:translate(-2px,1px);clip-path:inset(20% 0 30% 0)}
  40%{transform:translate(3px,-2px);clip-path:inset(50% 0 10% 0)}
  60%{transform:translate(-1px,2px);clip-path:inset(0 0 70% 0)}
  100%{opacity:0;transform:translate(0,-10px)}
}
.tt-window[data-tear="up"]{animation:tt-typein-up .8s ease-out}
.tt-window[data-tear="down"]{animation:tt-typein-down .8s ease-out}
.tt-window[data-tear="left"]{animation:tt-typein-left .8s ease-out}
.tt-window[data-tear="right"]{animation:tt-typein-right .8s ease-out}
.tt-window[data-tear="fold"]{animation:tt-typein-fold 1s ease-out}
.tt-page-new{animation:tt-typein .8s ease-out}
@keyframes tt-typein{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
@keyframes tt-typein-up{
  0%{opacity:0;transform:translateY(20px);clip-path:inset(0 0 100% 0)}
  40%{clip-path:inset(0 0 60% 0);filter:hue-rotate(120deg)}
  100%{opacity:1;transform:translateY(0);clip-path:inset(0)}
}
@keyframes tt-typein-down{
  0%{opacity:0;transform:translateY(-20px);clip-path:inset(100% 0 0 0)}
  40%{clip-path:inset(60% 0 0 0);filter:hue-rotate(-90deg)}
  100%{opacity:1;transform:translateY(0);clip-path:inset(0)}
}
@keyframes tt-typein-left{
  0%{opacity:0;transform:translateX(40px) skewX(-8deg);clip-path:inset(0 0 0 100%)}
  40%{clip-path:inset(0 0 0 40%);filter:hue-rotate(60deg)}
  100%{opacity:1;transform:none;clip-path:inset(0)}
}
@keyframes tt-typein-right{
  0%{opacity:0;transform:translateX(-40px) skewX(8deg);clip-path:inset(0 100% 0 0)}
  40%{clip-path:inset(0 40% 0 0);filter:hue-rotate(-60deg)}
  100%{opacity:1;transform:none;clip-path:inset(0)}
}
@keyframes tt-typein-fold{
  0%{opacity:0;transform:scaleY(.04);filter:brightness(2) blur(2px)}
  35%{transform:scaleY(.04);filter:brightness(2) blur(2px)}
  100%{opacity:1;transform:scaleY(1);filter:none}
}

.tt-code-line{color:var(--tt-mute);font-size:11px;padding:6px 12px;
  border-top:1px solid var(--tt-line);background:#070a07;display:flex;gap:14px}
.tt-code-line span b{color:var(--tt-green);margin-right:6px}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  function renderText(text) {
    return window.AlmanacRender.renderText(text);
  }

  function TerminalTheme(props) {
    const p = props;
    return (
      <div className="tt-root">
        <div className="tt-bar">
          <div className="dots"><i></i><i></i><i></i></div>
          <div className="title">~/nerdy-calendar — almanac --date={p.iso}</div>
          <div className="meta">zsh · 80×24</div>
        </div>
        <div className="tt-stage">
          <div className="tt-prompt">
            <span className="user">dev</span><span className="at">@</span>
            <span className="host">prod-box</span>:<span className="path">~/calendar</span>
            <span className="cmd">$ ./almanac --date={p.iso} --stack {p.zodiac}</span>
            <span className="blink"></span>
          </div>

          <div className="tt-window" data-tear={props.phase === 'tearing' ? props.tearKind : null} key={p.iso}>
            <div className="hd"><span>📅 daily.report</span><span className="id">[seed: {p.year*10000+p.month*100+p.day}]</span></div>
            <div className="body">
              {p.showEngChrome !== false && (
                <div className="tt-chong">
                  <span><b>WARN:</b>沖 {p.engChong}（{p.zodiac}年，{p.lunar.y}）</span>
                  <span><b>CRIT:</b>煞 {p.engSha}</span>
                </div>
              )}
              <div className="tt-grid">
                {props.showLunar !== false && (
                  <div className="tt-aside">
                    <div className="gz">{p.ganzhi}</div>
                    <div><span className="k">lunar:</span> <span className="v">{p.lunarMonthCN}{p.lunarDayCN}</span></div>
                    <div><span className="k">zodiac:</span> <span className="v">{p.zodiac}</span></div>
                    <div><span className="k">unix:</span> <span className="v">{p.unix}</span></div>
                    <div><span className="k">iso_week:</span> <span className="v">W{String(p.iso_week).padStart(2,'0')}</span></div>
                    <div><span className="k">doy:</span> <span className="v">{p.doy}/365</span></div>
                  </div>
                )}
                <div className="tt-date">
                  <div className="ym">{p.year}-{String(p.month).padStart(2,'0')}</div>
                  <div className="day">{String(p.day).padStart(2,'0')}</div>
                  <div className="wd">{p.weekday}</div>
                  <div className="iso">{p.iso}</div>
                </div>
                <div className="tt-omens">
                  <div className="tt-omen yi">
                    <span className="tag">YI</span>
                    <ul>{p.yi.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
                  </div>
                  <div className="tt-omen ji">
                    <span className="tag">JI</span>
                    <ul>{p.ji.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
                  </div>
                  {props.showEngChrome !== false && (
                    <div className="tt-hours">
                      {p.hours.map(h => (
                        <span className="h" key={h.dz}><b>{h.dz}時</b>{h.range} {h.act}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="tt-quote">
            <span className="lbl">// fortune | cowsay -f programmer</span>
            <span className="txt">{renderText(p.quote)}</span>
          </div>

          <div className="tt-controls">
            <button onClick={p.onPrev}>← prev</button>
            <input type="date" value={p.iso} onChange={e => p.onPickDate(e.target.value)} />
            <button onClick={p.onNext}>next →</button>
            <button className="today" onClick={p.onToday}>--today</button>
          </div>
        </div>
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'terminal',
    label: '深色終端機',
    desc: 'hacker noir，發光綠字 + glitch 過場',
    render: TerminalTheme,
  });
})();
