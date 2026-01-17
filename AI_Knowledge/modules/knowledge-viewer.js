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
    renderSystemNotes() {
        const notes = this.generateNotesFromQuestions();

        let html = `
            <div class="knowledge-header">
                <button class="btn-back" onclick="KnowledgeViewer.close()">← 返回</button>
                <h2>📓 系統性筆記</h2>
            </div>
            <p class="knowledge-subtitle">整理自所有題目的知識點，包含正確答案與解釋</p>
            <div class="notes-container">
        `;

        Object.entries(notes).forEach(([category, items]) => {
            html += `
                <div class="notes-category">
                    <div class="notes-category-header" onclick="KnowledgeViewer.toggleNotesCategory(this)">
                        <span class="notes-expand">▶</span>
                        <h3>${this.getCategoryIcon(category)} ${category}</h3>
                        <span class="notes-count">${items.length} 條知識點</span>
                    </div>
                    <div class="notes-items" style="display: none;">
            `;

            items.forEach((item, idx) => {
                html += `
                    <div class="note-card">
                        <div class="note-header">
                            <span class="note-number">${idx + 1}</span>
                            <span class="note-type ${item.type}">${item.type === 'single' ? '單選' : '多選'}</span>
                        </div>
                        <div class="note-question">${this.escapeHtml(item.question)}</div>
                        <div class="note-answer">
                            <strong>✅ 正確答案：</strong>
                            <ul>
                                ${item.correctOptions.map(opt => `<li>${this.escapeHtml(opt)}</li>`).join('')}
                            </ul>
                        </div>
                        ${item.explanation ? `<div class="note-explanation">💡 ${this.escapeHtml(item.explanation)}</div>` : ''}
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
            container.innerHTML = this.renderSystemNotes();
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
