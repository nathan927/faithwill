/**
 * AI 知識溫故知新 - 測驗引擎模組
 * 處理題目渲染、答題邏輯、計時器和結果計算
 */

const QuizEngine = {
    // 當前狀態
    currentMode: null,
    currentCourseId: null,
    questions: [],
    currentIndex: 0,
    selectedAnswers: [],
    results: [],
    timer: null,
    timeLeft: 0,
    timeLimit: 0,

    // 模式配置
    modeConfig: {
        beginner: {
            name: '🌱 入門模式',
            class: 'beginner',
            timeLimit: 0, // 無限制
            showExplanation: true,
            showCorrectAnswer: true,
            questionCount: 10
        },
        advanced: {
            name: '📈 進階模式',
            class: 'advanced',
            timeLimit: 60,
            showExplanation: true,
            showCorrectAnswer: true,
            questionCount: 10
        },
        expert: {
            name: '🎯 專家模式',
            class: 'expert',
            timeLimit: 30,
            showExplanation: false,
            showCorrectAnswer: false,
            questionCount: 10
        },
        custom: {
            name: '👩‍🏫 程曉霞模式',
            class: 'custom',
            timeLimit: 0, // 由課程設定決定
            showExplanation: true,
            showCorrectAnswer: true,
            questionCount: 0 // 由課程決定
        }
    },

    // 初始化測驗
    init(mode, courseId = null) {
        this.currentMode = mode;
        this.currentCourseId = courseId;
        this.currentIndex = 0;
        this.selectedAnswers = [];
        this.results = [];
        this.stopTimer();

        // 獲取題目
        this.questions = this.getQuestions(mode, courseId);

        if (this.questions.length === 0) {
            return { success: false, error: '沒有可用的題目' };
        }

        // 設置時間限制
        if (mode === 'custom' && courseId) {
            const course = CourseManager.getById(courseId);
            this.timeLimit = course ? course.timeLimit : 0;
        } else {
            this.timeLimit = this.modeConfig[mode].timeLimit;
        }

        return { success: true, totalQuestions: this.questions.length };
    },

    // 獲取題目
    getQuestions(mode, courseId) {
        let questions = [];

        if (mode === 'custom' && courseId) {
            // 自定義課程題目
            questions = QuestionManager.getByCourse(courseId);
            const course = CourseManager.getById(courseId);

            // 根據課程設置決定順序
            if (course && course.order === 'random') {
                questions = this.shuffleArray([...questions]);
            }
        } else {
            // 預設題庫
            const pool = defaultQuestions[mode] || [];
            const count = this.modeConfig[mode].questionCount;

            // 隨機選題
            questions = this.shuffleArray([...pool]).slice(0, count);
        }

        return questions;
    },

    // 打亂數組
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    // 獲取當前題目
    getCurrentQuestion() {
        if (this.currentIndex >= this.questions.length) {
            return null;
        }

        const question = this.questions[this.currentIndex];

        // 打亂選項順序（記住正確答案的新位置）
        const optionsWithIndex = question.options.map((opt, idx) => ({
            text: opt,
            originalIndex: idx
        }));

        const shuffledOptions = this.shuffleArray([...optionsWithIndex]);

        // 更新正確答案的索引
        const newCorrectAnswers = question.correctAnswers.map(oldIdx =>
            shuffledOptions.findIndex(opt => opt.originalIndex === oldIdx)
        );

        return {
            ...question,
            displayOptions: shuffledOptions.map(opt => opt.text),
            shuffledCorrectAnswers: newCorrectAnswers,
            questionNumber: this.currentIndex + 1,
            totalQuestions: this.questions.length
        };
    },

    // 選擇答案
    selectAnswer(optionIndex) {
        const question = this.questions[this.currentIndex];

        if (question.type === 'single') {
            // 單選 - 替換
            this.selectedAnswers = [optionIndex];
        } else {
            // 多選 - 切換
            const idx = this.selectedAnswers.indexOf(optionIndex);
            if (idx === -1) {
                this.selectedAnswers.push(optionIndex);
            } else {
                this.selectedAnswers.splice(idx, 1);
            }
        }

        return this.selectedAnswers;
    },

    // 提交答案
    submitAnswer(shuffledCorrectAnswers) {
        this.stopTimer();

        const question = this.questions[this.currentIndex];
        const selected = [...this.selectedAnswers].sort();
        const correct = [...shuffledCorrectAnswers].sort();

        const isCorrect = selected.length === correct.length &&
            selected.every((val, idx) => val === correct[idx]);

        // 記錄結果
        const result = {
            questionId: question.id,
            category: question.category,
            isCorrect,
            selectedAnswers: this.selectedAnswers,
            correctAnswers: shuffledCorrectAnswers,
            timeSpent: this.timeLimit > 0 ? this.timeLimit - this.timeLeft : 0
        };

        this.results.push(result);

        // 更新進度追蹤
        ProgressTracker.recordAnswer(
            this.currentMode,
            question.category,
            isCorrect,
            question.id
        );

        return {
            isCorrect,
            correctAnswers: shuffledCorrectAnswers,
            explanation: question.explanation,
            showExplanation: this.modeConfig[this.currentMode]?.showExplanation ?? true,
            showCorrectAnswer: this.modeConfig[this.currentMode]?.showCorrectAnswer ?? true
        };
    },

    // 下一題
    nextQuestion() {
        this.currentIndex++;
        this.selectedAnswers = [];

        if (this.currentIndex >= this.questions.length) {
            return { finished: true, results: this.calculateResults() };
        }

        return { finished: false };
    },

    // 計算最終結果
    calculateResults() {
        const correct = this.results.filter(r => r.isCorrect).length;
        const total = this.results.length;
        const score = Math.round((correct / total) * 100);

        const finalResults = {
            correct,
            wrong: total - correct,
            total,
            score,
            accuracy: Math.round((correct / total) * 100),
            results: this.results,
            mode: this.currentMode
        };

        // 記錄測驗完成
        ProgressTracker.recordQuizComplete(this.currentMode, finalResults);

        return finalResults;
    },

    // 啟動計時器
    startTimer(onTick, onTimeout) {
        if (this.timeLimit <= 0) return;

        this.timeLeft = this.timeLimit;
        onTick(this.timeLeft, this.timeLimit);

        this.timer = setInterval(() => {
            this.timeLeft--;
            onTick(this.timeLeft, this.timeLimit);

            if (this.timeLeft <= 0) {
                this.stopTimer();
                onTimeout();
            }
        }, 1000);
    },

    // 停止計時器
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    // 獲取進度百分比
    getProgress() {
        return ((this.currentIndex + 1) / this.questions.length) * 100;
    },

    // 重置
    reset() {
        this.currentMode = null;
        this.currentCourseId = null;
        this.questions = [];
        this.currentIndex = 0;
        this.selectedAnswers = [];
        this.results = [];
        this.stopTimer();
        this.timeLimit = 0;
    }
};
