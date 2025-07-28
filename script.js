document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('link-form');
    const linkList = document.getElementById('link-list');
    const importFileInput = document.getElementById('import-file-input'); // ★変更点: ファイル入力要素
    const exportButton = document.getElementById('export-button');
    const searchInput = document.getElementById('search-input');
    const clearSearchButton = document.getElementById('clear-search');
    const sortSelect = document.getElementById('sort-select');

    let links = [];

    // Load links from local storage
    const loadLinks = () => {
        const storedLinks = localStorage.getItem('links');
        if (storedLinks) {
            links = JSON.parse(storedLinks);
            renderLinks();
        } else {
            // ローディングメッセージをクリアし、リンクがないことを表示
            linkList.innerHTML = '<p>No links found. Add some!</p>';
        }
    };

    // Save links to local storage
    const saveLinks = () => {
        localStorage.setItem('links', JSON.stringify(links));
    };

    // Render links to the DOM
    const renderLinks = (filteredLinks = links) => {
        linkList.innerHTML = ''; // Clear existing list items
        if (filteredLinks.length === 0) {
            linkList.innerHTML = '<p>No links found. Add some!</p>';
            return;
        }

        filteredLinks.forEach((link, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', index); // Add data-index for sorting/reordering

            const linkTitle = document.createElement('span');
            linkTitle.className = 'link-title';
            linkTitle.textContent = link.title;

            const linkUrl = document.createElement('a');
            linkUrl.href = link.url;
            linkUrl.target = '_blank';
            linkUrl.textContent = link.url;

            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'tags-container';
            link.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tagsContainer.appendChild(tagSpan);
            });

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'link-actions';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-button';
            // editLink関数はfilterされていない元の'links'配列のインデックスを使用するため、
            // 実際にlinks配列内の要素のインデックスを渡す必要があります。
            // 検索・ソート時にも正しく編集できるように、元のリンクオブジェクトを渡すか、
            // 複雑になりますが、idなどの一意な識別子を使用すると良いでしょう。
            // 今回は簡略化のため、元のリンク配列のインデックスを渡します。
            // ただし、検索・ソートの結果を編集すると元のlinks配列が変更される点に注意してください。
            editButton.onclick = () => {
                const originalIndex = links.findIndex(l => l.title === link.title && l.url === link.url);
                if (originalIndex !== -1) {
                    editLink(originalIndex);
                }
            };


            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => {
                // deleteLinkも同様に元のリンク配列のインデックスを使用
                const originalIndex = links.findIndex(l => l.title === link.title && l.url === link.url);
                if (originalIndex !== -1) {
                    deleteLink(originalIndex);
                }
            };


            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);

            li.appendChild(linkTitle);
            li.appendChild(linkUrl);
            li.appendChild(tagsContainer);
            li.appendChild(actionsDiv);
            linkList.appendChild(li);
        });
    };

    // Add new link or update existing link
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('title');
        const urlInput = document.getElementById('url');
        const tagsInput = document.getElementById('tags');

        const title = titleInput.value.trim();
        const url = urlInput.value.trim();
        const tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const editIndex = linkForm.dataset.editIndex;

        if (!title || !url) {
            alert('Title and URL are required!');
            return;
        }

        if (editIndex !== undefined && editIndex !== '') {
            // Update existing link
            links[parseInt(editIndex)] = { title, url, tags };
            delete linkForm.dataset.editIndex; // Clear edit index
            document.querySelector('#link-form button[type="submit"]').textContent = 'Add Link';
        } else {
            // Add new link
            links.push({ title, url, tags });
        }

        saveLinks();
        // フォームをリセットし、検索フィルターをクリアして再描画
        linkForm.reset();
        searchInput.value = ''; // 検索フィールドをクリア
        renderLinks(); // フィルタリングされていない全リンクを表示
    });

    // Edit link
    const editLink = (index) => {
        const link = links[index];
        document.getElementById('title').value = link.title;
        document.getElementById('url').value = link.url;
        document.getElementById('tags').value = link.tags.join(', ');
        linkForm.dataset.editIndex = index; // Store index being edited
        document.querySelector('#link-form button[type="submit"]').textContent = 'Update Link';
        window.scrollTo({ top: 0, behavior: 'smooth' }); // フォームにスクロール
    };

    // Delete link
    const deleteLink = (index) => {
        if (confirm('Are you sure you want to delete this link?')) {
            links.splice(index, 1);
            saveLinks();
            // 削除後も検索フィルターを適用したままにするか、クリアするか選択
            // ここでは検索フィルターをクリアして全リンクを再表示
            searchInput.value = '';
            renderLinks();
        }
    };

    // Import links from file input
    importFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('No file selected.');
            return;
        }

        if (file.type !== 'application/json') {
            alert('Please select a JSON file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                    // 重複を避けるために、既存のリンクとマージする前に重複チェックを行うことも可能です
                    // ここではシンプルに結合します
                    links = [...links, ...importedData];
                    saveLinks();
                    renderLinks();
                    alert('Links imported successfully!');
                    event.target.value = ''; // ファイル選択をクリア
                } else {
                    alert('Invalid JSON format. Please provide an array of link objects.');
                }
            } catch (error) {
                alert('Error parsing JSON: ' + error.message);
            }
        };
        reader.readAsText(file);
    });


    // Export links
    exportButton.addEventListener('click', () => {
        if (links.length === 0) {
            alert('No links to export!');
            return;
        }
        const dataStr = JSON.stringify(links, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'links.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredLinks = links.filter(link =>
            link.title.toLowerCase().includes(searchTerm) ||
            link.url.toLowerCase().includes(searchTerm) ||
            link.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        renderLinks(filteredLinks);
    });

    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        renderLinks();
    });

    // Sort functionality
    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        let sortedLinks = [...links]; // Create a copy to sort

        if (sortBy === 'title-asc') {
            sortedLinks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'title-desc') {
            sortedLinks.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortBy === 'date-asc') {
            // 現状、リンクオブジェクトに日付情報がないため、このソートは機能しません。
            // リンク追加時にタイムスタンプ (e.g., createdAt: new Date().toISOString()) を追加する必要があります。
            // 例: sortedLinks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            alert('Date sorting requires date information to be stored with links.');
        } else if (sortBy === 'date-desc') {
            alert('Date sorting requires date information to be stored with links.');
        }
        renderLinks(sortedLinks);
    });

    // Initial load
    loadLinks();
});
