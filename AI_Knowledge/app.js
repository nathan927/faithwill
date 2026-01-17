/**
 * AI 知識溫故知新 - 主應用程序
 * 處理頁面導航、UI 交互和整合各模組
 */

// 頁面元素引用
const elements = {
    // 頁面區域
    modeSelection: document.getElementById('modeSelection'),
    quizArea: document.getElementById('quizArea'),
    resultsArea: document.getElementById('resultsArea'),
    statsArea: document.getElementById('statsArea'),
    adminArea: document.getElementById('adminArea'),

    // 測驗相關
    currentMode: document.getElementById('currentMode'),
    questionCounter: document.getElementById('questionCounter'),
    timerContainer: document.getElementById('timerContainer'),
    timerProgress: document.getElementById('timerProgress'),
    timerText: document.getElementById('timerText'),
    progressFill: document.getElementById('progressFill'),
    questionContainer: document.getElementById('questionContainer'),
    questionCategory: document.getElementById('questionCategory'),
    questionText: document.getElementById('questionText'),
    optionsContainer: document.getElementById('optionsContainer'),
    btnSubmit: document.getElementById('btnSubmit'),
    btnNext: document.getElementById('btnNext'),
    explanationPanel: document.getElementById('explanationPanel'),
    resultIcon: document.getElementById('resultIcon'),
    resultText: document.getElementById('resultText'),
    explanationContent: document.getElementById('explanationContent'),

    // 結果相關
    scoreValue: document.getElementById('scoreValue'),
    correctCount: document.getElementById('correctCount'),
    wrongCount: document.getElementById('wrongCount'),
    accuracy: document.getElementById('accuracy'),

    // 統計相關
    totalQuestions: document.getElementById('totalQuestions'),
    totalCorrect: document.getElementById('totalCorrect'),
    overallAccuracy: document.getElementById('overallAccuracy'),
    studyStreak: document.getElementById('studyStreak'),
    modeStats: document.getElementById('modeStats'),
    weakList: document.getElementById('weakList'),

    // 管理員相關
    adminLogin: document.getElementById('adminLogin'),
    adminContent: document.getElementById('adminContent'),
    adminPassword: document.getElementById('adminPassword'),

    // 新功能元素
    questionType: document.getElementById('questionType')
};

// 當前狀態
let currentShuffledCorrectAnswers = [];
let selectedCourseId = null;

// ============ 頁面導航 ============

function showPage(pageId) {
    // 隱藏所有頁面
    elements.modeSelection.style.display = 'none';
    elements.quizArea.style.display = 'none';
    elements.resultsArea.style.display = 'none';
    elements.statsArea.style.display = 'none';
    elements.adminArea.style.display = 'none';

    // 顯示目標頁面
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = pageId === 'resultsArea' ? 'flex' : 'block';
    }
}

function goHome() {
    QuizEngine.reset();
    // 隱藏知識區域
    const knowledgeArea = document.getElementById('knowledgeArea');
    if (knowledgeArea) {
        knowledgeArea.style.display = 'none';
    }
    showPage('modeSelection');
}

// ============ 主題切換 ============

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');

    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');

    // Default to light mode if not explicitly set to dark
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '☀️';
    } else {
        // If savedTheme is 'light' or null (default), enable light mode
        document.body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
        // If not saved, save it as light for consistency
        if (!savedTheme) {
            localStorage.setItem('theme', 'light');
        }
    }
}

// ============ 模式選擇 ============

function startMode(mode) {
    if (mode === 'custom') {
        // 程曉霞模式需要選擇課程
        showCustomModeSelector();
    } else {
        initQuiz(mode);
    }
}

function showCustomModeSelector() {
    const courses = CourseManager.getAll();

    if (courses.length === 0) {
        alert('暫無自定義課程。請先進入管理面板創建課程。');
        return;
    }

    // 先移除任何現有的模態框，避免重複
    const existingModal = document.getElementById('customCourseModal');
    if (existingModal) {
        existingModal.remove();
    }

    // 創建課程選擇彈窗
    const courseOptions = courses.map(c =>
        `<option value="${c.id}">${c.name} (${c.questionCount || 0} 題)</option>`
    ).join('');

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'customCourseModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>選擇課程</h3>
                <button class="btn-close" onclick="closeCustomCourseModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>請選擇要學習的課程：</label>
                    <select id="customCourseSelect" class="course-select">
                        ${courseOptions}
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel" onclick="closeCustomCourseModal()">取消</button>
                <button class="btn-save" id="btnStartCustomCourse">開始學習</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 使用事件監聽器而不是 onclick 屬性
    document.getElementById('btnStartCustomCourse').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        startCustomCourse();
    });
}

function closeCustomCourseModal() {
    const modal = document.getElementById('customCourseModal');
    if (modal) {
        modal.remove();
    }
}

function startCustomCourse() {
    const select = document.getElementById('customCourseSelect');
    if (!select) {
        console.error('Course select element not found');
        return;
    }

    const courseId = select.value;

    if (!courseId) {
        alert('請選擇一個課程');
        return;
    }

    // 先關閉模態框（立即執行）
    closeCustomCourseModal();

    // 使用 setTimeout 確保 DOM 更新完成後再啟動測驗
    setTimeout(() => {
        initQuiz('custom', courseId);
    }, 50);
}

// ============ 測驗邏輯 ============

function initQuiz(mode, courseId = null) {
    const result = QuizEngine.init(mode, courseId);

    if (!result.success) {
        alert(result.error);
        return;
    }

    selectedCourseId = courseId;

    // 設置模式顯示
    const modeConfig = QuizEngine.modeConfig[mode];
    elements.currentMode.textContent = modeConfig.name;
    elements.currentMode.className = 'current-mode ' + modeConfig.class;

    // 顯示/隱藏計時器
    elements.timerContainer.style.display = modeConfig.timeLimit > 0 ? 'block' : 'none';

    // 顯示測驗頁面
    showPage('quizArea');

    // 顯示第一題
    showQuestion();
}

function showQuestion() {
    const question = QuizEngine.getCurrentQuestion();

    if (!question) {
        showResults(QuizEngine.calculateResults());
        return;
    }

    // 保存打亂後的正確答案
    currentShuffledCorrectAnswers = question.shuffledCorrectAnswers;

    // 更新題目計數
    elements.questionCounter.textContent = `題目 ${question.questionNumber}/${question.totalQuestions}`;

    // 更新進度條
    elements.progressFill.style.width = QuizEngine.getProgress() + '%';

    // 顯示題目
    elements.questionCategory.textContent = question.category;
    elements.questionText.textContent = question.question;

    // 顯示題目類型標籤
    const typeLabel = question.type === 'multiple' ? '☑️ 多選題' : '🔘 單選題';
    elements.questionType.textContent = typeLabel;
    elements.questionType.className = 'question-type ' + question.type;

    // 渲染選項
    renderOptions(question.displayOptions, question.type);

    // 重置按鈕狀態
    elements.btnSubmit.disabled = true;
    elements.btnSubmit.style.display = 'inline-block';
    elements.btnNext.style.display = 'none';
    elements.explanationPanel.style.display = 'none';

    // 啟動計時器
    if (QuizEngine.timeLimit > 0) {
        QuizEngine.startTimer(
            (timeLeft, total) => updateTimer(timeLeft, total),
            () => handleTimeout()
        );
    }
}

function renderOptions(options, type) {
    const markers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    elements.optionsContainer.innerHTML = options.map((opt, idx) => `
        <div class="option-item" data-index="${idx}" onclick="selectOption(${idx})">
            <span class="option-marker">${markers[idx]}</span>
            <span class="option-text">${escapeHtml(opt)}</span>
        </div>
    `).join('');
}

function selectOption(index) {
    // 檢查是否已提交
    const optionItems = document.querySelectorAll('.option-item');
    if (optionItems[0].classList.contains('disabled')) return;

    const question = QuizEngine.getCurrentQuestion();
    const selected = QuizEngine.selectAnswer(index);

    // 更新選中狀態
    optionItems.forEach((item, idx) => {
        if (selected.includes(idx)) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });

    // 啟用提交按鈕
    elements.btnSubmit.disabled = selected.length === 0;
}

function submitAnswer() {
    const result = QuizEngine.submitAnswer(currentShuffledCorrectAnswers);

    // 禁用選項
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach((item, idx) => {
        item.classList.add('disabled');

        if (currentShuffledCorrectAnswers.includes(idx)) {
            if (result.showCorrectAnswer) {
                item.classList.add('correct');
            }
        }

        if (item.classList.contains('selected') && !currentShuffledCorrectAnswers.includes(idx)) {
            item.classList.add('wrong');
        }
    });

    // 顯示結果
    elements.resultIcon.textContent = result.isCorrect ? '✅' : '❌';
    elements.resultText.textContent = result.isCorrect ? '回答正確！' : '回答錯誤';
    elements.resultText.className = 'result-text ' + (result.isCorrect ? 'correct' : 'wrong');

    if (result.showExplanation && result.explanation) {
        elements.explanationContent.textContent = result.explanation;
        elements.explanationPanel.style.display = 'block';
    }

    // 切換按鈕
    elements.btnSubmit.style.display = 'none';
    elements.btnNext.style.display = 'inline-block';
}

function nextQuestion() {
    const result = QuizEngine.nextQuestion();

    if (result.finished) {
        showResults(result.results);
    } else {
        showQuestion();
    }
}

function handleTimeout() {
    // 自動提交（如果有選擇的話）或標記為錯誤
    if (QuizEngine.selectedAnswers.length > 0) {
        submitAnswer();
    } else {
        const result = QuizEngine.submitAnswer(currentShuffledCorrectAnswers);

        // 顯示超時提示
        elements.resultIcon.textContent = '⏰';
        elements.resultText.textContent = '時間到！';
        elements.resultText.className = 'result-text wrong';

        if (result.showCorrectAnswer) {
            const optionItems = document.querySelectorAll('.option-item');
            optionItems.forEach((item, idx) => {
                item.classList.add('disabled');
                if (currentShuffledCorrectAnswers.includes(idx)) {
                    item.classList.add('correct');
                }
            });
        }

        if (result.showExplanation && result.explanation) {
            elements.explanationContent.textContent = result.explanation;
            elements.explanationPanel.style.display = 'block';
        }

        elements.btnSubmit.style.display = 'none';
        elements.btnNext.style.display = 'inline-block';
    }
}

function updateTimer(timeLeft, total) {
    elements.timerText.textContent = timeLeft;

    // 更新進度環
    const percent = (timeLeft / total) * 100;
    const offset = 100 - percent;
    elements.timerProgress.style.strokeDashoffset = offset;

    // 時間少時變紅
    if (timeLeft <= 10) {
        elements.timerProgress.style.stroke = '#ef4444';
    } else {
        elements.timerProgress.style.stroke = '#60a5fa';
    }
}

// ============ 結果頁面 ============

function showResults(results) {
    showPage('resultsArea');

    // 動畫顯示分數
    animateNumber(elements.scoreValue, 0, results.score, 1000);
    elements.correctCount.textContent = results.correct;
    elements.wrongCount.textContent = results.wrong;
    elements.accuracy.textContent = results.accuracy + '%';

    // 程曉霞模式 - 發送電郵報告
    if (QuizEngine.currentMode === 'custom') {
        sendEmailReportIfEnabled(results);
    }
}

// 發送電郵報告
function sendEmailReportIfEnabled(results) {
    const settings = getEmailSettings();
    if (!settings.enabled || !settings.emails || settings.emails.length === 0) {
        return;
    }

    // 生成報告內容
    const report = generateTestReport(results);

    // 使用 mailto 打開郵件客戶端
    const subject = encodeURIComponent(`[程曉霞模式] 測試結果報告 - ${new Date().toLocaleDateString('zh-HK')}`);
    const body = encodeURIComponent(report);
    const emailList = settings.emails.join(',');

    // 顯示發送確認
    if (confirm(`是否發送測試結果報告至管理員電郵？\n\n收件人：${emailList}`)) {
        window.location.href = `mailto:${emailList}?subject=${subject}&body=${body}`;
    }
}

// 生成測試報告文字
function generateTestReport(results) {
    const course = selectedCourseId ? CourseManager.get(selectedCourseId) : null;
    const courseName = course ? course.name : '未知課程';
    const now = new Date();

    let report = `========================================\n`;
    report += `🎯 程曉霞模式 - 測試結果報告\n`;
    report += `========================================\n\n`;
    report += `📅 測試時間：${now.toLocaleString('zh-HK')}\n`;
    report += `📚 課程名稱：${courseName}\n\n`;
    report += `----------------------------------------\n`;
    report += `📊 成績統計\n`;
    report += `----------------------------------------\n`;
    report += `• 總分：${results.score} 分\n`;
    report += `• 答對：${results.correct} 題\n`;
    report += `• 答錯：${results.wrong} 題\n`;
    report += `• 正確率：${results.accuracy}%\n\n`;

    // 添加題目詳情
    if (QuizEngine.questions && QuizEngine.questions.length > 0) {
        report += `----------------------------------------\n`;
        report += `📝 題目詳情\n`;
        report += `----------------------------------------\n\n`;

        QuizEngine.questions.forEach((q, idx) => {
            const userAnswer = q.userAnswer !== undefined ? q.userAnswer : '未作答';
            const isCorrect = q.isCorrect ? '✅' : '❌';
            const typeLabel = q.type === 'multiple' ? '[多選]' : '[單選]';

            report += `${idx + 1}. ${typeLabel} ${q.question}\n`;
            report += `   結果：${isCorrect}\n\n`;
        });
    }

    report += `========================================\n`;
    report += `此報告由 AI 知識溫故知新平台自動生成\n`;
    report += `========================================\n`;

    return report;
}

// 獲取電郵設置
function getEmailSettings() {
    const stored = localStorage.getItem('adminEmailSettings');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return { enabled: false, emails: [] };
        }
    }
    return { enabled: false, emails: [] };
}

// 保存電郵設置
function saveEmailSettings() {
    const emailInput = document.getElementById('adminEmails');
    const enableCheck = document.getElementById('enableEmailReport');

    const emails = emailInput.value
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0 && e.includes('@'));

    const settings = {
        enabled: enableCheck.checked,
        emails: emails
    };

    localStorage.setItem('adminEmailSettings', JSON.stringify(settings));
    alert('電郵設置已保存！');
}

// 載入電郵設置到界面
function loadEmailSettings() {
    const settings = getEmailSettings();
    const emailInput = document.getElementById('adminEmails');
    const enableCheck = document.getElementById('enableEmailReport');

    if (emailInput) {
        emailInput.value = settings.emails.join(', ');
    }
    if (enableCheck) {
        enableCheck.checked = settings.enabled;
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用 easeOutQuart 緩動函數
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.round(start + (end - start) * eased);

        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function retryQuiz() {
    initQuiz(QuizEngine.currentMode, selectedCourseId);
}

// ============ 統計頁面 ============

function showStats() {
    showPage('statsArea');
    updateStats();
}

function updateStats() {
    const overview = ProgressTracker.getOverview();
    const modeStats = ProgressTracker.getModeStats();
    const weakAreas = ProgressTracker.getWeakAreas();

    // 總覽數據
    elements.totalQuestions.textContent = overview.totalQuestions;
    elements.totalCorrect.textContent = overview.totalCorrect;
    elements.overallAccuracy.textContent = overview.overallAccuracy + '%';
    elements.studyStreak.textContent = overview.streak;

    // 各模式統計
    const modeNames = {
        beginner: { icon: '🌱', name: '入門模式', color: '#4ade80' },
        advanced: { icon: '📈', name: '進階模式', color: '#60a5fa' },
        expert: { icon: '🎯', name: '專家模式', color: '#f472b6' },
        custom: { icon: '👩‍🏫', name: '程曉霞模式', color: '#fbbf24' }
    };

    elements.modeStats.innerHTML = Object.entries(modeStats).map(([mode, stats]) => {
        const info = modeNames[mode];
        return `
            <div class="mode-stat-item">
                <span class="mode-stat-name">${info.icon} ${info.name}</span>
                <div class="mode-stat-bar">
                    <div class="mode-stat-fill" style="width: ${stats.accuracy}%; background: ${info.color}"></div>
                </div>
                <span>${stats.accuracy}% (${stats.correct}/${stats.attempted})</span>
            </div>
        `;
    }).join('');

    // 弱項分析
    if (weakAreas.length > 0) {
        elements.weakList.innerHTML = weakAreas.map(area =>
            `<span class="weak-item">${area.category} (${area.accuracy}%)</span>`
        ).join('');
    } else {
        elements.weakList.innerHTML = '<p style="color: #10b981;">太棒了！目前沒有明顯弱項 🎉</p>';
    }
}

// ============ 管理員面板 ============

function showAdmin() {
    showPage('adminArea');

    if (AdminPanel.isLoggedIn) {
        showAdminContent();
    } else {
        elements.adminLogin.style.display = 'flex';
        elements.adminContent.style.display = 'none';
    }
}

function adminLogin() {
    const password = elements.adminPassword.value;

    if (AdminPanel.login(password)) {
        showAdminContent();
        elements.adminPassword.value = '';
    } else {
        alert('密碼錯誤，請重試');
    }
}

function showAdminContent() {
    elements.adminLogin.style.display = 'none';
    elements.adminContent.style.display = 'block';

    AdminPanel.renderCourseList();
    AdminPanel.renderCourseSelect();
    renderTargetCourseSelect();
    renderCategoryTree();
    loadEmailSettings();
}

// 渲染目標課程選擇器
function renderTargetCourseSelect() {
    const select = document.getElementById('targetCourseSelect');
    if (!select) return;

    const courses = CourseManager.getAll();
    select.innerHTML = '<option value="">-- 選擇目標課程 --</option>' +
        courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

// 渲染分類樹狀圖
function renderCategoryTree() {
    const container = document.getElementById('categoryTree');
    if (!container) return;

    // 收集所有題目並按分類分組
    const allQuestions = getAllQuestionsWithCategories();
    const categorized = {};

    allQuestions.forEach(q => {
        const cat = q.category || '未分類';
        if (!categorized[cat]) {
            categorized[cat] = [];
        }
        categorized[cat].push(q);
    });

    // 生成樹狀圖 HTML
    let html = '';
    Object.entries(categorized).forEach(([category, questions]) => {
        const catId = `cat_${category.replace(/\s+/g, '_')}`;
        html += `
            <div class="tree-category" data-category="${escapeHtml(category)}">
                <div class="tree-category-header" onclick="toggleCategory('${catId}')">
                    <span class="tree-expand" id="expand_${catId}">▶</span>
                    <input type="checkbox" class="tree-checkbox" 
                           onchange="toggleCategoryQuestions('${escapeHtml(category)}', this.checked)"
                           onclick="event.stopPropagation()">
                    <span class="tree-category-name">${escapeHtml(category)}</span>
                    <span class="tree-category-count">${questions.length} 題</span>
                </div>
                <div class="tree-questions" id="questions_${catId}">
                    ${questions.map((q, idx) => `
                        <div class="tree-question">
                            <input type="checkbox" class="tree-checkbox" 
                                   data-category="${escapeHtml(category)}" 
                                   data-index="${idx}">
                            <span class="tree-question-text">${escapeHtml(q.question.substring(0, 60))}${q.question.length > 60 ? '...' : ''}</span>
                            <span class="tree-question-type ${q.type}">${q.type === 'multiple' ? '多選' : '單選'}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html || '<p style="color: var(--text-muted); padding: 1rem;">暫無題目數據</p>';
}

// 獲取所有題目並保留分類信息
function getAllQuestionsWithCategories() {
    const allQuestions = [];

    // 從預設題庫收集
    if (typeof defaultQuestions !== 'undefined') {
        ['beginner', 'advanced', 'expert'].forEach(level => {
            if (defaultQuestions[level]) {
                defaultQuestions[level].forEach(q => {
                    if (!allQuestions.find(existing => existing.question === q.question)) {
                        allQuestions.push(q);
                    }
                });
            }
        });
    }

    return allQuestions;
}

// 切換分類展開/摺疊
function toggleCategory(catId) {
    const questions = document.getElementById(`questions_${catId}`);
    const expand = document.getElementById(`expand_${catId}`);

    if (questions.classList.contains('expanded')) {
        questions.classList.remove('expanded');
        expand.classList.remove('expanded');
    } else {
        questions.classList.add('expanded');
        expand.classList.add('expanded');
    }
}

// 切換分類下所有題目的選中狀態
function toggleCategoryQuestions(category, checked) {
    const checkboxes = document.querySelectorAll(`.tree-checkbox[data-category="${category}"]`);
    checkboxes.forEach(cb => cb.checked = checked);
}

// 全部展開
function expandAllCategories() {
    document.querySelectorAll('.tree-questions').forEach(el => el.classList.add('expanded'));
    document.querySelectorAll('.tree-expand').forEach(el => el.classList.add('expanded'));
}

// 全部摺疊
function collapseAllCategories() {
    document.querySelectorAll('.tree-questions').forEach(el => el.classList.remove('expanded'));
    document.querySelectorAll('.tree-expand').forEach(el => el.classList.remove('expanded'));
}

// 將選中題目加入課程
function addSelectedToCourse() {
    const courseId = document.getElementById('targetCourseSelect').value;
    if (!courseId) {
        alert('請先選擇目標課程');
        return;
    }

    const allQuestions = getAllQuestionsWithCategories();
    const categorized = {};
    allQuestions.forEach(q => {
        const cat = q.category || '未分類';
        if (!categorized[cat]) categorized[cat] = [];
        categorized[cat].push(q);
    });

    const selectedQuestions = [];
    document.querySelectorAll('.tree-question .tree-checkbox:checked').forEach(cb => {
        const cat = cb.dataset.category;
        const idx = parseInt(cb.dataset.index);
        if (categorized[cat] && categorized[cat][idx]) {
            selectedQuestions.push({ ...categorized[cat][idx] });
        }
    });

    if (selectedQuestions.length === 0) {
        alert('請先選擇要加入的題目');
        return;
    }

    // 加入課程
    selectedQuestions.forEach(q => {
        // 生成新 ID
        q.id = `imported_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        CourseManager.addQuestion(courseId, q);
    });

    alert(`已成功將 ${selectedQuestions.length} 道題目加入課程！`);

    // 清除選中狀態
    document.querySelectorAll('.tree-checkbox:checked').forEach(cb => cb.checked = false);
    AdminPanel.renderCourseSelect();
    renderTargetCourseSelect();
}

// ============ 事件綁定 ============

document.addEventListener('DOMContentLoaded', function () {
    // 問答模式卡片點擊（新版首頁）
    document.querySelectorAll('.quiz-mode-card').forEach(card => {
        card.addEventListener('click', function () {
            const mode = this.dataset.mode;
            startMode(mode);
        });
    });

    // 舊版模式卡片（備用）
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', function () {
            const mode = this.dataset.mode;
            startMode(mode);
        });
    });

    // 頂部按鈕
    document.getElementById('btnStats').addEventListener('click', showStats);
    document.getElementById('btnAdmin').addEventListener('click', showAdmin);

    // 主題切換
    document.getElementById('btnTheme').addEventListener('click', toggleTheme);
    loadTheme();

    // Logo 點擊返回首頁
    document.getElementById('logoLink').addEventListener('click', function (e) {
        e.preventDefault();
        goHome();
    });
    // 測驗區域按鈕
    document.getElementById('btnBack').addEventListener('click', goHome);
    document.getElementById('btnSubmit').addEventListener('click', submitAnswer);
    document.getElementById('btnNext').addEventListener('click', nextQuestion);

    // 結果頁面按鈕
    document.getElementById('btnRetry').addEventListener('click', retryQuiz);
    document.getElementById('btnHome').addEventListener('click', goHome);

    // 統計頁面
    document.getElementById('btnStatsBack').addEventListener('click', goHome);

    // 管理員頁面
    document.getElementById('btnAdminBack').addEventListener('click', goHome);
    document.getElementById('btnLogin').addEventListener('click', adminLogin);
    document.getElementById('adminPassword').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') adminLogin();
    });

    // 管理員標籤切換
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = this.dataset.tab;

            // 更新標籤狀態
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 切換內容
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            document.getElementById('tab' + capitalize(tab)).style.display = 'block';
        });
    });

    // 課程選擇
    document.getElementById('selectCourse').addEventListener('change', function () {
        AdminPanel.renderQuestionList(this.value);
    });

    // 課程管理
    document.getElementById('btnAddCourse').addEventListener('click', () => AdminPanel.showCourseModal());
    document.getElementById('btnCloseCourseModal').addEventListener('click', () => AdminPanel.hideCourseModal());
    document.getElementById('btnCancelCourse').addEventListener('click', () => AdminPanel.hideCourseModal());
    document.getElementById('btnSaveCourse').addEventListener('click', () => AdminPanel.saveCourse());

    // 題目管理
    document.getElementById('btnAddQuestion').addEventListener('click', function () {
        const courseId = document.getElementById('selectCourse').value;
        if (!courseId) {
            alert('請先選擇一個課程');
            return;
        }
        AdminPanel.showQuestionModal(courseId);
    });
    document.getElementById('btnCloseQuestionModal').addEventListener('click', () => AdminPanel.hideQuestionModal());
    document.getElementById('btnCancelQuestion').addEventListener('click', () => AdminPanel.hideQuestionModal());
    document.getElementById('btnSaveQuestion').addEventListener('click', () => AdminPanel.saveQuestion());
    document.getElementById('btnAddOption').addEventListener('click', () => AdminPanel.addOption());

    // 導入/導出
    document.getElementById('btnExport').addEventListener('click', () => AdminPanel.exportData());
    document.getElementById('btnImport').addEventListener('click', () => AdminPanel.importData());

    // 電郵設置
    const btnSaveEmail = document.getElementById('btnSaveEmailSettings');
    if (btnSaveEmail) {
        btnSaveEmail.addEventListener('click', saveEmailSettings);
    }

    // 題庫選擇功能
    const btnExpandAll = document.getElementById('btnExpandAll');
    const btnCollapseAll = document.getElementById('btnCollapseAll');
    const btnAddSelected = document.getElementById('btnAddSelected');

    if (btnExpandAll) btnExpandAll.addEventListener('click', expandAllCategories);
    if (btnCollapseAll) btnCollapseAll.addEventListener('click', collapseAllCategories);
    if (btnAddSelected) btnAddSelected.addEventListener('click', addSelectedToCourse);
});

// ============ 工具函數 ============

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
