import { useState, useEffect, useRef, useCallback } from "react";

const GOLD = "#D4AF37";
const GOLD2 = "#FFD700";
const BG = "#0A0A0A";
const BG2 = "#111111";
const CARD = "#181818";
const TEXT = "#FFFFFF";
const TEXT2 = "#BFBFBF";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Roboto+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;width:100%;overflow-x:hidden}
body{background:#0A0A0A;color:#fff;font-family:'Roboto',sans-serif;width:100%;max-width:100%;overflow-x:hidden;margin:0;padding:0;text-align:left}
#root{width:100%;max-width:100%;margin:0;padding:0;overflow-x:hidden}
img,video,svg{max-width:100%;height:auto}
section{width:100%;overflow:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#111}
::-webkit-scrollbar-thumb{background:linear-gradient(#D4AF37,#FFD700);border-radius:2px}
.serif{font-family:'Roboto',sans-serif;font-weight:300}
.mono{font-family:'Roboto Mono',monospace}
.gold{color:#D4AF37}
.gold2{color:#FFD700}
.btn-gold{background:linear-gradient(135deg,#D4AF37,#FFD700);color:#0A0A0A;font-weight:600;border:none;cursor:pointer;transition:all .3s;font-family:'Roboto',sans-serif;letter-spacing:.04em}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(212,175,55,.4)}
.btn-outline{background:transparent;color:#D4AF37;border:1px solid #D4AF37;cursor:pointer;transition:all .3s;font-family:'Roboto',sans-serif}
.btn-outline:hover{background:rgba(212,175,55,.1);transform:translateY(-2px)}
.card{background:#181818;border:1px solid rgba(212,175,55,.12);transition:all .4s}
.card:hover{border-color:rgba(212,175,55,.35);transform:translateY(-4px);box-shadow:0 20px 60px rgba(212,175,55,.08)}
.section-title{font-family:'Roboto',sans-serif;font-size:clamp(2.2rem,5vw,3.5rem);font-weight:300;letter-spacing:-.02em}
.fade-in{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
.fade-in.visible{opacity:1;transform:translateY(0)}
.stagger-1{transition-delay:.1s}
.stagger-2{transition-delay:.2s}
.stagger-3{transition-delay:.3s}
.stagger-4{transition-delay:.4s}
.nav-link{color:#BFBFBF;text-decoration:none;font-size:.85rem;letter-spacing:.08em;text-transform:uppercase;transition:color .3s;position:relative}
.nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:#D4AF37;transition:width .3s}
.nav-link:hover{color:#D4AF37}
.nav-link:hover::after,.nav-link.active::after{width:100%}
.nav-link.active{color:#D4AF37}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem}
.modal{background:#111;border:1px solid rgba(212,175,55,.25);border-radius:16px;padding:2rem;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;position:relative}
.modal::-webkit-scrollbar{width:3px}
.modal::-webkit-scrollbar-thumb{background:#D4AF37}
.input-field{background:#0A0A0A;border:1px solid rgba(212,175,55,.2);border-radius:8px;color:#fff;padding:.75rem 1rem;width:100%;font-family:'Roboto',sans-serif;font-size:.9rem;transition:border-color .3s;outline:none}
.input-field:focus{border-color:#D4AF37}
.input-field::placeholder{color:#555}
.tag{display:inline-flex;align-items:center;gap:4px;background:rgba(212,175,55,.1);color:#D4AF37;border:1px solid rgba(212,175,55,.2);padding:3px 10px;border-radius:20px;font-size:.75rem;font-weight:500;letter-spacing:.03em}
.skill-bar{height:3px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden}
.skill-bar-fill{height:100%;background:linear-gradient(90deg,#D4AF37,#FFD700);border-radius:2px;transition:width 1.5s cubic-bezier(.4,0,.2,1)}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse-gold{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.8;transform:scale(1.05)}}
@keyframes typing{from{width:0}to{width:100%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes count-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.typewriter{overflow:hidden;white-space:nowrap;border-right:2px solid #D4AF37;animation:typing 2s steps(30,end) forwards,blink .8s infinite}
.hero-bg-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;animation:pulse-gold 4s ease-in-out infinite}
.admin-pill{position:fixed;bottom:2rem;right:2rem;z-index:500;background:rgba(17,17,17,.95);border:1px solid rgba(212,175,55,.3);border-radius:50px;padding:.5rem 1.2rem;cursor:pointer;transition:all .3s;font-size:.8rem;color:#D4AF37;letter-spacing:.06em}
.admin-pill:hover{border-color:#D4AF37;box-shadow:0 4px 20px rgba(212,175,55,.2)}
.status-badge{padding:3px 10px;border-radius:20px;font-size:.7rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem}
.split-2{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
.hero-grid{display:grid;grid-template-columns:1fr auto;gap:4rem;align-items:center}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.project-img{width:100%;height:180px;object-fit:cover;border-radius:10px 10px 0 0}
.cert-img{width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:1rem}
select.input-field option{background:#111}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 0;transition:all .4s;border-bottom:1px solid transparent}
.nav.scrolled{background:rgba(10,10,10,.95);backdrop-filter:blur(20px);border-bottom-color:rgba(212,175,55,.1)}
@keyframes marquee-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.marquee-section{padding:2.5rem 2rem;border-bottom:1px solid rgba(212,175,55,.08);width:100%}
.marquee-viewport{max-width:1200px;margin:0 auto;overflow:hidden;position:relative;width:100%}
.marquee-viewport::before,.marquee-viewport::after{content:'';position:absolute;top:0;bottom:0;width:100px;z-index:2;pointer-events:none}
.marquee-viewport::before{left:0;background:linear-gradient(90deg,#0A0A0A 0%,transparent 100%)}
.marquee-viewport::after{right:0;background:linear-gradient(270deg,#0A0A0A 0%,transparent 100%)}
.marquee-track{display:flex;width:max-content;animation:marquee-scroll 35s linear infinite;will-change:transform}
.marquee-viewport:hover .marquee-track{animation-play-state:paused}
.marquee-item{display:flex;align-items:center;gap:.6rem;padding:.55rem 1.2rem .55rem .55rem;margin:0 .6rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:50px;text-decoration:none;transition:border-color .3s,background .3s,transform .3s;flex-shrink:0}
.marquee-item:hover{border-color:rgba(212,175,55,.3);background:rgba(212,175,55,.05);transform:translateY(-2px)}
.marquee-icon{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.marquee-label{font-size:.85rem;color:#BFBFBF;font-weight:500;letter-spacing:.03em;white-space:nowrap}
.marquee-item:hover .marquee-label{color:#D4AF37}
@media(max-width:768px){.marquee-section{padding:2rem 1.25rem}.marquee-viewport::before,.marquee-viewport::after{width:40px}.marquee-track{animation-duration:25s}.marquee-item{padding:.5rem 1rem .5rem .5rem;margin:0 .4rem}.marquee-icon{width:32px;height:32px}.marquee-label{font-size:.78rem}}
@keyframes fr-spin-cw{to{transform:rotate(360deg)}}
@keyframes fr-spin-ccw{to{transform:rotate(-360deg)}}
@keyframes fr-star-drift{0%{transform:translate(0,0);opacity:.3}50%{opacity:1}100%{transform:translate(45px,0);opacity:0}}
@keyframes fr-card-glow{0%,100%{box-shadow:0 0 18px rgba(212,175,55,.1),0 0 0 1px rgba(212,175,55,.2)}50%{box-shadow:0 0 40px rgba(212,175,55,.28),0 0 0 1px rgba(212,175,55,.5)}}
.featured-card{position:relative;border-radius:18px;cursor:pointer;border:1px solid rgba(212,175,55,.22);overflow:hidden;transition:transform .4s;background:linear-gradient(135deg,#161616 0%,#0f0f0f 100%);animation:fr-card-glow 4s ease-in-out infinite}
.featured-card:hover{transform:translateY(-4px)}
.featured-content{position:relative;padding:2rem;z-index:2;border-radius:18px;overflow:hidden}
.featured-starfield{position:absolute;inset:0;z-index:0;pointer-events:none}
.featured-star{position:absolute;border-radius:50%;background:#FFD700;box-shadow:0 0 6px 1px rgba(255,215,0,.7),0 0 12px 2px rgba(212,175,55,.4);animation:fr-star-drift linear infinite}
.featured-ring{position:absolute;border-radius:50%;border:1px solid transparent;z-index:0;pointer-events:none}
.fr1{top:50%;right:10px;width:340px;height:340px;margin-top:-170px;border-top-color:rgba(212,175,55,.45);border-right-color:rgba(255,215,0,.2);animation:fr-spin-cw 11s linear infinite}
.fr2{top:50%;right:38px;width:280px;height:280px;margin-top:-140px;border-bottom-color:rgba(212,175,55,.38);border-left-color:rgba(255,215,0,.18);animation:fr-spin-ccw 13s linear infinite}
.fr3{top:50%;right:66px;width:220px;height:220px;margin-top:-110px;border-top-color:rgba(255,215,0,.4);border-right-color:rgba(212,175,55,.2);animation:fr-spin-cw 9s linear infinite}
.fr4{top:50%;right:94px;width:160px;height:160px;margin-top:-80px;border-bottom-color:rgba(212,175,55,.35);border-left-color:rgba(255,215,0,.22);animation:fr-spin-ccw 7s linear infinite}
.fr5{top:50%;right:122px;width:100px;height:100px;margin-top:-50px;border-top-color:rgba(255,215,0,.45);animation:fr-spin-cw 5s linear infinite}
.featured-badge{background:linear-gradient(135deg,#D4AF37,#FFD700);color:#0A0A0A;font-weight:700;font-size:.72rem;padding:4px 12px;border-radius:50px;letter-spacing:.04em}
.featured-inner{display:flex;gap:2.5rem;align-items:center}
.featured-title{font-size:1.6rem;font-weight:700;margin-bottom:.7rem;background:linear-gradient(135deg,#fff,#D4AF37);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;line-height:1.2}
.featured-cta{display:inline-flex;align-items:center;gap:.4rem;color:#D4AF37;font-weight:600;font-size:.9rem;transition:gap .3s}
.featured-card:hover .featured-cta{gap:.7rem}
.featured-metrics{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.12);border-radius:14px;overflow:hidden;flex-shrink:0;min-width:280px;position:relative;z-index:1;backdrop-filter:blur(2px)}
.featured-metric{background:rgba(18,18,18,.85);padding:1.1rem 1.4rem;text-align:center}
.featured-metric-val{font-size:1.6rem;font-weight:700;color:#D4AF37;line-height:1;font-family:'Roboto',sans-serif}
.featured-metric-lbl{font-size:.68rem;color:#BFBFBF;margin-top:.35rem;letter-spacing:.03em}
@media(max-width:860px){.featured-inner{flex-direction:column;align-items:stretch;gap:1.5rem}.featured-metrics{min-width:0;width:100%}.featured-ring{display:none}}
@media(max-width:480px){.featured-content{padding:1.4rem}.featured-title{font-size:1.3rem}.featured-metric-val{font-size:1.3rem}}
.case-modal{background:#0F0F0F;border:1px solid rgba(212,175,55,.25);border-radius:18px;padding:2.2rem;width:100%;max-width:780px;max-height:92vh;overflow-y:auto;position:relative;animation:count-up .35s ease}
.case-modal::-webkit-scrollbar{width:4px}
.case-modal::-webkit-scrollbar-thumb{background:#D4AF37;border-radius:2px}
.case-close{position:absolute;top:1.2rem;right:1.2rem;background:rgba(255,255,255,.05);border:1px solid rgba(212,175,55,.15);color:#BFBFBF;cursor:pointer;font-size:1.1rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;z-index:5;transition:all .3s}
.case-close:hover{border-color:#D4AF37;color:#D4AF37}
.case-hero{position:relative;margin:-2.2rem -2.2rem 1.5rem;padding:2.2rem 2.2rem 1.6rem;overflow:hidden;border-bottom:1px solid rgba(212,175,55,.12);border-radius:18px 18px 0 0}
@keyframes case-glow-pulse{0%,100%{opacity:.4;transform:translate(0,0)}50%{opacity:.8;transform:translate(-15px,8px)}}
.case-hero-glow{position:absolute;top:-60%;right:-10%;width:320px;height:320px;background:radial-gradient(circle,rgba(212,175,55,.16),transparent 65%);filter:blur(40px);pointer-events:none;animation:case-glow-pulse 6s ease-in-out infinite;z-index:0}
.case-header{position:relative;z-index:1;display:flex;gap:1.1rem;align-items:flex-start;padding-right:2.5rem}
.case-icon{font-size:2.6rem;line-height:1;flex-shrink:0;filter:drop-shadow(0 0 14px rgba(212,175,55,.4))}
.case-badge{display:inline-block;background:linear-gradient(135deg,#D4AF37,#FFD700);color:#0A0A0A;font-weight:700;font-size:.68rem;padding:3px 11px;border-radius:50px;letter-spacing:.04em;margin-bottom:.5rem}
.case-title{font-size:1.55rem;font-weight:700;color:#fff;line-height:1.2}
.case-overview{color:#BFBFBF;font-size:.92rem;line-height:1.75;margin-bottom:1.8rem}
.case-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.2);border-radius:14px;overflow:hidden;margin-bottom:1.8rem}
.case-metric{background:linear-gradient(160deg,#171717,#121212);padding:1.3rem .6rem;text-align:center;transition:background .3s}
.case-metric:hover{background:linear-gradient(160deg,#1d1a12,#151207)}
.case-metric-val{font-size:1.6rem;font-weight:700;color:#D4AF37;line-height:1}
.case-metric-lbl{font-size:.66rem;color:#BFBFBF;margin-top:.4rem;letter-spacing:.02em}
.case-section{margin-bottom:1.8rem}
.case-h3{font-size:.95rem;font-weight:600;color:#fff;margin-bottom:.9rem;letter-spacing:.02em;display:flex;align-items:center;gap:.5rem}
.case-h3::before{content:'';width:3px;height:14px;background:linear-gradient(#D4AF37,#FFD700);border-radius:2px;display:inline-block}
.case-highlights{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}
.case-highlight{display:flex;gap:.7rem;align-items:flex-start;background:rgba(255,255,255,.02);border:1px solid rgba(212,175,55,.1);border-radius:12px;padding:.9rem 1rem;transition:border-color .3s,transform .3s}
.case-highlight:hover{border-color:rgba(212,175,55,.3);transform:translateY(-2px)}
.case-highlight-icon{font-size:1.4rem;line-height:1;flex-shrink:0}
.case-highlight-title{font-weight:600;font-size:.85rem;color:#D4AF37;margin-bottom:.2rem}
.case-highlight-text{font-size:.76rem;color:#BFBFBF;line-height:1.5}
.case-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem}
.case-flow-step{background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.25);color:#D4AF37;padding:.55rem 1rem;border-radius:8px;font-size:.78rem;font-weight:500;white-space:nowrap;transition:all .3s}
.case-flow-step:hover{background:rgba(212,175,55,.16);transform:translateY(-2px)}
.case-flow-arrow{color:#D4AF37;font-size:.9rem;opacity:.5}
.case-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem}
.case-expert{background:rgba(255,255,255,.02);border:1px solid rgba(212,175,55,.08);border-radius:10px;padding:.9rem 1rem;margin-bottom:.6rem;transition:border-color .3s}
.case-expert:hover{border-color:rgba(212,175,55,.25)}
.case-expert-name{display:flex;align-items:center;gap:.5rem;font-weight:600;font-size:.86rem;color:#fff;margin-bottom:.3rem}
.case-expert-num{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#D4AF37,#FFD700);color:#0A0A0A;font-size:.7rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.case-analyzer{display:flex;gap:.5rem;align-items:center;margin-bottom:.6rem;font-size:.82rem;color:#BFBFBF;padding:.4rem 0}
.case-stack-row{display:flex;gap:1rem;padding:.7rem 0;border-bottom:1px solid rgba(255,255,255,.05)}
.case-stack-label{flex-shrink:0;width:90px;font-size:.78rem;color:#D4AF37;font-weight:600;text-transform:uppercase;letter-spacing:.04em}
.case-stack-items{font-size:.82rem;color:#BFBFBF;line-height:1.5}
@media(max-width:680px){.case-modal{padding:1.5rem}.case-hero{margin:-1.5rem -1.5rem 1.3rem;padding:1.5rem 1.5rem 1.3rem}.case-metrics{grid-template-columns:1fr 1fr}.case-highlights{grid-template-columns:1fr}.case-grid{grid-template-columns:1fr;gap:1.5rem}.case-title{font-size:1.3rem}}
@keyframes otw-slide{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
@keyframes otw-pulse{0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,.5)}70%{box-shadow:0 0 0 8px rgba(52,211,153,0)}}
.otw-badge{position:absolute;bottom:-28px;right:-16px;background:rgba(17,17,17,.95);backdrop-filter:blur(12px);border:1px solid rgba(212,175,55,.2);border-radius:40px;padding:.55rem 1rem .55rem .75rem;display:flex;align-items:center;gap:.5rem;animation:otw-slide 1s ease 1s both;box-shadow:0 8px 32px rgba(0,0,0,.4)}
.otw-dot{width:8px;height:8px;border-radius:50%;background:#34d399;flex-shrink:0;animation:otw-pulse 2s ease infinite}
.otw-text{font-size:.72rem;font-weight:600;color:#D4AF37;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
.otw-sub{font-size:.65rem;color:#666;white-space:nowrap;font-family:'Roboto Mono',monospace}
.otw-badge::before{content:'';position:absolute;inset:-1px;border-radius:40px;background:linear-gradient(135deg,rgba(212,175,55,.15),transparent);pointer-events:none}
.section-pad{padding:6rem 2rem}
.nav-inner{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;justify-content:space-between;align-items:center;gap:1rem}
.nav-links-desktop{display:flex;gap:2.5rem;align-items:center}
.nav-resume{display:inline-block}
.nav-burger{display:none;background:none;border:none;color:#D4AF37;cursor:pointer;font-size:1.6rem;line-height:1;padding:0;width:40px;height:40px}
.mobile-menu{display:none;flex-direction:column;gap:.25rem;background:rgba(10,10,10,.98);backdrop-filter:blur(20px);border-top:1px solid rgba(212,175,55,.12);padding:1rem 1.5rem;max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease}
.mobile-menu.open{max-height:520px;padding:1.25rem 1.5rem}
.mobile-link{color:#BFBFBF;text-decoration:none;font-size:.95rem;letter-spacing:.06em;text-transform:uppercase;padding:.7rem 0;border-bottom:1px solid rgba(255,255,255,.05);transition:color .3s}
.mobile-link:hover,.mobile-link.active{color:#D4AF37}
.hero-ring{width:clamp(200px,28vw,260px);height:clamp(200px,28vw,260px)}
.hero-ring-inner{width:92%;height:92%}
.hero-avatar-wrap{display:flex;justify-content:center}
@media(max-width:1024px){.hero-grid{gap:2rem}}
@media(max-width:900px){
  .split-2{grid-template-columns:1fr;gap:2.5rem}
  .hero-grid{grid-template-columns:1fr;gap:3rem;text-align:center}
  .hero-grid .hero-btns,.hero-grid .hero-social,.hero-grid .hero-typing{justify-content:center}
}
@media(max-width:768px){
  .nav-links-desktop{display:none}
  .nav-resume{display:none}
  .nav-burger{display:block}
  .mobile-menu{display:flex}
  .nav-inner{padding:0 1.25rem}
  .section-title{font-size:2rem}
  .hero-btns{flex-direction:column;align-items:stretch}
  .hero-btns button{width:100%}
  .section-pad{padding:4rem 1.25rem}
  .form-row{grid-template-columns:1fr}
}
@media(max-width:480px){
  .section-title{font-size:1.7rem}
  .section-pad{padding:3rem 1rem}
  .modal{padding:1.5rem}
}
`;

const defaultData = {
  profile: {
    name: "Ahmad Al-Zawahrah",
    title: "Computer Engineer & AI Developer",
    taglines: ["Developer", "Mobile App Developer", "Network Engineer", "Problem Solver", "AI/ML Engineer"],
    bio: "Computer Engineer with a passion for continuous learning and adaptation. Skilled in software development, AI, networking, and modern web and mobile technologies.",
    location: "Zarqa, Jordan",
    email: "subzero7142856112@gmail.com",
    github: "https://github.com/subzero7142856112-dotcom",
    linkedin: "https://www.linkedin.com/in/ahmad-zwahrah-89063229a",
    whatsapp: "https://wa.me/962776493254",
    resume: "https://drive.google.com/file/d/1yAootOPL8oGhnzONIp_bgowajD3fOdOd/view?usp=drive_link",
    about: "I have always believed that success is not measured by what you achieve for yourself, but by the impact you leave behind. As a Computer Engineer, my ambition extends far beyond earning a degree or building software — I aspire to create technology that leaves a lasting mark and contributes to shaping the future.\n\nDriven by curiosity and a relentless desire to grow, I continuously expand my expertise across multiple domains, including Artificial Intelligence, Networking, Web Development, and Mobile Applications. I thrive in dynamic environments, adapt quickly to emerging technologies, and view every challenge as an opportunity to innovate and evolve.\n\nMy ultimate goal is to establish a meaningful presence in the technology world, building solutions, products, and ideas that outlive trends and create real value. I aim to be recognized not only for technical excellence, but for making a lasting contribution that inspires others and leaves a legacy in the ever-evolving digital era."
  },
  stats: [
    { label: "Projects Completed", value: 27, suffix: "+" },
    { label: "Certificates Earned", value: 5, suffix: "" },
    { label: "Technologies", value: 24, suffix: "+" },
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Freelance Projects", value: 8, suffix: "" }
  ],
  skills: [
    { id: 1, name: "Python", category: "Programming", years: 3, level: 82, description: "Backend development, automation, and AI/ML pipelines.", techs: ["Django", "FastAPI", "NumPy", "Pandas"] },
    { id: 2, name: "C++", category: "Programming", years: 3, level: 75, description: "Object-oriented programming and system-level development.", techs: ["OOP", "STL", "Algorithms"] },
    { id: 3, name: "Flutter", category: "Mobile Development", years: 2, level: 78, description: "Cross-platform mobile applications for Android and iOS.", techs: ["Dart", "Firebase", "REST APIs"] },
    { id: 4, name: "Web Development", category: "Web Development", years: 2, level: 80, description: "Full-stack web development from multiple sources and frameworks.", techs: ["HTML", "CSS", "JavaScript", "React"] },
    { id: 5, name: "AI & Machine Learning", category: "AI & Machine Learning", years: 2, level: 75, description: "Building and deploying intelligent systems and LLM-based solutions.", techs: ["Python", "TensorFlow", "LLMs", "Prompt Engineering"] },
    { id: 6, name: "Networking (CCNA)", category: "Networking", years: 2, level: 80, description: "Network design, configuration, and security certified by Cisco.", techs: ["Cisco", "TCP/IP", "Routing", "Switching"] },
    { id: 7, name: "Cybersecurity", category: "Cybersecurity", years: 2, level: 72, description: "Phishing detection, web security, and system protection.", techs: ["OWASP", "Wireshark", "Nmap", "Python"] },
    { id: 8, name: "Operating Systems", category: "Tools", years: 2, level: 70, description: "OS fundamentals including process management and memory.", techs: ["Linux", "Windows", "Shell Scripting"] },
  ],
  experiences: [
    { id: 1, position: "Technical Committee Member", company: "ELCOM – Hashemite University", type: "Volunteer", start: "2023-01", end: null, description: "Active team member across multiple committees including technical support, development, AI expertise, graduation projects, and AI tools & prompting.", technologies: ["Flutter", "Python", "AI Tools", "Web Dev"], achievements: ["Led multiple technical teams", "Developed mobile app for the committee", "Provided AI workshops and training"], location: "Zarqa, Jordan" },
  ],
  education: [
    { id: 1, degree: "B.S. Computer Engineering", university: "Hashemite University", faculty: "Engineering Department", department: "Computer Engineering", gpa: "2.9", start: "2020", end: "2026", description: "Specializing in software development, AI, networking, and mobile technologies. Active member in student technical committees." },
  ],
  projects: [
    { id: 1, name: "AI Phishing Detection System", category: "Cybersecurity", featured: true, description: "ModernBERT-based multi-expert AI system for phishing email detection. Combines 3 expert transformer models, a fusion layer, and 6 specialized analyzers — selected as an official security system for the Hashemite University.", technologies: ["Python", "ModernBERT", "PyTorch", "XGBoost", "FastAPI", "Transformers"], features: ["3 expert AI models + fusion layer", "6 specialized analyzers", "Real-time email analysis", "Gmail & Outlook integration"], status: "Completed", github: "https://github.com/subzero7142856112-dotcom", demo: "", start: "2024-01", end: "2025-06", banner: "",
      caseStudy: {
        supervisor: "Dr. Mohammad Al-hammouri",
        tagline: "Graduation Project · AI & Cybersecurity",
        overview: "An end-to-end intelligent email security system that detects phishing attacks in real time. Built on ModernBERT transformer architecture, it combines three specialized expert models with a fusion layer and six rule-based analyzers — achieving near-perfect accuracy and zero false positives. The system was officially selected to protect the Hashemite University's email infrastructure.",
        metrics: [
          { value: 99.39, suffix: "%", label: "Binary F1 Score" },
          { value: 100, suffix: "%", label: "Phishing Detection" },
          { value: 0, suffix: "%", label: "False Positive Rate" },
          { value: 175, suffix: "K+", label: "URLs Analyzed" },
        ],
        highlights: [
          { icon: "🎯", title: "99.98% ROC-AUC", text: "Near-perfect discrimination between phishing and legitimate emails." },
          { icon: "🏛️", title: "University Deployed", text: "Adopted as an official security system at Hashemite University." },
          { icon: "⚡", title: "Real-Time Analysis", text: "Sub-second verdicts on incoming emails via FastAPI backend." },
          { icon: "🔗", title: "Inbox Integration", text: "Native Gmail & Outlook integration with OAuth 2.0 + PKCE." },
        ],
        flow: ["Email Input", "6 Analyzers", "3 AI Experts", "Fusion Layer", "Verdict"],
        experts: [
          { name: "Binary Phishing Expert", detail: "F1 99.39% · ROC-AUC 99.98% · trained on 89,855 labeled samples" },
          { name: "Cyber Context Expert", detail: "12-label multilabel · F1 97.87% · detects urgency, authority pressure & credential theft" },
          { name: "Intent Context Expert", detail: "22-class classifier · F1 96.65% · identifies the attacker's underlying intent" },
        ],
        analyzers: ["URL Analyzer (ML + 12 heuristic rules)", "Header Analyzer (7 forensic checks)", "Typosquat Detector", "Domain Age Checker (WHOIS)", "Blacklist Checker (175K+ URLs)", "Sender Reputation (ML)"],
        stack: [
          { label: "AI / ML", items: "ModernBERT · PyTorch · Transformers · XGBoost" },
          { label: "Backend", items: "Python · FastAPI · WHOIS · OAuth 2.0 + PKCE" },
          { label: "Data", items: "89,855 training samples · 175K+ URL blacklist" },
        ],
      } },
    { id: 2, name: "Quran Platform", category: "Web Development", description: "A comprehensive online Quran platform with recitation, translation, and learning features.", technologies: ["React", "JavaScript", "CSS", "APIs"], features: ["Full Quran recitation", "Translation support", "Search functionality", "Responsive design"], status: "In Progress", github: "https://github.com/subzero7142856112-dotcom", demo: "", start: "2024-06", end: null, banner: "" },
    { id: 3, name: "Marketing Website", category: "Web Development", description: "Professional marketing website built for a client with modern design and full responsiveness.", technologies: ["HTML", "CSS", "JavaScript", "React"], features: ["Modern UI/UX", "Fully responsive", "SEO optimized", "Fast loading"], status: "Completed", github: "https://github.com/subzero7142856112-dotcom", demo: "", start: "2023-06", end: "2023-09", banner: "" },
  ],
  certs: [
    { id: 1, name: "CCNA – Cisco Certified Network Associate", issuer: "Cisco", issued: "2023-01", expiry: "", credId: "", url: "", image: "" },
    { id: 2, name: "Web Design", issuer: "Tournpage (American)", issued: "2022-01", expiry: "", credId: "", url: "", image: "" },
    { id: 3, name: "Flutter Developer", issuer: "Udemy", issued: "2023-06", expiry: "", credId: "", url: "", image: "" },
    { id: 4, name: "Large Language Model Systems Expert", issuer: "Hashemite University", issued: "2024-01", expiry: "", credId: "", url: "", image: "" },
    { id: 5, name: "American Baccalaureate – Computer Engineering", issuer: "Academic", issued: "2020-01", expiry: "", credId: "", url: "", image: "" },
  ],
  achievements: [
    { id: 1, title: "Winner – Science Day", date: "2026-05-20", organization: "Hashemite University", description: "Won first place at the university Science Day event on 20/5/2026." },
    { id: 2, title: "Winner – AI Day", date: "2026-05-10", organization: "Hashemite University", description: "Recognized as a winner at the AI Day event on 10/5/2026." },
    { id: 3, title: "Mobile App Developer – ELCOM Committee", date: "2023-09", organization: "ELCOM – Hashemite University", description: "Core member of the developers team that built the official mobile app for ELCOM committee." },
    { id: 4, title: "Cybersecurity Platform Adopted by University", date: "2024-12", organization: "Hashemite University", description: "Phishing attack detection platform selected to be used as an official security system at the university." },
    { id: 5, title: "Team Leader", date: "2023-01", organization: "Multiple Projects", description: "Consistently served as team leader across academic and extracurricular technical projects, leading diverse engineering teams." },
  ],
  courses: [
    { id: 1, name: "Python Programming", provider: "Udemy", duration: "2 months", completed: "2022-06", skills: ["Python", "OOP", "Automation"] },
    { id: 2, name: "C++ Programming", provider: "Udemy", duration: "2 months", completed: "2022-03", skills: ["C++", "OOP", "Data Structures"] },
    { id: 3, name: "Flutter Mobile Development", provider: "Udemy", duration: "3 months", completed: "2023-06", skills: ["Flutter", "Dart", "Firebase"] },
    { id: 4, name: "Web Development", provider: "Multiple Sources", duration: "4 months", completed: "2023-09", skills: ["HTML", "CSS", "JavaScript", "React"] },
    { id: 5, name: "AI Tools & Prompting", provider: "YouTube & GitHub Communities", duration: "Ongoing", completed: "2024-01", skills: ["LLMs", "Prompt Engineering", "AI Tools"] },
    { id: 6, name: "Operating Systems", provider: "Hashemite University", duration: "1 semester", completed: "2023-01", skills: ["Linux", "Process Management", "Memory"] },
    { id: 7, name: "CCNA Networking", provider: "Cisco", duration: "4 months", completed: "2023-01", skills: ["Routing", "Switching", "Network Security"] },
  ],
  freelance: [
    { id: 1, clientType: "Business Client", name: "Tourism App", duration: "2 months", technologies: ["Flutter", "Dart", "Firebase"], description: "Cross-platform tourism mobile application with location features and listings.", deliverables: ["Android App", "iOS App", "Backend Integration"], results: "Delivered a fully functional tourism app with smooth UX.", nda: false },
    { id: 2, clientType: "Business Client", name: "Dog Hotel Website", duration: "1 month", technologies: ["HTML", "CSS", "JavaScript"], description: "Professional website for a pet hotel business with booking and gallery features.", deliverables: ["Responsive Website", "Booking Form", "Gallery"], results: "Client launched the site and gained online presence.", nda: false },
    { id: 3, clientType: "Business Client", name: "Data Entry & Task Management", duration: "Ongoing", technologies: ["Excel", "Python", "Automation"], description: "Data entry automation and task management solutions for business clients.", deliverables: ["Automated Scripts", "Reports", "Data Sheets"], results: "Reduced manual work significantly for clients.", nda: false },
  ]
};

// ─── Helpers ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  const decimals = Number.isInteger(target) ? 0 : (String(target).split(".")[1] || "").length;
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`fade-in${visible ? " visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ animation: "count-up .3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 500, fontSize: "1.3rem", color: GOLD }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(212,175,55,.15)", color: TEXT2, cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FieldRow({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: ".8rem", color: GOLD, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".4rem" }}>{label}</label>
      {children}
    </div>
  );
}

const catColors = {
  "Programming": "#D4AF37", "AI & Machine Learning": "#22d3ee", "Web Development": "#a78bfa",
  "DevOps": "#34d399", "Cloud Computing": "#60a5fa", "Databases": "#f87171",
  "Cybersecurity": "#fb923c", "Mobile Development": "#c084fc", "Networking": "#4ade80", "Tools": "#94a3b8"
};

const statusColors = {
  "Completed": { bg: "rgba(52,211,153,.1)", color: "#34d399", border: "rgba(52,211,153,.3)" },
  "In Progress": { bg: "rgba(212,175,55,.1)", color: "#D4AF37", border: "rgba(212,175,55,.3)" },
  "Archived": { bg: "rgba(100,116,139,.1)", color: "#94a3b8", border: "rgba(100,116,139,.3)" }
};

// ─── Nav ───────────────────────────────────────────────────
function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Home", "About", "Skills", "Experience", "Projects", "Certs", "Contact"];
  const go = (l) => { onNav(l.toLowerCase()); setMenuOpen(false); };
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#home" onClick={() => go("Home")} className="serif" style={{ fontSize: "1.5rem", fontWeight: 500, color: GOLD, letterSpacing: ".05em", textDecoration: "none" }}>AZ</a>
        <div className="nav-links-desktop">
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link${active === l.toLowerCase() ? " active" : ""}`} onClick={() => go(l)}>{l}</a>)}
        </div>
        <button className="nav-resume btn-gold" style={{ padding: ".5rem 1.4rem", borderRadius: 50, fontSize: ".8rem" }} onClick={() => window.open("#")}>Resume</button>
        <button className="nav-burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className={`mobile-link${active === l.toLowerCase() ? " active" : ""}`} onClick={() => go(l)}>{l}</a>
        ))}
        <a href="#" className="btn-gold" style={{ padding: ".7rem", borderRadius: 10, textAlign: "center", textDecoration: "none", marginTop: ".5rem" }}>↓ Download Resume</a>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────
function Hero({ data }) {
  const [tagIdx, setTagIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const tag = data.taglines[tagIdx];
    if (typing) {
      if (displayed.length < tag.length) {
        const t = setTimeout(() => setDisplayed(tag.slice(0, displayed.length + 1)), 70);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setTagIdx((tagIdx + 1) % data.taglines.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, tagIdx, data.taglines]);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "6rem 2rem 4rem" }}>
      <div className="hero-bg-orb" style={{ width: 500, height: 500, background: "rgba(212,175,55,.06)", top: "-100px", right: "-100px" }} />
      <div className="hero-bg-orb" style={{ width: 300, height: 300, background: "rgba(212,175,55,.04)", bottom: "100px", left: "-50px", animationDelay: "2s" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(212,175,55,.04) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div>
          <FadeIn delay={0}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.2)", borderRadius: 50, padding: "6px 16px", marginBottom: "1.5rem" }}>
              <span style={{ width: 6, height: 6, background: "#34d399", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #34d399" }} />
              <span style={{ fontSize: ".8rem", color: TEXT2, letterSpacing: ".08em" }}>Available for opportunities</span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="serif" style={{ fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: ".5rem" }}>
              {data.name.split(" ")[0]}<br />
              <span style={{ color: GOLD }}>{data.name.split(" ").slice(1).join(" ")}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="hero-typing" style={{ minHeight: "2.5rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ color: TEXT2, fontSize: "1.1rem" }}>I'm a </span>
              <span className="mono" style={{ color: GOLD, fontSize: "1.1rem", borderRight: `2px solid ${GOLD}`, paddingRight: "4px" }}>{displayed}</span>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <p style={{ color: TEXT2, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 520, marginBottom: "2.5rem" }}>{data.bio}</p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <button className="btn-gold" style={{ padding: ".85rem 2.2rem", borderRadius: 50, fontSize: ".9rem" }} onClick={() => window.open(data.resume)}>
                ↓ Download Resume
              </button>
              <button className="btn-outline" style={{ padding: ".85rem 2.2rem", borderRadius: 50, fontSize: ".9rem" }} onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                Get In Touch
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="hero-social" style={{ display: "flex", gap: "1rem" }}>
              {[
                { icon: "🐱", label: "GitHub", url: data.github },
                { icon: "💼", label: "LinkedIn", url: data.linkedin },
                { icon: "✉", label: "Email", url: `mailto:${data.email}` },
                { icon: "💬", label: "WhatsApp", url: data.whatsapp },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{ width: 42, height: 42, border: "1px solid rgba(212,175,55,.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: TEXT2, textDecoration: "none", transition: "all .3s", fontSize: "1rem" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,.25)"; e.currentTarget.style.color = TEXT2; e.currentTarget.style.transform = ""; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={300} className="hero-avatar-wrap">
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="hero-ring" style={{ borderRadius: "50%", background: `conic-gradient(${GOLD}, transparent, ${GOLD})`, padding: "2px", animation: "spin 8s linear infinite" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: BG, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div className="hero-ring-inner" style={{ borderRadius: "50%", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 200 200" style={{ width: "72%", height: "72%" }} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700"/>
                        <stop offset="50%" stopColor="#D4AF37"/>
                        <stop offset="100%" stopColor="#B8860B"/>
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <circle cx="100" cy="100" r="95" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6"/>
                    <line x1="100" y1="5" x2="100" y2="22" stroke="url(#goldGrad)" strokeWidth="1.5"/>
                    <line x1="100" y1="178" x2="100" y2="195" stroke="url(#goldGrad)" strokeWidth="1.5"/>
                    <circle cx="100" cy="28" r="3" fill="url(#goldGrad)" opacity="0.8"/>
                    <circle cx="100" cy="172" r="3" fill="url(#goldGrad)" opacity="0.8"/>
                    <g filter="url(#glow)">
                      <polygon points="45,55 155,55 155,48 130,48 100,35 70,48 45,48" fill="url(#goldGrad)"/>
                      <polygon points="45,62 45,165 62,165 62,90 90,120 100,132 110,120 138,90 138,165 155,165 155,62 138,62 100,108 62,62" fill="url(#goldGrad)"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="otw-badge">
              <span className="otw-dot" />
              <span className="otw-text">Open to Work</span>
              <span className="otw-sub">Full-time · Contract</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Social Marquee ────────────────────────────────────────
function SocialMarquee({ profile }) {
  const socials = [
    { name: "GitHub", color: "#ffffff", bg: "#181717", url: profile.github, icon: "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" },
    { name: "LinkedIn", color: "#ffffff", bg: "#0A66C2", url: profile.linkedin, icon: "M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2M8 19H5v-9h3zM6.5 8.3a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5M19 19h-3v-4.7c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3v-9h2.9v1.2A3.1 3.1 0 0 1 14 9.7c3 0 3.7 2 3.7 4.6z" },
    { name: "WhatsApp", color: "#ffffff", bg: "#25D366", url: profile.whatsapp, icon: "M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5v-.5L9 6.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.3 1.8.8 2.5.8 3.4.7.5 0 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.3A10 10 0 1 0 12 2" },
    { name: "Email", color: "#ffffff", bg: "#EA4335", url: `mailto:${profile.email}`, icon: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0-8 5-8-5zm0 12H4V8l8 5 8-5z" },
    { name: "Instagram", color: "#ffffff", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", url: "#", icon: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.3 2.2.4.6.2 1 .4 1.4.9.5.4.7.8.9 1.4.1.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.3 1.8-.4 2.2-.2.6-.4 1-.9 1.4-.4.5-.8.7-1.4.9-.4.1-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.3-2.2-.4-.6-.2-1-.4-1.4-.9-.5-.4-.7-.8-.9-1.4-.1-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.3-1.8.4-2.2.2-.6.4-1 .9-1.4.4-.5.8-.7 1.4-.9.4-.1 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1m0 2.2c-3.1 0-3.5 0-4.7.1-1.2 0-1.8.3-2.2.4-.5.2-.9.4-1.3.8s-.6.8-.8 1.3c-.1.4-.4 1-.4 2.2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.2.3 1.8.4 2.2.2.5.4.9.8 1.3s.8.6 1.3.8c.4.1 1 .4 2.2.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.2 0 1.8-.3 2.2-.4.5-.2.9-.4 1.3-.8s.6-.8.8-1.3c.1-.4.4-1 .4-2.2.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.2-.3-1.8-.4-2.2-.2-.5-.4-.9-.8-1.3s-.8-.6-1.3-.8c-.4-.1-1-.4-2.2-.4-1.2-.1-1.6-.1-4.7-.1m0 3.7a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8m0 9.7a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6m7.5-9.9a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0" },
    { name: "Telegram", color: "#ffffff", bg: "#26A5E4", url: "#", icon: "M22 3.4 18.8 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.3 13.3l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.4 1.3z" },
    { name: "Discord", color: "#ffffff", bg: "#5865F2", url: "#", icon: "M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18.3 18.3 0 0 1 4.3 1.4 18.4 18.4 0 0 0-15-.7A18 18 0 0 1 8.8 3.3L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 0 13.4.3 17.8a20 20 0 0 0 6 3l.5-.7c-.7-.3-1.4-.6-2-1l.5-.4a14 14 0 0 0 12 0l.5.4c-.6.4-1.3.7-2 1l.5.7a20 20 0 0 0 6-3c.3-5-.6-9.4-2.5-13.4M8.3 15.3c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4-.9 2.4-2.1 2.4m7.4 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4-.9 2.4-2.1 2.4" },
  ];
  const doubled = [...socials, ...socials];
  return (
    <section className="marquee-section">
      <div className="marquee-viewport">
        <div className="marquee-track">
          {doubled.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noreferrer" className="marquee-item" title={s.name}>
              <span className="marquee-icon" style={{ background: s.bg }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill={s.color}><path d={s.icon} /></svg>
              </span>
              <span className="marquee-label">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────
function Stats({ data }) {
  return (
    <section style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(212,175,55,.08)", borderBottom: "1px solid rgba(212,175,55,.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "2rem" }}>
        {data.map((s, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div style={{ textAlign: "center" }}>
              <div className="serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: GOLD, lineHeight: 1 }}>
                <AnimCounter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: ".8rem", color: TEXT2, marginTop: ".5rem", letterSpacing: ".06em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────
function About({ profile }) {
  return (
    <section id="about" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ marginBottom: "3rem" }}>
          <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 001</p>
          <h2 className="section-title">About <span style={{ color: GOLD }}>Me</span></h2>
        </div></FadeIn>
        <div className="split-2">
          <FadeIn delay={100}>
            <div style={{ whiteSpace: "pre-line", color: TEXT2, lineHeight: 1.8, fontSize: "1rem" }}>{profile.about}</div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a href={`mailto:${profile.email}`} className="btn-outline" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem", textDecoration: "none", display: "inline-block" }}>✉ Email Me</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem", textDecoration: "none", display: "inline-block" }}>GitHub</a>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ display: "grid", gap: "1rem" }}>
              {[
                { label: "Location", value: profile.location },
                { label: "Email", value: profile.email },
                { label: "Focus", value: "AI Systems & Full Stack" },
                { label: "Status", value: "Open to opportunities" },
                { label: "Languages", value: "English, Python, JavaScript" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", padding: "1rem 1.2rem", background: CARD, border: "1px solid rgba(212,175,55,.1)", borderRadius: 10 }}>
                  <span style={{ color: GOLD, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".06em", minWidth: 80 }}>{item.label}</span>
                  <span style={{ color: TEXT, fontSize: ".9rem", wordBreak: "break-word", minWidth: 0 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────
function Skills({ skills, isAdmin, onAdd, onEdit, onDelete }) {
  const cats = [...new Set(skills.map(s => s.category))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter(s => s.category === active);
  const [ref, visible] = useInView();

  return (
    <section id="skills" style={{ padding: "6rem 2rem", background: BG2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 002</p>
            <h2 className="section-title">Technical <span style={{ color: GOLD }}>Skills</span></h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add Skill</button>}
        </div></FadeIn>
        <FadeIn>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {["All", ...cats].map(c => (
              <button key={c} onClick={() => setActive(c)} style={{ padding: ".4rem 1rem", borderRadius: 20, fontSize: ".8rem", border: `1px solid ${active === c ? GOLD : "rgba(212,175,55,.2)"}`, background: active === c ? "rgba(212,175,55,.1)" : "transparent", color: active === c ? GOLD : TEXT2, cursor: "pointer", transition: "all .3s" }}>{c}</button>
            ))}
          </div>
        </FadeIn>
        <div ref={ref} className="grid-2">
          {filtered.map((sk, i) => (
            <FadeIn key={sk.id} delay={i * 60}>
              <div className="card" style={{ borderRadius: 12, padding: "1.5rem", position: "relative" }}>
                {isAdmin && (
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: ".5rem" }}>
                    <button onClick={() => onEdit(sk)} style={{ background: "rgba(212,175,55,.1)", border: "none", color: GOLD, cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".75rem" }}>Edit</button>
                    <button onClick={() => onDelete(sk.id)} style={{ background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".75rem" }}>Del</button>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: ".3rem" }}>{sk.name}</h3>
                    <span style={{ fontSize: ".75rem", color: catColors[sk.category] || GOLD }}>{sk.category} · {sk.years}yr{sk.years > 1 ? "s" : ""}</span>
                  </div>
                  <span className="mono" style={{ fontSize: ".85rem", color: GOLD }}>{sk.level}%</span>
                </div>
                <div className="skill-bar" style={{ marginBottom: "1rem" }}>
                  <div className="skill-bar-fill" style={{ width: visible ? `${sk.level}%` : "0%" }} />
                </div>
                <p style={{ color: TEXT2, fontSize: ".8rem", lineHeight: 1.6, marginBottom: ".8rem" }}>{sk.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {sk.techs.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────
function Experience({ exps, isAdmin, onAdd, onEdit, onDelete }) {
  return (
    <section id="experience" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 003</p>
            <h2 className="section-title">Work <span style={{ color: GOLD }}>Experience</span></h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add Experience</button>}
        </div></FadeIn>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "30px", top: "8px", bottom: "8px", width: "2px", background: "linear-gradient(rgba(212,175,55,.5) 0%, rgba(212,175,55,.1) 100%)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingLeft: "64px" }}>
            {exps.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 100}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: -40, top: "1.6rem", width: 14, height: 14, borderRadius: "50%", background: BG, border: `2px solid ${GOLD}`, boxShadow: `0 0 12px rgba(212,175,55,.4)`, zIndex: 1 }} />
                  <div className="card" style={{ borderRadius: 14, padding: "1.8rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".3rem" }}>{exp.position}</h3>
                        <div style={{ display: "flex", gap: ".8rem", alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ color: GOLD, fontSize: ".9rem", fontWeight: 500 }}>{exp.company}</span>
                          <span style={{ width: 3, height: 3, background: TEXT2, borderRadius: "50%" }} />
                          <span style={{ color: TEXT2, fontSize: ".8rem" }}>{exp.location}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
                        <span style={{ fontSize: ".75rem", background: "rgba(212,175,55,.1)", color: GOLD, padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(212,175,55,.2)" }}>{exp.type}</span>
                        <span className="mono" style={{ fontSize: ".75rem", color: TEXT2 }}>{exp.start} → {exp.end || "Present"}</span>
                        {isAdmin && <>
                          <button onClick={() => onEdit(exp)} style={{ background: "rgba(212,175,55,.1)", border: "none", color: GOLD, cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".75rem" }}>Edit</button>
                          <button onClick={() => onDelete(exp.id)} style={{ background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".75rem" }}>Del</button>
                        </>}
                      </div>
                    </div>
                    <p style={{ color: TEXT2, fontSize: ".9rem", lineHeight: 1.7, marginBottom: "1rem" }}>{exp.description}</p>
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ fontSize: ".75rem", color: TEXT2, marginBottom: ".5rem", textTransform: "uppercase", letterSpacing: ".06em" }}>Achievements</div>
                      {exp.achievements.map((a, j) => (
                        <div key={j} style={{ display: "flex", gap: ".5rem", marginBottom: ".3rem" }}>
                          <span style={{ color: GOLD, fontSize: ".8rem" }}>✦</span>
                          <span style={{ color: TEXT2, fontSize: ".85rem" }}>{a}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {exp.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education ─────────────────────────────────────────────
function Education({ edu, isAdmin, onAdd, onEdit, onDelete }) {
  return (
    <section id="education" style={{ padding: "6rem 2rem", background: BG2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 004</p>
            <h2 className="section-title">Education</h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add Education</button>}
        </div></FadeIn>
        <div className="grid-2">
          {edu.map((e, i) => (
            <FadeIn key={e.id} delay={i * 100}>
              <div className="card" style={{ borderRadius: 14, padding: "1.8rem", position: "relative", borderLeft: `3px solid ${GOLD}` }}>
                {isAdmin && (
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: ".5rem" }}>
                    <button onClick={() => onEdit(e)} style={{ background: "rgba(212,175,55,.1)", border: "none", color: GOLD, cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".75rem" }}>Edit</button>
                    <button onClick={() => onDelete(e.id)} style={{ background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".75rem" }}>Del</button>
                  </div>
                )}
                <div style={{ fontSize: ".75rem", color: GOLD, letterSpacing: ".08em", marginBottom: ".5rem", textTransform: "uppercase" }}>{e.start} – {e.end}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".3rem" }}>{e.degree}</h3>
                <div style={{ color: GOLD, fontSize: ".9rem", marginBottom: ".3rem" }}>{e.university}</div>
                <div style={{ color: TEXT2, fontSize: ".8rem", marginBottom: "1rem" }}>{e.faculty} · {e.department}</div>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.15)", borderRadius: 8, padding: ".5rem 1rem", textAlign: "center" }}>
                    <div className="mono" style={{ fontSize: "1rem", color: GOLD }}>{e.gpa}</div>
                    <div style={{ fontSize: ".7rem", color: TEXT2 }}>GPA</div>
                  </div>
                </div>
                <p style={{ color: TEXT2, fontSize: ".85rem", lineHeight: 1.7 }}>{e.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────
function Projects({ projects, isAdmin, onAdd, onEdit, onDelete }) {
  const [filter, setFilter] = useState("All");
  const [caseStudy, setCaseStudy] = useState(null);
  const starRef = useRef(null);
  const featured = projects.find(p => p.featured);
  useEffect(() => {
    const field = starRef.current;
    if (!field || !featured) return;
    field.innerHTML = "";
    for (let i = 0; i < 26; i++) {
      const s = document.createElement("span");
      s.className = "featured-star";
      s.style.left = (Math.random() * 100) + "%";
      s.style.top = (Math.random() * 100) + "%";
      const sz = 2 + Math.random() * 2;
      s.style.width = sz + "px";
      s.style.height = sz + "px";
      const dur = 1.5 + Math.random() * 1;
      s.style.animationDuration = dur + "s";
      s.style.animationDelay = (-Math.random() * dur) + "s";
      field.appendChild(s);
    }
  }, [featured]);
  const regular = projects.filter(p => !p.featured);
  const cats = ["All", ...new Set(regular.map(p => p.category))];
  const filtered = filter === "All" ? regular : regular.filter(p => p.category === filter);
  return (
    <section id="projects" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 005</p>
            <h2 className="section-title">Featured <span style={{ color: GOLD }}>Projects</span></h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add Project</button>}
        </div></FadeIn>

        {featured && featured.caseStudy && (
          <FadeIn>
            <div className="featured-card" onClick={() => setCaseStudy(featured)}>
              <div className="featured-content">
                <div className="featured-starfield" ref={starRef} />
                <span className="featured-ring fr1" />
                <span className="featured-ring fr2" />
                <span className="featured-ring fr3" />
                <span className="featured-ring fr4" />
                <span className="featured-ring fr5" />
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1rem", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                  <span className="featured-badge">⭐ Featured</span>
                  <span style={{ fontSize: ".75rem", color: TEXT2, letterSpacing: ".04em" }}>{featured.caseStudy.tagline}</span>
                </div>
                <div className="featured-inner" style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="featured-title">{featured.name}</h3>
                    <p style={{ color: TEXT2, fontSize: ".92rem", lineHeight: 1.7, marginBottom: "1.2rem", maxWidth: 560 }}>{featured.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "1.3rem" }}>
                      {featured.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <span className="featured-cta">View Case Study <span style={{ fontSize: "1.1em" }}>→</span></span>
                  </div>
                  <div className="featured-metrics">
                    {featured.caseStudy.metrics.map((m, i) => (
                      <div key={i} className="featured-metric">
                        <div className="featured-metric-val">{m.value}{m.suffix}</div>
                        <div className="featured-metric-lbl">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {isAdmin && (
                  <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", display: "flex", gap: ".3rem" }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => onEdit(featured)} style={{ background: "rgba(212,175,55,.15)", border: "none", color: GOLD, cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".7rem" }}>Edit</button>
                    <button onClick={() => onDelete(featured.id)} style={{ background: "rgba(239,68,68,.15)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".7rem" }}>Del</button>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        )}

        <FadeIn>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.5rem", marginTop: "2.5rem" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ padding: ".4rem 1rem", borderRadius: 20, fontSize: ".8rem", border: `1px solid ${filter === c ? GOLD : "rgba(212,175,55,.2)"}`, background: filter === c ? "rgba(212,175,55,.1)" : "transparent", color: filter === c ? GOLD : TEXT2, cursor: "pointer", transition: "all .3s" }}>{c}</button>
            ))}
          </div>
        </FadeIn>
        <div className="grid-2">
          {filtered.map((p, i) => {
            const st = statusColors[p.status] || statusColors["Completed"];
            return (
              <FadeIn key={p.id} delay={i * 80}>
                <div className="card" style={{ borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 160, background: `linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(212,175,55,.06) 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                    <span className="serif" style={{ fontSize: "3rem", color: GOLD, opacity: .3, zIndex: 1 }}>{p.name.slice(0, 2)}</span>
                    <span style={{ position: "absolute", top: "1rem", right: "1rem", ...st, padding: "3px 10px", borderRadius: 20, fontSize: ".7rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", border: `1px solid ${st.border}` }}>{p.status}</span>
                  </div>
                  <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".8rem" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{p.name}</h3>
                      {isAdmin && (
                        <div style={{ display: "flex", gap: ".3rem" }}>
                          <button onClick={() => onEdit(p)} style={{ background: "rgba(212,175,55,.1)", border: "none", color: GOLD, cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".7rem" }}>Edit</button>
                          <button onClick={() => onDelete(p.id)} style={{ background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "3px 8px", fontSize: ".7rem" }}>Del</button>
                        </div>
                      )}
                    </div>
                    <p style={{ color: TEXT2, fontSize: ".85rem", lineHeight: 1.6, marginBottom: "1rem", flex: 1 }}>{p.description}</p>
                    <div style={{ marginBottom: "1rem" }}>
                      {p.features.slice(0, 3).map(f => (
                        <div key={f} style={{ display: "flex", gap: ".5rem", marginBottom: ".2rem" }}>
                          <span style={{ color: GOLD, fontSize: ".75rem" }}>→</span>
                          <span style={{ color: TEXT2, fontSize: ".8rem" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "1rem" }}>
                      {p.technologies.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div style={{ display: "flex", gap: ".8rem" }}>
                      {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize: ".8rem", color: GOLD, textDecoration: "none", display: "flex", alignItems: "center", gap: ".3rem" }}>GitHub →</a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" style={{ fontSize: ".8rem", color: TEXT2, textDecoration: "none", display: "flex", alignItems: "center", gap: ".3rem" }}>Live Demo →</a>}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
      <CaseStudyModal project={caseStudy} onClose={() => setCaseStudy(null)} />
    </section>
  );
}

// ─── Case Study Modal (Featured project deep-dive) ─────────
function CaseStudyModal({ project, onClose }) {
  useEffect(() => { document.body.style.overflow = project ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [project]);
  if (!project) return null;
  const cs = project.caseStudy;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="case-modal">
        <button onClick={onClose} aria-label="Close" className="case-close">✕</button>

        <div className="case-hero">
          <div className="case-hero-glow" />
          <div className="case-header">
            <div className="case-icon">🛡️</div>
            <div>
              <span className="case-badge">⭐ Graduation Project</span>
              <h2 className="case-title">{project.name}</h2>
              <p style={{ color: GOLD, fontSize: ".82rem", letterSpacing: ".04em", marginTop: ".3rem" }}>{cs.tagline}</p>
              <p style={{ color: TEXT2, fontSize: ".8rem", marginTop: ".15rem" }}>Supervised by {cs.supervisor}</p>
            </div>
          </div>
        </div>

        <p className="case-overview">{cs.overview}</p>

        <div className="case-metrics">
          {cs.metrics.map((m, i) => (
            <div key={i} className="case-metric">
              <div className="case-metric-val"><AnimCounter target={m.value} suffix={m.suffix} duration={1600} /></div>
              <div className="case-metric-lbl">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="case-section">
          <h3 className="case-h3">Key Highlights</h3>
          <div className="case-highlights">
            {cs.highlights.map((h, i) => (
              <div key={i} className="case-highlight">
                <div className="case-highlight-icon">{h.icon}</div>
                <div>
                  <div className="case-highlight-title">{h.title}</div>
                  <div className="case-highlight-text">{h.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="case-section">
          <h3 className="case-h3">How It Works</h3>
          <div className="case-flow">
            {cs.flow.map((step, i) => (
              <div key={i} style={{ display: "contents" }}>
                <span className="case-flow-step">{step}</span>
                {i < cs.flow.length - 1 && <span className="case-flow-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="case-grid">
          <div className="case-section" style={{ margin: 0 }}>
            <h3 className="case-h3">3 Expert Models</h3>
            {cs.experts.map((e, i) => (
              <div key={i} className="case-expert">
                <div className="case-expert-name"><span className="case-expert-num">{i + 1}</span>{e.name}</div>
                <div style={{ fontSize: ".78rem", color: TEXT2, lineHeight: 1.5 }}>{e.detail}</div>
              </div>
            ))}
          </div>
          <div className="case-section" style={{ margin: 0 }}>
            <h3 className="case-h3">6 Specialized Analyzers</h3>
            {cs.analyzers.map((a, i) => (
              <div key={i} className="case-analyzer">
                <span style={{ color: GOLD }}>✦</span> {a}
              </div>
            ))}
          </div>
        </div>

        <div className="case-section">
          <h3 className="case-h3">Tech Stack</h3>
          {cs.stack.map((s, i) => (
            <div key={i} className="case-stack-row">
              <span className="case-stack-label">{s.label}</span>
              <span className="case-stack-items">{s.items}</span>
            </div>
          ))}
        </div>

        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".75rem 1.6rem", borderRadius: 8, fontSize: ".88rem", textDecoration: "none", marginTop: ".5rem" }}>
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Certifications ────────────────────────────────────────
function Certs({ certs, isAdmin, onAdd, onEdit, onDelete }) {
  return (
    <section id="certs" style={{ padding: "6rem 2rem", background: BG2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 006</p>
            <h2 className="section-title">Certifications</h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add Cert</button>}
        </div></FadeIn>
        <div className="grid-3">
          {certs.map((c, i) => (
            <FadeIn key={c.id} delay={i * 80}>
              <div className="card" style={{ borderRadius: 14, padding: "1.5rem", position: "relative" }}>
                {isAdmin && (
                  <div style={{ position: "absolute", top: ".8rem", right: ".8rem", display: "flex", gap: ".3rem" }}>
                    <button onClick={() => onEdit(c)} style={{ background: "rgba(212,175,55,.1)", border: "none", color: GOLD, cursor: "pointer", borderRadius: 6, padding: "2px 6px", fontSize: ".7rem" }}>Edit</button>
                    <button onClick={() => onDelete(c.id)} style={{ background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "2px 6px", fontSize: ".7rem" }}>Del</button>
                  </div>
                )}
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", fontSize: "1.5rem" }}>🏅</div>
                <h3 style={{ fontSize: ".95rem", fontWeight: 600, marginBottom: ".5rem", lineHeight: 1.4 }}>{c.name}</h3>
                <div style={{ color: GOLD, fontSize: ".85rem", marginBottom: ".3rem" }}>{c.issuer}</div>
                <div className="mono" style={{ color: TEXT2, fontSize: ".75rem", marginBottom: "1rem" }}>{c.issued} {c.expiry ? `→ ${c.expiry}` : ""}</div>
                {c.credId && <div style={{ fontSize: ".75rem", color: TEXT2, marginBottom: ".8rem" }}>ID: {c.credId}</div>}
                {c.url && <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: ".8rem", color: GOLD, textDecoration: "none" }}>Verify →</a>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Achievements ──────────────────────────────────────────
function Achievements({ items, isAdmin, onAdd, onDelete }) {
  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 007</p>
            <h2 className="section-title">Achievements</h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add</button>}
        </div></FadeIn>
        <div className="grid-3">
          {items.map((a, i) => (
            <FadeIn key={a.id} delay={i * 80}>
              <div className="card" style={{ borderRadius: 14, padding: "1.5rem", position: "relative", borderTop: `2px solid ${GOLD}` }}>
                {isAdmin && <button onClick={() => onDelete(a.id)} style={{ position: "absolute", top: ".8rem", right: ".8rem", background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "2px 6px", fontSize: ".7rem" }}>Del</button>}
                <div style={{ fontSize: "1.8rem", marginBottom: ".8rem" }}>🏆</div>
                <h3 style={{ fontSize: ".95rem", fontWeight: 600, marginBottom: ".5rem" }}>{a.title}</h3>
                <div style={{ color: GOLD, fontSize: ".8rem", marginBottom: ".3rem" }}>{a.organization}</div>
                <div className="mono" style={{ color: TEXT2, fontSize: ".75rem", marginBottom: ".8rem" }}>{a.date}</div>
                <p style={{ color: TEXT2, fontSize: ".8rem", lineHeight: 1.6 }}>{a.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Courses ───────────────────────────────────────────────
function Courses({ courses, isAdmin, onAdd, onDelete }) {
  return (
    <section style={{ padding: "6rem 2rem", background: BG2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 008</p>
            <h2 className="section-title">Courses & <span style={{ color: GOLD }}>Learning</span></h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add Course</button>}
        </div></FadeIn>
        <div className="grid-2">
          {courses.map((c, i) => (
            <FadeIn key={c.id} delay={i * 80}>
              <div className="card" style={{ borderRadius: 14, padding: "1.5rem", position: "relative", display: "flex", gap: "1rem" }}>
                {isAdmin && <button onClick={() => onDelete(c.id)} style={{ position: "absolute", top: ".8rem", right: ".8rem", background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "2px 6px", fontSize: ".7rem" }}>Del</button>}
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.2rem" }}>📚</div>
                <div>
                  <h3 style={{ fontSize: ".95rem", fontWeight: 600, marginBottom: ".3rem" }}>{c.name}</h3>
                  <div style={{ color: TEXT2, fontSize: ".8rem", marginBottom: ".3rem" }}>{c.provider}</div>
                  <div className="mono" style={{ color: TEXT2, fontSize: ".75rem", marginBottom: ".8rem" }}>{c.duration} · Completed {c.completed}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {c.skills.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Freelance ─────────────────────────────────────────────
function Freelance({ items, isAdmin, onAdd, onDelete }) {
  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 009</p>
            <h2 className="section-title">Freelance <span style={{ color: GOLD }}>Work</span></h2>
          </div>
          {isAdmin && <button className="btn-gold" style={{ padding: ".6rem 1.4rem", borderRadius: 50, fontSize: ".85rem" }} onClick={onAdd}>+ Add Project</button>}
        </div></FadeIn>
        <div className="grid-2">
          {items.map((f, i) => (
            <FadeIn key={f.id} delay={i * 100}>
              <div className="card" style={{ borderRadius: 14, padding: "1.8rem", position: "relative" }}>
                {isAdmin && <button onClick={() => onDelete(f.id)} style={{ position: "absolute", top: ".8rem", right: ".8rem", background: "rgba(239,68,68,.1)", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 6, padding: "2px 6px", fontSize: ".7rem" }}>Del</button>}
                <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(212,175,55,.1)", color: GOLD, border: "1px solid rgba(212,175,55,.2)", padding: "3px 10px", borderRadius: 20, fontSize: ".75rem" }}>{f.clientType}</span>
                  {f.nda && <span style={{ background: "rgba(239,68,68,.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,.2)", padding: "3px 10px", borderRadius: 20, fontSize: ".75rem" }}>NDA Protected</span>}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: ".5rem" }}>{f.name}</h3>
                <div className="mono" style={{ color: TEXT2, fontSize: ".75rem", marginBottom: "1rem" }}>Duration: {f.duration}</div>
                <p style={{ color: TEXT2, fontSize: ".85rem", lineHeight: 1.6, marginBottom: "1rem" }}>{f.description}</p>
                <div style={{ background: "rgba(52,211,153,.06)", border: "1px solid rgba(52,211,153,.15)", borderRadius: 8, padding: ".8rem", marginBottom: "1rem" }}>
                  <div style={{ fontSize: ".75rem", color: "#34d399", marginBottom: ".3rem", textTransform: "uppercase", letterSpacing: ".06em" }}>Results</div>
                  <div style={{ color: TEXT2, fontSize: ".85rem" }}>{f.results}</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {f.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────
function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mdavnaqk", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };
  return (
    <section id="contact" style={{ padding: "6rem 2rem", background: BG2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="mono" style={{ color: GOLD, fontSize: ".8rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>// 010</p>
          <h2 className="section-title">Get In <span style={{ color: GOLD }}>Touch</span></h2>
          <p style={{ color: TEXT2, marginTop: "1rem", maxWidth: 500, margin: "1rem auto 0" }}>Have a project in mind or want to collaborate? I'd love to hear from you.</p>
        </div></FadeIn>
        <div className="split-2">
          <FadeIn delay={100}>
            <div>
              {[
                { icon: "✉", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/ahmad-zwahrah", href: profile.linkedin },
                { icon: "🐱", label: "GitHub", value: "github.com/subzero7142856112-dotcom", href: profile.github },
                { icon: "💬", label: "WhatsApp", value: "Available for quick chats", href: profile.whatsapp },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1.2rem", marginBottom: "1rem", background: CARD, border: "1px solid rgba(212,175,55,.1)", borderRadius: 12, textDecoration: "none", transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,.35)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,.1)"; e.currentTarget.style.transform = ""; }}>
                  <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: ".8rem", color: GOLD, textTransform: "uppercase", letterSpacing: ".06em" }}>{item.label}</div>
                    <div style={{ color: TEXT2, fontSize: ".9rem", wordBreak: "break-word" }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-row">
                <div>
                  <label style={{ fontSize: ".75rem", color: GOLD, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: ".4rem" }}>Name</label>
                  <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required />
                </div>
                <div>
                  <label style={{ fontSize: ".75rem", color: GOLD, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: ".4rem" }}>Email</label>
                  <input className="input-field" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: ".75rem", color: GOLD, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: ".4rem" }}>Subject</label>
                <input className="input-field" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Project collaboration" required />
              </div>
              <div>
                <label style={{ fontSize: ".75rem", color: GOLD, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: ".4rem" }}>Message</label>
                <textarea className="input-field" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." required style={{ resize: "vertical" }} />
              </div>
              <button className="btn-gold" type="submit" disabled={status === "sending"} style={{ padding: "1rem", borderRadius: 10, fontSize: ".95rem", width: "100%", opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "wait" : "pointer" }}>
                {status === "sending" ? "Sending..." : status === "sent" ? "✓ Message Sent!" : status === "error" ? "✗ Failed — try again" : "Send Message →"}
              </button>
              {status === "sent" && <p style={{ color: "#34d399", fontSize: ".85rem", textAlign: "center", marginTop: ".3rem" }}>Thanks! I'll get back to you soon.</p>}
              {status === "error" && <p style={{ color: "#ef4444", fontSize: ".85rem", textAlign: "center", marginTop: ".3rem" }}>Something went wrong. Please email me directly.</p>}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────
function Footer({ profile }) {
  return (
    <footer style={{ padding: "3rem 2rem", borderTop: "1px solid rgba(212,175,55,.1)", textAlign: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="serif" style={{ fontSize: "2rem", fontWeight: 300, color: GOLD, marginBottom: "1rem" }}>{profile.name}</div>
        <p style={{ color: TEXT2, fontSize: ".85rem", marginBottom: "1.5rem" }}>Built with precision. Designed with intent.</p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {["Home", "About", "Skills", "Projects", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: TEXT2, textDecoration: "none", fontSize: ".8rem", letterSpacing: ".06em", transition: "color .3s" }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = TEXT2}>{l}</a>
          ))}
        </div>
        <p className="mono" style={{ color: "#333", fontSize: ".75rem" }}>© {new Date().getFullYear()} {profile.name} · All rights reserved</p>
      </div>
    </footer>
  );
}

// ─── Modals ────────────────────────────────────────────────
function SkillModal({ open, onClose, onSave, initial }) {
  const blank = { name: "", category: "Programming", years: 1, level: 80, description: "", techs: "" };
  const [form, setForm] = useState(initial || blank);
  useEffect(() => { setForm(initial || blank); }, [open]);
  const cats = ["Programming", "AI & Machine Learning", "Cybersecurity", "Networking", "DevOps", "Cloud Computing", "Databases", "Mobile Development", "Web Development", "Tools"];
  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Skill" : "Add Skill"}>
      <FieldRow label="Skill Name"><input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Python" /></FieldRow>
      <FieldRow label="Category">
        <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
      </FieldRow>
      <div className="form-row">
        <FieldRow label="Experience (Years)"><input className="input-field" type="number" min={0} max={30} value={form.years} onChange={e => setForm({ ...form, years: +e.target.value })} /></FieldRow>
        <FieldRow label="Level (0-100)"><input className="input-field" type="number" min={0} max={100} value={form.level} onChange={e => setForm({ ...form, level: +e.target.value })} /></FieldRow>
      </div>
      <FieldRow label="Description"><textarea className="input-field" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." /></FieldRow>
      <FieldRow label="Technologies (comma-separated)"><input className="input-field" value={typeof form.techs === "string" ? form.techs : form.techs.join(", ")} onChange={e => setForm({ ...form, techs: e.target.value })} placeholder="React, Node.js, TypeScript" /></FieldRow>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10, fontSize: ".9rem" }} onClick={() => onSave({ ...form, techs: typeof form.techs === "string" ? form.techs.split(",").map(t => t.trim()).filter(Boolean) : form.techs, id: form.id || Date.now() })}>
          {initial ? "Save Changes" : "Add Skill"}
        </button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10, fontSize: ".9rem" }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

function ExpModal({ open, onClose, onSave, initial }) {
  const blank = { position: "", company: "", type: "Full Time", start: "", end: "", description: "", technologies: "", achievements: "", location: "" };
  const [form, setForm] = useState(initial || blank);
  useEffect(() => { setForm(initial ? { ...initial, technologies: initial.technologies.join(", "), achievements: initial.achievements.join("\n") } : blank); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Experience" : "Add Experience"}>
      <FieldRow label="Position"><input className="input-field" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} placeholder="Senior Engineer" /></FieldRow>
      <div className="form-row">
        <FieldRow label="Company"><input className="input-field" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Google" /></FieldRow>
        <FieldRow label="Location"><input className="input-field" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Remote" /></FieldRow>
      </div>
      <FieldRow label="Type">
        <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          {["Full Time", "Part Time", "Internship", "Freelance", "Volunteer", "Contract"].map(t => <option key={t}>{t}</option>)}
        </select>
      </FieldRow>
      <div className="form-row">
        <FieldRow label="Start (YYYY-MM)"><input className="input-field" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} placeholder="2022-01" /></FieldRow>
        <FieldRow label="End (leave blank = Present)"><input className="input-field" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} placeholder="2023-12" /></FieldRow>
      </div>
      <FieldRow label="Description"><textarea className="input-field" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></FieldRow>
      <FieldRow label="Technologies (comma-separated)"><input className="input-field" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} placeholder="Python, React, AWS" /></FieldRow>
      <FieldRow label="Achievements (one per line)"><textarea className="input-field" rows={3} value={form.achievements} onChange={e => setForm({ ...form, achievements: e.target.value })} /></FieldRow>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10, fontSize: ".9rem" }} onClick={() => onSave({ ...form, technologies: form.technologies.split(",").map(t => t.trim()).filter(Boolean), achievements: form.achievements.split("\n").map(a => a.trim()).filter(Boolean), id: form.id || Date.now() })}>
          {initial ? "Save Changes" : "Add Experience"}
        </button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10, fontSize: ".9rem" }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

function ProjectModal({ open, onClose, onSave, initial }) {
  const blank = { name: "", category: "Web Development", description: "", technologies: "", features: "", status: "In Progress", github: "", demo: "", start: "", end: "" };
  const [form, setForm] = useState(initial || blank);
  useEffect(() => { setForm(initial ? { ...initial, technologies: initial.technologies.join(", "), features: initial.features.join("\n") } : blank); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Project" : "Add Project"}>
      <FieldRow label="Project Name"><input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="My Awesome Project" /></FieldRow>
      <div className="form-row">
        <FieldRow label="Category"><input className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Web Development" /></FieldRow>
        <FieldRow label="Status">
          <select className="input-field" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            {["Completed", "In Progress", "Archived"].map(s => <option key={s}>{s}</option>)}
          </select>
        </FieldRow>
      </div>
      <FieldRow label="Description"><textarea className="input-field" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></FieldRow>
      <FieldRow label="Technologies (comma-separated)"><input className="input-field" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} /></FieldRow>
      <FieldRow label="Features (one per line)"><textarea className="input-field" rows={3} value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} /></FieldRow>
      <div className="form-row">
        <FieldRow label="GitHub URL"><input className="input-field" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} /></FieldRow>
        <FieldRow label="Demo URL"><input className="input-field" value={form.demo} onChange={e => setForm({ ...form, demo: e.target.value })} /></FieldRow>
      </div>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10, fontSize: ".9rem" }} onClick={() => onSave({ ...form, technologies: form.technologies.split(",").map(t => t.trim()).filter(Boolean), features: form.features.split("\n").map(f => f.trim()).filter(Boolean), id: form.id || Date.now() })}>
          {initial ? "Save Changes" : "Add Project"}
        </button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10, fontSize: ".9rem" }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

function CertModal({ open, onClose, onSave, initial }) {
  const blank = { name: "", issuer: "", issued: "", expiry: "", credId: "", url: "" };
  const [form, setForm] = useState(initial || blank);
  useEffect(() => { setForm(initial || blank); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Certification" : "Add Certification"}>
      <FieldRow label="Certificate Name"><input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="AWS Solutions Architect" /></FieldRow>
      <FieldRow label="Issuer"><input className="input-field" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} placeholder="Amazon Web Services" /></FieldRow>
      <div className="form-row">
        <FieldRow label="Issue Date"><input className="input-field" value={form.issued} onChange={e => setForm({ ...form, issued: e.target.value })} placeholder="2023-01" /></FieldRow>
        <FieldRow label="Expiry Date"><input className="input-field" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} placeholder="2026-01" /></FieldRow>
      </div>
      <FieldRow label="Credential ID"><input className="input-field" value={form.credId} onChange={e => setForm({ ...form, credId: e.target.value })} /></FieldRow>
      <FieldRow label="Verification URL"><input className="input-field" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} /></FieldRow>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10, fontSize: ".9rem" }} onClick={() => onSave({ ...form, id: form.id || Date.now() })}>
          {initial ? "Save Changes" : "Add Certification"}
        </button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10, fontSize: ".9rem" }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

function EduModal({ open, onClose, onSave, initial }) {
  const blank = { degree: "", university: "", faculty: "", department: "", gpa: "", start: "", end: "", description: "" };
  const [form, setForm] = useState(initial || blank);
  useEffect(() => { setForm(initial || blank); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Education" : "Add Education"}>
      <FieldRow label="Degree"><input className="input-field" value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} placeholder="B.S. Computer Science" /></FieldRow>
      <FieldRow label="University"><input className="input-field" value={form.university} onChange={e => setForm({ ...form, university: e.target.value })} placeholder="MIT" /></FieldRow>
      <div className="form-row">
        <FieldRow label="Faculty"><input className="input-field" value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })} /></FieldRow>
        <FieldRow label="Department"><input className="input-field" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} /></FieldRow>
      </div>
      <div className="form-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        <FieldRow label="GPA"><input className="input-field" value={form.gpa} onChange={e => setForm({ ...form, gpa: e.target.value })} /></FieldRow>
        <FieldRow label="Start Year"><input className="input-field" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} placeholder="2016" /></FieldRow>
        <FieldRow label="End Year"><input className="input-field" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} placeholder="2020" /></FieldRow>
      </div>
      <FieldRow label="Description"><textarea className="input-field" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></FieldRow>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10, fontSize: ".9rem" }} onClick={() => onSave({ ...form, id: form.id || Date.now() })}>
          {initial ? "Save Changes" : "Add Education"}
        </button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10, fontSize: ".9rem" }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

// ─── Admin Auth ────────────────────────────────────────────
function AdminLogin({ onLogin, onClose }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const handle = () => { if (pw === "846855") { onLogin(); } else { setErr(true); setTimeout(() => setErr(false), 2000); } };
  return (
    <Modal open={true} onClose={onClose} title="Admin Access">
      <div style={{ textAlign: "center", marginBottom: "1.5rem", marginTop: "-.5rem" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: ".5rem" }}>🔐</div>
        <p style={{ color: TEXT2, fontSize: ".85rem" }}>Enter password to access the dashboard</p>
      </div>
      <input className="input-field" type="password" inputMode="numeric" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password" onKeyDown={e => e.key === "Enter" && handle()} style={{ border: err ? "1px solid #ef4444" : undefined, textAlign: "center", letterSpacing: ".3em" }} autoFocus />
      {err && <p style={{ color: "#ef4444", fontSize: ".8rem", marginTop: ".4rem", textAlign: "center" }}>Incorrect password. Try again.</p>}
      <button className="btn-gold" style={{ width: "100%", padding: ".85rem", borderRadius: 10, marginTop: "1rem", fontSize: ".95rem" }} onClick={handle}>Enter Dashboard →</button>
    </Modal>
  );
}

// ─── Quick-Add Modals (proper components) ──────────────────
function AchievementModal({ open, onClose, onSave }) {
  const blank = { title: "", date: "", organization: "", description: "" };
  const [f, setF] = useState(blank);
  useEffect(() => { setF(blank); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="Add Achievement">
      <FieldRow label="Title"><input className="input-field" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} /></FieldRow>
      <div className="form-row">
        <FieldRow label="Date"><input className="input-field" value={f.date} onChange={e => setF({ ...f, date: e.target.value })} placeholder="2024-01" /></FieldRow>
        <FieldRow label="Organization"><input className="input-field" value={f.organization} onChange={e => setF({ ...f, organization: e.target.value })} /></FieldRow>
      </div>
      <FieldRow label="Description"><textarea className="input-field" rows={3} value={f.description} onChange={e => setF({ ...f, description: e.target.value })} /></FieldRow>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10 }} onClick={() => onSave({ ...f, id: Date.now() })}>Add Achievement</button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10 }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

function CourseModal({ open, onClose, onSave }) {
  const blank = { name: "", provider: "", duration: "", completed: "", skills: "" };
  const [f, setF] = useState(blank);
  useEffect(() => { setF(blank); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="Add Course">
      <FieldRow label="Course Name"><input className="input-field" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></FieldRow>
      <FieldRow label="Provider"><input className="input-field" value={f.provider} onChange={e => setF({ ...f, provider: e.target.value })} /></FieldRow>
      <div className="form-row">
        <FieldRow label="Duration"><input className="input-field" value={f.duration} onChange={e => setF({ ...f, duration: e.target.value })} placeholder="3 months" /></FieldRow>
        <FieldRow label="Completed"><input className="input-field" value={f.completed} onChange={e => setF({ ...f, completed: e.target.value })} placeholder="2023-06" /></FieldRow>
      </div>
      <FieldRow label="Skills (comma-separated)"><input className="input-field" value={f.skills} onChange={e => setF({ ...f, skills: e.target.value })} /></FieldRow>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10 }} onClick={() => onSave({ ...f, skills: f.skills.split(",").map(s => s.trim()).filter(Boolean), id: Date.now() })}>Add Course</button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10 }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

function FreelanceModal({ open, onClose, onSave }) {
  const blank = { clientType: "", name: "", duration: "", technologies: "", description: "", results: "", nda: false };
  const [f, setF] = useState(blank);
  useEffect(() => { setF(blank); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="Add Freelance Project">
      <div className="form-row">
        <FieldRow label="Client Type"><input className="input-field" value={f.clientType} onChange={e => setF({ ...f, clientType: e.target.value })} placeholder="Startup" /></FieldRow>
        <FieldRow label="Project Name"><input className="input-field" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></FieldRow>
      </div>
      <FieldRow label="Duration"><input className="input-field" value={f.duration} onChange={e => setF({ ...f, duration: e.target.value })} placeholder="3 months" /></FieldRow>
      <FieldRow label="Description"><textarea className="input-field" rows={2} value={f.description} onChange={e => setF({ ...f, description: e.target.value })} /></FieldRow>
      <FieldRow label="Technologies (comma-separated)"><input className="input-field" value={f.technologies} onChange={e => setF({ ...f, technologies: e.target.value })} /></FieldRow>
      <FieldRow label="Results"><input className="input-field" value={f.results} onChange={e => setF({ ...f, results: e.target.value })} /></FieldRow>
      <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginBottom: "1rem" }}>
        <input type="checkbox" id="nda-add" checked={f.nda} onChange={e => setF({ ...f, nda: e.target.checked })} />
        <label htmlFor="nda-add" style={{ color: TEXT2, fontSize: ".9rem", cursor: "pointer" }}>NDA Protected</label>
      </div>
      <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
        <button className="btn-gold" style={{ flex: 1, padding: ".85rem", borderRadius: 10 }} onClick={() => onSave({ ...f, technologies: f.technologies.split(",").map(t => t.trim()).filter(Boolean), deliverables: [], id: Date.now() })}>Add Project</button>
        <button className="btn-outline" style={{ padding: ".85rem 1.5rem", borderRadius: 10 }} onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

// ─── Root ──────────────────────────────────────────────────
export default function Portfolio() {
  const [data, setData] = useState(defaultData);
  const [activeSection, setActiveSection] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [modal, setModal] = useState(null); // { type, item }

  // CRUD helpers
  const addItem = (key, item) => setData(d => ({ ...d, [key]: [...d[key], item] }));
  const editItem = (key, item) => setData(d => ({ ...d, [key]: d[key].map(x => x.id === item.id ? item : x) }));
  const delItem = (key, id) => setData(d => ({ ...d, [key]: d[key].filter(x => x.id !== id) }));

  // Scroll tracking
  useEffect(() => {
    const fn = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "certs", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const closeModal = () => setModal(null);

  return (
    <>
      <style>{css}</style>
      <Nav active={activeSection} onNav={setActiveSection} />
      <Hero data={data.profile} />
      <Stats data={data.stats} />
      <SocialMarquee profile={data.profile} />
      <About profile={data.profile} />
      <Skills skills={data.skills} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "skill", item: null })}
        onEdit={item => setModal({ type: "skill", item })}
        onDelete={id => delItem("skills", id)} />
      <Experience exps={data.experiences} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "exp", item: null })}
        onEdit={item => setModal({ type: "exp", item })}
        onDelete={id => delItem("experiences", id)} />
      <Education edu={data.education} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "edu", item: null })}
        onEdit={item => setModal({ type: "edu", item })}
        onDelete={id => delItem("education", id)} />
      <Projects projects={data.projects} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "project", item: null })}
        onEdit={item => setModal({ type: "project", item })}
        onDelete={id => delItem("projects", id)} />
      <Certs certs={data.certs} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "cert", item: null })}
        onEdit={item => setModal({ type: "cert", item })}
        onDelete={id => delItem("certs", id)} />
      <Achievements items={data.achievements} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "ach", item: null })}
        onDelete={id => delItem("achievements", id)} />
      <Courses courses={data.courses} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "course", item: null })}
        onDelete={id => delItem("courses", id)} />
      <Freelance items={data.freelance} isAdmin={isAdmin}
        onAdd={() => setModal({ type: "freelance", item: null })}
        onDelete={id => delItem("freelance", id)} />
      <Contact profile={data.profile} />
      <Footer profile={data.profile} />

      {/* Admin pill */}
      <button className="admin-pill" onClick={() => isAdmin ? setIsAdmin(false) : setShowAdminLogin(true)}>
        {isAdmin ? "🔓 Exit Admin" : "⚙ Admin"}
      </button>

      {/* Auth */}
      {showAdminLogin && !isAdmin && <AdminLogin onLogin={() => { setIsAdmin(true); setShowAdminLogin(false); }} onClose={() => setShowAdminLogin(false)} />}

      {/* Modals */}
      <SkillModal open={modal?.type === "skill"} onClose={closeModal} initial={modal?.item}
        onSave={item => { modal?.item ? editItem("skills", item) : addItem("skills", item); closeModal(); }} />
      <ExpModal open={modal?.type === "exp"} onClose={closeModal} initial={modal?.item}
        onSave={item => { modal?.item ? editItem("experiences", item) : addItem("experiences", item); closeModal(); }} />
      <EduModal open={modal?.type === "edu"} onClose={closeModal} initial={modal?.item}
        onSave={item => { modal?.item ? editItem("education", item) : addItem("education", item); closeModal(); }} />
      <ProjectModal open={modal?.type === "project"} onClose={closeModal} initial={modal?.item}
        onSave={item => { modal?.item ? editItem("projects", item) : addItem("projects", item); closeModal(); }} />
      <CertModal open={modal?.type === "cert"} onClose={closeModal} initial={modal?.item}
        onSave={item => { modal?.item ? editItem("certs", item) : addItem("certs", item); closeModal(); }} />
      <AchievementModal open={modal?.type === "ach"} onClose={closeModal}
        onSave={item => { addItem("achievements", item); closeModal(); }} />
      <CourseModal open={modal?.type === "course"} onClose={closeModal}
        onSave={item => { addItem("courses", item); closeModal(); }} />
      <FreelanceModal open={modal?.type === "freelance"} onClose={closeModal}
        onSave={item => { addItem("freelance", item); closeModal(); }} />
    </>
  );
}
