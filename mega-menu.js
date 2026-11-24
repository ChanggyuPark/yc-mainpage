/*!
 * YC코퍼레이션 GNB 메가 메뉴
 * 식스샵 공통 코드 삽입 <head>에 아래 한 줄로 사용:
 *   <script defer src="https://changgyupark.github.io/yc-mainpage/mega-menu.js?v=버전"></script>
 * 메뉴 내용은 MENUS 배열만 고치면 된다. label은 식스샵 대메뉴 이름과 똑같아야 연결된다.
 * PC(데스크톱 헤더)에만 적용되고, 모바일은 식스샵 기본 메뉴를 그대로 쓴다.
 *
 * 테스트 모드: TEST_ONLY가 true면 주소 끝에 ?ycmm=1 을 붙인 경우에만 켜진다.
 *   예) https://www.ycgroup.co.kr/company?ycmm=1
 *   확인이 끝나면 false로 바꿔서 모든 방문자에게 적용한다.
 */
(function () {
  "use strict";
  var TEST_ONLY = false;
  // 솔루션 허브(/smart-solutions) 완성 전까지 false: 카테고리 제목 링크와 "전체 솔루션 보기" 숨김
  var SOLUTION_HUB = false;
  if (TEST_ONLY && !/[?&]ycmm=1(&|$)/.test(location.search)) return;
  if (window.__ycMegaMenu) return;
  window.__ycMegaMenu = true;

  var MENUS = [
    { label: "회사소개",
      intro: { title: "회사소개", text: "중소 제조기업의 디지털 전환을 돕는 YC코퍼레이션을 소개합니다.", link: { nm: "회사소개 보기 →", url: "/company" } },
      groups: [
        { title: "YC코퍼레이션", items: [
          { nm: "회사소개", url: "/company" },
          { nm: "인재채용", url: "/hr" }
        ]},
        { title: "협력", items: [
          { nm: "기관 협력 제안", url: "/digital-fabrication" },
          { nm: "장비공급 협력사 모집", url: "/smc" }
        ]}
      ]},
    { label: "솔루션",
      foot: { text: "필요한 솔루션을 모르겠다면 상담으로 시작하세요.", nm: "전체 솔루션 보기 →", url: "/smart-solutions" },
      groups: [
        { title: "디자인", url: "/smart-solutions#design", items: [
          { nm: "3ds Max", ds: "3D 모델링, 렌더링", url: "/3dsmax" }
        ]},
        { title: "설계(CAD)", url: "/smart-solutions#cad", items: [
          { nm: "Fusion", ds: "설계부터 제조까지 클라우드 통합", url: "/fusion" },
          { nm: "AutoCAD", ds: "2D 도면, 3D 설계", url: "/autocad" },
          { nm: "Inventor", ds: "기계 부품 3D 설계", url: "/inventor" },
          { nm: "PDMC", ds: "제품 설계 제조 컬렉션", url: "/pdmc" }
        ]},
        { title: "가공(CAM)", url: "/smart-solutions#cam", items: [
          { nm: "ENCY CAM", ds: "CNC, 로봇 가공 CAM", url: "https://www.encycadcam.co.kr/", ext: true },
          { nm: "ENCY Robot", ds: "로봇 가공, 시뮬레이션", url: "https://encycam.com/ency-robot/", ext: true },
          { nm: "PowerMill", ds: "고속 다축 가공", url: "/powermill" },
          { nm: "Carveco", ds: "목공, 조각 CAD/CAM", url: "https://carveco.co.kr/", ext: true }
        ]},
        { title: "공장 관리", url: "/smart-solutions#factory", items: [
          { nm: "Smart Line", ds: "생산관리 MES", url: "/smartline_24", own: true },
          { nm: "Smart Carbon", ds: "설비별 에너지 관리", url: "/smart-carbon", own: true },
          { nm: "Smart Safe", ds: "위험 음성 감지 안전 관제", url: "/smart-safe", own: true },
          { nm: "장비 연동 IoT", ds: "설비 가동 데이터 수집", url: "/kpi_data" }
        ]},
        { title: "경영 관리", url: "/smart-solutions#business", items: [
          { nm: "Smart Dash", ds: "CRM과 그룹웨어 통합", url: "/smart-dash", own: true },
          { nm: "업무관리 솔루션", ds: "업무용 소프트웨어 도입", url: "/business" },
          { nm: "Acrobat", ds: "PDF 문서 작업", url: "/acrobat" }
        ]},
        { title: "스마트 장비", url: "/smart-solutions#equipment", items: [
          { nm: "Smart Lift", ds: "근력보조슈트", url: "/smart-lift", own: true },
          { nm: "Smart Ware", ds: "스마트 제조 장비", url: "https://smartware.kr/", ext: true },
          { nm: "Next Wood", ds: "목공 CNC, 소프트웨어", url: "https://nextwood.co.kr/", ext: true }
        ]}
      ]},
    { label: "스마트공장",
      intro: { title: "스마트공장", text: "지원사업 활용부터 구축, 교육까지. 공장을 진단하고 필요한 것만 제안합니다.", link: { nm: "공장 진단 신청 →", url: "/smart-factory" } },
      groups: [
        { title: "지원사업", items: [
          { nm: "스마트공장 구축", url: "/smart-factory" },
          { nm: "중소기업 혁신바우처", url: "/sme-voucher" },
          { nm: "제조 스마트화 지원사업", url: "/2026_smart" },
          { nm: "스마트제조 성공사례", url: "/smartsuccess" }
        ]},
        { title: "업종별 디지털 전환", items: [
          { nm: "기계 제조", url: "/machine" },
          { nm: "가구 목재", url: "/wood" },
          { nm: "의류 제조", url: "/fashion" }
        ]}
      ]},
    { label: "교육&지원",
      intro: { title: "교육&지원", text: "정기교육과 세미나, 도입 후 기술지원까지 이어서 돕습니다.", link: { nm: "교육 일정 보기 →", url: "/event" } },
      groups: [
        { title: "교육", items: [
          { nm: "통합 교육 일정", url: "/event" },
          { nm: "공공기관 교육", url: "/education" },
          { nm: "온라인 교육", url: "https://ycc.liveklass.com/", ext: true }
        ]},
        { title: "기술지원", items: [
          { nm: "YC 케어", url: "/yc_care" },
          { nm: "기술 블로그", url: "/blog" },
          { nm: "기술지원 카페", url: "https://cafe.naver.com/ycsupport", ext: true }
        ]}
      ]}
  ];

  var CSS = [
    ".ycmm-on > .subMenuNaviListDiv{display:none!important}",
    ".ycmm-on.ycmm-open > a.menu-name{color:#1a1adb!important}",
    ".ycmm{position:absolute;left:0;right:0;top:100%;z-index:9999;background:#fff;border-top:1px solid #e5e7eb;box-shadow:0 18px 40px rgba(17,19,24,.10);opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .16s ease,transform .16s ease,visibility 0s linear .16s;text-align:left}",
    ".ycmm.ycmm-show{opacity:1;visibility:visible;transform:none;transition:opacity .16s ease,transform .16s ease}",
    ".ycmm *{box-sizing:border-box}",
    ".ycmm a{text-decoration:none;color:#111318}",
    ".ycmm-panel{display:none;max-width:1280px;margin:0 auto;padding:28px 32px 24px}",
    ".ycmm-panel.ycmm-cur{display:block}",
    ".ycmm-body{display:flex}",
    ".ycmm-intro{flex:0 0 250px;padding-right:28px;border-right:1px solid #e5e7eb}",
    ".ycmm-intro h3{margin:0 0 8px;font-size:20px;font-weight:800;color:#111318}",
    ".ycmm-intro p{margin:0 0 14px;font-size:13px;line-height:1.6;color:#6b7280}",
    ".ycmm .ycmm-intro a{font-size:13px;font-weight:800;color:#1a1adb}",
    ".ycmm-cols{flex:1;display:grid;grid-auto-flow:column;grid-auto-columns:1fr}",
    ".ycmm-col{min-width:0;padding:0 16px;border-left:1px solid #e5e7eb}",
    ".ycmm-col:first-child{border-left:none}",
    ".ycmm-noi .ycmm-col:first-child{padding-left:0}",
    ".ycmm-intro + .ycmm-cols .ycmm-col:first-child{padding-left:28px}",
    ".ycmm-col h4{margin:0 0 14px;font-size:13px;font-weight:800;color:#1a1adb}",
    ".ycmm .ycmm-col h4 a{color:#1a1adb}",
    ".ycmm-item{display:block;padding:7px 8px;margin:0 -8px 2px;border-radius:6px}",
    ".ycmm-item:hover{background:#f5f6fa}",
    ".ycmm-nm{display:flex;flex-wrap:wrap;align-items:center;gap:3px 6px;font-size:14.5px;font-weight:700;color:#111318}",
    ".ycmm-nm > b{font-weight:700;white-space:nowrap}",
    ".ycmm-ds{display:block;font-size:12px;color:#6b7280;margin-top:2px;font-weight:400}",
    ".ycmm-tag{font-size:10px;font-weight:700;color:#1a1adb;border:1px solid #c9c9f5;border-radius:3px;padding:1px 4px;line-height:1.3}",
    ".ycmm-ext{font-size:11px;color:#6b7280}",
    ".ycmm-foot{display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:14px;border-top:1px solid #e5e7eb;font-size:13px;color:#6b7280}",
    ".ycmm .ycmm-foot a{font-weight:800;color:#1a1adb}"
  ].join("\n");

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function attrs(it) { return ' href="' + esc(it.url) + '"' + (it.ext ? ' target="_blank" rel="noopener"' : ""); }

  function panelHtml(m, i) {
    var intro = m.intro ? '<div class="ycmm-intro"><h3>' + esc(m.intro.title) + "</h3><p>" + esc(m.intro.text) + '</p><a href="' + esc(m.intro.link.url) + '">' + esc(m.intro.link.nm) + "</a></div>" : "";
    var cols = '<div class="ycmm-cols">' + m.groups.map(function (g) {
      var h = (g.url && (SOLUTION_HUB || g.url.indexOf("/smart-solutions") !== 0)) ? '<a href="' + esc(g.url) + '">' + esc(g.title) + "</a>" : esc(g.title);
      return '<div class="ycmm-col"><h4>' + h + "</h4>" + g.items.map(function (it) {
        return '<a class="ycmm-item"' + attrs(it) + '><span class="ycmm-nm"><b>' + esc(it.nm) + "</b>" +
          (it.own ? ' <span class="ycmm-tag">자체 개발</span>' : "") +
          (it.ext ? ' <span class="ycmm-ext">↗</span>' : "") +
          '</span>' + (it.ds ? '<span class="ycmm-ds">' + esc(it.ds) + "</span>" : "") + "</a>";
      }).join("") + "</div>";
    }).join("") + "</div>";
    var foot = (m.foot && (SOLUTION_HUB || m.foot.url.indexOf("/smart-solutions") !== 0)) ? '<div class="ycmm-foot"><span>' + esc(m.foot.text) + '</span><a href="' + esc(m.foot.url) + '">' + esc(m.foot.nm) + "</a></div>" : "";
    return '<div class="ycmm-panel' + (m.intro ? "" : " ycmm-noi") + '" data-i="' + i + '"><div class="ycmm-body">' + intro + cols + "</div>" + foot + "</div>";
  }

  function init() {
    var header = document.querySelector("#siteHeader");
    var lis = document.querySelectorAll(".headerMenuList.desktop .headerMenuListContents > li.menu-main");
    if (!header || !lis.length) return false;

    var st = document.createElement("style");
    st.id = "ycmm-style";
    st.textContent = CSS;
    document.head.appendChild(st);

    var mega = document.createElement("div");
    mega.className = "ycmm";
    mega.setAttribute("aria-label", "전체 메뉴");
    mega.innerHTML = MENUS.map(panelHtml).join("");
    if (getComputedStyle(header).position === "static") header.style.position = "relative";
    header.appendChild(mega);

    var panels = mega.querySelectorAll(".ycmm-panel");
    var bound = [];
    var timer;

    function closeAll() {
      mega.classList.remove("ycmm-show");
      bound.forEach(function (li) { li.classList.remove("ycmm-open"); });
    }
    function openAt(i, li) {
      clearTimeout(timer);
      bound.forEach(function (b) { b.classList.toggle("ycmm-open", b === li); });
      for (var p = 0; p < panels.length; p++) panels[p].classList.toggle("ycmm-cur", panels[p].getAttribute("data-i") == i);
      mega.classList.add("ycmm-show");
    }
    function closeSoon() { timer = setTimeout(closeAll, 160); }

    Array.prototype.forEach.call(lis, function (li) {
      var a = li.querySelector(":scope > a.menu-name");
      var label = a ? a.textContent.trim() : "";
      var idx = -1;
      for (var k = 0; k < MENUS.length; k++) if (MENUS[k].label === label) idx = k;
      if (idx < 0) {
        li.addEventListener("mouseenter", closeAll);
        return;
      }
      li.classList.add("ycmm-on");
      bound.push(li);
      li.addEventListener("mouseenter", function () { openAt(idx, li); });
      li.addEventListener("mouseleave", closeSoon);
    });

    mega.addEventListener("mouseenter", function () { clearTimeout(timer); });
    mega.addEventListener("mouseleave", closeSoon);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
    return true;
  }

  function start() {
    var tries = 0;
    (function retry() {
      if (init() || ++tries > 40) return;
      setTimeout(retry, 150);
    })();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
