// theme-classic.jsx — 經典牛皮紙 theme (parchment, faithful to reference)

(function() {
  'use strict';

  const styleId = 'theme-classic-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tcl-root{
  --tcl-bg-1:#d8c39a; --tcl-bg-2:#c9b083; --tcl-bg-3:#b89766;
  --tcl-paper:#f0e1c1; --tcl-paper-dark:#e3d0a7; --tcl-edge:#a07c46;
  --tcl-ink:#2d1d10; --tcl-ink-dim:#6b4a2b; --tcl-red:#8b1d12; --tcl-red-2:#c84030;
  --tcl-banner:#3b2516;
  font-family:'Noto Serif TC','Songti TC','宋体',serif;
  color:var(--tcl-ink); position:absolute; inset:0;
  background:radial-gradient(ellipse at top,var(--tcl-bg-1) 0%,var(--tcl-bg-2) 60%,var(--tcl-bg-3) 100%);
  display:flex; flex-direction:column; overflow:hidden;
}
.tcl-banner{
  background:linear-gradient(180deg,#3b2516 0%,#2a1a0e 100%);
  color:#d8c39a; padding:18px 32px; display:flex; justify-content:flex-end;
  align-items:baseline; gap:14px; box-shadow:0 2px 12px rgba(0,0,0,.25);
  font-family:'Noto Serif TC',serif;
}
.tcl-banner b{font-size:22px;font-weight:900;letter-spacing:.18em}
.tcl-banner .sep{color:#6b4a2b}
.tcl-banner .sub{font-size:13px;color:#b8a06a;letter-spacing:.18em}
.tcl-stage{flex:1;display:flex;flex-direction:column;align-items:center;
  padding:18px 24px;overflow:auto;gap:14px;position:relative}
.tcl-toolbar{display:flex;gap:8px;align-items:center;font-size:13px}
.tcl-toolbar button,.tcl-toolbar input,.tcl-toolbar .seg{
  font-family:inherit;font-size:13px;color:#5a2418;background:#f0e1c1;
  border:1px solid #a07c46;border-radius:3px;padding:6px 12px;cursor:pointer;
  font-weight:600;letter-spacing:.05em;
}
.tcl-toolbar button:hover{background:#e3d0a7}
.tcl-toolbar .today{background:#5a2418;color:#f6ecd1;border-color:#5a2418}
.tcl-toolbar input[type=date]{padding:5px 8px}
.tcl-page-frame{
  width:100%;max-width:880px;position:relative;flex-shrink:0;
}
.tcl-stack-back{
  position:absolute;left:8px;right:8px;top:8px;bottom:-4px;background:#e3d0a7;
  border:1px solid #a07c46;border-radius:6px;
  box-shadow:0 4px 12px rgba(40,22,10,.18);z-index:0;
}
.tcl-stack-back.b2{left:14px;right:14px;top:14px;bottom:-10px;background:#d8c39a;z-index:-1}
.tcl-page{
  position:relative;background:var(--tcl-paper);
  border:1px solid var(--tcl-edge);border-radius:6px;padding:36px 48px 28px;
  box-shadow:0 12px 32px rgba(40,22,10,.25),
    inset 0 0 0 6px var(--tcl-paper-dark),inset 0 0 0 7px var(--tcl-edge);
  display:grid;grid-template-columns:auto 1fr 1.25fr;gap:24px;align-items:stretch;
  background-image:
    radial-gradient(circle at 30% 20%, rgba(160,124,70,.07) 0, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(139,29,18,.05) 0, transparent 60%),
    repeating-linear-gradient(45deg, rgba(160,124,70,.025) 0 2px, transparent 2px 6px);
}
.tcl-page::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><g fill='none' stroke='%23a07c46' stroke-width='.5' opacity='.18'><path d='M40 240 Q 120 200 200 230 T 360 220'/><path d='M60 250 L 80 230 L 100 245 L 120 225'/><circle cx='320' cy='80' r='25'/><circle cx='320' cy='80' r='15'/><path d='M250 60 L 280 55 L 290 75 L 270 90 Z'/><path d='M40 100 Q 100 80 160 95'/></g></svg>") center/600px no-repeat;
  opacity:.5;border-radius:6px;
}
.tcl-page > *{position:relative;z-index:1}
.tcl-lunar-side{
  writing-mode:vertical-rl;text-orientation:upright;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:16px;color:var(--tcl-ink-dim);font-size:18px;letter-spacing:.15em;
  border-right:1px solid rgba(160,124,70,.4);padding-right:14px;
  font-weight:600;
}
.tcl-lunar-side .gz{
  font-size:22px;font-weight:900;color:var(--tcl-red);
  background:rgba(255,255,255,.4);padding:6px 4px;border:1px solid rgba(160,124,70,.5);
}
.tcl-date-block{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center}
.tcl-ym{font-size:22px;color:var(--tcl-ink-dim);letter-spacing:.05em;
  font-family:'EB Garamond','Noto Serif TC',serif;font-weight:600}
.tcl-day{font-size:200px;font-weight:900;line-height:.95;color:#5a2418;
  text-shadow:1px 2px 0 var(--tcl-paper-dark);font-family:'Noto Serif TC',serif;
  letter-spacing:-.04em}
.tcl-weekday{font-size:24px;letter-spacing:.6em;color:#5a2418;
  border-top:1px solid var(--tcl-edge);padding:10px 0 0 .6em;margin-top:8px}
.tcl-omens{display:flex;flex-direction:column;gap:14px;justify-content:center;font-size:14.5px;line-height:1.55}
.tcl-meta{display:flex;flex-direction:column;gap:2px;font-size:12.5px;color:var(--tcl-ink-dim);
  border-bottom:1px dashed rgba(160,124,70,.5);padding-bottom:10px;margin-bottom:4px}
.tcl-meta .row{display:flex;gap:14px;align-items:baseline}
.tcl-meta .row b{color:var(--tcl-red);font-weight:700;letter-spacing:.1em}
.tcl-meta code{font-family:'JetBrains Mono','SF Mono',monospace;font-size:11px;
  color:var(--tcl-ink);background:rgba(160,124,70,.12);padding:1px 5px;border-radius:2px}
.tcl-omen{display:flex;align-items:flex-start;gap:14px}
.tcl-circle{
  flex:0 0 auto;width:36px;height:36px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#c84030 0%,#8b1d12 100%);
  color:#fff8e0;font-size:20px;font-weight:900;display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 4px rgba(0,0,0,.3),inset 0 -2px 4px rgba(0,0,0,.2);
  margin-top:2px;
}
.tcl-omen ul{list-style:none;padding:0;margin:0;flex:1}
.tcl-omen li{padding:1px 0}
.tcl-omen li::before{content:'・';color:var(--tcl-red);margin-right:2px}
.tcl-omen code{font-family:'JetBrains Mono','SF Mono',monospace;font-size:.88em;
  color:#5a2418;background:rgba(160,124,70,.15);padding:0 4px;border-radius:2px}
.tcl-hours{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
.tcl-hours .h{font-size:11.5px;color:var(--tcl-ink-dim);
  background:rgba(255,255,255,.4);border:1px solid rgba(160,124,70,.4);
  padding:3px 8px;border-radius:2px}
.tcl-hours .h b{color:var(--tcl-red);font-weight:700;margin-right:4px}
.tcl-quote{
  background:#f6ecd1;border:1px solid var(--tcl-edge);border-radius:3px;
  padding:14px 22px;display:flex;align-items:center;gap:16px;
  box-shadow:0 6px 18px rgba(40,22,10,.18);max-width:880px;width:100%;flex-shrink:0;
}
.tcl-quote .lbl{flex-shrink:0;background:#5a2418;color:#f6ecd1;
  padding:6px 14px;font-weight:700;letter-spacing:.15em;border-radius:2px;font-size:13px}
.tcl-quote .txt{font-size:14px;line-height:1.6;color:var(--tcl-ink)}
.tcl-quote .attrib{color:var(--tcl-ink-dim);font-size:12px;margin-left:auto;flex-shrink:0}

/* tear-off animation */
.tcl-page-wrap{perspective:1600px;position:relative}
.tcl-page-old{position:absolute;inset:0;z-index:5;transform-origin:top center;
  animation:tcl-tear .52s cubic-bezier(.5,0,.75,.0) forwards}
@keyframes tcl-tear{
  0%{transform:rotateX(0deg);opacity:1}
  60%{transform:rotateX(-90deg);opacity:.9}
  100%{transform:rotateX(-130deg) translateY(40px);opacity:0}
}
.tcl-page-new{animation:tcl-fadein .35s ease-out}
@keyframes tcl-fadein{from{opacity:0}to{opacity:1}}
.tcl-page-perforate{position:absolute;top:6px;left:0;right:0;height:1px;
  background:repeating-linear-gradient(90deg,var(--tcl-edge) 0 4px,transparent 4px 8px);
  z-index:6;pointer-events:none;opacity:.5}

@media (max-width:760px){
  .tcl-page{grid-template-columns:1fr;padding:24px 20px;gap:18px}
  .tcl-lunar-side{writing-mode:horizontal-tb;border-right:none;border-bottom:1px solid rgba(160,124,70,.4);padding:0 0 10px;flex-direction:row;flex-wrap:wrap}
  .tcl-day{font-size:140px}
}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  function ClassicTheme(props) {
    return (
      <div className="tcl-root">
        <header className="tcl-banner">
          <b>宅民曆</b>
          <span className="sep">|</span>
          <span className="sub">Nerdy Calendar · 工程師專屬農民曆</span>
        </header>
        <Toolbar {...props} />
        <div className="tcl-stage">
          <PageFrame {...props} />
          <Quote {...props} />
        </div>
      </div>
    );
  }

  function Toolbar(props) {
    return (
      <div className="tcl-toolbar" style={{padding:'12px 0 0'}}>
        <button onClick={props.onPrev}>← 前一天</button>
        <input type="date" value={props.iso} onChange={e => props.onPickDate(e.target.value)} />
        <button onClick={props.onNext}>後一天 →</button>
        <button className="today" onClick={props.onToday}>今</button>
      </div>
    );
  }

  function PageFrame(props) {
    const showStack = props.showStack !== false;
    return (
      <div className="tcl-page-frame">
        {showStack && <div className="tcl-stack-back b2"></div>}
        {showStack && <div className="tcl-stack-back"></div>}
        <div className="tcl-page-wrap">
          {props.phase === 'tearing' && (
            <div className="tcl-page-old"><PageInner {...props} payload={props.prevPayload} /></div>
          )}
          <div className="tcl-page-new" key={props.iso}>
            <PageInner {...props} payload={props} />
          </div>
        </div>
      </div>
    );
  }

  function PageInner(props) {
    const p = props.payload;
    return (
      <div className="tcl-page">
        <div className="tcl-page-perforate"></div>
        {props.showLunar !== false && (
          <div className="tcl-lunar-side">
            <span className="gz">{p.ganzhi}</span>
            <span>農曆 {p.lunarMonthCN}{p.lunarDayCN}</span>
          </div>
        )}
        <div className="tcl-date-block">
          <div className="tcl-ym">{p.year} / {String(p.month).padStart(2,'0')}</div>
          <div className="tcl-day">{p.day}</div>
          <div className="tcl-weekday">星 期 {p.weekday}</div>
        </div>
        <div className="tcl-omens">
          {props.showEngChrome !== false && <MetaRow p={p} />}
          <div className="tcl-omen">
            <span className="tcl-circle">宜</span>
            <ul>{p.yi.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
          </div>
          <div className="tcl-omen">
            <span className="tcl-circle" style={{background:'radial-gradient(circle at 35% 30%,#3a3a3a 0%,#0a0a0a 100%)'}}>忌</span>
            <ul>{p.ji.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
          </div>
          {props.showEngChrome !== false && <Hours p={p} />}
        </div>
      </div>
    );
  }

  function MetaRow({p}) {
    return (
      <div className="tcl-meta">
        <div className="row">
          <span><b>沖</b>{p.engChong}（{p.zodiac}年，{p.lunar.y}）</span>
          <span><b>煞</b>{p.engSha}</span>
        </div>
        <div className="row">
          <span><b>UTC</b><code>{p.iso}</code></span>
          <span><b>WK</b><code>W{String(p.iso_week).padStart(2,'0')}</code></span>
          <span><b>DOY</b><code>{p.doy}</code></span>
        </div>
      </div>
    );
  }

  function Hours({p}) {
    return (
      <div>
        <div className="tcl-meta" style={{borderBottom:'none',borderTop:'1px dashed rgba(160,124,70,.5)',paddingTop:8,marginTop:4}}>
          <div className="row" style={{flexWrap:'wrap',gap:6}}>
            <b style={{letterSpacing:'.1em'}}>吉時</b>
            {p.hours.map(h => (
              <span className="h" key={h.dz}><b>{h.dz}時</b>{h.range} · {h.act}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function Quote(props) {
    return (
      <div className="tcl-quote">
        <span className="lbl">程式小格言</span>
        <span className="txt">{renderText(props.quote)}</span>
        <span className="attrib">— 雷廟巷</span>
      </div>
    );
  }

  // Render text, wrapping code-y tokens in <code>
  function renderText(text) {
    if (!text) return null;
    const tokens = text.split(/(`[^`]+`|\b(?:console\.log|main|master|prod|staging|rm -rf|git [a-z-]+|npm [a-z-]+|pip [a-z-]+|sudo|kubectl|docker|HTTP|HTTPS|TCP|UDP|DDL|DML|API|SQL|JSON|YAML|XML|Bug|bug|Bugs|JavaScript|TypeScript|Python|Java|Rust|Go|Ruby|PHP|CSS|HTML|JS|TS|UTC|JSON|YAML|XML|JS|TS|PR|MR|CR|CI|CD|DB|RAM|CPU|GPU|API|UI|UX|FE|BE|DevOps|Kubernetes|Docker|Linux|Windows|MacOS|iOS|Android|GitHub|GitLab|Jenkins|Sentry|Slack|Discord|Telegram|Vim|Emacs|VSCode|IDE|CLI|GUI|REST|GraphQL|gRPC|WebSocket|OAuth|JWT|RSA|MD5|SHA|AES|TCP|IP|DNS|CDN|VPN|SSH|FTP|HTTP|SMTP|POP3|IMAP)\b)/);
    return tokens.map((t, i) => {
      if (!t) return null;
      if (t.startsWith('`') && t.endsWith('`')) {
        return <code key={i}>{t.slice(1, -1)}</code>;
      }
      if (/^(console\.log|main|master|prod|staging|rm -rf|git [a-z-]+|npm [a-z-]+|pip [a-z-]+|sudo|kubectl|docker|JavaScript|TypeScript|Python|Java|Rust|Go|GitHub|Bug|Bugs)$/.test(t)) {
        return <code key={i}>{t}</code>;
      }
      return <React.Fragment key={i}>{t}</React.Fragment>;
    });
  }

  window.AlmanacThemes.register({
    id: 'classic',
    label: '經典牛皮紙',
    desc: '緊貼參考圖的沉穩農民曆風格',
    render: ClassicTheme,
  });
  window.AlmanacRender = window.AlmanacRender || {};
  window.AlmanacRender.renderText = renderText;
})();
