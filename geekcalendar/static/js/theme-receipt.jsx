// theme-receipt.jsx — 中藥行收據 / 黃曆紙條
//
// Style notes:
//   - tall narrow column (like a 8cm thermal-receipt or 中藥單)
//   - cream copy-paper texture, faint red ledger lines, dot-matrix grid
//   - hand-stamped 印章 in vermilion
//   - typewriter-y serif headers + monospace numerals
//   - tear: paper tears at perforation, slides out

(function() {
  'use strict';

  const styleId = 'theme-receipt-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.trc-root{
  --trc-bg:#1d1612; --trc-paper:#f4ead4; --trc-paper-2:#ebdfb8;
  --trc-ink:#2a1a0e; --trc-ink-2:#5a3d22; --trc-red:#a82a1d; --trc-red-stamp:#c63a2a;
  --trc-ledger:#d6c089;
  font-family:'Noto Serif TC','Songti TC',serif;color:var(--trc-ink);
  position:absolute;inset:0;overflow:hidden;
  background:
    radial-gradient(ellipse at 30% 0%, #2c2118 0%, #18120e 70%);
  display:flex;flex-direction:column;
}
.trc-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;z-index:1;
  background:radial-gradient(ellipse at center,rgba(255,200,150,.06) 0%,transparent 70%)
}

.trc-bar{padding:10px 18px;background:#0e0a07;color:#9a7a4a;
  font-size:11.5px;letter-spacing:.18em;display:flex;gap:14px;
  border-bottom:1px solid #2a1f15;font-family:'Noto Serif TC',serif;
  flex-shrink:0;z-index:5;position:relative
}
.trc-bar b{color:#d4a85f;font-weight:600}
.trc-bar .right{margin-left:auto}

.trc-stage{flex:1;overflow:auto;padding:8px 22px 8px;display:flex;flex-direction:column;align-items:center;
  z-index:2;position:relative;gap:6px}

.trc-paper-wrap{position:relative;width:480px;max-width:100%}

.trc-paper{
  background:var(--trc-paper);color:var(--trc-ink);
  position:relative;padding:14px 22px 12px;
  background-image:
    /* faint dot grid */
    radial-gradient(circle, rgba(168,42,29,.08) .8px, transparent .8px),
    /* horizontal ledger lines */
    repeating-linear-gradient(0deg, transparent 0 26px, rgba(168,42,29,.13) 26px 27px),
    /* paper noise */
    radial-gradient(circle at 20% 30%, rgba(90,61,34,.04) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(90,61,34,.05) 0%, transparent 40%);
  background-size: 14px 14px, auto, auto, auto;
  box-shadow:0 12px 28px rgba(0,0,0,.45),0 0 0 1px rgba(90,61,34,.2) inset;
  font-family:'Noto Serif TC','Songti TC',serif;
}
/* zigzag perforation top + bottom */
.trc-paper::before, .trc-paper::after{
  content:'';position:absolute;left:0;right:0;height:8px;background:var(--trc-bg);
  --m: 8px;
  -webkit-mask: linear-gradient(135deg, transparent 50%, #000 50%) 0 0/var(--m) var(--m),
                linear-gradient(45deg, transparent 50%, #000 50%) 0 0/var(--m) var(--m);
}
.trc-paper::before{top:-8px;
  background:linear-gradient(180deg,var(--trc-paper) 0%,var(--trc-paper-2) 100%);
  -webkit-mask: linear-gradient(135deg,#000 50%,transparent 50%) 0 0/8px 8px;
  mask: linear-gradient(135deg,#000 50%,transparent 50%) 0 0/8px 8px;
}
.trc-paper::after{bottom:-8px;
  background:linear-gradient(180deg,var(--trc-paper-2) 0%,var(--trc-paper) 100%);
  -webkit-mask: linear-gradient(45deg,#000 50%,transparent 50%) 0 0/8px 8px;
  mask: linear-gradient(45deg,#000 50%,transparent 50%) 0 0/8px 8px;
}

.trc-head{text-align:center;border-bottom:2px double var(--trc-ink-2);padding-bottom:6px;margin-bottom:8px}
.trc-head .shop{font-size:20px;font-weight:700;letter-spacing:.4em;color:var(--trc-red);
  font-family:'Noto Serif TC',serif;margin-bottom:4px}
.trc-head .sub{font-size:10.5px;color:var(--trc-ink-2);letter-spacing:.3em;font-family:'JetBrains Mono',monospace}
.trc-head .addr{font-size:10px;color:var(--trc-ink-2);letter-spacing:.1em;margin-top:4px}

.trc-meta-row{display:flex;justify-content:space-between;font-size:11px;color:var(--trc-ink-2);
  font-family:'JetBrains Mono','Noto Serif TC',monospace;margin-bottom:4px;letter-spacing:.05em}
.trc-meta-row .k{color:var(--trc-ink)}

.trc-date{display:flex;align-items:baseline;justify-content:center;gap:8px;margin:8px 0 4px;
  border-top:1px dashed rgba(90,61,34,.4);border-bottom:1px dashed rgba(90,61,34,.4);
  padding:8px 0}
.trc-date .ym{font-size:13px;color:var(--trc-ink-2);letter-spacing:.2em;font-family:'JetBrains Mono',monospace}
.trc-date .day{font-size:62px;line-height:.95;font-weight:900;color:var(--trc-ink);letter-spacing:-.04em;
  font-family:'Noto Serif TC',serif}
.trc-date .wd{font-size:16px;letter-spacing:.4em;color:var(--trc-red);font-weight:600}

.trc-lunar{font-size:12px;color:var(--trc-ink-2);text-align:center;margin-bottom:6px;letter-spacing:.1em}
.trc-lunar b{color:var(--trc-red);font-weight:700;margin:0 4px}

.trc-warn{
  margin:4px 0 6px;padding:4px 10px;border:1px dashed var(--trc-red);
  font-size:11px;letter-spacing:.05em;color:var(--trc-red);background:rgba(168,42,29,.06);
  display:flex;flex-direction:column;gap:2px;font-family:'JetBrains Mono','Noto Serif TC',monospace
}
.trc-warn b{color:var(--trc-ink)}

.trc-section{margin:6px 0}
.trc-section .lbl{display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--trc-ink-2);
  letter-spacing:.05em;border-bottom:1px solid var(--trc-ink-2);padding-bottom:3px;margin-bottom:6px;
  font-family:'JetBrains Mono','Noto Serif TC',monospace}
.trc-section .lbl b{font-size:14px;color:var(--trc-red);letter-spacing:.2em;font-family:'Noto Serif TC',serif;font-weight:700}
.trc-section .lbl .en{color:var(--trc-ink-2);font-size:10px;margin-left:auto;letter-spacing:.2em}
.trc-section ul{list-style:none;margin:0;padding:0;font-size:12px;line-height:1.35}
.trc-section li{display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1px dotted rgba(90,61,34,.25);padding:1.5px 0;color:var(--trc-ink)}
.trc-section li::before{content:'·';color:var(--trc-red);margin-right:6px;font-weight:700}
.trc-section li .px{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--trc-ink-2)}

.trc-hours{margin:6px 0 4px;font-size:10.5px;color:var(--trc-ink-2);
  font-family:'JetBrains Mono','Noto Serif TC',monospace;display:flex;flex-direction:column;gap:0px}
.trc-hours .h{display:flex;justify-content:space-between;border-bottom:1px dotted rgba(90,61,34,.25);
  padding:1px 0}
.trc-hours .h b{color:var(--trc-red);font-weight:700}

.trc-quote{margin:8px 0 4px;border-top:2px double var(--trc-ink-2);padding-top:6px;
  font-size:11.5px;line-height:1.55;font-style:italic;color:var(--trc-ink);text-align:justify}
.trc-quote::before{content:'本日小帖：';color:var(--trc-red);font-style:normal;font-weight:700;margin-right:6px;font-size:11px;letter-spacing:.1em}
.trc-quote code{font-style:normal;background:rgba(168,42,29,.1);padding:0 4px;color:var(--trc-red)}

.trc-foot{margin-top:8px;text-align:center;font-size:10px;color:var(--trc-ink-2);letter-spacing:.15em;
  font-family:'JetBrains Mono',monospace;border-top:1px dashed rgba(90,61,34,.4);padding-top:6px}
.trc-foot .barcode{display:flex;gap:1.5px;justify-content:center;margin-bottom:4px;height:20px;align-items:end}
.trc-foot .barcode i{display:block;background:var(--trc-ink);width:1px;height:100%}
.trc-foot .barcode i.w2{width:2px}
.trc-foot .barcode i.w3{width:3px}
.trc-foot .barcode i.s{height:65%}

/* the stamp */
.trc-stamp{
  position:absolute;right:-8px;top:48px;width:78px;height:78px;border-radius:50%;
  border:3px double var(--trc-red-stamp);color:var(--trc-red-stamp);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-family:'Noto Serif TC',serif;letter-spacing:.05em;
  transform:rotate(-12deg);
  text-shadow:0 0 .5px var(--trc-red-stamp);
  background:radial-gradient(circle,rgba(198,58,42,.05) 0%,transparent 70%);
  box-shadow:inset 0 0 0 1px rgba(198,58,42,.3);
  z-index:3;opacity:.92;
  filter:contrast(1.1);
}
.trc-stamp .top{font-size:9px;letter-spacing:.2em;font-weight:700}
.trc-stamp .mid{font-size:18px;font-weight:900;letter-spacing:.1em;line-height:1;margin:2px 0}
.trc-stamp .bot{font-size:8px;letter-spacing:.18em;font-family:'JetBrains Mono',monospace}

/* controls */
.trc-controls{display:flex;gap:8px;align-items:center;justify-content:center;font-size:12px;
  font-family:'Noto Serif TC',serif;color:#d4a85f}
.trc-controls button,.trc-controls input{
  font-family:inherit;font-size:12px;color:#f4ead4;background:rgba(244,234,212,.08);
  border:1px solid #5a3d22;padding:6px 12px;cursor:pointer;letter-spacing:.05em;
}
.trc-controls button:hover{background:rgba(244,234,212,.15);border-color:#d4a85f}
.trc-controls .today{background:#a82a1d;color:#fff;border-color:#a82a1d;font-weight:700}

/* tear: paper slides up/down/left/right */
.trc-paper-wrap[data-tear]{transform-style:preserve-3d}
.trc-paper-wrap[data-tear="up"]{animation:trc-up 1s cubic-bezier(.4,0,.2,1)}
.trc-paper-wrap[data-tear="down"]{animation:trc-down 1s cubic-bezier(.4,0,.2,1)}
.trc-paper-wrap[data-tear="left"]{animation:trc-left 1s cubic-bezier(.4,0,.2,1)}
.trc-paper-wrap[data-tear="right"]{animation:trc-right 1s cubic-bezier(.4,0,.2,1)}
.trc-paper-wrap[data-tear="fold"]{animation:trc-fold 1s cubic-bezier(.4,0,.2,1)}
@keyframes trc-up{from{opacity:0;transform:translateY(60px) rotateZ(-2deg)}to{opacity:1;transform:none}}
@keyframes trc-down{from{opacity:0;transform:translateY(-60px) rotateZ(2deg)}to{opacity:1;transform:none}}
@keyframes trc-left{from{opacity:0;transform:translateX(60px) rotateZ(3deg)}to{opacity:1;transform:none}}
@keyframes trc-right{from{opacity:0;transform:translateX(-60px) rotateZ(-3deg)}to{opacity:1;transform:none}}
@keyframes trc-fold{
  0%{opacity:0;transform:scaleY(.04) rotateZ(0)}
  35%{transform:scaleY(.04)}
  100%{opacity:1;transform:scaleY(1)}
}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  function renderText(t) { return window.AlmanacRender.renderText(t); }

  // Pseudo-randomized barcode bars from date seed
  function barcodeBars(seed) {
    const out = [];
    let x = seed;
    for (let i = 0; i < 38; i++) {
      x = (x * 1103515245 + 12345) & 0x7fffffff;
      const r = x % 5;
      out.push(<i key={i} className={r === 0 ? 'w3' : r === 1 ? 'w2' : r === 4 ? 's' : ''}/>);
    }
    return out;
  }

  function ReceiptTheme(props) {
    const p = props;
    const seed = p.year * 10000 + p.month * 100 + p.day;
    return (
      <div className="trc-root">
        <div className="trc-bar">
          <span className="label"><b>NERDY</b> APOTHECARY</span>
          <span>· 黃曆收據式 ·</span>
          <span className="right">REG-#{String(seed).slice(-6)}</span>
        </div>
        <div className="trc-stage">
          <div className="trc-paper-wrap" data-tear={props.phase === 'tearing' ? props.tearKind : null} key={p.iso}>
            <div className="trc-paper">
              <div className="trc-head">
                <div className="shop">宅 民 曆</div>
                <div className="sub">NERDY · APOTHECARY · ALMANAC</div>
                <div className="addr">營業地址：~/work/repo · 電話：localhost:8080</div>
              </div>

              <div className="trc-meta-row"><span><span className="k">單號 NO.</span> {String(seed).slice(-8)}</span><span>W{String(p.iso_week).padStart(2,'0')}/{String(p.doy).padStart(3,'0')}</span></div>
              <div className="trc-meta-row"><span><span className="k">經辦：</span> dev@prod-box</span><span>{p.iso} {p.weekday}</span></div>

              <div className="trc-date">
                <div className="ym">{p.year}.{String(p.month).padStart(2,'0')}</div>
                <div className="day">{String(p.day).padStart(2,'0')}</div>
                <div className="wd">{p.weekday}</div>
              </div>

              {p.showLunar !== false && (
                <div className="trc-lunar">
                  農曆 <b>{p.lunarMonthCN}{p.lunarDayCN}</b> · {p.ganzhi} · {p.zodiac}年 · 沖 {p.chong}
                </div>
              )}

              {p.showEngChrome !== false && (
                <div className="trc-warn">
                  <span><b>※注意：</b>本日沖 <b>{p.engChong}</b>（{p.zodiac}年生人）</span>
                  <span><b>※煞方：</b>{p.engSha}</span>
                </div>
              )}

              <div className="trc-section">
                <div className="lbl"><b>宜</b><span style={{color:'var(--trc-ink-2)',marginLeft:'6px',fontSize:'10px'}}>RX · 服用</span><span className="en">SHOULD-DO</span></div>
                <ul>{p.yi.map((x, i) => (
                  <li key={x.id}><span style={{flex:1}}>{renderText(x.text)}</span>
                    <span className="px">×{(i+1).toString().padStart(2,'0')}帖</span></li>
                ))}</ul>
              </div>
              <div className="trc-section">
                <div className="lbl"><b>忌</b><span style={{color:'var(--trc-ink-2)',marginLeft:'6px',fontSize:'10px'}}>禁忌 · 勿犯</span><span className="en">AVOID</span></div>
                <ul>{p.ji.map((x, i) => (
                  <li key={x.id}><span style={{flex:1}}>{renderText(x.text)}</span>
                    <span className="px">禁{(i+1).toString().padStart(2,'0')}</span></li>
                ))}</ul>
              </div>

              {p.showEngChrome !== false && (
                <div className="trc-hours">
                  <div style={{color:'var(--trc-red)',fontWeight:700,marginBottom:'2px',letterSpacing:'.1em'}}>── 吉時 ──</div>
                  {p.hours.map(h => (
                    <div className="h" key={h.dz}><span><b>{h.dz}時</b> {h.range}</span><span>{h.act}</span></div>
                  ))}
                </div>
              )}

              <div className="trc-quote">
                {renderText(p.quote)}
              </div>

              <div className="trc-foot">
                <div className="barcode">{barcodeBars(seed)}</div>
                * UNIX-{p.unix} * SEED-{seed} *<br/>
                謝惠顧 · 不受理退換 · THANK YOU
              </div>
            </div>
            <div className="trc-stamp">
              <div className="top">編譯通過</div>
              <div className="mid">吉</div>
              <div className="bot">{p.iso}</div>
            </div>
          </div>

          <div className="trc-controls">
            <button onClick={p.onPrev}>← 上一單</button>
            <input type="date" value={p.iso} onChange={e => p.onPickDate(e.target.value)} />
            <button onClick={p.onNext}>下一單 →</button>
            <button className="today" onClick={p.onToday}>今日</button>
          </div>
        </div>
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'receipt',
    label: '中藥行收據',
    desc: '窄長黃曆紙條 · 印章 · 條碼 · 複寫紙',
    render: ReceiptTheme,
  });
})();
