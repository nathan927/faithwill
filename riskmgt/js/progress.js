/**
 * 貸後智庫 - 進度追蹤模組
 * 處理能力圖譜、統計數據及學習歷程
 */

const ProgressModule = {
    radarChart: null,

    // 初始化
    init() {
        this.updateDashboard();
    },

    // 更新儀表板
    updateDashboard() {
        const progress = DataManager.getProgress() || DataManager.initProgress();

        // 更新統計卡片
        this.updateStatCards(progress);

        // 繪製雷達圖
        this.renderRadarChart(progress);

        // 渲染弱項列表
        this.renderWeaknesses();

        // 渲染歷程
        this.renderHistory();
    },

    // 更新統計卡片
    updateStatCards(progress) {
        // 知識覆蓋率
        const totalKnowledge = KnowledgeData.getTotalItemCount();
        const viewedCount = progress.viewedKnowledge?.length || 0;
        const knowledgePercent = totalKnowledge > 0
            ? Math.round((viewedCount / totalKnowledge) * 100)
            : 0;
        const knowledgeEl = document.getElementById('knowledgeProgress');
        if (knowledgeEl) knowledgeEl.textContent = `${knowledgePercent}%`;

        // 已答題數
        const answeredEl = document.getElementById('totalAnswered');
        if (answeredEl) answeredEl.textContent = progress.answered || 0;

        // 整體正確率
        const accuracy = progress.answered > 0
            ? Math.round((progress.correct / progress.answered) * 100)
            : 0;
        const accuracyEl = document.getElementById('overallAccuracy');
        if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;

        // 學習時長
        const hours = ((progress.totalTime || 0) / 60).toFixed(1);
        const timeEl = document.getElementById('totalTime');
        if (timeEl) timeEl.textContent = `${hours}h`;
    },

    // 繪製雷達圖
    renderRadarChart(progress) {
        const canvas = document.getElementById('radarChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(centerX, centerY) - 50;

        // 領域及其分數
        const domains = [
            { name: '貸後基礎', key: 'basics' },
            { name: '實地走訪', key: 'fieldVisit' },
            { name: '財務分析', key: 'financial' },
            { name: '貿融審查', key: 'tradeFin' },
            { name: '風險評估', key: 'riskAssess' },
            { name: '資金追蹤', key: 'fundTrack' },
            { name: '問題處置', key: 'problemLoan' }
        ];

        const stats = progress.domainStats || {};
        const scores = domains.map(d => {
            const stat = stats[d.key];
            if (!stat || stat.answered === 0) return 50; // 默認50分
            return Math.round((stat.correct / stat.answered) * 100);
        });

        // 清空畫布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 繪製背景網格
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            const r = (maxRadius / 5) * i;
            for (let j = 0; j <= domains.length; j++) {
                const angle = (Math.PI * 2 / domains.length) * j - Math.PI / 2;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                if (j === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }

        // 繪製軸線
        domains.forEach((_, i) => {
            const angle = (Math.PI * 2 / domains.length) * i - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + maxRadius * Math.cos(angle),
                centerY + maxRadius * Math.sin(angle)
            );
            ctx.stroke();
        });

        // 繪製數據區域
        ctx.beginPath();
        ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
        ctx.lineWidth = 2;

        scores.forEach((score, i) => {
            const angle = (Math.PI * 2 / domains.length) * i - Math.PI / 2;
            const r = (maxRadius / 100) * score;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 繪製數據點
        scores.forEach((score, i) => {
            const angle = (Math.PI * 2 / domains.length) * i - Math.PI / 2;
            const r = (maxRadius / 100) * score;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#d4af37';
            ctx.fill();
        });

        // 繪製標籤
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px "Noto Sans TC"';
        ctx.textAlign = 'center';

        domains.forEach((domain, i) => {
            const angle = (Math.PI * 2 / domains.length) * i - Math.PI / 2;
            const labelR = maxRadius + 30;
            const x = centerX + labelR * Math.cos(angle);
            const y = centerY + labelR * Math.sin(angle);

            ctx.fillText(domain.name, x, y);
            ctx.fillText(`${scores[i]}%`, x, y + 15);
        });
    },

    // 渲染弱項列表
    renderWeaknesses() {
        const list = document.getElementById('weaknessList');
        if (!list) return;

        const weaknesses = DataManager.getWeaknesses();

        if (weaknesses.length === 0) {
            list.innerHTML = `
                <div class="weakness-item">
                    <span class="weakness-icon">✨</span>
                    <div class="weakness-info">
                        <div class="weakness-name">暫無明顯弱項</div>
                    </div>
                    <span class="weakness-rate">繼續保持！</span>
                </div>
            `;
            return;
        }

        const domainNames = {
            basics: '貸後管理基礎',
            fieldVisit: '實地走訪技術',
            financial: '財務報表分析',
            tradeFin: '貿易融資審查',
            riskAssess: '客戶風險評估',
            fundTrack: '資金用途追蹤',
            problemLoan: '貸後問題處置'
        };

        list.innerHTML = weaknesses.map(w => `
            <div class="weakness-item">
                <span class="weakness-icon">📉</span>
                <div class="weakness-info">
                    <div class="weakness-name">${domainNames[w.domain] || w.domain}</div>
                    <div class="weakness-bar">
                        <div class="weakness-fill" style="width: ${w.rate}%"></div>
                    </div>
                </div>
                <span class="weakness-rate">${w.rate}%</span>
            </div>
        `).join('');
    },

    // 渲染歷程
    renderHistory() {
        const list = document.getElementById('historyList');
        if (!list) return;

        const history = DataManager.getHistory(10);

        if (history.length === 0) {
            list.innerHTML = `
                <div class="history-item">
                    <span class="history-icon">📝</span>
                    <div class="history-content">
                        <div class="history-action">還沒有學習記錄</div>
                        <div class="history-time">開始你的第一次練習吧！</div>
                    </div>
                </div>
            `;
            return;
        }

        list.innerHTML = history.map(h => {
            const timeAgo = this.formatTimeAgo(h.time);
            const icon = this.getHistoryIcon(h.action);
            const resultClass = h.result === 'good' ? 'good' : (h.result === 'bad' ? 'bad' : '');

            return `
                <div class="history-item">
                    <span class="history-icon">${icon}</span>
                    <div class="history-content">
                        <div class="history-action">${h.action}：${h.detail}</div>
                        <div class="history-time">${timeAgo}</div>
                    </div>
                    ${h.result ? `<span class="history-result ${resultClass}">${h.result === 'good' ? '優秀' : '待加強'}</span>` : ''}
                </div>
            `;
        }).join('');
    },

    // 格式化時間差
    formatTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return '剛剛';
        if (minutes < 60) return `${minutes} 分鐘前`;
        if (hours < 24) return `${hours} 小時前`;
        if (days < 7) return `${days} 天前`;

        const date = new Date(timestamp);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    },

    // 獲取歷程圖標
    getHistoryIcon(action) {
        const icons = {
            '開始練習': '🎯',
            '完成練習': '✅',
            '閱讀知識點': '📖'
        };
        return icons[action] || '📋';
    }
};

// 導出
window.ProgressModule = ProgressModule;
