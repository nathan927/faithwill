/**
 * AI 知識溫故知新 - 2025-2026 最新 AI 工具題庫 (第四部分)
 * 中國與國際 AI 服務：Perplexity, 豆包, 千問, OpenRouter 等
 */

const modernQuestions_part4 = {
    // Perplexity AI
    perplexity: [
        {
            id: 'px1',
            category: 'Perplexity AI',
            question: 'Perplexity AI 的主要特點是什麼？',
            type: 'single',
            options: [
                '結合搜索引擎和 AI 對話，提供帶引用來源的答案',
                '只能生成圖片',
                '只能翻譯文字',
                '只能寫代碼'
            ],
            correctAnswers: [0],
            explanation: 'Perplexity 是一個 AI 搜索引擎，它會搜索網絡並用 AI 總結答案，同時附上引用來源，讓資訊更可信。'
        },
        {
            id: 'px2',
            category: 'Perplexity AI',
            question: 'Perplexity 相比傳統搜索引擎的優勢是什麼？',
            type: 'multiple',
            options: [
                '直接給出整合後的答案',
                '提供資訊來源的引用',
                '支持追問和對話',
                '完全不需要自己判斷信息'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Perplexity 整合答案、附引用、支持對話，但用戶仍需判斷信息的準確性，不能完全不做判斷。'
        },
        {
            id: 'px3',
            category: 'Perplexity AI',
            question: 'Perplexity Pro 相比免費版有什麼額外功能？',
            type: 'multiple',
            options: [
                '更多的 Pro Search 次數',
                '支持上傳文件分析',
                '訪問更強的 AI 模型',
                '免費版已經有全部功能'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Perplexity Pro 提供更多高級搜索、文件上傳、更強模型等功能。免費版功能有限制。'
        },
        {
            id: 'px4',
            category: 'Perplexity AI',
            question: 'Perplexity 的 Focus 模式有什麼用途？',
            type: 'single',
            options: [
                '限定搜索範圍為特定類型的來源',
                '提高網速',
                '關閉 AI 功能',
                '進入冥想模式'
            ],
            correctAnswers: [0],
            explanation: 'Focus 模式讓你限定搜索來源，如只搜學術論文、Reddit、YouTube 等，獲得更專精的結果。'
        },
        {
            id: 'px5',
            category: 'Perplexity AI',
            question: 'Perplexity 適合用於什麼場景？',
            type: 'multiple',
            options: [
                '快速研究某個主題',
                '查找最新的技術資訊',
                '需要引用來源的內容創作',
                '生成高解析度圖片'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Perplexity 適合研究、查資訊、需要引用的創作。它主要是搜索和文字處理，不是圖片生成工具。'
        }
    ],

    // 豆包 (字節跳動)
    doubao: [
        {
            id: 'db1',
            category: '豆包 AI',
            question: '豆包是由哪家公司開發的？',
            type: 'single',
            options: [
                '字節跳動 (ByteDance)',
                '阿里巴巴',
                '騰訊',
                '百度'
            ],
            correctAnswers: [0],
            explanation: '豆包是字節跳動推出的 AI 對話助手，是字節跳動在大模型領域的重要產品。'
        },
        {
            id: 'db2',
            category: '豆包 AI',
            question: '豆包的主要功能有哪些？',
            type: 'multiple',
            options: [
                '對話問答',
                '圖像生成',
                '文案寫作',
                '視頻編輯'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '豆包支持對話問答、AI 繪圖、文案創作等多種功能。視頻編輯不是其主要功能。'
        },
        {
            id: 'db3',
            category: '豆包 AI',
            question: '豆包的優勢是什麼？',
            type: 'multiple',
            options: [
                '中文理解能力強',
                '與字節系產品深度整合',
                '免費使用基礎功能',
                '完全開源'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '豆包中文能力強、與字節系產品整合好、有免費基礎版。但它不是開源產品。'
        },
        {
            id: 'db4',
            category: '豆包 AI',
            question: '如何通過 API 使用豆包的能力？',
            type: 'single',
            options: [
                '通過火山引擎平台申請和調用 API',
                '直接在微信中使用',
                '無法通過 API 使用',
                '只能通過手機 App'
            ],
            correctAnswers: [0],
            explanation: '豆包的底層模型可以通過字節跳動的火山引擎（Volcengine）平台以 API 形式使用。'
        }
    ],

    // 通義千問 (阿里巴巴)
    qianwen: [
        {
            id: 'qw1',
            category: '通義千問',
            question: '通義千問是由哪家公司開發的？',
            type: 'single',
            options: [
                '阿里巴巴',
                '騰訊',
                '百度',
                '字節跳動'
            ],
            correctAnswers: [0],
            explanation: '通義千問（Qwen）是阿里巴巴推出的大語言模型和 AI 助手產品。'
        },
        {
            id: 'qw2',
            category: '通義千問',
            question: '通義千問的開源情況如何？',
            type: 'single',
            options: [
                'Qwen 系列模型已開源，可自行部署',
                '完全閉源不開放',
                '只對企業開放',
                '只在中國開放'
            ],
            correctAnswers: [0],
            explanation: '阿里巴巴已將 Qwen 系列模型開源，開發者可以下載並自行部署使用。'
        },
        {
            id: 'qw3',
            category: '通義千問',
            question: 'Qwen 模型有哪些版本？',
            type: 'multiple',
            options: [
                '不同參數大小（如 7B、14B、72B）',
                '多模態版本（Qwen-VL）',
                '代碼專用版本（Qwen-Coder）',
                '音樂創作版本'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Qwen 有多種規模和專用版本，包括視覺多模態和代碼版本。目前沒有專門的音樂創作版本。'
        },
        {
            id: 'qw4',
            category: '通義千問',
            question: '如何使用通義千問的 API？',
            type: 'single',
            options: [
                '通過阿里雲的靈積模型服務',
                '只能使用網頁版',
                '必須購買專用硬件',
                '無法通過 API 使用'
            ],
            correctAnswers: [0],
            explanation: '通義千問可以通過阿里雲的靈積（DashScope）模型服務平台以 API 形式調用。'
        },
        {
            id: 'qw5',
            category: '通義千問',
            question: 'Qwen 模型在哪些任務上表現出色？',
            type: 'multiple',
            options: [
                '中文理解和生成',
                '代碼編寫',
                '多模態理解',
                '物理硬件控制'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Qwen 在中文任務、代碼生成和多模態理解上都有不錯表現。它是軟件 AI，不直接控制物理硬件。'
        }
    ],

    // OpenRouter
    openrouter: [
        {
            id: 'or1',
            category: 'OpenRouter',
            question: 'OpenRouter 是什麼？',
            type: 'single',
            options: [
                '一個統一接口訪問多種 AI 模型的 API 中介服務',
                '一個網絡路由器品牌',
                '一個開源操作系統',
                '一個遊戲平台'
            ],
            correctAnswers: [0],
            explanation: 'OpenRouter 是一個 API 聚合服務，讓你用統一的接口訪問 GPT-4、Claude、Llama 等多種 AI 模型。'
        },
        {
            id: 'or2',
            category: 'OpenRouter',
            question: 'OpenRouter 的主要優勢是什麼？',
            type: 'multiple',
            options: [
                '無需分別註冊多個 AI 服務',
                '統一的 API 格式',
                '可以比較不同模型的價格',
                '免費無限使用所有模型'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'OpenRouter 統一了多個服務的訪問、格式和計費比較。但使用模型仍需付費，不是免費無限的。'
        },
        {
            id: 'or3',
            category: 'OpenRouter',
            question: 'OpenRouter 支持哪些類型的模型？',
            type: 'multiple',
            options: [
                'OpenAI GPT 系列',
                'Anthropic Claude 系列',
                'Google Gemini',
                '開源模型如 Llama、Mistral'
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: 'OpenRouter 聚合了主流商業模型和開源模型，提供廣泛的選擇。'
        },
        {
            id: 'or4',
            category: 'OpenRouter',
            question: '如何在 OpenRouter 中選擇最適合的模型？',
            type: 'multiple',
            options: [
                '根據任務類型選擇',
                '根據價格預算選擇',
                '根據速度要求選擇',
                '只能隨機選擇'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'OpenRouter 提供模型的詳細信息，可以根據任務需求、預算、速度等因素選擇合適的模型。'
        },
        {
            id: 'or5',
            category: 'OpenRouter',
            question: 'OpenRouter 的計費方式是什麼？',
            type: 'single',
            options: [
                '按 Token 使用量計費，不同模型價格不同',
                '固定月費',
                '完全免費',
                '按小時計費'
            ],
            correctAnswers: [0],
            explanation: 'OpenRouter 按實際使用的 Token 數量計費，不同模型的單價不同，用戶可以查看和比較。'
        },
        {
            id: 'or6',
            category: 'OpenRouter',
            question: '使用 OpenRouter 有什麼免費選項？',
            type: 'single',
            options: [
                '某些開源模型如 Llama 可以免費使用',
                '所有模型都免費',
                '沒有免費選項',
                '只有第一個月免費'
            ],
            correctAnswers: [0],
            explanation: 'OpenRouter 提供一些免費的開源模型選項，如某些 Llama 或 Mistral 模型，適合預算有限的用戶。'
        }
    ],

    // 其他中國 AI 服務
    chineseAI: [
        {
            id: 'cn1',
            category: '中國 AI 服務',
            question: '百度的大語言模型叫什麼名字？',
            type: 'single',
            options: [
                '文心一言 (ERNIE Bot)',
                '通義千問',
                '豆包',
                '訊飛星火'
            ],
            correctAnswers: [0],
            explanation: '文心一言（ERNIE Bot）是百度推出的大語言模型和對話 AI 產品。'
        },
        {
            id: 'cn2',
            category: '中國 AI 服務',
            question: '訊飛星火是由哪家公司開發的？',
            type: 'single',
            options: [
                '科大訊飛',
                '百度',
                '阿里巴巴',
                '騰訊'
            ],
            correctAnswers: [0],
            explanation: '訊飛星火是科大訊飛推出的大語言模型，在語音識別和處理方面有獨特優勢。'
        },
        {
            id: 'cn3',
            category: '中國 AI 服務',
            question: '騰訊的 AI 助手叫什麼？',
            type: 'single',
            options: [
                '騰訊混元 / 騰訊元寶',
                '通義千問',
                '文心一言',
                '豆包'
            ],
            correctAnswers: [0],
            explanation: '騰訊推出了混元大模型，並有「騰訊元寶」等 AI 助手產品。'
        },
        {
            id: 'cn4',
            category: '中國 AI 服務',
            question: '使用中國 AI 服務的優勢有哪些？',
            type: 'multiple',
            options: [
                '中文語境理解更準確',
                '無需翻牆即可使用',
                '與中國本土應用生態整合',
                '可以完全取代所有國際 AI'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '中國 AI 服務在中文理解、本地訪問、生態整合方面有優勢，但各有特長，不能說完全取代其他 AI。'
        },
        {
            id: 'cn5',
            category: '中國 AI 服務',
            question: '智譜 AI 的主要產品是什麼？',
            type: 'single',
            options: [
                'GLM 系列大語言模型',
                '圖像識別系統',
                '自動駕駛系統',
                '電子商務平台'
            ],
            correctAnswers: [0],
            explanation: '智譜 AI 開發了 GLM（General Language Model）系列大語言模型，是中國 AI 領域的重要參與者。'
        },
        {
            id: 'cn6',
            category: '中國 AI 服務',
            question: 'DeepSeek 是什麼？',
            type: 'single',
            options: [
                '一家提供高性價比大語言模型的中國公司',
                '搜索引擎',
                '視頻平台',
                '社交媒體應用'
            ],
            correctAnswers: [0],
            explanation: 'DeepSeek 是一家中國 AI 公司，以提供高性價比的大語言模型 API 而知名。'
        }
    ],

    // API 使用技巧
    apiUsage: [
        {
            id: 'api1',
            category: 'AI API 使用',
            question: '什麼是 API Key？',
            type: 'single',
            options: [
                '用於驗證身份和計費的唯一密鑰',
                '打開門的鑰匙',
                '鍵盤快捷鍵',
                '加密演算法'
            ],
            correctAnswers: [0],
            explanation: 'API Key 是一串唯一的字符，用於識別調用者身份、授權訪問和追蹤使用量計費。'
        },
        {
            id: 'api2',
            category: 'AI API 使用',
            question: 'API Key 的安全管理原則有哪些？',
            type: 'multiple',
            options: [
                '不要在代碼中硬編碼',
                '使用環境變量存儲',
                '定期輪換密鑰',
                '公開分享給團隊所有人'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'API Key 應該使用環境變量、定期更換，絕不應該硬編碼在代碼中或隨意分享。'
        },
        {
            id: 'api3',
            category: 'AI API 使用',
            question: 'AI API 的計費通常基於什麼？',
            type: 'single',
            options: [
                'Token（輸入和輸出的總量）',
                '使用時間',
                '文件大小',
                '每日固定費用'
            ],
            correctAnswers: [0],
            explanation: '多數 AI API 按 Token 計費，Token 是文本被分割成的最小單位，輸入和輸出都會計算。'
        },
        {
            id: 'api4',
            category: 'AI API 使用',
            question: '什麼是 Token？',
            type: 'single',
            options: [
                '文本被模型處理的最小單位，約 4 個字符或 0.75 個詞',
                '一種加密貨幣',
                '遊戲代幣',
                '身份驗證令牌'
            ],
            correctAnswers: [0],
            explanation: 'Token 是 AI 模型處理文本的基本單位，英文約 4 字符 = 1 Token，中文約 1-2 字 = 1 Token。'
        },
        {
            id: 'api5',
            category: 'AI API 使用',
            question: '調用 AI API 時常見的參數有哪些？',
            type: 'multiple',
            options: [
                'temperature（控制隨機性）',
                'max_tokens（限制輸出長度）',
                'model（選擇模型）',
                'color（設置顏色）'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'temperature、max_tokens、model 都是常見的 API 參數。color（顏色）不是 AI 文本模型的參數。'
        },
        {
            id: 'api6',
            category: 'AI API 使用',
            question: 'temperature 參數的作用是什麼？',
            type: 'single',
            options: [
                '控制輸出的隨機性，越高越有創意，越低越確定',
                '設定模型的運行溫度',
                '控制 API 的響應速度',
                '設定付費等級'
            ],
            correctAnswers: [0],
            explanation: 'temperature 控制輸出的隨機性，0 接近確定性輸出，1 或更高則更隨機和創意。'
        },
        {
            id: 'api7',
            category: 'AI API 使用',
            question: '如何處理 API 調用中的錯誤？',
            type: 'multiple',
            options: [
                '實現重試機制',
                '檢查錯誤碼和錯誤信息',
                '設置合理的超時時間',
                '忽略所有錯誤'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'API 錯誤處理需要重試、檢查錯誤碼、設置超時等。忽略錯誤會導致不可預測的問題。'
        },
        {
            id: 'api8',
            category: 'AI API 使用',
            question: 'Stream 模式有什麼特點？',
            type: 'single',
            options: [
                '逐步返回生成的內容，無需等待完整響應',
                '直播視頻',
                '下載文件',
                '加密傳輸'
            ],
            correctAnswers: [0],
            explanation: 'Stream 模式讓 API 邊生成邊返回內容，用戶可以更快看到結果，提升體驗。'
        }
    ]
};

if (typeof window !== 'undefined') {
    window.modernQuestions_part4 = modernQuestions_part4;
}
