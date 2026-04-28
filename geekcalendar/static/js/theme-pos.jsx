// theme-pos.jsx — 大麥 POS 結帳機
//
// Concept:
//   背景是點餐畫面（左側功能按鈕列、商品菜單卡片網格、訂單面板）
//   日曆是浮在上面的「結帳 modal」
//   換日動畫: modal 滑落 / 滑入時會看見底層菜單畫面
//
// Visual references: damaiapp.com.tw POS app — orange (#F18A3A) accent,
// cream-grey base, Apple-ish system fonts, soft shadows, small radii.

(function() {
  'use strict';

  const styleId = 'theme-pos-styles';
  if (!document.getElementById(styleId)) {
    const css = `
.tpos-root{
  --tpos-bg:#EAE8E5;
  --tpos-card:#FFFFFF;
  --tpos-line:#E5E1DB;
  --tpos-text:#2A2421;
  --tpos-text-2:#7B736B;
  --tpos-text-3:#A8A09A;
  --tpos-orange:#F18A3A;
  --tpos-orange-2:#E2761F;
  --tpos-orange-soft:#FBE5D0;
  --tpos-side:#3B3631;
  --tpos-side-2:#2C2825;
  --tpos-red:#E03A2C;
  --tpos-green:#3A8C53;
  font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei','Noto Sans TC',sans-serif;
  position:absolute;inset:0;overflow:hidden;
  /* warm counter-top backdrop */
  background:
    radial-gradient(ellipse at 30% 0%, #4a3c2e 0%, #1f1610 60%, #0e0a07 100%);
  display:flex;align-items:center;justify-content:center;
  color:var(--tpos-text);
  padding:18px 30px;
}
.tpos-root::before{
  /* table grain */
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    repeating-linear-gradient(92deg,transparent 0 18px,rgba(255,200,150,.02) 18px 19px),
    radial-gradient(ellipse at center 80%,rgba(0,0,0,.5),transparent 60%);
  mix-blend-mode:overlay
}

/* The whole hardware unit */
.tpos-machine{
  position:relative;display:flex;flex-direction:column;align-items:center;
  width:min(100%,1280px);
  height:100%;
}

/* Bezel + screen frame */
.tpos-bezel{
  width:100%;
  flex:1;min-height:0;
  display:flex;flex-direction:column;
  background:linear-gradient(180deg,#191614 0%,#0a0807 100%);
  border-radius:16px 16px 6px 6px;
  padding:14px 14px 12px;
  box-shadow:
    0 30px 60px rgba(0,0,0,.55),
    0 6px 14px rgba(0,0,0,.35),
    inset 0 1px 0 rgba(255,255,255,.08),
    inset 0 -1px 0 rgba(0,0,0,.5);
  position:relative;
}
/* speaker grille / branding row */
.tpos-bezel::before{
  content:'⏻';position:absolute;top:6px;right:18px;color:#3a3530;font-size:9px;
  letter-spacing:.3em
}
.tpos-bezel::after{
  /* tiny camera dot top center */
  content:'';position:absolute;top:5px;left:50%;width:4px;height:4px;border-radius:50%;
  background:radial-gradient(circle,#1a1612 30%,#0a0807 70%);
  box-shadow:inset 0 0 0 .5px #2a2521;transform:translateX(-50%);
}

/* The actual screen */
.tpos-screen{
  width:100%;
  flex:1;min-height:0;
  background:var(--tpos-bg);
  border-radius:3px;
  overflow:hidden;
  display:flex;flex-direction:column;
  position:relative;
  box-shadow:
    inset 0 0 0 1px #000,
    inset 0 0 24px rgba(0,0,0,.35);
}
.tpos-screen::after{
  /* glass reflection */
  content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(125deg,rgba(255,255,255,.05) 0%,transparent 30%,transparent 70%,rgba(255,255,255,.03) 100%);
  z-index:9
}

/* base / printer unit (orange Damai style) */
.tpos-base{
  width:54%;height:88px;
  background:linear-gradient(180deg,#2a2521 0%,#1a1612 100%);
  border-radius:0 0 18px 18px;
  position:relative;
  margin-top:-3px;
  box-shadow:0 12px 24px rgba(0,0,0,.5);
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
  border-top:1px solid #000;
}
.tpos-base::before{
  /* orange paper feed cutout */
  content:'';position:absolute;left:14%;right:14%;top:6px;bottom:26px;
  background:linear-gradient(180deg,var(--tpos-orange) 0%,var(--tpos-orange-2) 100%);
  border-radius:8px;
  box-shadow:inset 0 -4px 10px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.18);
}
.tpos-base::after{
  /* paper slit */
  content:'';position:absolute;top:14px;left:22%;right:22%;height:4px;
  background:#0e0a07;border-radius:2px;box-shadow:inset 0 1px 2px rgba(0,0,0,.8);
  z-index:2
}
.tpos-brand{
  position:absolute;bottom:7px;left:50%;transform:translateX(-50%);
  font-size:14px;font-weight:900;letter-spacing:.32em;color:#f5f0e9;
  font-family:-apple-system,'SF Pro Display',sans-serif;z-index:3;
  text-shadow:0 1px 0 rgba(0,0,0,.4)
}
/* stand neck shadow */
.tpos-stand{
  width:42%;height:8px;
  background:linear-gradient(180deg,#0a0807 0%,transparent 100%);
  border-radius:0 0 50% 50% / 0 0 100% 100%;
  margin-top:-2px;
  filter:blur(.5px);
}

/* ---------------- Inner screen content (was tpos-body) ---------------- */
.tpos-body{flex:1;display:flex;min-height:0;position:relative}
.tpos-side{
  width:78px;background:var(--tpos-side);color:#fff;
  display:flex;flex-direction:column;flex-shrink:0;
  border-right:1px solid #1f1c1a;
}
.tpos-side .item{
  height:62px;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:4px;font-size:11px;color:#bcb1a4;cursor:pointer;
  border-bottom:1px solid rgba(255,255,255,.04);
  position:relative;letter-spacing:.04em
}
.tpos-side .item .ic{font-size:20px;opacity:.85;line-height:1}
.tpos-side .item.on{color:var(--tpos-orange);background:rgba(241,138,58,.08)}
.tpos-side .item.on::before{content:'';position:absolute;left:0;top:6px;bottom:6px;width:3px;background:var(--tpos-orange);border-radius:0 2px 2px 0}
.tpos-side .item.checkout{margin-top:auto;background:var(--tpos-orange);color:#fff;border-radius:6px 0 0 6px;
  margin-left:6px;height:54px;margin-bottom:6px}
.tpos-side .item.checkout::before{display:none}
.tpos-side .gear{margin-top:auto;display:flex;flex-direction:column;align-items:center;
  padding:8px 0 12px;gap:10px;color:#7b736b}
.tpos-side .gear i{font-style:normal;font-size:16px;cursor:pointer;opacity:.6}

/* ---------------- Menu grid (background) ---------------- */
.tpos-menu{flex:1;display:flex;min-width:0;flex-direction:column;background:var(--tpos-bg)}
.tpos-tabs{
  display:flex;gap:8px;padding:10px 14px 6px;background:#F5F2EE;border-bottom:1px solid var(--tpos-line);
  flex-shrink:0;align-items:center
}
.tpos-tabs .tab{
  padding:6px 14px;border-radius:14px;font-size:12.5px;color:var(--tpos-text-2);cursor:pointer;
  font-weight:500;letter-spacing:.04em
}
.tpos-tabs .tab.on{background:var(--tpos-orange);color:#fff}
.tpos-tabs .grow{flex:1}
.tpos-tabs .pill{padding:5px 12px;border-radius:14px;background:#fff;border:1px solid var(--tpos-line);
  font-size:11.5px;color:var(--tpos-text-2)}

.tpos-grid-wrap{flex:1;display:flex;min-height:0}
.tpos-cats{
  width:88px;background:#F1ECE6;display:flex;flex-direction:column;flex-shrink:0;
  border-right:1px solid var(--tpos-line)
}
.tpos-cats .c{padding:14px 8px;text-align:center;font-size:12.5px;color:var(--tpos-text-2);cursor:pointer;
  border-bottom:1px solid #e6dfd6;letter-spacing:.05em;font-weight:500}
.tpos-cats .c.on{background:var(--tpos-orange);color:#fff}

.tpos-products{flex:1;padding:12px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;
  align-content:start;overflow:hidden}
.tpos-product{
  background:var(--tpos-card);border:1px solid var(--tpos-line);border-radius:6px;
  display:flex;flex-direction:column;overflow:hidden;cursor:pointer;
  box-shadow:0 1px 0 rgba(0,0,0,.02)
}
.tpos-product .img{
  height:78px;background:linear-gradient(135deg,var(--bg1,#f5e7d6),var(--bg2,#e8d3b9));
  display:flex;align-items:center;justify-content:center;font-size:30px;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.15);
  letter-spacing:-.05em;font-weight:700;font-family:'Noto Serif TC',serif;
  position:relative
}
.tpos-product .img::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 70% 30%,rgba(255,255,255,.2),transparent 60%)}
.tpos-product .nm{padding:6px 8px 2px;font-size:12.5px;font-weight:500;color:var(--tpos-text);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tpos-product .pr{padding:0 8px 6px;font-size:14px;color:var(--tpos-orange);font-weight:700;
  font-family:-apple-system,'SF Pro Display',sans-serif}

/* ---------------- Order panel (right) ---------------- */
.tpos-order{
  width:230px;background:var(--tpos-card);border-left:1px solid var(--tpos-line);
  display:flex;flex-direction:column;flex-shrink:0
}
.tpos-order .top{padding:8px 12px;display:flex;gap:6px;border-bottom:1px solid var(--tpos-line);
  font-size:11.5px}
.tpos-order .top .seg{padding:4px 8px;border-radius:4px;color:var(--tpos-text-2);cursor:pointer}
.tpos-order .top .seg.on{background:var(--tpos-orange);color:#fff}
.tpos-order .icons{display:flex;justify-content:space-around;padding:8px 0;border-bottom:1px solid var(--tpos-line);
  font-size:10.5px;color:var(--tpos-text-2)}
.tpos-order .icons span{display:flex;flex-direction:column;align-items:center;gap:2px}
.tpos-order .icons em{font-size:14px;font-style:normal}
.tpos-order .member{padding:6px 10px;border-bottom:1px solid var(--tpos-line);
  display:flex;gap:6px;align-items:center;font-size:11.5px;color:var(--tpos-text-3)}
.tpos-order .member input{flex:1;border:1px solid var(--tpos-line);border-radius:4px;
  padding:4px 6px;font-size:11px;background:#fafafa}
.tpos-order .lines{flex:1;overflow:auto;padding:6px}
.tpos-order .ln{
  background:#fff;border:1px solid var(--tpos-orange);border-radius:4px;
  padding:6px 8px;margin-bottom:4px;display:flex;gap:8px;align-items:flex-start;
  font-size:12px
}
.tpos-order .ln .qty{background:var(--tpos-orange);color:#fff;width:18px;height:18px;
  border-radius:3px;display:flex;align-items:center;justify-content:center;font-weight:700;
  flex-shrink:0;font-size:11px}
.tpos-order .ln .body{flex:1;min-width:0}
.tpos-order .ln .nm{font-weight:500;display:flex;justify-content:space-between}
.tpos-order .ln .opt{color:var(--tpos-text-3);font-size:10.5px;margin-top:1px}
.tpos-order .totals{padding:8px 12px;border-top:1px solid var(--tpos-line);display:flex;justify-content:space-between;
  font-size:12px;color:var(--tpos-text-2)}
.tpos-order .totals .amt{color:var(--tpos-text);font-weight:700;font-size:14px}
.tpos-order .actions{padding:8px;display:flex;gap:6px;border-top:1px solid var(--tpos-line)}
.tpos-order .actions .b{flex:1;padding:8px;border-radius:4px;border:1px solid var(--tpos-line);
  background:#fff;font-size:12px;cursor:pointer;color:var(--tpos-text)}
.tpos-order .actions .checkout{background:var(--tpos-orange);color:#fff;border-color:var(--tpos-orange);
  font-weight:700;flex:2}

/* ---------------- Checkout modal (the calendar) ---------------- */
.tpos-stage{position:absolute;inset:0;pointer-events:none;display:flex;
  align-items:center;justify-content:center;z-index:5}
.tpos-modal-wrap{position:relative;pointer-events:auto;width:88%;max-width:1100px;height:90%;max-height:700px;display:flex;justify-content:center;align-items:center}
.tpos-modal{
  pointer-events:auto;
  width:100%;height:100%;background:#fff;border-radius:8px;
  box-shadow:0 20px 60px rgba(0,0,0,.35),0 0 0 1px rgba(0,0,0,.05);
  display:flex;flex-direction:column;overflow:hidden;position:relative;
}
.tpos-modal::before{
  /* small triangle on the side bar to imply it's anchored to the orange checkout button */
  content:'';position:absolute;left:-8px;top:50%;transform:translateY(-50%);
  width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;
  border-right:8px solid #fff
}
.tpos-modal-hd{
  padding:10px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--tpos-line);
  background:#FAF7F3;flex-shrink:0
}
.tpos-modal-hd .seg{display:flex;gap:0;border:1px solid var(--tpos-line);border-radius:4px;overflow:hidden}
.tpos-modal-hd .seg .s{padding:4px 12px;font-size:12px;cursor:pointer;color:var(--tpos-text-2);background:#fff}
.tpos-modal-hd .seg .s.on{background:var(--tpos-orange);color:#fff}
.tpos-modal-hd .lbl{font-size:12px;color:var(--tpos-text-2);margin-right:4px}
.tpos-modal-hd .grow{flex:1}
.tpos-modal-hd .close{width:22px;height:22px;border-radius:50%;border:none;background:#eee;
  cursor:pointer;color:var(--tpos-text-2);font-size:12px;line-height:1}

.tpos-modal-body{flex:1;display:flex;min-height:0}
.tpos-modal-left{flex:1;padding:12px 14px;display:flex;flex-direction:column;gap:8px;
  border-right:1px solid var(--tpos-line);min-width:0;overflow:hidden}
.tpos-modal-right{width:300px;padding:12px 14px;display:flex;flex-direction:column;gap:6px;flex-shrink:0}

.tpos-row{display:grid;grid-template-columns:70px 1fr;align-items:center;gap:8px;font-size:12px}
.tpos-row > .k{color:var(--tpos-text-2);text-align:right}
.tpos-row > .v{display:flex;gap:4px;align-items:center;flex-wrap:wrap}
.tpos-row .pill{padding:3px 9px;border-radius:3px;border:1px solid var(--tpos-line);background:#fff;font-size:11px;color:var(--tpos-text-2);cursor:pointer}
.tpos-row .pill.on{background:var(--tpos-orange);color:#fff;border-color:var(--tpos-orange);font-weight:600}
.tpos-row .input{padding:4px 8px;border:1px solid var(--tpos-line);border-radius:3px;font-size:12px;background:#fff;min-width:90px}
.tpos-row .input.dim{color:var(--tpos-text-3);background:#fafafa}

.tpos-yiji{
  flex:1;display:grid;grid-template-columns:1fr 1fr;gap:10px;min-height:0;
  border-top:1px dashed var(--tpos-line);padding-top:8px
}
.tpos-yiji .col{display:flex;flex-direction:column;min-height:0;background:#FAF7F3;
  border-radius:4px;border:1px solid var(--tpos-line);padding:8px 10px}
.tpos-yiji h4{margin:0 0 6px;font-size:12px;color:var(--tpos-text-2);
  display:flex;align-items:center;gap:6px;font-weight:500}
.tpos-yiji h4 .badge{background:var(--tpos-orange);color:#fff;width:18px;height:18px;display:flex;
  align-items:center;justify-content:center;border-radius:3px;font-weight:700;font-size:11px}
.tpos-yiji h4.ji .badge{background:var(--tpos-red)}
.tpos-yiji ul{margin:0;padding:0;list-style:none;flex:1;overflow:hidden;
  font-size:11.5px;line-height:1.5;color:var(--tpos-text)}
.tpos-yiji li{padding:2px 0;border-bottom:1px dotted #e6dfd6;display:flex;justify-content:space-between;gap:6px}
.tpos-yiji li .t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tpos-yiji li .p{color:var(--tpos-orange);font-weight:600;font-family:-apple-system,'SF Pro Display',sans-serif;flex-shrink:0}
.tpos-yiji.ji li .p{color:var(--tpos-red)}

/* right: amount + numpad */
.tpos-amount-row{display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1px solid var(--tpos-line);padding-bottom:6px}
.tpos-amount-row .lbl{font-size:11px;color:var(--tpos-text-2);background:var(--tpos-orange-soft);
  padding:1px 6px;border-radius:2px;color:var(--tpos-orange-2)}
.tpos-amount-row .val{font-size:32px;font-weight:700;color:var(--tpos-text);
  font-family:-apple-system,'SF Pro Display',sans-serif;letter-spacing:-.02em}

.tpos-amount-detail{display:flex;justify-content:space-between;font-size:11px;color:var(--tpos-text-2)}
.tpos-amount-detail .v{color:var(--tpos-text);font-weight:500}

.tpos-pay-method{display:flex;gap:0;border:1px solid var(--tpos-line);border-radius:4px;overflow:hidden;font-size:11.5px}
.tpos-pay-method .m{flex:1;text-align:center;padding:5px 0;color:var(--tpos-text-2);cursor:pointer;
  border-right:1px solid var(--tpos-line)}
.tpos-pay-method .m:last-child{border-right:none}
.tpos-pay-method .m.on{background:var(--tpos-orange-soft);color:var(--tpos-orange-2);font-weight:600}

.tpos-numpad{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:4px;flex:1;min-height:0}
.tpos-numpad .k{
  background:#fff;border:1px solid var(--tpos-line);border-radius:3px;
  display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--tpos-text);
  cursor:pointer;font-family:-apple-system,'SF Pro Display',sans-serif;font-weight:500;
  position:relative;min-height:30px
}
.tpos-numpad .k.preset{background:var(--tpos-orange);color:#fff;border-color:var(--tpos-orange);font-weight:700}
.tpos-numpad .k .sub{position:absolute;top:1px;right:3px;font-size:8px;color:rgba(255,255,255,.7);font-weight:400}
.tpos-numpad .k.bs{color:var(--tpos-text-3)}
.tpos-numpad .k.ok{background:#fff;color:var(--tpos-text)}

.tpos-checkout-cta{display:flex;gap:6px;margin-top:6px}
.tpos-checkout-cta .b{flex:1;padding:8px 0;border-radius:4px;border:1px solid var(--tpos-orange);
  background:#fff;color:var(--tpos-orange);font-size:13px;cursor:pointer;font-weight:600}
.tpos-checkout-cta .b.now{background:var(--tpos-orange);color:#fff}

/* ---------------- Footer system bar ---------------- */
.tpos-sysbar{
  height:30px;background:#1A1715;color:#9a8f82;
  display:flex;align-items:center;padding:0 12px;font-size:11px;gap:14px;flex-shrink:0;
  font-family:-apple-system,'SF Pro Display',sans-serif
}
.tpos-sysbar .ic{opacity:.7}
.tpos-sysbar .grow{flex:1}
.tpos-sysbar .nav{display:flex;gap:18px;color:#bbb}
.tpos-sysbar .nav span{cursor:pointer;font-size:12px}

/* ---------------- Tear animations ---------------- */
.tpos-modal-wrap[data-tear]{animation-fill-mode:both}
.tpos-modal-wrap[data-tear="up"]{animation:tpos-up 1s cubic-bezier(.4,0,.2,1)}
.tpos-modal-wrap[data-tear="down"]{animation:tpos-down 1s cubic-bezier(.4,0,.2,1)}
.tpos-modal-wrap[data-tear="left"]{animation:tpos-left 1s cubic-bezier(.4,0,.2,1)}
.tpos-modal-wrap[data-tear="right"]{animation:tpos-right 1s cubic-bezier(.4,0,.2,1)}
.tpos-modal-wrap[data-tear="fold"]{animation:tpos-pop 1s cubic-bezier(.4,0,.2,1)}
@keyframes tpos-up{
  0%{opacity:0;transform:translateY(120%) scale(.95)}
  40%{opacity:1}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes tpos-down{
  0%{opacity:0;transform:translateY(-120%) scale(.95)}
  40%{opacity:1}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes tpos-left{
  0%{opacity:0;transform:translateX(120%) scale(.95)}
  40%{opacity:1}
  100%{opacity:1;transform:translateX(0) scale(1)}
}
@keyframes tpos-right{
  0%{opacity:0;transform:translateX(-120%) scale(.95)}
  40%{opacity:1}
  100%{opacity:1;transform:translateX(0) scale(1)}
}
@keyframes tpos-pop{
  0%{opacity:0;transform:scale(.7) rotateZ(-2deg)}
  60%{transform:scale(1.02) rotateZ(.5deg)}
  100%{opacity:1;transform:scale(1) rotateZ(0)}
}

/* "PAID" stamp */
.tpos-stamp{
  position:absolute;top:46px;right:18px;
  border:2px solid var(--tpos-red);border-radius:6px;color:var(--tpos-red);
  padding:2px 10px;font-size:18px;font-weight:900;letter-spacing:.15em;
  font-family:-apple-system,'SF Pro Display',sans-serif;
  transform:rotate(-12deg);opacity:.85;
  font-style:italic;
  box-shadow:inset 0 0 0 1px var(--tpos-red)
}
.tpos-stamp .iso{font-size:9px;letter-spacing:.05em;display:block;text-align:center;font-style:normal;opacity:.85}

@media (max-width:820px){
  /* Downgrade strategy: ditch the fake POS-machine chrome (bezel / sidebar /
   * menu grid / order panel / base / stand / system bar) — they only make
   * sense at desktop. The modal alone IS the calendar's real content; on
   * tablet/phone we promote it to fullscreen page content. */
  .tpos-root{padding:0}
  .tpos-machine{width:100%;height:100%;max-width:none}
  .tpos-bezel{padding:0;border-radius:0;box-shadow:none;background:#fff}
  .tpos-bezel::before,.tpos-bezel::after{display:none}
  .tpos-base,.tpos-stand,.tpos-sysbar{display:none}
  .tpos-screen{border-radius:0;box-shadow:none}
  .tpos-screen::after{display:none}
  .tpos-side,.tpos-menu,.tpos-order{display:none}
  .tpos-stage{align-items:stretch;justify-content:stretch;pointer-events:auto}
  .tpos-modal-wrap{width:100%;height:100%;max-width:none;max-height:none}
  .tpos-modal{border-radius:0;box-shadow:none;width:100%;height:100%}
  .tpos-modal::before{display:none}
  .tpos-modal-hd{padding:8px 12px;font-size:11px;flex-wrap:wrap;gap:6px}
  .tpos-modal-body{flex-direction:column;overflow-y:auto}
  .tpos-modal-left{flex:none;padding:12px 14px;border-right:none}
  .tpos-modal-right{width:100%;flex:none;padding:12px 14px;max-height:none;border-top:1px solid var(--tpos-line)}
  .tpos-yiji{grid-template-columns:1fr;gap:10px}
  .tpos-row{font-size:12px;grid-template-columns:64px 1fr}
  .tpos-amount-row .val{font-size:28px}
  .tpos-numpad{grid-template-columns:repeat(4,1fr);gap:3px}
  .tpos-numpad .k{min-height:32px;font-size:11px}
  .tpos-stamp{width:80px;height:80px;font-size:18px;top:50%;right:14px;transform:translateY(-50%) rotate(-12deg)}
}
@media (max-width:480px){
  /* Tighter typography on the same downgrade — POS-machine chrome already
   * hidden by the ≤820 block above. */
  .tpos-modal-hd{padding:6px 10px;font-size:10px;gap:4px}
  .tpos-modal-hd .seg .s{padding:3px 8px;font-size:10px}
  .tpos-modal-hd .lbl{font-size:10px}
  .tpos-modal-hd .pill{font-size:10px;padding:2px 8px}
  .tpos-modal-left{padding:10px 12px}
  .tpos-modal-right{padding:10px 12px}
  .tpos-row{font-size:11px;grid-template-columns:54px 1fr;gap:5px}
  .tpos-row .pill{font-size:10px;padding:2px 7px}
  .tpos-row .input{font-size:11px;padding:3px 6px}
  .tpos-yiji h4{font-size:11.5px}
  .tpos-yiji ul{font-size:11px;line-height:1.4}
  .tpos-amount-row .val{font-size:24px}
  .tpos-amount-row .lbl{font-size:10.5px}
  .tpos-amount-detail{font-size:10.5px}
  .tpos-numpad{grid-template-columns:repeat(3,1fr);gap:3px}
  .tpos-numpad .k{min-height:30px;font-size:10.5px;padding:5px 0}
  .tpos-numpad .k .sub{display:none}
  .tpos-pay-method{font-size:10px}
  .tpos-pay-method .m{padding:4px 0}
  .tpos-checkout-cta button{padding:8px;font-size:11px}
  .tpos-stamp{width:60px;height:60px;font-size:14px}
}
    `;
    const s = document.createElement('style');
    s.id = styleId; s.textContent = css; document.head.appendChild(s);
  }

  function renderText(t) { return window.AlmanacRender.renderText(t); }

  // Generate stable food background colors from a seed
  function bg(seed) {
    const palettes = [
      ['#F4D7A8','#E0AC65'], ['#FBC9B5','#E88E6E'], ['#D5E4C8','#92B57E'],
      ['#E6D2C5','#B89478'], ['#F6E5A8','#D9B948'], ['#D8C3E0','#9F7CB6'],
      ['#FFCFB5','#E08454'], ['#C9D8E6','#7A99B6'], ['#F2C0C0','#C26060'],
      ['#E8E4D0','#A89E72'], ['#FFD9D0','#E89684'], ['#C5DBC8','#79A383'],
    ];
    return palettes[seed % palettes.length];
  }

  function PosTheme(props) {
    const p = props;
    const seed = p.year * 10000 + p.month * 100 + p.day;
    const total = p.yi.length * 10 + p.ji.length * 5 + p.day; // playful "amount"
    // Background menu products — derived from yi list so they aren't always fixed
    const menuItems = [
      { n: '養樂多綠', emoji: '養', k: 'green', pr: 45 },
      { n: '冰糖洛神梅', emoji: '梅', k: 'pink', pr: 45 },
      { n: '冬瓜檸茶', emoji: '冬', k: 'tea', pr: 45 },
      { n: '蜂農花蜜茶', emoji: '蜜', k: 'honey', pr: 45 },
      { n: '柳丁綠', emoji: '柳', k: 'orange', pr: 35 },
      { n: '紅茶拿鐵', emoji: '紅', k: 'red', pr: 50 },
      { n: '可可歐蕾', emoji: '可', k: 'choco', pr: 60 },
      { n: '宇治抹茶', emoji: '抹', k: 'matcha', pr: 65 },
    ];
    return (
      <div className="tpos-root">
        <div className="tpos-machine">
          <div className="tpos-bezel">
            <div className="tpos-screen">
              <div className="tpos-body">

          {/* sidebar */}
          <aside className="tpos-side">
            <div className="item"><span className="ic">🍴</span>點餐</div>
            <div className="item"><span className="ic">🍱</span>麥早餐</div>
            <div className="item on"><span className="ic">🥤</span>內用桌位</div>
            <div className="item"><span className="ic">📋</span>今日訂單</div>
            <div className="item"><span className="ic">☁︎</span>新訂單</div>
            <div className="item"><span className="ic">📦</span>預購單</div>
            <div className="item checkout"><span className="ic">💳</span>結帳單</div>
            <div className="gear">
              <i>$</i>
              <i>⟲</i>
              <i>⚙︎</i>
            </div>
          </aside>

          {/* menu */}
          <main className="tpos-menu">
            <div className="tpos-tabs">
              <span className="tab">麥早餐</span>
              <span className="tab">麥便當</span>
              <span className="tab on">麥飲料</span>
              <span className="grow"/>
              <span className="pill">內用 · 桌號 A-{((p.day % 12) + 1).toString().padStart(2,'0')}</span>
            </div>
            <div className="tpos-grid-wrap">
              <div className="tpos-cats">
                <div className="c">早餐</div>
                <div className="c">便當</div>
                <div className="c on">飲料</div>
                <div className="c">輕食</div>
                <div className="c">甜點</div>
                <div className="c">加購</div>
              </div>
              <div className="tpos-products">
                {menuItems.map((m, i) => {
                  const [a, b] = bg(seed + i);
                  return (
                    <div className="tpos-product" key={i}>
                      <div className="img" style={{'--bg1': a, '--bg2': b}}>{m.emoji}</div>
                      <div className="nm">{m.n}</div>
                      <div className="pr">${m.pr}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>

          {/* order panel */}
          <aside className="tpos-order">
            <div className="top">
              <span className="seg">外帶</span>
              <span className="seg">外送</span>
              <span className="seg on">內用</span>
              <span className="seg" style={{marginLeft:'auto'}}>選桌號 ▾</span>
            </div>
            <div className="icons">
              <span><em>👤</em>會員</span>
              <span><em>🗓</em>行銷</span>
              <span><em>%</em>折扣</span>
              <span><em>🖨</em>主打</span>
              <span><em>⋯</em>其他</span>
            </div>
            <div className="member">
              <input placeholder="請輸入會員帳號"/>
              <span style={{color:'var(--tpos-orange)',cursor:'pointer'}}>✕</span>
            </div>
            <div className="lines">
              {p.yi.slice(0, 3).map((it, i) => (
                <div className="ln" key={it.id}>
                  <span className="qty">1</span>
                  <div className="body">
                    <div className="nm"><span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'100px'}}>{it.text}</span><span style={{color:'var(--tpos-orange)',fontWeight:600}}>${(i+1)*15+30}</span></div>
                    <div className="opt">M / 正常糖 / 正常冰</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="totals">
              <span>總數 <span className="amt">{p.yi.length}</span></span>
              <span>結額 <span className="amt" style={{color:'var(--tpos-orange)'}}>${total}</span></span>
            </div>
            <div className="actions">
              <button className="b">清空</button>
              <button className="b">合併</button>
              <button className="b checkout">結帳</button>
            </div>
          </aside>

          {/* checkout modal */}
          <div className="tpos-stage">
            <div className="tpos-modal-wrap" data-tear={props.phase === 'tearing' ? props.tearKind : null} key={p.iso}>
            <div className="tpos-modal">
              <div className="tpos-modal-hd">
                <span className="lbl">取餐方式</span>
                <div className="seg">
                  <span className="s">外帶</span>
                  <span className="s">外送</span>
                  <span className="s on">內用</span>
                  <span className="s">桌號</span>
                </div>
                <span className="lbl" style={{marginLeft:'10px'}}>桌號</span>
                <span className="pill" style={{padding:'3px 10px',border:'1px solid var(--tpos-line)',borderRadius:'3px',fontSize:'11.5px',background:'#fff'}}>A-{((p.day % 12)+1).toString().padStart(2,'0')} ▾</span>
                <span className="grow"/>
                <button className="close">✕</button>
              </div>

              <div className="tpos-modal-body">
                <div className="tpos-modal-left">
                  <div className="tpos-row">
                    <span className="k">指定時間</span>
                    <span className="v">
                      <span className="input">(今日) {String(p.month).padStart(2,'0')}/{String(p.day).padStart(2,'0')}（{p.weekday}）▾</span>
                      <span className="input">{p.hours[1]?.range?.split('-')[0] || '11:00'} ▾</span>
                    </span>
                  </div>
                  <div className="tpos-row">
                    <span className="k">農曆日期</span>
                    <span className="v">
                      <span className="input dim">{p.lunarMonthCN}{p.lunarDayCN}</span>
                      <span className="input dim">{p.ganzhi}</span>
                    </span>
                  </div>
                  <div className="tpos-row">
                    <span className="k">沖煞</span>
                    <span className="v">
                      <span className="pill">沖 {p.chong}</span>
                      <span className="pill">煞 {p.engSha}</span>
                      <span className="pill">{p.zodiac}年</span>
                    </span>
                  </div>

                  <div className="tpos-yiji">
                    <div className="col">
                      <h4><span className="badge">宜</span>本日推薦</h4>
                      <ul>
                        {p.yi.slice(0, 7).map((it, i) => (
                          <li key={it.id}>
                            <span className="t">{renderText(it.text)}</span>
                            <span className="p">+${(i+1)*5+10}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col">
                      <h4 className="ji"><span className="badge">忌</span>不可加購</h4>
                      <ul className="ji" style={{listStyle:'none',padding:0,margin:0,flex:1,fontSize:'11.5px',lineHeight:1.5}}>
                        {p.ji.slice(0, 7).map((it, i) => (
                          <li key={it.id} style={{padding:'2px 0',borderBottom:'1px dotted #e6dfd6',display:'flex',justifyContent:'space-between'}}>
                            <span style={{flex:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{renderText(it.text)}</span>
                            <span style={{color:'var(--tpos-red)',fontWeight:600,fontFamily:'-apple-system,SF Pro Display,sans-serif'}}>×</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="tpos-modal-right">
                  <div className="tpos-amount-row">
                    <span className="lbl">結帳金額</span>
                    <span className="val">${total}</span>
                  </div>
                  <div className="tpos-amount-detail">
                    <span>現金</span><span className="v">請輸入收款金額</span>
                  </div>
                  <div className="tpos-amount-detail" style={{borderBottom:'1px dashed var(--tpos-line)',paddingBottom:'4px'}}>
                    <span>找零金額</span><span className="v" style={{color:'var(--tpos-orange)'}}>$0</span>
                  </div>

                  <div className="tpos-checkout-cta">
                    <button className="b">稍後結帳</button>
                    <button className="b now">立即結帳</button>
                  </div>

                  <div className="tpos-pay-method" style={{marginTop:'4px'}}>
                    <span className="m on">現金</span>
                    <span className="m">Uber Eats</span>
                    <span className="m">LINE Pay</span>
                  </div>

                  <div className="tpos-numpad">
                    <span className="k preset">100<span className="sub">1</span></span>
                    <span className="k">7</span><span className="k">8</span><span className="k">9</span>
                    <span className="k preset">500<span className="sub">5</span></span>
                    <span className="k">4</span><span className="k">5</span><span className="k">6</span>
                    <span className="k preset">1000<span className="sub">10</span></span>
                    <span className="k">1</span><span className="k">2</span><span className="k">3</span>
                    <span className="k">剛好</span>
                    <span className="k">0</span><span className="k">.</span><span className="k bs">⌫</span>
                  </div>
                </div>
              </div>

              <div className="tpos-stamp">
                PAID
                <span className="iso">{p.iso}</span>
              </div>
            </div>

            {/* prev/next floating control - anchored to .tpos-modal-wrap (position:relative) */}
            <div style={{position:'absolute',bottom:8,right:14,
              display:'flex',gap:6,alignItems:'center',
              fontSize:12,zIndex:10,pointerEvents:'auto'}}>
              <button onClick={p.onPrev} style={{padding:'4px 10px',border:'1px solid var(--tpos-line)',borderRadius:3,background:'#fff',cursor:'pointer'}}>← 上一單</button>
              <input type="date" value={p.iso} onChange={e=>p.onPickDate(e.target.value)}
                style={{padding:'4px 6px',border:'1px solid var(--tpos-line)',borderRadius:3,fontSize:11,background:'#fff'}}/>
              <button onClick={p.onNext} style={{padding:'4px 10px',border:'1px solid var(--tpos-line)',borderRadius:3,background:'#fff',cursor:'pointer'}}>下一單 →</button>
              <button onClick={p.onToday} style={{padding:'4px 10px',border:'1px solid var(--tpos-orange)',borderRadius:3,background:'var(--tpos-orange)',color:'#fff',fontWeight:600,cursor:'pointer'}}>今日</button>
            </div>
            </div>
          </div>
        </div>

        <div className="tpos-sysbar">
          <span className="ic">⋯</span>
          <span className="ic">⌬</span>
          <span className="ic">☀</span>
          <span className="ic">🔊</span>
          <span className="ic">📶</span>
          <span className="grow"/>
          <span className="nav">
            <span>‹</span>
            <span>○</span>
            <span>☰</span>
          </span>
          <span className="grow"/>
          <span>1</span>
          <span>下午{(((p.day*7+p.month*3) % 12)+1).toString().padStart(1,'0')}:{(p.day*13 % 60).toString().padStart(2,'0')}</span>
        </div>
            </div>{/* /screen */}
          </div>{/* /bezel */}
          <div className="tpos-base">
            <span className="tpos-brand">DAMAI</span>
          </div>
          <div className="tpos-stand"/>
        </div>{/* /machine */}
      </div>
    );
  }

  window.AlmanacThemes.register({
    id: 'pos',
    label: '大麥 POS 結帳機',
    desc: '飲料店 POS · 結帳 modal 是日曆 · 換日掀開看到底層菜單',
    render: PosTheme,
  });
})();
