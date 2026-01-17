/**
 * AI 知識溫故知新 - 2025-2026 最新 AI 工具題庫 (第五部分)
 * 實用技巧與最佳實踐
 */

const modernQuestions_part5 = {
    // AI 工作流整合
    workflow: [
        {
            id: 'wf1',
            category: 'AI 工作流',
            question: '如何有效地將 AI 整合到日常開發工作中？',
            type: 'multiple',
            options: [
                '使用 AI 輔助代碼編寫和重構',
                '讓 AI 幫助撰寫文檔和註釋',
                '用 AI 快速學習新技術',
                '完全依賴 AI 不做審查'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可以輔助編碼、文檔、學習，但人類審查和判斷仍然必要，不能完全依賴不做檢查。'
        },
        {
            id: 'wf2',
            category: 'AI 工作流',
            question: '什麼是 AI-assisted coding 的最佳實踐？',
            type: 'multiple',
            options: [
                '審查 AI 生成的代碼',
                '理解代碼邏輯而非盲目複製',
                '保持好的 Prompt 習慣',
                '相信 AI 生成的代碼 100% 正確'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '使用 AI 輔助編碼應該審查代碼、理解邏輯、寫好 Prompt。AI 生成的代碼不能保證完全正確。'
        },
        {
            id: 'wf3',
            category: 'AI 工作流',
            question: '如何處理 AI 生成的錯誤代碼？',
            type: 'multiple',
            options: [
                '仔細閱讀錯誤信息',
                '提供更多上下文給 AI',
                '嘗試不同的提問方式',
                '放棄使用 AI'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '遇到錯誤應該分析原因、補充上下文、調整提問方式。不應該輕易放棄，而是學會更好地使用。'
        },
        {
            id: 'wf4',
            category: 'AI 工作流',
            question: 'AI 最適合協助哪些開發任務？',
            type: 'multiple',
            options: [
                '樣板代碼生成',
                '代碼解釋和學習',
                '快速原型製作',
                '設計核心業務邏輯'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 擅長樣板代碼、解釋代碼、快速原型。核心業務邏輯需要人類的深度思考和決策。'
        }
    ],

    // 模型選擇
    modelSelection: [
        {
            id: 'ms1',
            category: '模型選擇',
            question: '如何選擇適合的 AI 模型？',
            type: 'multiple',
            options: [
                '根據任務複雜度選擇',
                '考慮成本預算',
                '評估速度需求',
                '永遠選最貴的'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '模型選擇應該根據任務、預算、速度等因素綜合考慮，不是越貴越好。'
        },
        {
            id: 'ms2',
            category: '模型選擇',
            question: 'Claude 模型系列的特點是什麼？',
            type: 'multiple',
            options: [
                '擅長長文本處理（200K context）',
                '代碼生成能力強',
                '注重安全和對齊',
                '只能處理英文'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Claude 有大 context、強代碼能力、重視安全等特點，同時支持多語言包括中文。'
        },
        {
            id: 'ms3',
            category: '模型選擇',
            question: 'GPT-4 系列模型的特點是什麼？',
            type: 'multiple',
            options: [
                '多模態能力（可處理圖片）',
                '廣泛的知識覆蓋',
                '與 OpenAI 生態整合',
                '完全免費使用'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'GPT-4 有多模態、廣知識、生態整合等優勢，但使用需要付費。'
        },
        {
            id: 'ms4',
            category: '模型選擇',
            question: '什麼時候應該選擇開源模型？',
            type: 'multiple',
            options: [
                '需要完全控制模型運行環境',
                '有嚴格的數據隱私要求',
                '需要自定義微調',
                '預算有限但有技術能力'
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: '開源模型適合需要完全控制、數據隱私要求高、需要微調或預算有限但有技術能力的場景。'
        },
        {
            id: 'ms5',
            category: '模型選擇',
            question: '小模型和大模型各有什麼優勢？',
            type: 'single',
            options: [
                '小模型快速便宜，大模型更聰明',
                '沒有區別',
                '大模型更快',
                '小模型更貴'
            ],
            correctAnswers: [0],
            explanation: '小模型（如 GPT-3.5、Claude Instant）速度快成本低，大模型（如 GPT-4、Claude Opus）能力更強但更慢更貴。'
        }
    ],

    // 項目實踐
    projectPractice: [
        {
            id: 'pp1',
            category: '項目實踐',
            question: '開始一個 AI 項目前應該考慮什麼？',
            type: 'multiple',
            options: [
                '明確問題和目標',
                '評估是否真的需要 AI',
                '考慮成本和維護',
                '直接開始編碼'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '開始前應該明確目標、評估必要性、考慮成本。不應該不做規劃就直接編碼。'
        },
        {
            id: 'pp2',
            category: '項目實踐',
            question: '如何評估 AI 在項目中的效果？',
            type: 'multiple',
            options: [
                '設定明確的評估指標',
                '收集用戶反饋',
                '對比有無 AI 的差異',
                '只看 AI 自己的報告'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '評估效果需要明確指標、用戶反饋、對比分析。不能只相信 AI 自己的評估。'
        },
        {
            id: 'pp3',
            category: '項目實踐',
            question: '在生產環境使用 AI 的注意事項？',
            type: 'multiple',
            options: [
                '實現錯誤處理和降級方案',
                '監控模型的響應質量',
                '考慮模型更新的影響',
                'AI 不會出錯無需處理'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '生產環境需要錯誤處理、質量監控、更新管理。AI 可能出錯，必須有應對方案。'
        },
        {
            id: 'pp4',
            category: '項目實踐',
            question: '如何處理 AI 的幻覺（生成錯誤信息）問題？',
            type: 'multiple',
            options: [
                '設計驗證機制',
                '提供明確的上下文',
                '結合可靠的數據源（如 RAG）',
                '相信 AI 永遠正確'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '減少幻覺需要驗證機制、充足上下文、結合可靠數據。不能盲信 AI 的輸出。'
        }
    ],

    // 效率工具
    efficiency: [
        {
            id: 'ef1',
            category: '效率工具',
            question: '如何用 AI 提高文檔編寫效率？',
            type: 'multiple',
            options: [
                '讓 AI 生成初稿',
                '用 AI 潤色和改進',
                '讓 AI 建議結構',
                'AI 寫完直接發布不改'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可以生成初稿、潤色、建議結構，但需要人工審閱和修改後才能發布。'
        },
        {
            id: 'ef2',
            category: '效率工具',
            question: '如何用 AI 加速學習新技術？',
            type: 'multiple',
            options: [
                '讓 AI 解釋複雜概念',
                '用 AI 生成學習路徑',
                '向 AI 提問驗證理解',
                '只聽 AI 不查其他資料'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可幫助解釋、規劃、驗證學習，但應該結合其他資料來源，不能只依賴單一來源。'
        },
        {
            id: 'ef3',
            category: '效率工具',
            question: '如何有效地使用 AI 進行代碼審查？',
            type: 'multiple',
            options: [
                '讓 AI 檢查常見問題',
                '讓 AI 建議改進',
                '結合人工審查',
                'AI 審查通過就直接合併'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可以輔助發現問題和建議改進，但應該結合人工審查，不能完全替代人工判斷。'
        }
    ],

    // 常見問題與解答
    troubleshooting: [
        {
            id: 'ts1',
            category: '問題排解',
            question: 'AI 響應太慢怎麼辦？',
            type: 'multiple',
            options: [
                '嘗試使用更小的模型',
                '減少輸入的 Token 數量',
                '使用 Stream 模式',
                '無解只能等'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '可以用小模型、減少輸入、用 Stream 模式來改善響應速度，有多種解決方案。'
        },
        {
            id: 'ts2',
            category: '問題排解',
            question: 'AI 回答質量不好怎麼改善？',
            type: 'multiple',
            options: [
                '優化 Prompt 更加明確',
                '提供更多上下文',
                '嘗試不同的模型',
                '問題在 AI 無法改善'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '改善質量可以優化 Prompt、加上下文、換模型。問題通常可以通過調整使用方式來改善。'
        },
        {
            id: 'ts3',
            category: '問題排解',
            question: 'API 調用遇到 Rate Limit 怎麼處理？',
            type: 'multiple',
            options: [
                '實現指數退避重試',
                '升級 API 套餐',
                '優化調用頻率',
                '不斷立即重試'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '處理 Rate Limit 應該用指數退避、升級套餐或優化頻率。不斷立即重試會加劇問題。'
        },
        {
            id: 'ts4',
            category: '問題排解',
            question: 'Context Length 超出限制怎麼辦？',
            type: 'multiple',
            options: [
                '總結和壓縮之前的對話',
                '移除不必要的上下文',
                '使用支持更長 Context 的模型',
                '無法解決'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Context 超限可以壓縮對話、移除不必要內容或用更大 context 的模型來解決。'
        }
    ],

    // 未來趨勢
    futureTrends: [
        {
            id: 'ft1',
            category: '未來趨勢',
            question: '2025-2026 年 AI 應用的主要趨勢是什麼？',
            type: 'multiple',
            options: [
                'AI Agent（智能代理）大量應用',
                '多模態能力成為標配',
                'AI 與開發工具深度整合',
                'AI 完全取代人類工作'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI Agent、多模態、工具整合是明確趨勢。AI 增強人類能力而非完全取代。'
        },
        {
            id: 'ft2',
            category: '未來趨勢',
            question: '什麼是 AI Agent？',
            type: 'single',
            options: [
                '能夠自主規劃、執行任務並使用工具的 AI 系統',
                '人工智能經紀人',
                '一種新的編程語言',
                '虛擬現實頭盔'
            ],
            correctAnswers: [0],
            explanation: 'AI Agent 是能夠理解目標、制定計劃、使用工具並自主執行複雜任務的 AI 系統。'
        },
        {
            id: 'ft3',
            category: '未來趨勢',
            question: '什麼是 RAG (Retrieval-Augmented Generation)？',
            type: 'single',
            options: [
                '結合檢索系統和生成模型來提供更準確的回答',
                '一種圖形格式',
                '遊戲類型',
                '硬件加速器'
            ],
            correctAnswers: [0],
            explanation: 'RAG 讓 AI 先從知識庫檢索相關信息，再結合這些信息生成回答，減少幻覺並提供最新知識。'
        },
        {
            id: 'ft4',
            category: '未來趨勢',
            question: 'AI 應用中的「本地優先」趨勢指什麼？',
            type: 'single',
            options: [
                '在本地設備運行 AI 模型，保護隱私和降低延遲',
                '只使用本地開發的 AI',
                '所有數據存儲在本地',
                '拒絕使用雲服務'
            ],
            correctAnswers: [0],
            explanation: '本地優先趨勢是在用戶設備上運行 AI 模型，優點是隱私保護、低延遲、離線可用。'
        }
    ]
};

if (typeof window !== 'undefined') {
    window.modernQuestions_part5 = modernQuestions_part5;
}
