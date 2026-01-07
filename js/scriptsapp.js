// =========================================================
//  LinkList Main Script (インタラクティブ機能のみ)
// =========================================================

// --- [インタラクティブ機能] ----------------------------------

/**
 * 個別のリンクカードにホバー/リップルアニメーションを適用
 * @param {HTMLElement} card - リンクカード要素
 */
function applyInteractiveFeatures(card) {
    // 既に適用済みの場合はスキップ（重複適用を防ぐ）
    if (card.dataset.interactiveApplied) return;
    card.dataset.interactiveApplied = 'true';

    // ホバー効果
    card.addEventListener('mouseenter', () => card.style.boxShadow = '0 8px 18px rgba(0,0,0,0.12)');
    card.addEventListener('mouseleave', () => card.style.boxShadow = '');

    // pointerdown でリップル生成
    card.addEventListener('pointerdown', function(e) {
      // 既存のリップルがあれば削除
      this.querySelectorAll('.ripple').forEach(r => r.remove());
        
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.background = 'rgba(255,255,255,0.25)';
      ripple.style.animation = 'ripple 600ms linear';

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
}

// --- [DOMContentLoaded イベント] -----------------------------

document.addEventListener('DOMContentLoaded', function() {
  
  // 年号を自動更新
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 1. ページ読み込み時のアニメーション
  const linkSections = document.querySelectorAll('.link-section');
  const title = document.querySelector('h1');
  const subtitle = document.querySelector('.subtitle');

  linkSections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
  });
  
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    setTimeout(() => {
      title.style.transition = 'all 0.8s ease';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }, 300);
  }
  
  if (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    setTimeout(() => {
      title.style.transition = 'all 0.8s ease';
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 500);
  }

  // リップルアニメーションのCSSを動的に追加
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
  document.head.appendChild(style);

  // 2. インタラクティブ機能の適用
  document.querySelectorAll('.link-card').forEach(el => applyInteractiveFeatures(el));

  // 3. スクロールアニメーションの準備
  let ticking = false;
  const parallax = document.querySelector('.container');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const speed = scrolled * 0.05;
        if (parallax) {
          parallax.style.transform = `translateY(${speed}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
});
