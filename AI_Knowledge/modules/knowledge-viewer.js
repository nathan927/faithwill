/**
 * AI 知識溫故知新 - 知識展示模組
 * 處理核心問題和系統性筆記的渲染
 */

const KnowledgeViewer = {
    currentView: null, // 'exploration' | 'notes'

    // 渲染核心問題列表
    renderExplorationQuestions() {
        const grouped = getExplorationByCategory();
        let html = `
            <div class="knowledge-header">
                <button class="btn-back" onclick="KnowledgeViewer.close()">← 返回</button>
                <h2>💡 理清核心問題</h2>
            </div>
            <p class="knowledge-subtitle">探索 AI 世界的核心概念，每個問題都引導你深入理解</p>
            <div class="exploration-list">
        `;

        Object.entries(grouped).forEach(([category, questions]) => {
            html += `
                <div class="exploration-category">
                    <h3 class="category-title">${this.getCategoryIcon(category)} ${category}</h3>
                    <div class="exploration-items">
            `;

            questions.forEach((q, idx) => {
                html += `
                    <div class="exploration-card" onclick="KnowledgeViewer.showAnswer('${q.id}')">
                        <div class="exploration-question">
                            <span class="question-number">${idx + 1}</span>
                            <span class="question-text">${q.question}</span>
                            <span class="expand-icon">▼</span>
                        </div>
                        <div class="exploration-answer" id="answer_${q.id}" style="display: none;">
                            <p class="answer-text">${q.answer}</p>
                            <div class="key-points">
                                <span class="key-label">關鍵詞：</span>
                                ${q.keyPoints.map(kp => `<span class="key-point">${kp}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    // 獲取分類圖標
    getCategoryIcon(category) {
        const icons = {
            '語言理解': '💬',
            '自動化操作': '🤖',
            '視覺能力': '👁️',
            'AI 局限性': '⚠️',
            '推理思考': '🧠',
            '人機關係': '🤝',
            '模型差異': '🔄',
            '技術原理': '⚙️',
            '實際應用': '💼',
            '未來發展': '🚀'
        };
        return icons[category] || '📌';
    },

    // 展開/收起答案
    showAnswer(questionId) {
        const answerEl = document.getElementById(`answer_${questionId}`);
        const card = answerEl.closest('.exploration-card');
        const icon = card.querySelector('.expand-icon');

        if (answerEl.style.display === 'none') {
            answerEl.style.display = 'block';
            card.classList.add('expanded');
            icon.textContent = '▲';
        } else {
            answerEl.style.display = 'none';
            card.classList.remove('expanded');
            icon.textContent = '▼';
        }
    },

    // 渲染系統性筆記
    renderSystemNotes(notesData = null) {
        // 如果傳入數據，則使用傳入的（搜索結果）；否則重新生成
        const notes = notesData || this.generateNotesFromQuestions();

        // 首次渲染時初始化 Fuse（如果還沒初始化）
        if (!this.fuse && window.Fuse) {
            this.initSearchIndex();
        }

        let html = `
            <div class="knowledge-header">
                <div class="header-left">
                    <button class="btn-back" onclick="KnowledgeViewer.close()">← 返回</button>
                    <h2>📓 系統性筆記</h2>
                </div>
                <div class="search-container">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="notesSearch" class="search-input" placeholder="搜尋 AI 知識..." oninput="KnowledgeViewer.handleSearch(this.value)">
                </div>
            </div>
            <p class="knowledge-subtitle">整理自所有題目的知識點，包含正確答案與解釋</p>
            <div class="notes-container" id="notesContainer">
        `;

        if (Object.keys(notes).length === 0) {
            html += `<div class="no-results">找不到相關筆記</div>`;
        }

        Object.entries(notes).forEach(([category, items]) => {
            // 如果是搜索結果，預設展開；否則預設收起
            const isSearchResult = !!notesData;

            html += `
                <div class="notes-category">
                    <div class="notes-category-header ${isSearchResult ? 'expanded' : ''}" onclick="KnowledgeViewer.toggleNotesCategory(this)">
                        <span class="notes-expand">${isSearchResult ? '▼' : '▶'}</span>
                        <h3>${this.getCategoryIcon(category)} ${category}</h3>
                        <span class="notes-count">${items.length} 條知識點</span>
                    </div>
                    <div class="notes-items" style="display: ${isSearchResult ? 'block' : 'none'};">
            `;

            items.forEach((item, idx) => {
                html += `
                    <div class="note-card">
                        <div class="note-header">
                            <span class="note-number">${item.originalIndex !== undefined ? item.originalIndex + 1 : idx + 1}</span>
                            <span class="note-type ${item.type}">${item.type === 'single' ? '單選' : '多選'}</span>
                        </div>
                        <div class="note-question">${this.escapeHtml(item.question)}</div>
                        <div class="note-answer">
                            <ul class="note-answer-list">${item.correctOptions.map(opt => `<li>${this.escapeHtml(opt)}</li>`).join('')}</ul>
                        </div>
                        ${item.explanation ? `<div class="note-explanation">${this.escapeHtml(item.explanation)}</div>` : ''}
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    // 初始化搜索索引
    initSearchIndex() {
        if (!window.Fuse) return;

        const allNotes = [];
        const rawNotes = this.generateNotesFromQuestions();

        // 展平結構以便搜索
        Object.entries(rawNotes).forEach(([category, items]) => {
            items.forEach((item, idx) => {
                allNotes.push({
                    ...item,
                    category,
                    originalIndex: idx
                });
            });
        });

        // Fuse 配置
        const options = {
            keys: [
                { name: 'question', weight: 0.5 },
                { name: 'explanation', weight: 0.3 },
                { name: 'category', weight: 0.2 }
            ],
            threshold: 0.3, // 模糊匹配閾值 (0.0 = 完全匹配, 1.0 = 匹配任何)
            includeScore: true
        };

        this.fuse = new Fuse(allNotes, options);
    },

    // 處理搜索
    handleSearch(query) {
        const container = document.getElementById('notesContainer');

        if (!query || query.trim() === '') {
            // 恢復原始視圖
            container.innerHTML = this.renderSystemNotesOnlyContent();
            // 重新綁定事件聽眾（如果需要）
            return;
        }

        if (!this.fuse) return;

        const results = this.fuse.search(query);
        const filteredNotes = {};

        results.forEach(result => {
            const item = result.item;
            if (!filteredNotes[item.category]) {
                filteredNotes[item.category] = [];
            }
            filteredNotes[item.category].push(item);
        });

        // 重新渲染內容區域
        container.innerHTML = this.renderSystemNotesOnlyContent(filteredNotes);
    },

    // 僅渲染筆記內容部分（用於搜索更新）
    renderSystemNotesOnlyContent(notesData = null) {
        const notes = notesData || this.generateNotesFromQuestions();
        let html = '';

        if (Object.keys(notes).length === 0) {
            return `<div class="no-results" style="text-align: center; padding: 2rem; color: var(--text-secondary);">找不到相關筆記 🕵️</div>`;
        }

        Object.entries(notes).forEach(([category, items]) => {
            const isSearchResult = !!notesData;

            html += `
                <div class="notes-category">
                    <div class="notes-category-header ${isSearchResult ? 'expanded' : ''}" onclick="KnowledgeViewer.toggleNotesCategory(this)">
                        <span class="notes-expand">${isSearchResult ? '▼' : '▶'}</span>
                        <h3>${this.getCategoryIcon(category)} ${category}</h3>
                        <span class="notes-count">${items.length} 條知識點</span>
                    </div>
                    <div class="notes-items" style="display: ${isSearchResult ? 'block' : 'none'};">
            `;

            items.forEach((item) => {
                html += `
                    <div class="note-card">
                        <div class="note-header">
                            <span class="note-number">${item.originalIndex !== undefined ? item.originalIndex + 1 : '#'}</span>
                            <span class="note-type ${item.type}">${item.type === 'single' ? '單選' : '多選'}</span>
                        </div>
                        <div class="note-question">${this.escapeHtml(item.question)}</div>
                        <div class="note-answer">
                            <ul class="note-answer-list">${item.correctOptions.map(opt => `<li>${this.escapeHtml(opt)}</li>`).join('')}</ul>
                        </div>
                        ${item.explanation ? `<div class="note-explanation">${this.escapeHtml(item.explanation)}</div>` : ''}
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        return html;
    },

    // 從題庫生成筆記
    generateNotesFromQuestions() {
        const notes = {};

        // 收集所有題目
        if (typeof defaultQuestions !== 'undefined') {
            ['beginner', 'advanced', 'expert'].forEach(level => {
                if (defaultQuestions[level]) {
                    defaultQuestions[level].forEach(q => {
                        const category = q.category || '未分類';
                        if (!notes[category]) {
                            notes[category] = [];
                        }

                        // 避免重複
                        if (!notes[category].find(n => n.question === q.question)) {
                            notes[category].push({
                                question: q.question,
                                type: q.type || 'single',
                                correctOptions: q.correctAnswers.map(idx => q.options[idx]),
                                explanation: q.explanation || ''
                            });
                        }
                    });
                }
            });
        }

        return notes;
    },

    // 切換筆記分類展開/收起
    toggleNotesCategory(header) {
        const items = header.nextElementSibling;
        const expand = header.querySelector('.notes-expand');

        if (items.style.display === 'none') {
            items.style.display = 'block';
            expand.textContent = '▼';
            header.classList.add('expanded');
        } else {
            items.style.display = 'none';
            expand.textContent = '▶';
            header.classList.remove('expanded');
        }
    },

    // 顯示知識頁面
    show(view) {
        this.currentView = view;
        const container = document.getElementById('knowledgeArea');

        if (view === 'exploration') {
            container.innerHTML = this.renderExplorationQuestions();
        } else if (view === 'notes') {
            // 重置搜索
            this.fuse = null;
            container.innerHTML = this.renderSystemNotes();
            // 在渲染後初始化搜索
            setTimeout(() => this.initSearchIndex(), 100);
        }

        // 切換頁面
        document.getElementById('modeSelection').style.display = 'none';
        container.style.display = 'block';
    },

    // 關閉知識頁面
    close() {
        document.getElementById('knowledgeArea').style.display = 'none';
        document.getElementById('modeSelection').style.display = 'block';
        this.currentView = null;
    },

    // HTML 轉義
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// 導出
if (typeof window !== 'undefined') {
    window.KnowledgeViewer = KnowledgeViewer;
}
