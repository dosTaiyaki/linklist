// ウェブページ全体のインタラクティブ機能
document.addEventListener('DOMContentLoaded', function() {
  // 💡 テーマ切り替え関連のコードはすべて削除しました。
  // ダークモードの切り替えはCSS側で @media (prefers-color-scheme: dark) に完全に依存します。
  
  // ページ読み込み時のアニメーション
  const linkSections = document.querySelectorAll('.link-section');
  const linkCards = document.querySelectorAll('.link-card');
  const title = document.querySelector('h1');
  const subtitle = document.querySelector('.subtitle');

  // セクションのアニメーション
  linkSections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
  });
  
  // ヘッダータイトルのアニメーション
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    setTimeout(() => {
      title.style.transition = 'all 0.8s ease';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // サブタイトルのアニメーション
  if (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    setTimeout(() => {
      subtitle.style.transition = 'all 0.8s ease';
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 500);
  }

  // リンクカードのインタラクティブ機能
  linkCards.forEach(card => {
    // ホバー効果（CSS の方が滑らかだが JS でも制御）
    card.addEventListener('mouseenter', () => card.style.boxShadow = '0 8px 18px rgba(0,0,0,0.12)');
    card.addEventListener('mouseleave', () => card.style.boxShadow = '');

    // pointerdown でリップル生成（タッチ対応）
    card.addEventListener('pointerdown', function(e) {
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
  });
  
  // リップルアニメーションのCSSを動的に追加
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
  document.head.appendChild(style);
});

// スクロールアニメーションをrequestAnimationFrameでスムーズに
let ticking = false;

window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.container');

  if (!ticking) {
    window.requestAnimationFrame(function() {
      // 小さめのパララックスに抑える
      const speed = scrolled * 0.05;
      if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});
