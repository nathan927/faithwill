/**
 * 貸後智庫 - Theme Manager
 * 管理 Light/Dark 主題切換、持久化及系統偏好監聽
 */

const ThemeManager = {
    STORAGE_KEY: 'theme-preference',
    THEMES: { LIGHT: 'light', DARK: 'dark' },

    /**
     * 初始化主題管理器
     */
    init() {
        // 1. 檢查已儲存的偏好
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);

        // 2. 檢查系統偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // 3. 決定初始主題：儲存 > 系統偏好 > 預設 dark
        const initialTheme = savedTheme || (prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT);

        // 4. 應用主題
        this.setTheme(initialTheme, false);

        // 5. 綁定切換按鈕事件
        this.bindToggleButton();

        // 6. 監聽系統偏好變化
        this.watchSystemPreference();
    },

    /**
     * 設置主題
     * @param {string} theme - 'light' 或 'dark'
     * @param {boolean} save - 是否儲存到 localStorage
     */
    setTheme(theme, save = true) {
        document.documentElement.setAttribute('data-theme', theme);

        if (save) {
            localStorage.setItem(this.STORAGE_KEY, theme);
        }

        this.updateIcon(theme);
    },

    /**
     * 切換主題
     */
    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || this.THEMES.DARK;
        const newTheme = currentTheme === this.THEMES.DARK ? this.THEMES.LIGHT : this.THEMES.DARK;
        this.setTheme(newTheme);
    },

    /**
     * 更新切換按鈕圖標
     * @param {string} theme - 當前主題
     */
    updateIcon(theme) {
        const icon = document.querySelector('.theme-toggle .theme-icon');
        if (icon) {
            icon.textContent = theme === this.THEMES.DARK ? '🌙' : '☀️';
        }
    },

    /**
     * 綁定切換按鈕點擊事件
     */
    bindToggleButton() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    },

    /**
     * 監聽系統主題偏好變化
     */
    watchSystemPreference() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        mediaQuery.addEventListener('change', (e) => {
            // 只有在用戶沒有手動設定偏好時才跟隨系統
            const savedTheme = localStorage.getItem(this.STORAGE_KEY);
            if (!savedTheme) {
                this.setTheme(e.matches ? this.THEMES.DARK : this.THEMES.LIGHT, false);
            }
        });
    },

    /**
     * 獲取當前主題
     * @returns {string} 當前主題
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || this.THEMES.DARK;
    },

    /**
     * 重置為系統偏好
     */
    resetToSystemPreference() {
        localStorage.removeItem(this.STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT, false);
    }
};

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
