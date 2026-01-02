// =========================================================
//  LinkList Main Script (インタラクティブ機能 + リンク管理)
// =========================================================

// --- [定数とヘルパー関数] ---------------------------------
const FAVICON_BASE_URL = 'https://www.google.com/s2/favicons?domain=';
const ICON_SIZE = 32;
const STORAGE_KEY = 'linklist_data';

/** LocalStorageからリンクデータを取得 */
function getLinks() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to load links from localStorage:", e);
        return [];
    }
}

/** LocalStorageにリンクデータを保存 */
function saveLinks(links) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (e) {
        console.error("Failed to save links to localStorage:", e);
    }
}

/**
 * URLからファビコンURLを生成
 * @param {string} url - リンクのURL
 * @returns {string} ファビコン画像のURL
 */
function generateFaviconUrl(url) {
    return `${FAVICON_BASE_URL}${url}&sz=${ICON_SIZE}`;
}

/** デフォルトアイコンのパス */
const DEFAULT_ICON_PATH = 'ico/mail.svg';

// --- [リンク管理ロジック] ----------------------------------

/**
 * アプリケーション起動時に既存リンクのファビコンURLをチェックし補完
 */
function checkAndFixLinks() {
    let links = getLinks();
    let updated = false;

    links = links.map(link => {
        // 既存のリンクにfaviconフィールドがない場合、新たに生成して補完
        if (!link.favicon) {
            link.favicon = generateFaviconUrl(link.url);
            updated = true;
        }
        return link;
    });

    if (updated) {
        saveLinks(links);
    }
}


/**
 * リンクデータからHTML要素を生成して表示
 */
function renderLinkList() {
    const links = getLinks();
    const container = document.getElementById('link-container'); // HTML側のリンク表示コンテナID
    if (!container) return;
    // If no stored links, keep existing static DOM and apply interactive features
    if (!links || links.length === 0) {
        // Apply interactive features to existing .link-card elements inside container
        container.querySelectorAll('.link-card').forEach(el => applyInteractiveFeatures(el));
        return;
    }

    // リンクをカテゴリごとにグループ化して動的に生成
    const categorizedLinks = links.reduce((acc, link) => {
        const category = link.category || '未分類';
        if (!acc[category]) acc[category] = [];
        acc[category].push(link);
        return acc;
    }, {});

    container.innerHTML = '';
    for (const category in categorizedLinks) {
        const section = document.createElement('section');
        section.className = 'link-section';
        section.innerHTML = `<h2>${category}</h2><div class="link-grid"></div>`;
        const grid = section.querySelector('.link-grid');

        categorizedLinks[category].forEach(link => {
            // 静的HTMLと同じ構造（aタグがlink-card）で生成
            const linkCard = document.createElement('a');
            linkCard.className = 'link-card';
            linkCard.href = link.url;
            linkCard.target = '_blank';
            linkCard.rel = 'noopener noreferrer';
            linkCard.setAttribute('data-link-id', link.id);

            linkCard.innerHTML = `
                <img src="${link.favicon}" alt="${link.name}のアイコン" class="sns-icon" onerror="this.onerror=null; this.src='${DEFAULT_ICON_PATH}';" />
                <span class="link-text">${link.name}</span>
            `;

            grid.appendChild(linkCard);
            applyInteractiveFeatures(linkCard);
        });

        container.appendChild(section);
    }
}

/**
 * 新しいリンクを追加 (フォーム送信イベントから呼び出されることを想定)
 * @param {string} name - リンク名
 * @param {string} url - リンクURL
 * @param {string} category - カテゴリ名
 */
function addNewLink(name, url, category) {
    if (!url.startsWith('http')) {
        url = 'https://' + url; // プロトコルがない場合はhttps://を補完
    }
    
    const links = getLinks();
    const newLink = {
        id: Date.now(),
        name: name,
        url: url,
        category: category,
        favicon: generateFaviconUrl(url) // ★ リンク追加時にファビコンURLを生成し保存
    };
    
    links.push(newLink);
    saveLinks(links);
    renderLinkList(); // リストを再描画
}

// TODO: 削除機能、編集機能などのロジックをここに追加

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

  // 1. ページ読み込み時のアニメーション (既存コード)
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
      subtitle.style.transition = 'all 0.8s ease';
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 500);
  }

  // リップルアニメーションのCSSを動的に追加 (既存コード)
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
  document.head.appendChild(style);

  
  // 2. リンク管理機能の初期化
  checkAndFixLinks(); // 既存リンクのファビコンをチェック
    renderLinkList();   // リンク一覧の表示

    // Also apply interactive features to any pre-existing static .link-card elements
    document.querySelectorAll('#link-container .link-card').forEach(el => applyInteractiveFeatures(el));

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
