/**
 * 貸後智庫 - 知識庫模組
 * 處理知識領域展示、搜索及學習記錄
 */

const KnowledgeModule = {
    currentDomain: null,

    // 初始化知識庫
    init() {
        this.renderSidebar();
        this.bindEvents();
    },

    // 渲染側邊欄
    renderSidebar() {
        const sidebar = document.getElementById('knowledgeSidebar');
        if (!sidebar) return;

        const domains = KnowledgeData.domains;

        sidebar.innerHTML = domains.map(domain => `
            <div class="domain-item" data-domain="${domain.id}">
                <div class="domain-header">
                    <span class="domain-icon">${domain.icon}</span>
                    <span class="domain-name">${domain.name}</span>
                    <span class="domain-count">${domain.items.length}</span>
                </div>
            </div>
        `).join('');
    },

    // 綁定事件
    bindEvents() {
        // 領域點擊
        document.getElementById('knowledgeSidebar')?.addEventListener('click', (e) => {
            const domainItem = e.target.closest('.domain-item');
            if (domainItem) {
                const domainId = domainItem.dataset.domain;
                this.selectDomain(domainId);
            }
        });

        // 搜索
        const searchInput = document.getElementById('knowledgeSearch');
        let searchTimeout;
        searchInput?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.search(e.target.value);
            }, 300);
        });
    },

    // 選擇領域
    selectDomain(domainId) {
        // 更新側邊欄高亮
        document.querySelectorAll('.domain-item').forEach(item => {
            item.classList.toggle('active', item.dataset.domain === domainId);
        });

        this.currentDomain = domainId;
        const domain = KnowledgeData.getDomainById(domainId);

        if (!domain) return;

        this.renderDomainContent(domain);
    },

    // 渲染領域內容
    renderDomainContent(domain) {
        const content = document.getElementById('knowledgeContent');
        if (!content) return;

        const progress = DataManager.getProgress();
        const viewedItems = progress?.viewedKnowledge || [];

        content.innerHTML = `
            <div class="knowledge-detail">
                <div class="detail-header">
                    <h2 class="detail-title">${domain.icon} ${domain.name}</h2>
                    <p class="detail-meta">
                        <span>${domain.description}</span>
                        <span>共 ${domain.items.length} 個知識點</span>
                    </p>
                </div>
                
                <div class="knowledge-items">
                    ${domain.items.map(item => this.renderKnowledgeItem(item, viewedItems.includes(item.id))).join('')}
                </div>
            </div>
        `;

        // 綁定知識點點擊事件
        content.querySelectorAll('.knowledge-item').forEach(el => {
            el.addEventListener('click', () => {
                const itemId = el.dataset.itemId;
                this.toggleItemExpand(el, itemId);
            });
        });
    },

    // 渲染單個知識點
    renderKnowledgeItem(item, viewed) {
        const importanceLabels = {
            4: '必做',
            3: '重要',
            2: '建議',
            1: '可選'
        };

        return `
            <div class="knowledge-item ${viewed ? 'viewed' : ''}" data-item-id="${item.id}">
                <div class="item-header">
                    <span class="item-title">${item.title}</span>
                    <span class="importance-badge importance-${item.importance}">
                        ${importanceLabels[item.importance]}
                    </span>
                </div>
                <div class="item-content">
                    ${this.formatContent(item.content)}
                </div>
                ${item.tips ? `
                    <div class="item-tips">
                        <div class="item-tips-title">💡 實務技巧</div>
                        <div>${item.tips}</div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // 格式化內容（換行轉為<br>，表格渲染等）
    formatContent(content) {
        // 處理換行
        let formatted = content.replace(/\n/g, '<br>');

        // 處理列表符號
        formatted = formatted.replace(/•/g, '<span style="color: var(--accent-blue);">•</span>');

        return formatted;
    },

    // 切換知識點展開/收起
    toggleItemExpand(element, itemId) {
        element.classList.toggle('expanded');

        // 記錄已閱讀
        DataManager.markKnowledgeViewed(itemId);
        element.classList.add('viewed');

        // 記錄歷程
        const item = KnowledgeData.getItemById(itemId);
        if (item) {
            DataManager.addHistory('閱讀知識點', item.title);
        }
    },

    // 搜索
    search(query) {
        if (!query.trim()) {
            // 清空搜索，恢復當前領域顯示
            if (this.currentDomain) {
                const domain = KnowledgeData.getDomainById(this.currentDomain);
                if (domain) {
                    this.renderDomainContent(domain);
                }
            }
            return;
        }

        const results = KnowledgeData.search(query);
        this.renderSearchResults(results, query);
    },

    // 渲染搜索結果
    renderSearchResults(results, query) {
        const content = document.getElementById('knowledgeContent');
        if (!content) return;

        if (results.length === 0) {
            content.innerHTML = `
                <div class="knowledge-welcome">
                    <div class="welcome-icon">🔍</div>
                    <h3>找不到相關內容</h3>
                    <p>嘗試使用其他關鍵詞搜索</p>
                </div>
            `;
            return;
        }

        const progress = DataManager.getProgress();
        const viewedItems = progress?.viewedKnowledge || [];

        content.innerHTML = `
            <div class="knowledge-detail">
                <div class="detail-header">
                    <h2 class="detail-title">🔍 搜索結果</h2>
                    <p class="detail-meta">
                        <span>關鍵詞：「${query}」</span>
                        <span>找到 ${results.length} 個相關知識點</span>
                    </p>
                </div>
                
                <div class="knowledge-items">
                    ${results.map(item => `
                        <div class="search-result-item">
                            <div class="result-domain">${item.domainName}</div>
                            ${this.renderKnowledgeItem(item, viewedItems.includes(item.id))}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // 綁定點擊事件
        content.querySelectorAll('.knowledge-item').forEach(el => {
            el.addEventListener('click', () => {
                const itemId = el.dataset.itemId;
                this.toggleItemExpand(el, itemId);
            });
        });
    }
};

// 導出
window.KnowledgeModule = KnowledgeModule;
