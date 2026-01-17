/**
 * AI 知識溫故知新 - 2025-2026 最新 AI 工具題庫 (第二部分)
 * AI IDE 工具：Antigravity, Cursor, Trae, Kiro 等
 */

const modernQuestions_part2 = {
    // Google Antigravity (Gemini CLI)
    antigravity: [
        {
            id: 'ag1',
            category: 'Google Antigravity',
            question: 'Google Antigravity 是什麼？',
            type: 'single',
            options: [
                'Google 推出的 AI 編程助手命令行工具',
                '一個物理模擬軟體',
                '一個遊戲引擎',
                '一個網頁設計工具'
            ],
            correctAnswers: [0],
            explanation: 'Google Antigravity 是 Google 推出的 AI 編程助手，類似 Claude Code CLI，讓開發者在終端機中使用 Gemini AI 進行編程輔助。'
        },
        {
            id: 'ag2',
            category: 'Google Antigravity',
            question: 'Antigravity 使用哪個 AI 模型？',
            type: 'single',
            options: [
                'Google Gemini 系列模型',
                'OpenAI GPT 系列',
                'Claude 系列',
                'LLaMA 系列'
            ],
            correctAnswers: [0],
            explanation: 'Antigravity 底層使用 Google 的 Gemini 系列 AI 模型，包括 Gemini 2.0 Flash 等最新版本。'
        },
        {
            id: 'ag3',
            category: 'Google Antigravity',
            question: 'Antigravity 的 artifacts 目錄有什麼作用？',
            type: 'single',
            options: [
                '存儲 AI 生成的文檔、計劃和工作成果',
                '存儲系統日誌',
                '存儲用戶密碼',
                '存儲臨時文件'
            ],
            correctAnswers: [0],
            explanation: 'Antigravity 會在 brain/<conversation-id> 目錄下創建 artifacts，如 task.md、implementation_plan.md、walkthrough.md 等文檔。'
        },
        {
            id: 'ag4',
            category: 'Google Antigravity',
            question: 'Antigravity 中 PLANNING、EXECUTION、VERIFICATION 模式分別代表什麼？',
            type: 'single',
            options: [
                '規劃設計、實施開發、測試驗證三個工作階段',
                '三種不同的 AI 模型',
                '三種付費計劃',
                '三種編程語言'
            ],
            correctAnswers: [0],
            explanation: '這三種模式對應軟體開發的三個階段：PLANNING 用於研究和設計、EXECUTION 用於實現代碼、VERIFICATION 用於測試驗證。'
        }
    ],

    // Cursor IDE
    cursor: [
        {
            id: 'cur1',
            category: 'Cursor IDE',
            question: 'Cursor 是什麼類型的工具？',
            type: 'single',
            options: [
                '內建 AI 功能的代碼編輯器，基於 VS Code',
                '純命令行工具',
                '網頁版 IDE',
                '手機應用程式'
            ],
            correctAnswers: [0],
            explanation: 'Cursor 是一個基於 VS Code 改造的 AI-native 代碼編輯器，原生整合了 AI 輔助編程功能。'
        },
        {
            id: 'cur2',
            category: 'Cursor IDE',
            question: 'Cursor 的 Composer 功能有什麼用途？',
            type: 'single',
            options: [
                '讓 AI 同時編輯多個文件實現複雜功能',
                '播放音樂',
                '設計 UI 介面',
                '管理 Git 提交'
            ],
            correctAnswers: [0],
            explanation: 'Composer（作曲家）是 Cursor 的多文件編輯功能，可以讓 AI 理解整個項目並同時修改多個相關文件。'
        },
        {
            id: 'cur3',
            category: 'Cursor IDE',
            question: '在 Cursor 中如何使用 AI 補全代碼？',
            type: 'single',
            options: [
                '按 Tab 接受 AI 的自動建議',
                '右鍵選擇菜單',
                '必須手動輸入指令',
                '只能通過快捷鍵 Ctrl+Shift+P'
            ],
            correctAnswers: [0],
            explanation: 'Cursor 會自動顯示 AI 代碼建議，按 Tab 鍵即可接受補全。這種體驗類似 GitHub Copilot 但更加強大。'
        },
        {
            id: 'cur4',
            category: 'Cursor IDE',
            question: 'Cursor 的 @ 符號有什麼用途？',
            type: 'multiple',
            options: [
                '引用特定文件 @file',
                '引用整個代碼庫 @codebase',
                '引用網頁內容 @web',
                '發送電子郵件'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Cursor 使用 @ 符號來引用上下文：@file 引用文件、@codebase 引用整個項目、@web 搜索網頁內容等。'
        },
        {
            id: 'cur5',
            category: 'Cursor IDE',
            question: 'Cursor 的 .cursorrules 文件有什麼作用？',
            type: 'single',
            options: [
                '設定項目專屬的 AI 規則和偏好',
                '設定代碼格式化規則',
                '設定 Git 忽略規則',
                '設定編譯選項'
            ],
            correctAnswers: [0],
            explanation: '.cursorrules 文件讓你為特定項目設定 AI 的行為規則，如編程風格、慣用框架、特殊指令等。'
        },
        {
            id: 'cur6',
            category: 'Cursor IDE',
            question: 'Cursor 支援使用哪些 AI 模型？',
            type: 'multiple',
            options: [
                'GPT-4 系列',
                'Claude 系列',
                '自定義 API 模型',
                '只支援內建模型'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Cursor 支援多種 AI 模型，包括 GPT-4、Claude 系列，也可以配置使用自定義的 API 端點。'
        }
    ],

    // Trae IDE
    trae: [
        {
            id: 'tr1',
            category: 'Trae IDE',
            question: 'Trae 是由哪家公司開發的 AI IDE？',
            type: 'single',
            options: [
                '字節跳動 (ByteDance)',
                'OpenAI',
                'Google',
                'Microsoft'
            ],
            correctAnswers: [0],
            explanation: 'Trae 是字節跳動推出的 AI 編程助手 IDE，整合了豆包等中國 AI 模型的能力。'
        },
        {
            id: 'tr2',
            category: 'Trae IDE',
            question: 'Trae 的主要特點是什麼？',
            type: 'multiple',
            options: [
                '免費使用',
                '支援中文優化',
                '基於 VS Code 架構',
                '只能在中國使用'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Trae 提供免費使用、對中文支援優秀、基於 VS Code 架構。但它可以在全球使用，不僅限於中國。'
        },
        {
            id: 'tr3',
            category: 'Trae IDE',
            question: 'Trae 的 Builder 模式適合什麼場景？',
            type: 'single',
            options: [
                '從頭創建新項目或大規模修改',
                '只查看代碼',
                '運行測試',
                '管理依賴'
            ],
            correctAnswers: [0],
            explanation: 'Trae 的 Builder 模式類似 Cursor 的 Composer，適合讓 AI 創建新項目或進行複雜的多文件修改。'
        }
    ],

    // Kiro IDE
    kiro: [
        {
            id: 'ki1',
            category: 'Kiro IDE',
            question: 'Kiro 是由哪家公司推出的 AI IDE？',
            type: 'single',
            options: [
                'Amazon Web Services (AWS)',
                'Anthropic',
                'Meta',
                'Apple'
            ],
            correctAnswers: [0],
            explanation: 'Kiro 是 AWS 推出的 AI 編程 IDE，旨在提供雲端整合的 AI 開發體驗。'
        },
        {
            id: 'ki2',
            category: 'Kiro IDE',
            question: 'Kiro 的「Spec」功能有什麼特點？',
            type: 'single',
            options: [
                '自動將需求轉換為技術規格文檔',
                '檢測代碼效能',
                '生成測試報告',
                '管理 API 密鑰'
            ],
            correctAnswers: [0],
            explanation: 'Kiro 強調 Spec-driven development，會將用戶的自然語言需求自動轉換為詳細的技術規格，然後再生成代碼。'
        },
        {
            id: 'ki3',
            category: 'Kiro IDE',
            question: 'Kiro 與 AWS 服務的整合優勢是什麼？',
            type: 'multiple',
            options: [
                '直接部署到 AWS 雲端',
                '使用 AWS 的 AI 服務',
                '整合 AWS 開發工具鏈',
                '免費無限使用所有功能'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Kiro 與 AWS 生態深度整合，可直接部署、使用 AWS AI 服務和開發工具。但並非所有功能都免費無限。'
        }
    ],

    // eigent 多線程 AI 工作平台
    eigent: [
        {
            id: 'ei1',
            category: 'eigent 平台',
            question: 'eigent 平台的核心特點是什麼？',
            type: 'single',
            options: [
                '支持多個 AI Agent 同時並行工作',
                '只支持單一任務',
                '只能用於數據分析',
                '只支持 Python 語言'
            ],
            correctAnswers: [0],
            explanation: 'eigent 是一個多線程 AI 工作平台，允許用戶同時啟動多個 AI Agent 並行處理不同任務。'
        },
        {
            id: 'ei2',
            category: 'eigent 平台',
            question: '使用 eigent 並行處理的好處是什麼？',
            type: 'multiple',
            options: [
                '提高工作效率',
                '可同時處理多個獨立任務',
                '減少等待時間',
                '消除所有錯誤'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '並行處理提高效率、處理多任務、減少等待，但不能保證消除所有錯誤，仍需要人工審查。'
        }
    ],

    // OpenCode / Openwork
    opencode: [
        {
            id: 'oc1',
            category: 'OpenCode',
            question: 'OpenCode 是什麼類型的工具？',
            type: 'single',
            options: [
                '開源的 AI 編程命令行工具',
                '付費的商業軟體',
                '網頁設計工具',
                '數據庫管理工具'
            ],
            correctAnswers: [0],
            explanation: 'OpenCode 是一個開源的 AI 編程 CLI 工具，提供類似 Claude Code 的功能但完全開源免費。'
        },
        {
            id: 'oc2',
            category: 'OpenCode',
            question: 'OpenCode 支持哪些 AI 模型提供商？',
            type: 'multiple',
            options: [
                'OpenAI',
                'Anthropic',
                'Google',
                'OpenRouter'
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: 'OpenCode 支持多種 AI 模型提供商，包括 OpenAI、Anthropic、Google 以及中介服務如 OpenRouter。'
        }
    ],

    // JIRA 與 AI 整合
    jira: [
        {
            id: 'ji1',
            category: 'JIRA 與 AI',
            question: 'JIRA 是什麼類型的工具？',
            type: 'single',
            options: [
                '項目管理和問題追蹤工具',
                '代碼編輯器',
                'AI 模型訓練工具',
                '圖像處理軟體'
            ],
            correctAnswers: [0],
            explanation: 'JIRA 是 Atlassian 公司的項目管理和問題追蹤工具，廣泛用於軟體開發團隊的敏捷開發流程。'
        },
        {
            id: 'ji2',
            category: 'JIRA 與 AI',
            question: 'AI 工具如何與 JIRA 整合提升效率？',
            type: 'multiple',
            options: [
                '自動創建和更新 Issue',
                '根據代碼變更生成工作項描述',
                '分析項目進度提供建議',
                '取代所有人工操作'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可以自動管理 Issue、生成描述、分析進度，但不能完全取代人工的決策和創意工作。'
        }
    ]
};

if (typeof window !== 'undefined') {
    window.modernQuestions_part2 = modernQuestions_part2;
}
