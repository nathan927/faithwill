/**
 * 貸後智庫 - 主應用模組
 * 初始化、路由控制及全局事件處理
 */

const App = {
    currentPage: 'home',

    // 初始化應用
    init() {
        // 初始化數據
        DataManager.initProgress();

        // 初始化各模組
        KnowledgeModule.init();
        ChecklistModule.init();
        ProgressModule.init();

        // 綁定導航事件
        this.bindNavigation();

        // 綁定功能卡片點擊
        this.bindFeatureCards();

        // 綁定移動端菜單
        this.bindMobileMenu();

        // 綁定Drilling模式選擇
        this.bindDrillingModes();

        console.log('貸後智庫初始化完成');
    },

    // 綁定導航
    bindNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });
    },

    // 導航到頁面
    navigateTo(pageName) {
        // 隱藏所有頁面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // 顯示目標頁面
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 更新導航高亮
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageName);
        });

        // 隱藏移動端菜單
        document.getElementById('navMenu')?.classList.remove('show');

        // 更新當前頁面
        this.currentPage = pageName;

        // 頁面特定初始化
        this.onPageChange(pageName);

        // 滾動到頂部
        window.scrollTo(0, 0);
    },

    // 頁面切換回調
    onPageChange(pageName) {
        switch (pageName) {
            case 'progress':
                ProgressModule.updateDashboard();
                break;
            case 'drilling':
                this.resetDrillingUI();
                break;
        }
    },

    // 綁定功能卡片點擊
    bindFeatureCards() {
        document.querySelectorAll('[data-goto]').forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.goto;
                this.navigateTo(target);
            });
        });
    },

    // 綁定移動端菜單
    bindMobileMenu() {
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');

        toggle?.addEventListener('click', () => {
            menu?.classList.toggle('show');
        });

        // 點擊外部關閉
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                menu?.classList.remove('show');
            }
        });
    },

    // 綁定Drilling模式選擇
    bindDrillingModes() {
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                this.startDrilling(mode);
            });
        });
    },

    // 開始練習
    startDrilling(mode) {
        const session = DrillingManager.startSession(mode);
        if (!session) return;

        // 隱藏模式選擇，顯示練習區域
        document.getElementById('drillingModes').classList.add('hidden');
        document.getElementById('drillingArea').classList.remove('hidden');
        document.getElementById('drillingResult').classList.add('hidden');

        // 顯示第一題
        this.showCurrentQuestion();

        // 綁定答題事件
        this.bindDrillingEvents();
    },

    // 顯示當前題目
    showCurrentQuestion() {
        const question = DrillingManager.getCurrentQuestion();
        if (!question) return;

        const session = DrillingManager.currentSession;
        const progress = ((session.currentIndex / session.questions.length) * 100).toFixed(0);

        // 更新進度
        document.getElementById('drillingProgress').style.width = `${progress}%`;
        document.getElementById('progressText').textContent =
            `${session.currentIndex + 1}/${session.questions.length}`;

        // 更新題目類型和難度
        const typeLabels = {
            scenario: '情境判斷',
            redFlag: '紅旗識別',
            case: '案例分析',
            checklist: '清單核對'
        };
        document.getElementById('questionType').textContent = typeLabels[question.type] || question.type;
        document.getElementById('questionDifficulty').textContent = '⭐'.repeat(question.difficulty);

        // 渲染題目內容
        document.getElementById('questionContent').innerHTML =
            question.question.replace(/\n/g, '<br>');

        // 渲染選項
        const optionsHtml = question.options.map(opt => `
            <div class="option-item" data-option="${opt.id}">
                <span class="option-letter">${opt.id}</span>
                <span class="option-text">${opt.text}</span>
            </div>
        `).join('');
        document.getElementById('questionOptions').innerHTML = optionsHtml;

        // 重置狀態
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('answerReveal').classList.add('hidden');
        document.getElementById('questionCard').classList.remove('hidden');

        // 綁定選項點擊
        this.bindOptionSelection(question.isMultiple);
    },

    // 綁定選項選擇
    bindOptionSelection(isMultiple) {
        const options = document.querySelectorAll('.option-item');

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                if (isMultiple) {
                    opt.classList.toggle('selected');
                } else {
                    options.forEach(o => o.classList.remove('selected'));
                    opt.classList.add('selected');
                }

                // 檢查是否有選中項
                const hasSelection = document.querySelector('.option-item.selected');
                document.getElementById('submitBtn').disabled = !hasSelection;
            });
        });
    },

    // 綁定練習事件
    bindDrillingEvents() {
        // 提交答案
        const submitBtn = document.getElementById('submitBtn');
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

        newSubmitBtn.addEventListener('click', () => {
            this.submitAnswer();
        });

        // 跳過
        const skipBtn = document.getElementById('skipBtn');
        const newSkipBtn = skipBtn.cloneNode(true);
        skipBtn.parentNode.replaceChild(newSkipBtn, skipBtn);

        newSkipBtn.addEventListener('click', () => {
            DrillingManager.skipQuestion();
            this.goNextQuestion();
        });

        // 下一題
        const nextBtn = document.getElementById('nextBtn');
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

        newNextBtn.addEventListener('click', () => {
            this.goNextQuestion();
        });

        // 繼續練習
        const continueBtn = document.getElementById('continueBtn');
        const newContinueBtn = continueBtn.cloneNode(true);
        continueBtn.parentNode.replaceChild(newContinueBtn, continueBtn);

        newContinueBtn.addEventListener('click', () => {
            this.resetDrillingUI();
        });

        // 查看錯題
        const reviewWrongBtn = document.getElementById('reviewWrongBtn');
        const newReviewWrongBtn = reviewWrongBtn.cloneNode(true);
        reviewWrongBtn.parentNode.replaceChild(newReviewWrongBtn, reviewWrongBtn);

        newReviewWrongBtn.addEventListener('click', () => {
            this.startDrilling('weakness');
        });
    },

    // 提交答案
    submitAnswer() {
        const selectedOptions = document.querySelectorAll('.option-item.selected');
        const selected = Array.from(selectedOptions).map(opt => opt.dataset.option);

        if (selected.length === 0) return;

        const result = DrillingManager.submitAnswer(selected);

        // 顯示正確/錯誤標記
        const question = DrillingManager.getCurrentQuestion();
        const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];

        document.querySelectorAll('.option-item').forEach(opt => {
            const optId = opt.dataset.option;
            if (correctAnswers.includes(optId)) {
                opt.classList.add('correct');
            } else if (selected.includes(optId)) {
                opt.classList.add('incorrect');
            }
        });

        // 顯示答案解析
        const answerHeader = document.getElementById('answerHeader');
        answerHeader.className = 'answer-header ' + (result.isCorrect ? 'correct' : 'incorrect');
        answerHeader.innerHTML = result.isCorrect
            ? '<span style="font-size: 1.5rem;">✅</span> 回答正確！'
            : '<span style="font-size: 1.5rem;">❌</span> 回答錯誤';

        document.getElementById('answerExplanation').innerHTML =
            result.explanation.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        document.getElementById('answerReveal').classList.remove('hidden');

        // 禁用選項和按鈕
        document.querySelectorAll('.option-item').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('skipBtn').disabled = true;
    },

    // 下一題
    goNextQuestion() {
        const next = DrillingManager.nextQuestion();

        if (next === null || next.mode !== undefined) {
            // 練習結束，顯示結果
            this.showDrillingResult(next || DrillingManager.currentSession);
        } else {
            // 顯示下一題
            this.showCurrentQuestion();
            document.getElementById('skipBtn').disabled = false;
        }
    },

    // 顯示練習結果
    showDrillingResult(result) {
        document.getElementById('drillingArea').classList.add('hidden');
        document.getElementById('drillingResult').classList.remove('hidden');

        // 設置結果圖標和標題
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');

        if (result.accuracy >= 80) {
            resultIcon.textContent = '🎉';
            resultTitle.textContent = '太棒了！';
        } else if (result.accuracy >= 60) {
            resultIcon.textContent = '👍';
            resultTitle.textContent = '做得不錯！';
        } else {
            resultIcon.textContent = '💪';
            resultTitle.textContent = '繼續努力！';
        }

        // 更新統計
        document.getElementById('correctCount').textContent = result.correct;
        document.getElementById('wrongCount').textContent = result.wrong;
        document.getElementById('accuracyRate').textContent = `${result.accuracy}%`;

        // 如果沒有錯題，隱藏查看錯題按鈕
        const reviewWrongBtn = document.getElementById('reviewWrongBtn');
        if (result.wrong === 0) {
            reviewWrongBtn.style.display = 'none';
        } else {
            reviewWrongBtn.style.display = '';
        }
    },

    // 重置Drilling UI
    resetDrillingUI() {
        document.getElementById('drillingModes').classList.remove('hidden');
        document.getElementById('drillingArea').classList.add('hidden');
        document.getElementById('drillingResult').classList.add('hidden');
    }
};

// DOM加載完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// 導出
window.App = App;
