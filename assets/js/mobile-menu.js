// 모바일 햄버거 메뉴 기능
(function () {
  'use strict';

  // DOM이 완전히 로드된 후 실행
  document.addEventListener('DOMContentLoaded', function () {
    // 모바일 헤더 생성
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';

    // 블로그 타이틀 링크 생성
    const headerTitle = document.createElement('a');
    headerTitle.className = 'mobile-header-title';
    headerTitle.href = '/';
    headerTitle.textContent = "Minsu\'s Archive";

    // 햄버거 버튼 생성
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    // 헤더에 타이틀과 햄버거 버튼 추가
    mobileHeader.appendChild(headerTitle);
    mobileHeader.appendChild(hamburger);

    // 오버레이 생성
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';

    // body에 추가
    document.body.insertBefore(mobileHeader, document.body.firstChild);
    document.body.insertBefore(overlay, document.body.firstChild);

    // plainwhite 테마의 about 섹션을 사이드바로 사용
    const sidebar = document.querySelector('.about');

    if (!sidebar) {
      console.warn('About section (sidebar) not found');
      return;
    }

    // 메뉴 토글 함수
    function toggleMenu() {
      hamburger.classList.toggle('active');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');

      // body 스크롤 방지/허용
      if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    // 메뉴 닫기 함수
    function closeMenu() {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // 이벤트 리스너
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // 사이드바 내 링크 클릭 시 메뉴 닫기
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        // 모바일에서만 닫기
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeMenu();
      }
    });

    // 화면 크기 변경 시 데스크톱에서는 메뉴 닫기
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  });
})();
