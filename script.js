document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('link-form');
    const linkList = document.getElementById('link-list');
    const importInput = document.getElementById('import-input');
    const importButton = document.getElementById('import-button');
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
        }
    };

    // Save links to local storage
    const saveLinks = () => {
        localStorage.setItem('links', JSON.stringify(links));
    };

    // Render links to the DOM
    const renderLinks = (filteredLinks = links) => {
        linkList.innerHTML = '';
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
            editButton.onclick = () => editLink(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => deleteLink(index);

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
        const title = document.getElementById('title').value;
        const url = document.getElementById('url').value;
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const editIndex = linkForm.dataset.editIndex;

        if (editIndex !== undefined) {
            // Update existing link
            links[editIndex] = { title, url, tags };
            delete linkForm.dataset.editIndex; // Clear edit index
            document.querySelector('#link-form button[type="submit"]').textContent = 'Add Link';
        } else {
            // Add new link
            links.push({ title, url, tags });
        }

        saveLinks();
        renderLinks();
        linkForm.reset();
    });

    // Edit link
    const editLink = (index) => {
        const link = links[index];
        document.getElementById('title').value = link.title;
        document.getElementById('url').value = link.url;
        document.getElementById('tags').value = link.tags.join(', ');
        linkForm.dataset.editIndex = index; // Store index being edited
        document.querySelector('#link-form button[type="submit"]').textContent = 'Update Link';
    };

    // Delete link
    const deleteLink = (index) => {
        if (confirm('Are you sure you want to delete this link?')) {
            links.splice(index, 1);
            saveLinks();
            renderLinks();
        }
    };

    // Import links
    importButton.addEventListener('click', () => {
        try {
            const importedData = JSON.parse(importInput.value);
            if (Array.isArray(importedData)) {
                links = [...links, ...importedData]; // Merge imported links
                saveLinks();
                renderLinks();
                alert('Links imported successfully!');
                importInput.value = '';
            } else {
                alert('Invalid JSON format. Please provide an array of link objects.');
            }
        } catch (error) {
            alert('Error parsing JSON: ' + error.message);
        }
    });

    // Export links
    exportButton.addEventListener('click', () => {
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
            // Assuming no date stored, this would require adding a timestamp to links
            // For now, this will not change order unless a date property is added
            sortedLinks.sort((a, b) => 0); // Placeholder
        } else if (sortBy === 'date-desc') {
            sortedLinks.sort((a, b) => 0); // Placeholder
        }
        renderLinks(sortedLinks);
    });

    // Initial load
    loadLinks();
});
