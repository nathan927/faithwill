/**
 * AI 知識溫故知新 - 2025-2026 最新 AI 工具題庫 (第三部分)
 * Prompt Engineering, GitHub, VPN, AI 繪圖
 */

const modernQuestions_part3 = {
    // Prompt Engineering
    promptEngineering: [
        {
            id: 'pe1',
            category: 'Prompt Engineering',
            question: '什麼是 Prompt Engineering？',
            type: 'single',
            options: [
                '設計和優化給 AI 的輸入指令以獲得最佳輸出',
                '訓練 AI 模型的技術',
                '一種程式語言',
                '硬體優化技術'
            ],
            correctAnswers: [0],
            explanation: 'Prompt Engineering 是設計、優化和調整給 AI 模型的輸入提示（Prompt），以引導 AI 產生最佳輸出的技術和方法。'
        },
        {
            id: 'pe2',
            category: 'Prompt Engineering',
            question: '什麼是 Zero-shot Prompting？',
            type: 'single',
            options: [
                '不提供範例，直接要求 AI 完成任務',
                '提供很多範例',
                '不使用 Prompt',
                '用射擊遊戲訓練 AI'
            ],
            correctAnswers: [0],
            explanation: 'Zero-shot Prompting 是不給 AI 任何範例，直接描述任務要求，讓 AI 根據預訓練知識來完成任務。'
        },
        {
            id: 'pe3',
            category: 'Prompt Engineering',
            question: '什麼是 Few-shot Prompting？',
            type: 'single',
            options: [
                '在 Prompt 中提供少量範例來引導 AI',
                '使用很少的字數',
                '快速生成內容',
                '限制 AI 的回應長度'
            ],
            correctAnswers: [0],
            explanation: 'Few-shot Prompting 在 Prompt 中包含幾個輸入-輸出範例，讓 AI 學習模式後處理新的輸入。'
        },
        {
            id: 'pe4',
            category: 'Prompt Engineering',
            question: 'Chain-of-Thought (CoT) 技術的核心是什麼？',
            type: 'single',
            options: [
                '引導 AI 逐步推理，展示思考過程',
                '讓 AI 快速給出答案',
                '使用多個 AI 模型',
                '加密 AI 的輸出'
            ],
            correctAnswers: [0],
            explanation: 'Chain-of-Thought 讓 AI 展示推理步驟，逐步思考問題，這種方法特別適合複雜的邏輯和數學問題。'
        },
        {
            id: 'pe5',
            category: 'Prompt Engineering',
            question: '如何寫出一個好的 Prompt？',
            type: 'multiple',
            options: [
                '清楚明確地描述任務目標',
                '提供必要的背景和上下文',
                '指定期望的輸出格式',
                '使用越多字越好'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '好的 Prompt 需要清楚的目標、充足的上下文、明確的格式要求。但不是字數越多越好，要精準而非冗長。'
        },
        {
            id: 'pe6',
            category: 'Prompt Engineering',
            question: '什麼是 System Prompt？',
            type: 'single',
            options: [
                '設定 AI 角色、行為規則和整體指導的初始指令',
                '系統報錯信息',
                '作業系統的命令',
                '硬體配置指令'
            ],
            correctAnswers: [0],
            explanation: 'System Prompt 是對話開始時給 AI 的指令，設定其角色、行為準則、回應風格等，影響整個對話的表現。'
        },
        {
            id: 'pe7',
            category: 'Prompt Engineering',
            question: '什麼是 Role Prompting？',
            type: 'single',
            options: [
                '讓 AI 扮演特定角色來回答問題',
                '分配用戶權限',
                '設定數據庫角色',
                '遊戲中的角色扮演'
            ],
            correctAnswers: [0],
            explanation: 'Role Prompting 是讓 AI 扮演特定角色（如"你是一個資深軟體工程師"），使其回答更符合該角色的專業背景。'
        },
        {
            id: 'pe8',
            category: 'Prompt Engineering',
            question: '什麼是 Negative Prompting？',
            type: 'single',
            options: [
                '明確告訴 AI 不要做什麼',
                '使用否定句式',
                '批評 AI 的回答',
                '刪除之前的指令'
            ],
            correctAnswers: [0],
            explanation: 'Negative Prompting 是明確指出 AI 應該避免的內容或行為，如"不要使用技術術語"、"避免冗長的解釋"等。'
        },
        {
            id: 'pe9',
            category: 'Prompt Engineering',
            question: '什麼是 ReAct (Reasoning and Acting) 模式？',
            type: 'single',
            options: [
                '讓 AI 交替進行思考推理和執行動作',
                '快速反應模式',
                '化學反應模擬',
                '用戶界面設計模式'
            ],
            correctAnswers: [0],
            explanation: 'ReAct 結合推理（Reasoning）和行動（Acting），AI 先思考下一步該做什麼，執行後再根據結果繼續思考。'
        },
        {
            id: 'pe10',
            category: 'Prompt Engineering',
            question: '如何讓 AI 輸出結構化的數據？',
            type: 'multiple',
            options: [
                '明確要求輸出 JSON 格式',
                '提供輸出範例',
                '使用 Schema 描述結構',
                '用 AI 預設即可'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '可以明確要求格式（如 JSON）、提供範例、描述 Schema 來獲得結構化輸出。不能只依賴 AI 預設。'
        },
        {
            id: 'pe11',
            category: 'Prompt Engineering',
            question: '什麼是 Prompt Injection？',
            type: 'single',
            options: [
                '惡意用戶嘗試通過輸入讓 AI 執行非預期指令',
                '注入更多創意到 Prompt',
                '醫學注射技術',
                '數據庫注入攻擊'
            ],
            correctAnswers: [0],
            explanation: 'Prompt Injection 是一種安全風險，惡意用戶嘗試在輸入中嵌入指令來操控 AI 行為，繞過安全限制。'
        },
        {
            id: 'pe12',
            category: 'Prompt Engineering',
            question: '如何防範 Prompt Injection？',
            type: 'multiple',
            options: [
                '清理和驗證用戶輸入',
                '使用角色分離（System vs User）',
                '設置輸出限制和過濾',
                '完全禁止用戶輸入'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '防範 Prompt Injection 需要輸入驗證、角色分離、輸出過濾等多層防護。完全禁止輸入不切實際。'
        }
    ],

    // GitHub
    github: [
        {
            id: 'gh1',
            category: 'GitHub',
            question: 'GitHub 是什麼？',
            type: 'single',
            options: [
                '一個代碼托管和版本控制平台',
                '一個社交媒體網站',
                '一個視頻分享平台',
                '一個電子郵件服務'
            ],
            correctAnswers: [0],
            explanation: 'GitHub 是全球最大的代碼托管平台，基於 Git 版本控制系統，提供代碼存儲、協作開發、開源項目托管等服務。'
        },
        {
            id: 'gh2',
            category: 'GitHub',
            question: '為什麼 AI 時代學習 GitHub 很重要？',
            type: 'multiple',
            options: [
                '大量 AI 項目和工具都開源在 GitHub',
                '可以學習和參考優秀代碼',
                '可以追蹤最新的技術發展',
                'GitHub 可以自動編寫完美代碼'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'GitHub 匯集了海量 AI 開源項目，是學習、追蹤技術發展的重要平台。但代碼仍需要人來編寫和審查。'
        },
        {
            id: 'gh3',
            category: 'GitHub',
            question: 'Git 和 GitHub 的區別是什麼？',
            type: 'single',
            options: [
                'Git 是版本控制工具，GitHub 是托管 Git 倉庫的平台',
                '兩者完全相同',
                'Git 是 GitHub 的付費版',
                'GitHub 是 Git 的前身'
            ],
            correctAnswers: [0],
            explanation: 'Git 是本地的版本控制工具，GitHub 是基於 Git 的雲端托管平台。Git 可以獨立使用，不一定需要 GitHub。'
        },
        {
            id: 'gh4',
            category: 'GitHub',
            question: 'GitHub 的 Star 功能有什麼用途？',
            type: 'multiple',
            options: [
                '收藏感興趣的項目',
                '表示對項目的支持和認可',
                '作為項目熱門程度的指標',
                '自動下載項目到本地'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Star 用於收藏項目、表達支持，也是衡量項目受歡迎程度的重要指標。但不會自動下載。'
        },
        {
            id: 'gh5',
            category: 'GitHub',
            question: '什麼是 GitHub Fork？',
            type: 'single',
            options: [
                '複製一份他人的倉庫到自己的帳戶',
                '刪除倉庫',
                '合併代碼',
                '查看代碼歷史'
            ],
            correctAnswers: [0],
            explanation: 'Fork 是將別人的倉庫複製一份到自己的 GitHub 帳戶，可以自由修改而不影響原始項目。'
        },
        {
            id: 'gh6',
            category: 'GitHub',
            question: '什麼是 Pull Request (PR)？',
            type: 'single',
            options: [
                '請求將自己的修改合併到原始項目',
                '下載代碼',
                '刪除分支',
                '重置代碼'
            ],
            correctAnswers: [0],
            explanation: 'Pull Request 是請求項目維護者審查並合併你的代碼修改，是開源協作的核心機制。'
        },
        {
            id: 'gh7',
            category: 'GitHub',
            question: 'GitHub Actions 是什麼？',
            type: 'single',
            options: [
                '自動化 CI/CD 和工作流程的功能',
                '遊戲功能',
                '社交互動功能',
                '視頻直播功能'
            ],
            correctAnswers: [0],
            explanation: 'GitHub Actions 讓你定義自動化工作流程，如自動測試、構建、部署等，是現代 DevOps 的重要工具。'
        },
        {
            id: 'gh8',
            category: 'GitHub',
            question: '如何有效地搜索 GitHub 上的項目？',
            type: 'multiple',
            options: [
                '使用關鍵詞加過濾器（stars:>1000）',
                '按語言篩選',
                '查看 Trending 和 Topics',
                '只能隨機瀏覽'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '可以使用高級搜索語法、語言過濾、查看趨勢和主題分類來高效找到想要的項目。'
        },
        {
            id: 'gh9',
            category: 'GitHub',
            question: 'GitHub Copilot 是什麼？',
            type: 'single',
            options: [
                'GitHub 推出的 AI 代碼助手',
                '自動駕駛系統',
                '飛行模擬器',
                '項目管理工具'
            ],
            correctAnswers: [0],
            explanation: 'GitHub Copilot 是由 GitHub 和 OpenAI 合作開發的 AI 編程助手，可以根據上下文自動補全代碼。'
        },
        {
            id: 'gh10',
            category: 'GitHub',
            question: 'GitHub Pages 可以用來做什麼？',
            type: 'single',
            options: [
                '免費托管靜態網站',
                '運行後端服務器',
                '存儲數據庫',
                '發送電子郵件'
            ],
            correctAnswers: [0],
            explanation: 'GitHub Pages 提供免費的靜態網站托管，適合個人博客、項目文檔、作品展示等。'
        }
    ],

    // VPN 翻牆
    vpn: [
        {
            id: 'vpn1',
            category: 'VPN 與翻牆',
            question: 'VPN 的主要用途是什麼？',
            type: 'multiple',
            options: [
                '加密網絡連接保護隱私',
                '訪問被地理限制的內容',
                '隱藏真實 IP 地址',
                '讓網速變得更快'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'VPN 可以加密連接、訪問受限內容、隱藏 IP。但通常會因加密開銷而略微降低網速，而非加快。'
        },
        {
            id: 'vpn2',
            category: 'VPN 與翻牆',
            question: '使用 VPN 翻牆訪問國際 AI 服務時需要注意什麼？',
            type: 'multiple',
            options: [
                '了解當地法律法規',
                '選擇穩定可靠的服務商',
                '保護個人隱私和數據安全',
                'VPN 完全沒有風險'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '使用 VPN 需要了解法律風險、選擇可靠服務商、注意數據安全。VPN 並非沒有風險。'
        },
        {
            id: 'vpn3',
            category: 'VPN 與翻牆',
            question: '選擇 VPN 服務時應該考慮哪些因素？',
            type: 'multiple',
            options: [
                '服務商的隱私政策和日誌政策',
                '連接速度和穩定性',
                '服務器節點的分佈',
                '只看價格最便宜的'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '選擇 VPN 要綜合考慮隱私政策、速度穩定性、節點分佈等，不能只看價格。便宜的 VPN 可能有安全風險。'
        },
        {
            id: 'vpn4',
            category: 'VPN 與翻牆',
            question: '為什麼訪問某些國際 AI 服務需要使用 VPN？',
            type: 'single',
            options: [
                '這些服務在某些地區有地理限制或被封鎖',
                'VPN 是這些服務的必要技術組件',
                '使用 VPN 可以獲得免費服務',
                '所有 AI 服務都需要 VPN'
            ],
            correctAnswers: [0],
            explanation: '某些 AI 服務如 ChatGPT、Claude、Google 等在某些地區無法直接訪問，需要通過 VPN 連接到可用地區的服務器。'
        },
        {
            id: 'vpn5',
            category: 'VPN 與翻牆',
            question: 'VPN 和 Proxy 的主要區別是什麼？',
            type: 'single',
            options: [
                'VPN 加密所有流量，Proxy 通常只轉發特定應用的流量',
                '兩者完全相同',
                'Proxy 更安全',
                'VPN 只能用於遊戲'
            ],
            correctAnswers: [0],
            explanation: 'VPN 在操作系統層面加密所有網絡流量，Proxy 通常只為特定應用（如瀏覽器）轉發流量，且不一定加密。'
        }
    ],

    // AI 繪圖 (Google Banana Pro 等)
    aiArt: [
        {
            id: 'art1',
            category: 'AI 繪圖',
            question: 'Google 的 AI 繪圖工具主要使用什麼技術？',
            type: 'single',
            options: [
                '擴散模型 (Diffusion Models) 如 Imagen',
                '傳統的 Photoshop 濾鏡',
                '手工繪製',
                'Flash 動畫技術'
            ],
            correctAnswers: [0],
            explanation: 'Google 的 AI 繪圖工具（如 Imagen 系列）主要基於擴散模型技術，可以從文字描述生成高質量圖像。'
        },
        {
            id: 'art2',
            category: 'AI 繪圖',
            question: '撰寫 AI 繪圖 Prompt 時應該包含哪些元素？',
            type: 'multiple',
            options: [
                '主題和內容描述',
                '藝術風格（如油畫、水彩、3D）',
                '構圖和視角',
                '只需要一個關鍵詞'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '好的繪圖 Prompt 應包含主題、風格、構圖等多個層面的描述，而不只是一個簡單的關鍵詞。'
        },
        {
            id: 'art3',
            category: 'AI 繪圖',
            question: '什麼是 Negative Prompt 在 AI 繪圖中的作用？',
            type: 'single',
            options: [
                '告訴 AI 不要生成什麼內容',
                '生成黑白圖片',
                '減少圖片尺寸',
                '加速生成過程'
            ],
            correctAnswers: [0],
            explanation: 'Negative Prompt 用於指定不想要的元素，如"no blurry, no distorted faces"，幫助提高生成質量。'
        },
        {
            id: 'art4',
            category: 'AI 繪圖',
            question: '常見的 AI 繪圖工具有哪些？',
            type: 'multiple',
            options: [
                'Midjourney',
                'DALL-E',
                'Stable Diffusion',
                'Microsoft Word'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Midjourney、DALL-E 和 Stable Diffusion 是目前最流行的 AI 繪圖工具。Word 是文字處理軟體。'
        },
        {
            id: 'art5',
            category: 'AI 繪圖',
            question: 'AI 繪圖的常見風格描述詞有哪些？',
            type: 'multiple',
            options: [
                'photorealistic（照片級真實）',
                'anime style（動漫風格）',
                'oil painting（油畫）',
                'download（下載）'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '這些都是常用的風格描述詞，可以讓 AI 生成特定風格的圖像。"download"不是風格描述。'
        },
        {
            id: 'art6',
            category: 'AI 繪圖',
            question: '什麼是 AI 繪圖中的 Seed？',
            type: 'single',
            options: [
                '控制隨機性的數值，相同 seed 可重現相同結果',
                '圖片的種子文件',
                '植物的種子圖案',
                '付費解鎖的功能'
            ],
            correctAnswers: [0],
            explanation: 'Seed 是控制生成隨機性的數值，使用相同的 seed 和 prompt 可以重現相同的圖像結果。'
        },
        {
            id: 'art7',
            category: 'AI 繪圖',
            question: '使用 AI 繪圖生成商業內容時需要注意什麼？',
            type: 'multiple',
            options: [
                '了解服務的商業授權條款',
                '避免侵犯他人版權或肖像權',
                '注意 AI 生成內容的披露要求',
                '可以隨意使用無任何限制'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 繪圖商業使用需要注意授權條款、版權問題和披露要求。不是可以隨意使用的。'
        }
    ]
};

if (typeof window !== 'undefined') {
    window.modernQuestions_part3 = modernQuestions_part3;
}
