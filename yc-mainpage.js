/* YC Mainpage FY27 — SIXSHOP loader v20261124-02 */
(() => {
  'use strict';
  const PAGE_ID = 'page2768172';
  const APP_ID = 'yc-mainpage-fy27-app';
  const BASE = 'https://changgyupark.github.io/yc-mainpage/';
  const VERSION = '20261124-02';
  const STORAGE_KEY = 'yc-mainpage-fy27:utm:v1';
  const UTM = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  let mounted=null, loading=null, titleBefore=null;
  let disposers=[];
  let rootGuard=false;
  const hasRoute = () => location.pathname === '/' || location.pathname === '/main-page-fy27' || location.pathname === '/main-page-fy27/';
  const page = () => document.getElementById(PAGE_ID);
  const shouldMount = () => hasRoute() && !!page();
  function getTrackedUtms() {
    try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') || {}; }
    catch (_) { return {}; }
  }
  function storeIncomingUtms() {
    const query=new URLSearchParams(location.search);
    if (!UTM.some(k=>query.has(k))) return;
    const current={};
    // A new ad entry replaces the previous attribution rather than mixing old/new campaigns.
    UTM.forEach(k=>{ if(query.has(k)) current[k]=query.get(k); });
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current)); } catch (_) {}
  }
  function updateFormLinks(shadow) {
    const values=getTrackedUtms();
    shadow.querySelectorAll('a[href]').forEach(a => {
      let u;
      try{u=new URL(a.getAttribute('href'),location.href)}catch(_){return}
      if(!(/(^|\.)forms\.monday\.com$/.test(u.hostname)||u.hostname==='wkf.ms')) return;
      for(const k of UTM){
        if(Object.prototype.hasOwnProperty.call(values,k)) u.searchParams.set(k,values[k]);
      }
      a.href=u.toString();
    });
  }
  function unmount(){
    if (!mounted) return;
    for(const fn of disposers.splice(0)){try{fn()}catch(_){}}
    for(const [el,display] of mounted.hidden){
      if(el.isConnected)el.style.display=display;
    }
    mounted.root.remove();
    mounted=null;
    if(titleBefore!==null){document.title=titleBefore;titleBefore=null;}
  }
  function hideExistingPageSections(host,root,hidden){
    for(const el of Array.from(host.children)){
      if(el===root||hidden.has(el))continue;
      hidden.set(el,el.style.display);
      el.style.display='none';
    }
  }
  function initInteractions(shadow,root){
    const get=s=>shadow.querySelector(s);
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced)root.classList.add('reduce-motion');
    const reveals=shadow.querySelectorAll('.reveal-up');
    if(!reduced&&'IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>{
        entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}});
      },{threshold:.08});
      reveals.forEach(e=>io.observe(e));
      disposers.push(()=>io.disconnect());
    }else{reveals.forEach(e=>e.classList.add('is-visible'))}
    const map=get('.lifecycle');
    if(map&&'IntersectionObserver' in window){
      const obs=new IntersectionObserver(es=>es.forEach(e=>map.classList.toggle('flow-visible',e.isIntersecting)),{threshold:.06});
      obs.observe(map); disposers.push(()=>obs.disconnect());
    }
    const anchorClick=e=>{
      const a=e.target.closest('a[href^="#"]');
      if(a){
        let id;
        try{id=decodeURIComponent(a.getAttribute('href').slice(1))}catch(_){return}
        const target=shadow.getElementById(id);
        if(target){e.preventDefault();target.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});}
      }
      // Preserve "download PDF" behavior for cross-origin GitHub Pages files.
      const pdfLink=e.target.closest('a[download][href$=".pdf"]');
      if(pdfLink){
        e.preventDefault();
        const name=pdfLink.getAttribute('download')||'YC_시스템_포트폴리오.pdf';
        const parts=window.__YC_MAINPAGE_PDF_PARTS=window.__YC_MAINPAGE_PDF_PARTS||[];
        const loadPart=i=>new Promise((resolve,reject)=>{
          if(parts[i]){resolve();return}
          const script=document.createElement('script');
          script.async=true;script.src=BASE+'yc-portfolio-part-'+(i+1)+'.js?v='+VERSION;
          script.onload=()=>parts[i]?resolve():reject(new Error('PDF part missing'));
          script.onerror=()=>reject(new Error('PDF part download failed'));
          document.head.appendChild(script);
        });
        Promise.all(Array.from({length:7},(_,i)=>loadPart(i))).then(()=>{
          const encoded=parts.join('');
          const decoded=atob(encoded),bytes=new Uint8Array(decoded.length);
          for(let i=0;i<decoded.length;i++)bytes[i]=decoded.charCodeAt(i);
          const blobURL=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
          const dl=document.createElement('a');dl.href=blobURL;dl.download=name;
          document.body.appendChild(dl);dl.click();dl.remove();
          setTimeout(()=>URL.revokeObjectURL(blobURL),5000);
        }).catch(err=>{console.error('[YC Mainpage] PDF download failed',err);alert('포트폴리오 파일 다운로드에 실패했습니다. 잠시 후 다시 시도해 주세요.')});
      }
    };
    shadow.addEventListener('click',anchorClick);disposers.push(()=>shadow.removeEventListener('click',anchorClick));
    // Native wheel and touch scrolling are retained; only anchor links scroll programmatically.
  }
  function updateHeroHeading(shadow){
    // Edit only the original main Hero heading. Never change the SIXSHOP header or other sections.
    const heading=Array.from(shadow.querySelectorAll('.hero h1, .yc-cover h1, h1'))
      .find(el=>/설계부터\s*공장\s*관리까지/.test(el.textContent||'') && /제조\s*현장을\s*하나로\s*연결합니다/.test(el.textContent||''));
    if(!heading)return;
    const hero=heading.closest('.hero,.yc-cover')||heading.parentElement;
    if(!hero)return;
    const logo=document.createElement('img');
    logo.className='yc-hero-heading-logo';
    logo.src='https://ik.imagekit.io/smartware/yc/yc-mainpage/yc-logo';
    logo.alt='(주)YC코퍼레이션';
    logo.decoding='async';
    const isOldLabel=el=>/^DX[\s·∙・.\-]*AX[\s·∙・.\-]*ROBOT$/i.test((el.textContent||'').trim());
    const labels=Array.from(hero.querySelectorAll('p,span,small,div')).filter(isOldLabel);
    const label=labels.find(el=>!Array.from(el.children).some(isOldLabel))||null;
    if(label)label.replaceWith(logo);else heading.before(logo);
    heading.classList.add('yc-hero-new-title');
    heading.replaceChildren();
    const lines=[
      ['yc-hero-new-intro','디자인, 설계, 제조, 경영, 유통을 연결하는'],
      ['yc-hero-new-emphasis','DX · AX · ROBOT'],
      ['yc-hero-new-sub','시스템 개발']
    ];
    lines.forEach(([className,value])=>{const line=document.createElement('span');line.className=className;line.textContent=value;heading.appendChild(line)});
    const scoped=document.createElement('style');
    scoped.textContent=`
      .yc-hero-heading-logo{display:block;width:clamp(185px,18vw,265px);max-width:75%;height:auto;object-fit:contain;margin:0 auto 32px}
      .yc-hero-new-title{display:flex!important;flex-direction:column;align-items:center;text-align:center;gap:12px;margin:0 auto!important;max-width:1200px;line-height:1.1!important}
      .yc-hero-new-title span{display:block;max-width:100%;white-space:normal}
      .yc-hero-new-title .yc-hero-new-intro{font-size:clamp(21px,2.1vw,37px);font-weight:400;line-height:1.35;letter-spacing:-.045em;color:#fff}
      .yc-hero-new-title .yc-hero-new-emphasis{font-size:clamp(44px,5.5vw,94px);font-weight:850;line-height:1.08;letter-spacing:-.045em;white-space:nowrap;color:#e0e9ff;text-shadow:0 0 16px rgba(154,185,255,.42)}
      .yc-hero-new-title .yc-hero-new-sub{font-size:clamp(26px,3vw,51px);font-weight:720;line-height:1.2;color:#e0e9ff;letter-spacing:-.05em}
      @media(max-width:780px){.yc-hero-heading-logo{width:min(215px,58vw);margin-bottom:22px}.yc-hero-new-title{gap:9px}.yc-hero-new-title .yc-hero-new-intro{font-size:clamp(17px,4.1vw,23px)}.yc-hero-new-title .yc-hero-new-emphasis{font-size:clamp(30px,8vw,58px);letter-spacing:-.055em}.yc-hero-new-title .yc-hero-new-sub{font-size:clamp(24px,5.8vw,37px)}}
      @media(max-width:380px){.yc-hero-new-title .yc-hero-new-emphasis{font-size:8vw}}
    `;
    shadow.appendChild(scoped);
  }
  function mount(){
    if(!shouldMount()||mounted||!window.__YC_MAINPAGE_FY27_HTML)return;
    const host=page();
    const root=document.createElement('div');root.id=APP_ID;
    root.style.cssText='display:block;width:100%;min-width:0;visibility:hidden';
    const shadow=root.attachShadow({mode:'open'});
    // Shadow root keeps all source selectors isolated from SIXSHOP header/footer and other pages.
    const style=document.createElement('link');style.rel='stylesheet';style.href=BASE+'yc-mainpage.css?v='+VERSION;
    const body=document.createElement('div');body.innerHTML=window.__YC_MAINPAGE_FY27_HTML;
    shadow.append(style,body);
    updateHeroHeading(shadow);
    const hidden=new Map();
    host.appendChild(root);
    hideExistingPageSections(host,root,hidden);
    mounted={root,host,hidden};
    const show=()=>{if(mounted?.root===root)root.style.visibility='visible'};
    style.addEventListener('load',show,{once:true});style.addEventListener('error',show,{once:true});
    const t=setTimeout(show,3500);disposers.push(()=>clearTimeout(t));
    titleBefore=document.title;
    document.title='제조 현장을 연결하는 통합 솔루션 | YC코퍼레이션';
    storeIncomingUtms();
    updateFormLinks(shadow);
    initInteractions(shadow,root);
  }
  function loadPayload(){
    if(loading||window.__YC_MAINPAGE_FY27_HTML)return;
    const script=document.createElement('script');
    script.src=BASE+'yc-mainpage-content.js?v='+VERSION;script.async=true;
    script.onload=()=>{loading=null;sync()};
    script.onerror=()=>{loading=null;console.error('[YC Mainpage] Content failed to load')};
    loading=script;document.head.appendChild(script);
  }
  function sync(){
    if(rootGuard)return;
    rootGuard=true;
    try{
      if(!shouldMount()) {unmount();return}
      storeIncomingUtms();
      if(mounted){
        if(mounted.host!==page()||!mounted.root.isConnected){unmount()}
        else {hideExistingPageSections(mounted.host,mounted.root,mounted.hidden);updateFormLinks(mounted.root.shadowRoot);return}
      }
      if(window.__YC_MAINPAGE_FY27_HTML)mount();else loadPayload();
    }finally{rootGuard=false;}
  }
  // Cheap route guard also handles SIXSHOP SPA pushState navigation without patching History APIs.
  window.addEventListener('popstate',sync);
  window.addEventListener('pageshow',sync);
  document.addEventListener('DOMContentLoaded',sync,{once:true});
  setInterval(sync,450);
  sync();
})();
