// theme-newsprint.jsx — 黑白單色 / Risograph

(function() {
  'use strict';

  const styleId = 'theme-newsprint-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tn-root{
  --tn-bg:#ebe6dc; --tn-paper:#f7f3e8; --tn-ink:#0e0e0e; --tn-mute:#5a5852;
  --tn-line:#1a1a1a; --tn-accent:#c8341f;
  font-family:'Noto Serif TC',serif;color:var(--tn-ink);
  position:absolute;inset:0;background:var(--tn-bg);overflow:hidden;
  display:flex;flex-direction:column;
}
.tn-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:30;
  background:
    radial-gradient(circle at 20% 30%,rgba(0,0,0,.06) 0,transparent 1px),
    radial-gradient(circle at 70% 80%,rgba(0,0,0,.06) 0,transparent 1px),
    radial-gradient(circle at 40% 60%,rgba(0,0,0,.04) 0,transparent 1px);
  background-size:3px 3px,5px 5px,4px 4px;mix-blend-mode:multiply;opacity:.7;
}
.tn-bar{display:flex;align-items:baseline;gap:14px;padding:16px 28px 10px;
  border-bottom:3px double var(--tn-ink);flex-shrink:0;
  font-family:'Noto Serif TC',serif;background:var(--tn-paper)}
.tn-bar b{font-size:24px;font-weight:900;letter-spacing:.18em}
.tn-bar .iss{font-size:11px;color:var(--tn-mute);letter-spacing:.15em;margin-left:auto}
.tn-bar .sub{font-size:12px;letter-spacing:.2em}
.tn-stage{flex:1;overflow:auto;padding:18px 24px}
.tn-toolbar{display:flex;gap:6px;font-size:12px;margin-bottom:12px;align-items:center;justify-content:flex-end}
.tn-toolbar button,.tn-toolbar input[type=date]{
  font-family:inherit;font-size:12px;color:var(--tn-ink);background:var(--tn-paper);
  border:1.5px solid var(--tn-ink);padding:5px 10px;cursor:pointer;letter-spacing:.05em;
}
.tn-toolbar button:hover{background:var(--tn-ink);color:var(--tn-paper)}
.tn-toolbar .today{background:var(--tn-accent);color:#fff;border-color:var(--tn-accent)}
.tn-page{
  background:var(--tn-paper);border:2px solid var(--tn-ink);max-width:880px;margin:0 auto;
  position:relative;box-shadow:6px 6px 0 var(--tn-ink);
}
.tn-page-old{position:absolute;inset:0;animation:tn-flip .5s ease-in forwards;transform-origin:left center;z-index:5}
@keyframes tn-flip{
  0%{transform:rotateY(0)}
  100%{transform:rotateY(-180deg);opacity:0}
}
.tn-page-new{animation:tn-fadein .35s ease-out}
@keyframes tn-fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.tn-page-wrap{perspective:1800px;position:relative}
.tn-stack-back{position:absolute;left:8px;top:8px;right:-2px;bottom:-6px;
  background:var(--tn-paper);border:2px solid var(--tn-ink);z-index:-1;box-shadow:6px 6px 0 var(--tn-ink)}
.tn-stack-back.b2{left:14px;top:14px;bottom:-12px;z-index:-2}

.tn-headline{padding:20px 26px 14px;border-bottom:1px solid var(--tn-ink);
  display:flex;align-items:baseline;gap:18px;justify-content:space-between}
.tn-headline h1{font-size:30px;font-weight:900;letter-spacing:.05em;margin:0}
.tn-headline .meta{font-size:11px;color:var(--tn-mute);letter-spacing:.1em;text-align:right;line-height:1.6}

.tn-grid{display:grid;grid-template-columns:1.4fr 2fr;gap:0;border-top:1px solid var(--tn-ink)}
.tn-date-cell{padding:24px;border-right:2px solid var(--tn-ink);text-align:center;
  display:flex;flex-direction:column;justify-content:center;align-items:center;gap:6px;
  background:repeating-linear-gradient(45deg,transparent 0 10px,rgba(0,0,0,.025) 10px 11px)}
.tn-date-cell .ym{font-size:16px;letter-spacing:.1em;font-weight:700;
  border-bottom:1px solid var(--tn-ink);padding-bottom:6px;width:100%}
.tn-date-cell .day{font-size:200px;line-height:.95;font-weight:900;letter-spacing:-.06em;
  font-family:'Noto Serif TC',serif;color:var(--tn-ink);position:relative}
.tn-date-cell .day::after{
  content:attr(data-d);position:absolute;left:3px;top:3px;color:var(--tn-accent);z-index:-1;
  mix-blend-mode:multiply;opacity:.85;
}
.tn-date-cell .wd{font-size:18px;letter-spacing:.5em;border-top:1px solid var(--tn-ink);
  padding-top:8px;width:100%;font-weight:700}
.tn-date-cell .lunar{font-size:13px;color:var(--tn-mute);letter-spacing:.1em;margin-top:6px}

.tn-omens-cell{padding:0}
.tn-section{padding:14px 22px;border-bottom:1px solid var(--tn-ink);font-size:13.5px;line-height:1.6}
.tn-section:last-child{border-bottom:none}
.tn-section .hd{display:flex;align-items:baseline;gap:10px;margin-bottom:8px}
.tn-section .hd b{font-size:20px;font-weight:900;letter-spacing:.2em;
  background:var(--tn-ink);color:var(--tn-paper);padding:2px 10px;display:inline-block}
.tn-section .hd .label{font-size:10px;letter-spacing:.2em;color:var(--tn-mute);text-transform:uppercase}
.tn-section.ji .hd b{background:var(--tn-paper);color:var(--tn-ink);border:2px solid var(--tn-ink)}
.tn-section ul{list-style:none;padding:0;margin:0;column-count:1}
.tn-section li{padding:1px 0;display:flex;gap:6px;align-items:flex-start}
.tn-section li::before{content:'■';color:var(--tn-ink);font-size:9px;margin-top:6px;flex-shrink:0}
.tn-section.ji li::before{content:'□'}
.tn-section code{font-family:'JetBrains Mono',monospace;font-size:.88em;
  background:var(--tn-ink);color:var(--tn-paper);padding:0 4px}

.tn-meta-strip{padding:8px 22px;border-top:1px solid var(--tn-ink);
  display:flex;gap:18px;flex-wrap:wrap;font-size:11px;letter-spacing:.05em;color:var(--tn-mute);
  font-family:'JetBrains Mono',monospace;background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(0,0,0,.03) 3px 4px)}
.tn-meta-strip b{color:var(--tn-accent);font-weight:700;margin-right:5px;letter-spacing:.1em}

.tn-hours{padding:10px 22px;border-top:1px solid var(--tn-ink);display:flex;flex-wrap:wrap;
  gap:8px;font-size:11.5px}
.tn-hours .lbl{font-weight:900;letter-spacing:.2em;background:var(--tn-accent);color:#fff;padding:2px 8px}
.tn-hours .h{padding:2px 8px;border:1.5px solid var(--tn-ink);background:#fff}
.tn-hours .h b{margin-right:4px;color:var(--tn-accent)}

.tn-quote{margin:14px auto;max-width:880px;padding:14px 22px;
  border:2px solid var(--tn-ink);background:var(--tn-paper);
  display:flex;gap:14px;align-items:center;box-shadow:4px 4px 0 var(--tn-accent)}
.tn-quote .lbl{flex-shrink:0;background:var(--tn-ink);color:var(--tn-paper);
  padding:4px 12px;font-weight:900;letter-spacing:.2em;font-size:12px}
.tn-quote .txt{font-size:14px;line-height:1.6;font-style:italic}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  const renderText = (t) => window.AlmanacRender.renderText(t);

  function NewsprintTheme(props) {
    const p = props;
    const showStack = props.showStack !== false;
    return (
      <div className="tn-root">
        <header className="tn-bar">
          <b>宅民曆 GAZETTE</b>
          <span className="sub">VOL.{p.year} · NO.{String(p.doy).padStart(3,'0')}</span>
          <span className="iss">EST. 2011 · NERDY CALENDAR · 工程師專屬農民曆</span>
        </header>
        <div className="tn-stage">
          <div className="tn-toolbar">
            <button onClick={p.onPrev}>‹ PREV</button>
            <input type="date" value={p.iso} onChange={e => p.onPickDate(e.target.value)} />
            <button onClick={p.onNext}>NEXT ›</button>
            <button className="today" onClick={p.onToday}>TODAY</button>
          </div>
          <div className="tn-page-wrap">
            {showStack && <div className="tn-stack-back b2"></div>}
            {showStack && <div className="tn-stack-back"></div>}
            {props.phase === 'tearing' && (
              <div className="tn-page-old"><Inner {...props} payload={props.prevPayload} /></div>
            )}
            <div className="tn-page-new" key={p.iso}>
              <Inner {...props} payload={props} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Inner(props) {
    const p = props.payload;
    return (
      <div className="tn-page">
        <div className="tn-headline">
          <h1>本日告示</h1>
          <div className="meta">
            ISO {p.iso} · W{String(p.iso_week).padStart(2,'0')}<br/>
            UNIX {p.unix} · DOY {p.doy}
          </div>
        </div>
        <div className="tn-grid">
          <div className="tn-date-cell">
            <div className="ym">{p.year} 年 {String(p.month).padStart(2,'0')} 月</div>
            <div className="day" data-d={p.day}>{p.day}</div>
            <div className="wd">星 期 {p.weekday}</div>
            {props.showLunar !== false && (
              <div className="lunar">{p.ganzhi}年 · 農曆 {p.lunarMonthCN}{p.lunarDayCN}</div>
            )}
          </div>
          <div className="tn-omens-cell">
            <div className="tn-section yi">
              <div className="hd"><b>宜</b><span className="label">SHOULD DO</span></div>
              <ul>{p.yi.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
            </div>
            <div className="tn-section ji">
              <div className="hd"><b>忌</b><span className="label">AVOID</span></div>
              <ul>{p.ji.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
            </div>
          </div>
        </div>
        {props.showEngChrome !== false && (
          <div className="tn-meta-strip">
            <span><b>沖</b>{p.engChong}（{p.zodiac}年）</span>
            <span><b>煞</b>{p.engSha}</span>
            <span><b>STACK</b>請避免在 main 上 force push</span>
          </div>
        )}
        {props.showEngChrome !== false && (
          <div className="tn-hours">
            <span className="lbl">吉時</span>
            {p.hours.map(h => (
              <span className="h" key={h.dz}><b>{h.dz}時</b>{h.range} · {h.act}</span>
            ))}
          </div>
        )}
        <div className="tn-quote">
          <span className="lbl">語錄</span>
          <span className="txt">「{renderText(p.quote)}」</span>
        </div>
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'newsprint',
    label: '黑白報紙',
    desc: '單色 Risograph，大標題 + 雙色錯位印刷',
    render: NewsprintTheme,
  });
})();
