/**
 * AI 知識溫故知新 - 管理員面板模組
 * 處理程曉霞模式的課程和題目管理
 */

const AdminPanel = {
    // 管理員密碼（實際應用中應該更安全）
    ADMIN_PASSWORD: 'admin123',

    isLoggedIn: false,
    currentEditCourse: null,
    currentEditQuestion: null,

    // 驗證密碼
    login(password) {
        if (password === this.ADMIN_PASSWORD) {
            this.isLoggedIn = true;
            return true;
        }
        return false;
    },

    // 登出
    logout() {
        this.isLoggedIn = false;
    },

    // 渲染課程列表
    renderCourseList() {
        const container = document.getElementById('courseList');
        const courses = CourseManager.getAll();

        if (courses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>暫無自定義課程</p>
                    <p>點擊下方按鈕創建第一個課程</p>
                </div>
            `;
            return;
        }

        container.innerHTML = courses.map(course => `
            <div class="course-item" data-course-id="${course.id}">
                <div class="course-info">
                    <h4>${this.escapeHtml(course.name)}</h4>
                    <p>${this.escapeHtml(course.description || '無描述')}</p>
                    <div class="course-meta">
                        <span>📝 ${course.questionCount || 0} 題</span>
                        <span>⏱️ ${course.timeLimit > 0 ? course.timeLimit + '秒' : '無限制'}</span>
                        <span>🔀 ${course.order === 'random' ? '隨機' : '順序'}</span>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn-edit" onclick="AdminPanel.editCourse('${course.id}')">編輯</button>
                    <button class="btn-delete" onclick="AdminPanel.deleteCourse('${course.id}')">刪除</button>
                </div>
            </div>
        `).join('');
    },

    // 渲染課程選擇下拉框
    renderCourseSelect() {
        const select = document.getElementById('selectCourse');
        const courses = CourseManager.getAll();

        select.innerHTML = '<option value="">-- 選擇課程 --</option>' +
            courses.map(course =>
                `<option value="${course.id}">${this.escapeHtml(course.name)}</option>`
            ).join('');
    },

    // 渲染題目列表
    renderQuestionList(courseId) {
        const container = document.getElementById('adminQuestionList');

        if (!courseId) {
            container.innerHTML = '<p class="hint">請先選擇一個課程</p>';
            return;
        }

        const questions = QuestionManager.getByCourse(courseId);

        if (questions.length === 0) {
            container.innerHTML = '<p class="hint">此課程暫無題目</p>';
            return;
        }

        container.innerHTML = questions.map((q, index) => `
            <div class="question-item" data-question-id="${q.id}">
                <span class="question-number">${index + 1}.</span>
                <span class="question-preview">${this.escapeHtml(q.question.substring(0, 50))}${q.question.length > 50 ? '...' : ''}</span>
                <span class="question-type">${q.type === 'single' ? '單選' : '多選'}</span>
                <div class="question-actions">
                    <button class="btn-edit" onclick="AdminPanel.editQuestion('${courseId}', '${q.id}')">編輯</button>
                    <button class="btn-delete" onclick="AdminPanel.deleteQuestion('${courseId}', '${q.id}')">刪除</button>
                </div>
            </div>
        `).join('');
    },

    // 顯示課程編輯模態框
    showCourseModal(courseId = null) {
        const modal = document.getElementById('courseModal');
        const title = document.getElementById('courseModalTitle');

        if (courseId) {
            const course = CourseManager.getById(courseId);
            this.currentEditCourse = course;
            title.textContent = '編輯課程';
            document.getElementById('courseName').value = course.name;
            document.getElementById('courseDesc').value = course.description || '';
            document.querySelector(`input[name="courseOrder"][value="${course.order}"]`).checked = true;
            document.getElementById('courseTimeLimit').value = course.timeLimit || 0;
        } else {
            this.currentEditCourse = null;
            title.textContent = '新增課程';
            document.getElementById('courseName').value = '';
            document.getElementById('courseDesc').value = '';
            document.querySelector('input[name="courseOrder"][value="sequential"]').checked = true;
            document.getElementById('courseTimeLimit').value = 0;
        }

        modal.style.display = 'flex';
    },

    // 隱藏課程模態框
    hideCourseModal() {
        document.getElementById('courseModal').style.display = 'none';
        this.currentEditCourse = null;
    },

    // 保存課程
    saveCourse() {
        const name = document.getElementById('courseName').value.trim();
        const description = document.getElementById('courseDesc').value.trim();
        const order = document.querySelector('input[name="courseOrder"]:checked').value;
        const timeLimit = parseInt(document.getElementById('courseTimeLimit').value) || 0;

        if (!name) {
            alert('請輸入課程名稱');
            return;
        }

        if (this.currentEditCourse) {
            CourseManager.update(this.currentEditCourse.id, { name, description, order, timeLimit });
        } else {
            CourseManager.add({ name, description, order, timeLimit });
        }

        this.hideCourseModal();
        this.renderCourseList();
        this.renderCourseSelect();
    },

    // 編輯課程
    editCourse(courseId) {
        this.showCourseModal(courseId);
    },

    // 刪除課程
    deleteCourse(courseId) {
        const course = CourseManager.getById(courseId);
        if (confirm(`確定要刪除課程「${course.name}」嗎？\n此操作將同時刪除課程內的所有題目，且無法恢復。`)) {
            CourseManager.delete(courseId);
            this.renderCourseList();
            this.renderCourseSelect();

            // 如果當前選中的就是被刪除的課程，清空題目列表
            const select = document.getElementById('selectCourse');
            if (select.value === courseId) {
                select.value = '';
                this.renderQuestionList(null);
            }
        }
    },

    // 顯示題目編輯模態框
    showQuestionModal(courseId, questionId = null) {
        const modal = document.getElementById('questionModal');
        const title = document.getElementById('questionModalTitle');

        this.currentEditCourse = courseId;

        if (questionId) {
            const questions = QuestionManager.getByCourse(courseId);
            const question = questions.find(q => q.id === questionId);
            this.currentEditQuestion = question;
            title.textContent = '編輯題目';

            document.getElementById('inputQuestionCategory').value = question.category || '';
            document.getElementById('inputQuestionText').value = question.question;
            document.querySelector(`input[name="questionType"][value="${question.type}"]`).checked = true;
            document.getElementById('questionExplanation').value = question.explanation || '';

            // 渲染選項
            this.renderOptionsEditor(question.options, question.correctAnswers);
        } else {
            this.currentEditQuestion = null;
            title.textContent = '新增題目';

            document.getElementById('inputQuestionCategory').value = '';
            document.getElementById('inputQuestionText').value = '';
            document.querySelector('input[name="questionType"][value="single"]').checked = true;
            document.getElementById('questionExplanation').value = '';

            // 渲染空選項
            this.renderOptionsEditor(['', '', '', ''], []);
        }

        modal.style.display = 'flex';
    },

    // 渲染選項編輯器
    renderOptionsEditor(options, correctAnswers) {
        const container = document.getElementById('optionsEditor');
        container.innerHTML = options.map((opt, idx) => `
            <div class="option-row">
                <input type="checkbox" class="option-correct" ${correctAnswers.includes(idx) ? 'checked' : ''}>
                <input type="text" class="option-text" placeholder="選項 ${String.fromCharCode(65 + idx)}" value="${this.escapeHtml(opt)}">
                <button class="btn-remove-option" onclick="AdminPanel.removeOption(this)">&times;</button>
            </div>
        `).join('');
    },

    // 添加選項
    addOption() {
        const container = document.getElementById('optionsEditor');
        const count = container.querySelectorAll('.option-row').length;

        if (count >= 8) {
            alert('最多支持 8 個選項');
            return;
        }

        const div = document.createElement('div');
        div.className = 'option-row';
        div.innerHTML = `
            <input type="checkbox" class="option-correct">
            <input type="text" class="option-text" placeholder="選項 ${String.fromCharCode(65 + count)}">
            <button class="btn-remove-option" onclick="AdminPanel.removeOption(this)">&times;</button>
        `;
        container.appendChild(div);
    },

    // 移除選項
    removeOption(button) {
        const container = document.getElementById('optionsEditor');
        const rows = container.querySelectorAll('.option-row');

        if (rows.length <= 2) {
            alert('至少需要 2 個選項');
            return;
        }

        button.parentElement.remove();
    },

    // 隱藏題目模態框
    hideQuestionModal() {
        document.getElementById('questionModal').style.display = 'none';
        this.currentEditQuestion = null;
    },

    // 保存題目
    saveQuestion() {
        const category = document.getElementById('inputQuestionCategory').value.trim() || '自定義題目';
        const question = document.getElementById('inputQuestionText').value.trim();
        const type = document.querySelector('input[name="questionType"]:checked').value;
        const explanation = document.getElementById('questionExplanation').value.trim();

        if (!question) {
            alert('請輸入題目內容');
            return;
        }

        // 收集選項
        const rows = document.querySelectorAll('#optionsEditor .option-row');
        const options = [];
        const correctAnswers = [];

        rows.forEach((row, idx) => {
            const text = row.querySelector('.option-text').value.trim();
            const isCorrect = row.querySelector('.option-correct').checked;

            if (text) {
                options.push(text);
                if (isCorrect) {
                    correctAnswers.push(options.length - 1);
                }
            }
        });

        if (options.length < 2) {
            alert('請至少提供 2 個選項');
            return;
        }

        if (correctAnswers.length === 0) {
            alert('請標記至少一個正確答案');
            return;
        }

        if (type === 'single' && correctAnswers.length > 1) {
            alert('單選題只能有一個正確答案');
            return;
        }

        const questionData = { category, question, type, options, correctAnswers, explanation };

        if (this.currentEditQuestion) {
            QuestionManager.update(this.currentEditCourse, this.currentEditQuestion.id, questionData);
        } else {
            QuestionManager.add(this.currentEditCourse, questionData);
        }

        this.hideQuestionModal();
        this.renderQuestionList(this.currentEditCourse);
        this.renderCourseList(); // 更新題目數量
    },

    // 編輯題目
    editQuestion(courseId, questionId) {
        this.showQuestionModal(courseId, questionId);
    },

    // 刪除題目
    deleteQuestion(courseId, questionId) {
        if (confirm('確定要刪除這道題目嗎？')) {
            QuestionManager.delete(courseId, questionId);
            this.renderQuestionList(courseId);
            this.renderCourseList();
        }
    },

    // 導出數據
    exportData() {
        const data = DataIO.exportAll();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `ai_quiz_export_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // 導入數據
    importData() {
        const fileInput = document.getElementById('fileImport');
        const file = fileInput.files[0];

        if (!file) {
            alert('請選擇要導入的文件');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = DataIO.importData(e.target.result);

            if (result.success) {
                alert(`成功導入 ${result.coursesImported} 個課程！`);
                this.renderCourseList();
                this.renderCourseSelect();
            } else {
                alert(`導入失敗：${result.error}`);
            }

            fileInput.value = '';
        };
        reader.readAsText(file);
    },

    // HTML 轉義
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
