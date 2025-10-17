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
    
    // リンクをカテゴリごとにグループ化
    const categorizedLinks = links.reduce((acc, link) => {
        const category = link.category || '未分類';
        if (!acc[category]) {
            acc[category] = [];
        }
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
            const linkCard = document.createElement('div');
            linkCard.className = 'link-card';
            linkCard.setAttribute('data-link-id', link.id);

            // ★ ファビコンを表示するHTMLを生成
            linkCard.innerHTML = `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                    <img 
                        src="${link.favicon}" 
                        alt="${link.name}のファビコン" 
                        class="favicon-icon"
                        // 画像読み込み失敗時（ファビコンがない場合など）に代替アイコンを表示
                        onerror="this.onerror=null; this.src='images/default_link_icon.svg';" 
                    />
                    <span class="link-name">${link.name}</span>
                </a>
                <button class="delete-btn">削除</button>
            `;
            grid.appendChild(linkCard);
            
            // TODO: ここでリンクカードにインタラクティブ機能を再適用する
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

  // リンクカード全体ではなく、renderLinkList()で個別に適用するように変更
  // document.querySelectorAll('.link-card').forEach(applyInteractiveFeatures);

  
  // 2. リンク管理機能の初期化
  checkAndFixLinks(); // 既存リンクのファビコンをチェック
  renderLinkList();   // リンク一覧の表示

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
