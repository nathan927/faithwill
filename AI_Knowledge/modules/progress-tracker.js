/**
 * AI 知識溫故知新 - 進度追蹤模組
 * 追蹤用戶學習進度、統計數據和弱項分析
 */

const ProgressTracker = {
    // LocalStorage 鍵名
    STORAGE_KEY: 'ai_quiz_progress',

    // 默認數據結構
    getDefaultData() {
        return {
            totalQuestions: 0,
            totalCorrect: 0,
            modeStats: {
                beginner: { attempted: 0, correct: 0 },
                advanced: { attempted: 0, correct: 0 },
                expert: { attempted: 0, correct: 0 },
                custom: { attempted: 0, correct: 0 }
            },
            categoryStats: {},
            history: [],
            streak: 0,
            lastStudyDate: null,
            achievements: []
        };
    },

    // 載入進度數據
    load() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse progress data:', e);
                return this.getDefaultData();
            }
        }
        return this.getDefaultData();
    },

    // 保存進度數據
    save(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    // 記錄答題結果
    recordAnswer(mode, category, isCorrect, questionId) {
        const data = this.load();

        // 更新總計
        data.totalQuestions++;
        if (isCorrect) {
            data.totalCorrect++;
        }

        // 更新模式統計
        if (data.modeStats[mode]) {
            data.modeStats[mode].attempted++;
            if (isCorrect) {
                data.modeStats[mode].correct++;
            }
        }

        // 更新分類統計
        if (!data.categoryStats[category]) {
            data.categoryStats[category] = { attempted: 0, correct: 0 };
        }
        data.categoryStats[category].attempted++;
        if (isCorrect) {
            data.categoryStats[category].correct++;
        }

        // 更新歷史記錄
        data.history.push({
            timestamp: new Date().toISOString(),
            mode,
            category,
            questionId,
            isCorrect
        });

        // 只保留最近 500 條記錄
        if (data.history.length > 500) {
            data.history = data.history.slice(-500);
        }

        // 更新連續學習天數
        this.updateStreak(data);

        this.save(data);
        return data;
    },

    // 記錄測驗完成
    recordQuizComplete(mode, results) {
        const data = this.load();

        // 檢查成就
        this.checkAchievements(data, mode, results);

        this.save(data);
    },

    // 更新連續學習天數
    updateStreak(data) {
        const today = new Date().toDateString();
        const lastDate = data.lastStudyDate;

        if (!lastDate) {
            data.streak = 1;
        } else {
            const last = new Date(lastDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - last) / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                // 同一天，不變
            } else if (diffDays === 1) {
                // 連續
                data.streak++;
            } else {
                // 中斷
                data.streak = 1;
            }
        }

        data.lastStudyDate = today;
    },

    // 檢查並解鎖成就
    checkAchievements(data, mode, results) {
        const newAchievements = [];

        // 首次完成測驗
        if (!data.achievements.includes('first_quiz') && data.totalQuestions >= 10) {
            data.achievements.push('first_quiz');
            newAchievements.push({ id: 'first_quiz', name: '學習新手', description: '完成第一次測驗' });
        }

        // 滿分達成
        if (!data.achievements.includes('perfect_score') && results.score === 100) {
            data.achievements.push('perfect_score');
            newAchievements.push({ id: 'perfect_score', name: '完美答題', description: '獲得滿分 100 分' });
        }

        // 各模式大師
        if (!data.achievements.includes('beginner_master') &&
            data.modeStats.beginner.attempted >= 50 &&
            (data.modeStats.beginner.correct / data.modeStats.beginner.attempted) >= 0.9) {
            data.achievements.push('beginner_master');
            newAchievements.push({ id: 'beginner_master', name: '入門大師', description: '入門模式正確率達 90%' });
        }

        if (!data.achievements.includes('advanced_master') &&
            data.modeStats.advanced.attempted >= 30 &&
            (data.modeStats.advanced.correct / data.modeStats.advanced.attempted) >= 0.85) {
            data.achievements.push('advanced_master');
            newAchievements.push({ id: 'advanced_master', name: '進階達人', description: '進階模式正確率達 85%' });
        }

        if (!data.achievements.includes('expert_master') &&
            data.modeStats.expert.attempted >= 20 &&
            (data.modeStats.expert.correct / data.modeStats.expert.attempted) >= 0.8) {
            data.achievements.push('expert_master');
            newAchievements.push({ id: 'expert_master', name: '專家級別', description: '專家模式正確率達 80%' });
        }

        // 連續學習
        if (!data.achievements.includes('streak_7') && data.streak >= 7) {
            data.achievements.push('streak_7');
            newAchievements.push({ id: 'streak_7', name: '堅持不懈', description: '連續 7 天學習' });
        }

        if (!data.achievements.includes('streak_30') && data.streak >= 30) {
            data.achievements.push('streak_30');
            newAchievements.push({ id: 'streak_30', name: '學習達人', description: '連續 30 天學習' });
        }

        // 題量達成
        if (!data.achievements.includes('questions_100') && data.totalQuestions >= 100) {
            data.achievements.push('questions_100');
            newAchievements.push({ id: 'questions_100', name: '百題斬', description: '完成 100 道題目' });
        }

        if (!data.achievements.includes('questions_500') && data.totalQuestions >= 500) {
            data.achievements.push('questions_500');
            newAchievements.push({ id: 'questions_500', name: '知識收割者', description: '完成 500 道題目' });
        }

        return newAchievements;
    },

    // 獲取統計概覽
    getOverview() {
        const data = this.load();
        return {
            totalQuestions: data.totalQuestions,
            totalCorrect: data.totalCorrect,
            overallAccuracy: data.totalQuestions > 0
                ? Math.round((data.totalCorrect / data.totalQuestions) * 100)
                : 0,
            streak: data.streak,
            achievements: data.achievements
        };
    },

    // 獲取各模式統計
    getModeStats() {
        const data = this.load();
        const result = {};

        for (const [mode, stats] of Object.entries(data.modeStats)) {
            result[mode] = {
                ...stats,
                accuracy: stats.attempted > 0
                    ? Math.round((stats.correct / stats.attempted) * 100)
                    : 0
            };
        }

        return result;
    },

    // 獲取弱項分析
    getWeakAreas(limit = 5) {
        const data = this.load();
        const categories = [];

        for (const [category, stats] of Object.entries(data.categoryStats)) {
            if (stats.attempted >= 3) { // 至少 3 次嘗試才計入
                const accuracy = stats.correct / stats.attempted;
                if (accuracy < 0.7) { // 正確率低於 70% 視為弱項
                    categories.push({
                        category,
                        attempted: stats.attempted,
                        correct: stats.correct,
                        accuracy: Math.round(accuracy * 100)
                    });
                }
            }
        }

        // 按正確率排序，最低的排前面
        categories.sort((a, b) => a.accuracy - b.accuracy);

        return categories.slice(0, limit);
    },

    // 獲取學習歷史
    getHistory(days = 7) {
        const data = this.load();
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        return data.history.filter(h => new Date(h.timestamp) >= cutoff);
    },

    // 重置所有進度
    reset() {
        this.save(this.getDefaultData());
    }
};
