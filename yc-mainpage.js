/* YC Mainpage FY27 — SIXSHOP loader v20261123-03 */
(() => {
  'use strict';
  const PATH = '/';
  const PAGE_ID = 'page2768172';
  const APP_ID = 'yc-mainpage-fy27-app';
  const BASE = 'https://changgyupark.github.io/yc-mainpage/';
  const VERSION = '20261123-03';
  const STORAGE_KEY = 'yc-mainpage-fy27:utm:v1';
  const UTM = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  let mounted=null, loading=null, titleBefore=null;
  let disposers=[];
  let rootGuard=false;
  const hasRoute = () => location.pathname === PATH;
  // The SIXSHOP homepage uses its own page ID, which may differ from the preview page.
  // Match only the actual homepage route and an active SIXSHOP page container.
  const page = () => {
    if (!hasRoute()) return null;
    const candidates = Array.from(document.querySelectorAll('[id^="page"]'));
    return candidates.find(el => /^page\\d+$/.test(el.id) && el.getClientRects().length > 0 && getComputedStyle(el).display !== 'none') || null;
  };
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
