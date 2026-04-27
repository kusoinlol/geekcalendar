// theme-temple.jsx — 濃豔廟宇紅金 (vibrant temple poster)

(function() {
  'use strict';

  const styleId = 'theme-temple-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tm-root{
  --tm-red:#b8160d; --tm-red-dk:#7a0a04; --tm-red-lt:#e23a2a;
  --tm-gold:#f5c542; --tm-gold-dk:#c89324; --tm-cream:#fff5d8;
  --tm-ink:#2a0808;
  font-family:'Noto Serif TC','Songti TC',serif;color:var(--tm-cream);
  position:absolute;inset:0;overflow:hidden;display:flex;flex-direction:column;
  background:
    radial-gradient(circle at 50% 20%,#d4221a 0,#a01008 40%,#5e0604 100%);
}
.tm-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(circle at 20% 80%,rgba(245,197,66,.12) 0,transparent 40%),
    radial-gradient(circle at 80% 30%,rgba(245,197,66,.1) 0,transparent 40%),
    repeating-linear-gradient(0deg,transparent 0 4px,rgba(0,0,0,.05) 4px 5px);
}
.tm-bar{display:flex;align-items:center;padding:14px 28px;
  background:linear-gradient(180deg,#5e0604,#3a0202);
  border-bottom:3px solid var(--tm-gold);gap:18px;flex-shrink:0;z-index:2;
  box-shadow:0 4px 16px rgba(0,0,0,.4)}
.tm-bar b{font-size:24px;font-weight:900;letter-spacing:.2em;color:var(--tm-gold);
  text-shadow:0 2px 8px rgba(245,197,66,.3)}
.tm-bar .sub{font-size:13px;color:rgba(255,245,216,.7);letter-spacing:.2em}
.tm-bar .sep{color:var(--tm-gold);opacity:.5}
.tm-stage{flex:1;overflow:auto;padding:18px 24px 24px;z-index:2;position:relative}

.tm-toolbar{display:flex;justify-content:center;gap:8px;margin-bottom:14px;font-size:13px}
.tm-toolbar button,.tm-toolbar input[type=date]{
  font-family:inherit;font-size:13px;color:var(--tm-gold);
  background:rgba(0,0,0,.3);border:1.5px solid var(--tm-gold);padding:6px 12px;
  cursor:pointer;letter-spacing:.1em;font-weight:700;border-radius:2px}
.tm-toolbar button:hover{background:var(--tm-gold);color:var(--tm-red-dk)}
.tm-toolbar .today{background:var(--tm-gold);color:var(--tm-red-dk)}
.tm-toolbar input[type=date]{background:rgba(255,245,216,.1);color:var(--tm-cream)}

.tm-page-wrap{position:relative;perspective:1800px;max-width:880px;margin:0 auto}
.tm-stack-back{position:absolute;left:6px;top:6px;right:-2px;bottom:-4px;
  background:#5e0604;border:2px solid var(--tm-gold-dk);z-index:-1;border-radius:4px}
.tm-stack-back.b2{left:12px;top:12px;bottom:-10px;background:#3a0202;z-index:-2}

.tm-page{
  position:relative;background:
    radial-gradient(ellipse at top,#c81810 0%,#9a0c06 50%,#6e0604 100%);
  border:3px solid var(--tm-gold);border-radius:4px;padding:0;
  box-shadow:0 0 0 1px var(--tm-red-dk),0 0 0 6px var(--tm-gold-dk),
    0 0 40px rgba(0,0,0,.5),inset 0 0 80px rgba(0,0,0,.3);
}
.tm-page::before{
  content:'';position:absolute;inset:8px;border:1px solid var(--tm-gold);
  border-radius:2px;pointer-events:none;
  background:
    radial-gradient(circle at 8% 8%,rgba(245,197,66,.18) 0,transparent 6%),
    radial-gradient(circle at 92% 8%,rgba(245,197,66,.18) 0,transparent 6%),
    radial-gradient(circle at 8% 92%,rgba(245,197,66,.18) 0,transparent 6%),
    radial-gradient(circle at 92% 92%,rgba(245,197,66,.18) 0,transparent 6%);
}
.tm-page::after{
  content:'吉';position:absolute;top:-22px;left:50%;transform:translateX(-50%);
  width:64px;height:64px;background:var(--tm-gold);
  display:flex;align-items:center;justify-content:center;
  color:var(--tm-red-dk);font-size:32px;font-weight:900;
  transform:translateX(-50%) rotate(45deg);
  border:2px solid var(--tm-red-dk);box-shadow:0 4px 12px rgba(0,0,0,.4);
}
.tm-page-inner{padding:36px 40px 28px;position:relative}

.tm-grid{display:grid;grid-template-columns:auto 1fr 1.25fr;gap:24px;align-items:stretch}
.tm-aside{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;
  border-right:1px solid rgba(245,197,66,.4);padding-right:18px;
  writing-mode:vertical-rl;text-orientation:upright;font-size:18px;letter-spacing:.2em;
  color:var(--tm-gold);font-weight:700}
.tm-aside .gz{
  writing-mode:horizontal-tb;font-size:24px;background:var(--tm-gold);color:var(--tm-red-dk);
  padding:8px 6px;font-weight:900;letter-spacing:.05em;
  box-shadow:0 2px 8px rgba(0,0,0,.4);border:1px solid var(--tm-red-dk);
  display:flex;flex-direction:column;align-items:center;line-height:1;
}
.tm-aside .gz small{font-size:11px;font-weight:600;margin-top:2px}

.tm-date{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;text-align:center}
.tm-date .ym{font-size:22px;color:var(--tm-gold);letter-spacing:.05em;font-weight:700;
  font-family:'Noto Serif TC',serif}
.tm-date .day{font-size:200px;line-height:.95;font-weight:900;color:var(--tm-gold);
  text-shadow:0 0 30px rgba(245,197,66,.5),3px 3px 0 var(--tm-red-dk);
  letter-spacing:-.04em;font-family:'Noto Serif TC',serif}
.tm-date .wd{font-size:24px;letter-spacing:.6em;color:var(--tm-cream);
  border-top:1px solid var(--tm-gold);padding-top:10px;margin-top:6px}

.tm-omens{display:flex;flex-direction:column;gap:14px;font-size:14.5px;line-height:1.6;justify-content:center}
.tm-meta{display:flex;flex-wrap:wrap;gap:10px;font-size:11.5px;color:var(--tm-gold);
  border-bottom:1px dashed rgba(245,197,66,.4);padding-bottom:10px;margin-bottom:4px}
.tm-meta b{color:var(--tm-cream);margin-right:5px;font-weight:700}
.tm-meta code{font-family:'JetBrains Mono',monospace;font-size:11px;
  background:rgba(0,0,0,.4);padding:1px 5px;border-radius:2px;color:var(--tm-gold)}

.tm-omen{display:flex;align-items:flex-start;gap:14px}
.tm-circle{flex:0 0 auto;width:42px;height:42px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#fff5d8,var(--tm-gold) 60%,var(--tm-gold-dk));
  color:var(--tm-red-dk);font-size:24px;font-weight:900;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 2px var(--tm-red-dk),0 0 16px rgba(245,197,66,.5),
    inset 0 -3px 6px rgba(0,0,0,.2);margin-top:2px}
.tm-omen.ji .tm-circle{
  background:radial-gradient(circle at 35% 30%,#1a1a1a,#000);color:var(--tm-gold);
  box-shadow:0 0 0 2px var(--tm-gold),0 0 16px rgba(0,0,0,.6);
}
.tm-omen ul{list-style:none;padding:0;margin:0;flex:1;color:var(--tm-cream)}
.tm-omen li{padding:1px 0}
.tm-omen.yi li::before{content:'◆ ';color:var(--tm-gold)}
.tm-omen.ji li::before{content:'✕ ';color:#ff8a8a}
.tm-omen code{font-family:'JetBrains Mono',monospace;font-size:.88em;
  background:rgba(0,0,0,.4);color:var(--tm-gold);padding:0 4px;border-radius:2px}

.tm-hours{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;padding-top:8px;
  border-top:1px dashed rgba(245,197,66,.4)}
.tm-hours .lbl{font-weight:900;letter-spacing:.2em;color:var(--tm-red-dk);
  background:var(--tm-gold);padding:3px 10px;font-size:11.5px}
.tm-hours .h{font-size:11px;color:var(--tm-gold);
  background:rgba(0,0,0,.3);border:1px solid var(--tm-gold);padding:3px 8px}
.tm-hours .h b{color:var(--tm-cream);margin-right:4px;font-weight:700}

.tm-quote{margin:14px auto 0;max-width:880px;padding:14px 22px;
  background:linear-gradient(135deg,#fff5d8,#f5c542);color:var(--tm-red-dk);
  border:2px solid var(--tm-red-dk);box-shadow:0 0 0 4px var(--tm-gold-dk),0 6px 20px rgba(0,0,0,.4);
  display:flex;gap:16px;align-items:center;border-radius:2px}
.tm-quote .lbl{flex-shrink:0;background:var(--tm-red-dk);color:var(--tm-gold);
  padding:6px 14px;font-weight:900;letter-spacing:.2em;font-size:13px}
.tm-quote .txt{font-size:14.5px;line-height:1.6;font-weight:600}

.tm-page-old{position:absolute;inset:0;z-index:5;will-change:transform,opacity,filter}
.tm-page-old[data-tear="down"]{transform-origin:top center;animation:tm-burn-down 1s ease-in forwards}
.tm-page-old[data-tear="up"]{transform-origin:bottom center;animation:tm-burn-up 1s ease-in forwards}
.tm-page-old[data-tear="left"]{transform-origin:right center;animation:tm-burn-left 1s ease-in forwards}
.tm-page-old[data-tear="right"]{transform-origin:left center;animation:tm-burn-right 1s ease-in forwards}
.tm-page-old[data-tear="fold"]{transform-origin:center;animation:tm-burn-fold 1s ease-in-out forwards}
@keyframes tm-burn-down{
  0%{opacity:1;transform:translateY(0);filter:brightness(1)}
  40%{filter:brightness(1.6) sepia(.4)}
  100%{opacity:0;transform:rotate(-3deg) translateY(120px) scale(.92);filter:brightness(.4) sepia(1)}
}
@keyframes tm-burn-up{
  0%{opacity:1;transform:translateY(0);filter:brightness(1)}
  40%{filter:brightness(1.6) sepia(.4)}
  100%{opacity:0;transform:rotate(2deg) translateY(-100px) scale(.92);filter:brightness(.4) sepia(1)}
}
@keyframes tm-burn-left{
  0%{opacity:1;transform:translateX(0);filter:brightness(1)}
  40%{filter:brightness(1.6) sepia(.4)}
  100%{opacity:0;transform:rotate(-4deg) translateX(-110px) scale(.9);filter:brightness(.4) sepia(1)}
}
@keyframes tm-burn-right{
  0%{opacity:1;transform:translateX(0);filter:brightness(1)}
  40%{filter:brightness(1.6) sepia(.4)}
  100%{opacity:0;transform:rotate(4deg) translateX(110px) scale(.9);filter:brightness(.4) sepia(1)}
}
@keyframes tm-burn-fold{
  0%{opacity:1;transform:rotate(0) scale(1);filter:brightness(1)}
  40%{filter:brightness(1.8) sepia(.5)}
  100%{opacity:0;transform:rotate(-8deg) scale(.5);filter:brightness(.3) sepia(1) blur(1px)}
}
.tm-page-new{animation:tm-rise .55s ease-out}
@keyframes tm-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  const renderText = (t) => window.AlmanacRender.renderText(t);

  function TempleTheme(props) {
    const p = props;
    const showStack = props.showStack !== false;
    return (
      <div className="tm-root">
        <header className="tm-bar">
          <b>宅民曆</b>
          <span className="sep">|</span>
          <span className="sub">敕令 · 工程師專屬農民曆 · 大吉大利</span>
        </header>
        <div className="tm-stage">
          <div className="tm-toolbar">
            <button onClick={p.onPrev}>← 前一日</button>
            <input type="date" value={p.iso} onChange={e => p.onPickDate(e.target.value)} />
            <button onClick={p.onNext}>後一日 →</button>
            <button className="today" onClick={p.onToday}>今</button>
          </div>
          <div className="tm-page-wrap">
            {showStack && <div className="tm-stack-back b2"></div>}
            {showStack && <div className="tm-stack-back"></div>}
            {props.phase === 'tearing' && (
              <div className="tm-page-old" data-tear={props.tearKind}><Inner {...props} payload={props.prevPayload} /></div>
            )}
            <div className="tm-page-new" key={p.iso}>
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
      <div className="tm-page">
        <div className="tm-page-inner">
          <div className="tm-grid">
            {props.showLunar !== false && (
              <div className="tm-aside">
                <div className="gz">{p.ganzhi}<small>{p.zodiac}年</small></div>
                <span>農曆 {p.lunarMonthCN}{p.lunarDayCN}</span>
              </div>
            )}
            <div className="tm-date">
              <div className="ym">{p.year} / {String(p.month).padStart(2,'0')}</div>
              <div className="day">{p.day}</div>
              <div className="wd">星 期 {p.weekday}</div>
            </div>
            <div className="tm-omens">
              {props.showEngChrome !== false && (
                <div className="tm-meta">
                  <span><b>沖</b>{p.engChong}</span>
                  <span><b>煞</b>{p.engSha}</span>
                  <span><b>UTC</b><code>{p.iso}</code></span>
                  <span><b>WK</b><code>W{String(p.iso_week).padStart(2,'0')}</code></span>
                </div>
              )}
              <div className="tm-omen yi">
                <span className="tm-circle">宜</span>
                <ul>{p.yi.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
              </div>
              <div className="tm-omen ji">
                <span className="tm-circle">忌</span>
                <ul>{p.ji.map(x => <li key={x.id}>{renderText(x.text)}</li>)}</ul>
              </div>
              {props.showEngChrome !== false && (
                <div className="tm-hours">
                  <span className="lbl">吉時</span>
                  {p.hours.map(h => (
                    <span className="h" key={h.dz}><b>{h.dz}時</b>{h.range} · {h.act}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="tm-quote">
            <span className="lbl">籤詩</span>
            <span className="txt">{renderText(p.quote)}</span>
          </div>
        </div>
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'temple',
    label: '濃豔廟宇紅金',
    desc: '朱紅底 + 金字裝飾，廟宇海報風格',
    render: TempleTheme,
  });
})();
