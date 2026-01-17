/**
 * AI 知識溫故知新 - 自定義題庫 (程曉霞模式)
 * 管理員創建的課程和題目存儲在這裡
 */

// 初始化自定義數據結構
let customData = {
    courses: [],
    questions: {}
};

// 從 LocalStorage 載入數據
function loadCustomData() {
    const saved = localStorage.getItem('ai_quiz_custom_data');
    if (saved) {
        try {
            customData = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse custom data:', e);
            customData = { courses: [], questions: {} };
        }
    }
    return customData;
}

// 保存數據到 LocalStorage
function saveCustomData() {
    localStorage.setItem('ai_quiz_custom_data', JSON.stringify(customData));
}

// 課程管理
const CourseManager = {
    // 獲取所有課程
    getAll() {
        loadCustomData();
        return customData.courses;
    },

    // 根據 ID 獲取課程
    getById(courseId) {
        loadCustomData();
        return customData.courses.find(c => c.id === courseId);
    },

    // 添加新課程
    add(course) {
        loadCustomData();
        const newCourse = {
            id: 'course_' + Date.now(),
            name: course.name,
            description: course.description || '',
            order: course.order || 'sequential', // 'sequential' 或 'random'
            timeLimit: course.timeLimit || 0, // 0 表示無限制
            createdAt: new Date().toISOString(),
            questionCount: 0
        };
        customData.courses.push(newCourse);
        customData.questions[newCourse.id] = [];
        saveCustomData();
        return newCourse;
    },

    // 更新課程
    update(courseId, updates) {
        loadCustomData();
        const index = customData.courses.findIndex(c => c.id === courseId);
        if (index !== -1) {
            customData.courses[index] = { ...customData.courses[index], ...updates };
            saveCustomData();
            return customData.courses[index];
        }
        return null;
    },

    // 刪除課程
    delete(courseId) {
        loadCustomData();
        customData.courses = customData.courses.filter(c => c.id !== courseId);
        delete customData.questions[courseId];
        saveCustomData();
    }
};

// 題目管理
const QuestionManager = {
    // 獲取課程的所有題目
    getByCourse(courseId) {
        loadCustomData();
        return customData.questions[courseId] || [];
    },

    // 添加題目
    add(courseId, question) {
        loadCustomData();
        if (!customData.questions[courseId]) {
            customData.questions[courseId] = [];
        }

        const newQuestion = {
            id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            category: question.category || '自定義題目',
            question: question.question,
            type: question.type || 'single',
            options: question.options,
            correctAnswers: question.correctAnswers,
            explanation: question.explanation || ''
        };

        customData.questions[courseId].push(newQuestion);

        // 更新課程的題目數量
        const course = customData.courses.find(c => c.id === courseId);
        if (course) {
            course.questionCount = customData.questions[courseId].length;
        }

        saveCustomData();
        return newQuestion;
    },

    // 更新題目
    update(courseId, questionId, updates) {
        loadCustomData();
        const questions = customData.questions[courseId];
        if (questions) {
            const index = questions.findIndex(q => q.id === questionId);
            if (index !== -1) {
                questions[index] = { ...questions[index], ...updates };
                saveCustomData();
                return questions[index];
            }
        }
        return null;
    },

    // 刪除題目
    delete(courseId, questionId) {
        loadCustomData();
        if (customData.questions[courseId]) {
            customData.questions[courseId] = customData.questions[courseId].filter(q => q.id !== questionId);

            // 更新課程的題目數量
            const course = customData.courses.find(c => c.id === courseId);
            if (course) {
                course.questionCount = customData.questions[courseId].length;
            }

            saveCustomData();
        }
    },

    // 移動題目順序
    reorder(courseId, questionId, newIndex) {
        loadCustomData();
        const questions = customData.questions[courseId];
        if (questions) {
            const currentIndex = questions.findIndex(q => q.id === questionId);
            if (currentIndex !== -1 && newIndex >= 0 && newIndex < questions.length) {
                const [question] = questions.splice(currentIndex, 1);
                questions.splice(newIndex, 0, question);
                saveCustomData();
            }
        }
    }
};

// 導入/導出功能
const DataIO = {
    // 導出所有自定義數據
    exportAll() {
        loadCustomData();
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            courses: customData.courses,
            questions: customData.questions
        };
        return JSON.stringify(exportData, null, 2);
    },

    // 導入數據
    importData(jsonString) {
        try {
            const importedData = JSON.parse(jsonString);

            // 驗證數據格式
            if (!importedData.courses || !importedData.questions) {
                throw new Error('無效的數據格式');
            }

            loadCustomData();

            // 合併課程（避免 ID 衝突）
            importedData.courses.forEach(course => {
                const newId = 'course_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                const oldId = course.id;
                course.id = newId;
                course.importedAt = new Date().toISOString();
                customData.courses.push(course);

                // 同時更新題目的課程 ID
                if (importedData.questions[oldId]) {
                    customData.questions[newId] = importedData.questions[oldId].map(q => ({
                        ...q,
                        id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
                    }));
                }
            });

            saveCustomData();
            return { success: true, coursesImported: importedData.courses.length };
        } catch (e) {
            console.error('Import failed:', e);
            return { success: false, error: e.message };
        }
    },

    // 清除所有數據
    clearAll() {
        customData = { courses: [], questions: {} };
        saveCustomData();
    }
};

// 示例課程（首次使用時創建）
function initializeSampleCourse() {
    loadCustomData();

    if (customData.courses.length === 0) {
        // 創建示例課程
        const sampleCourse = CourseManager.add({
            name: '示範課程 - AI 基礎概念',
            description: '這是一個示範課程，展示如何創建自定義題目',
            order: 'sequential',
            timeLimit: 0
        });

        // 添加示例題目
        QuestionManager.add(sampleCourse.id, {
            category: '示範題目',
            question: '這是一道示範題目。請選擇正確答案：人工智能的英文縮寫是什麼？',
            type: 'single',
            options: ['AI', 'ML', 'DL', 'NLP'],
            correctAnswers: [0],
            explanation: '人工智能 (Artificial Intelligence) 的英文縮寫是 AI。'
        });

        QuestionManager.add(sampleCourse.id, {
            category: '示範題目',
            question: '以下哪些是機器學習的類型？（多選題）',
            type: 'multiple',
            options: ['監督學習', '非監督學習', '強化學習', '物理學習'],
            correctAnswers: [0, 1, 2],
            explanation: '機器學習的三大類型是監督學習、非監督學習和強化學習。物理學習不是機器學習的類型。'
        });
    }
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function () {
    initializeSampleCourse();
});
