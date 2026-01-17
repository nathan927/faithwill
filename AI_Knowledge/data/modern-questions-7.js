/**
 * AI 知識溫故知新 - 2025-2026 最新題庫 (第七部分)
 * 社交媒體營銷與 AI 內容創作
 */

const modernQuestions_part7 = {
    // 抖音運營
    douyin: [
        {
            id: 'dy1',
            category: '抖音運營',
            question: '抖音的推薦算法主要基於什麼原理？',
            type: 'single',
            options: [
                '用戶興趣標籤 + 內容標籤匹配 + 互動反饋',
                '純隨機推薦',
                '只看粉絲數量',
                '按發布時間排序'
            ],
            correctAnswers: [0],
            explanation: '抖音使用興趣推薦算法，根據用戶行為分析興趣標籤，與內容標籤匹配，再根據完播率、點讚、評論等互動反饋調整推薦權重。'
        },
        {
            id: 'dy2',
            category: '抖音運營',
            question: '什麼是抖音的「流量池」機制？',
            type: 'single',
            options: [
                '新視頻先獲得小流量測試，數據好則進入更大流量池',
                '購買流量的功能',
                '存放視頻的服務器',
                '限制流量的機制'
            ],
            correctAnswers: [0],
            explanation: '抖音採用分級流量池機制，新視頻先推給200-500人測試，如果5秒完播率、互動率表現好，則進入更大流量池獲得更多曝光。'
        },
        {
            id: 'dy3',
            category: '抖音運營',
            question: '提高抖音視頻完播率的技巧有哪些？',
            type: 'multiple',
            options: [
                '前3秒設置強烈的鉤子吸引注意',
                '控制視頻長度，精簡內容',
                '使用熱門音樂增加觀看慾望',
                '視頻越長越好'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '完播率是重要指標。前3秒要抓住注意力、控制合適長度（建議15-60秒）、搭配熱門BGM都能提高完播率。過長的視頻反而會降低完播率。'
        },
        {
            id: 'dy4',
            category: '抖音運營',
            question: '抖音帳號定位的「三要素」是什麼？',
            type: 'single',
            options: [
                '人設、領域、風格',
                '長度、畫質、音樂',
                '價格、銷量、評價',
                '粉絲、點讚、轉發'
            ],
            correctAnswers: [0],
            explanation: '帳號定位三要素：人設（你是誰）、領域（做什麼內容）、風格（怎麼呈現），清晰的定位有助於算法精準推薦給目標受眾。'
        },
        {
            id: 'dy5',
            category: '抖音運營',
            question: '抖音什麼時段發布視頻效果通常較好？',
            type: 'multiple',
            options: [
                '中午 12:00-13:00',
                '晚上 18:00-21:00',
                '凌晨 3:00-5:00',
                '週末休息時間'
            ],
            correctAnswers: [0, 1, 3],
            explanation: '午休時段和晚間黃金時段用戶活躍度最高。週末用戶有更多時間刷視頻。凌晨時段用戶少，不適合發布。'
        },
        {
            id: 'dy6',
            category: '抖音運營',
            question: '什麼是抖音的「Dou+」？',
            type: 'single',
            options: [
                '付費推廣工具，可購買額外流量曝光',
                '視頻編輯功能',
                '粉絲互動功能',
                '帳號認證標記'
            ],
            correctAnswers: [0],
            explanation: 'Dou+ 是抖音官方的付費推廣工具，可以為視頻購買額外的曝光量，加速內容傳播，適合測試爆款或推廣商品。'
        }
    ],

    // 小紅書運營
    xiaohongshu: [
        {
            id: 'xhs1',
            category: '小紅書運營',
            question: '小紅書的內容形式主要有哪些？',
            type: 'multiple',
            options: [
                '圖文筆記',
                '短視頻',
                '直播',
                '長文章（10000字以上）'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '小紅書支持圖文筆記（最常見）、短視頻和直播。平台更適合精美的圖文內容，不支持超長文章格式。'
        },
        {
            id: 'xhs2',
            category: '小紅書運營',
            question: '小紅書標題的最佳實踐是什麼？',
            type: 'multiple',
            options: [
                '包含關鍵詞便於搜索',
                '使用數字和emoji增加點擊率',
                '控制在20字以內',
                '標題越長越好'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '好的小紅書標題應該：包含搜索關鍵詞、適當使用數字和emoji吸引眼球、控制合適長度。過長的標題會被截斷。'
        },
        {
            id: 'xhs3',
            category: '小紅書運營',
            question: '小紅書筆記的「收藏率」為什麼重要？',
            type: 'single',
            options: [
                '收藏率是推薦算法的重要權重指標',
                '只影響個人收藏列表',
                '收藏會減少曝光',
                '收藏率沒有任何作用'
            ],
            correctAnswers: [0],
            explanation: '小紅書非常看重收藏率，因為收藏代表用戶認為內容有價值、值得回看。高收藏率的筆記會獲得更多推薦流量。'
        },
        {
            id: 'xhs4',
            category: '小紅書運營',
            question: '小紅書「蒲公英」平台的作用是什麼？',
            type: 'single',
            options: [
                '官方品牌合作平台，連接品牌與博主',
                '圖片編輯工具',
                '數據分析工具',
                '視頻剪輯功能'
            ],
            correctAnswers: [0],
            explanation: '蒲公英是小紅書官方的品牌合作平台，品牌可以在此發布推廣需求，博主可以接單變現，平台抽成並提供合規保障。'
        },
        {
            id: 'xhs5',
            category: '小紅書運營',
            question: '小紅書SEO優化的關鍵點有哪些？',
            type: 'multiple',
            options: [
                '標題包含目標關鍵詞',
                '正文自然融入關鍵詞',
                '使用相關話題標籤',
                '關鍵詞堆砌越多越好'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '小紅書SEO需要在標題、正文自然融入關鍵詞，並使用相關話題標籤。但關鍵詞堆砌會被判定為違規。'
        },
        {
            id: 'xhs6',
            category: '小紅書運營',
            question: '小紅書「薯條」推廣和抖音Dou+的區別是什麼？',
            type: 'single',
            options: [
                '薯條更適合種草內容，Dou+更適合娛樂內容',
                '功能完全相同',
                '薯條免費，Dou+收費',
                '薯條只能推視頻'
            ],
            correctAnswers: [0],
            explanation: '薯條是小紅書的付費推廣工具，更適合生活方式、種草類內容；Dou+適合抖音的娛樂、劇情類內容。兩者都是付費工具。'
        }
    ],

    // 微信公眾號運營
    wechat: [
        {
            id: 'wx1',
            category: '微信運營',
            question: '微信公眾號「訂閱號」和「服務號」的主要區別是什麼？',
            type: 'single',
            options: [
                '訂閱號每天可發文，服務號每月4次但有更多接口功能',
                '訂閱號收費，服務號免費',
                '服務號不能發文章',
                '沒有區別'
            ],
            correctAnswers: [0],
            explanation: '訂閱號適合內容創作者，每天可發1次；服務號每月只能發4次，但擁有更多開發接口（如微信支付、模板消息），適合企業服務。'
        },
        {
            id: 'wx2',
            category: '微信運營',
            question: '微信公眾號文章提高閱讀量的技巧有哪些？',
            type: 'multiple',
            options: [
                '標題吸引人，引發好奇',
                '選擇合適的推送時間',
                '配合朋友圈、社群轉發',
                '文章越長閱讀量越高'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '標題決定打開率、推送時間影響觸達效果、社群轉發擴大傳播。文章長度應該適中，過長反而影響完讀率。'
        },
        {
            id: 'wx3',
            category: '微信運營',
            question: '微信視頻號與抖音的定位有什麼不同？',
            type: 'single',
            options: [
                '視頻號基於社交關係鏈推薦，抖音基於興趣算法推薦',
                '完全相同',
                '視頻號只能發圖片',
                '抖音不能直播'
            ],
            correctAnswers: [0],
            explanation: '視頻號的推薦機制更依賴社交關係（朋友點讚會推薦給你），適合私域運營；抖音純粹基於興趣算法，更適合公域流量獲取。'
        },
        {
            id: 'wx4',
            category: '微信運營',
            question: '什麼是微信「私域流量」？',
            type: 'single',
            options: [
                '可直接觸達、反覆運營的用戶群體（如微信群、好友）',
                '需要付費購買的流量',
                '平台分配的流量',
                '搜索引擎流量'
            ],
            correctAnswers: [0],
            explanation: '私域流量指能直接免費觸達的用戶，如微信好友、群成員、公眾號粉絲。相比平台公域流量，私域流量成本更低、轉化更高。'
        },
        {
            id: 'wx5',
            category: '微信運營',
            question: '企業微信相比個人微信做私域的優勢是什麼？',
            type: 'multiple',
            options: [
                '好友數量無上限',
                '離職後客戶可交接',
                '支持群發和自動回覆',
                '不需要認證'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '企業微信好友數無上限（個人微信5000人）、員工離職可交接客戶、支持群發和自動回覆等營銷功能。但需要企業認證。'
        }
    ],

    // AI客服搭建
    aiCustomerService: [
        {
            id: 'aics1',
            category: 'AI 客服',
            question: '搭建 AI 客服系統通常需要哪些核心組件？',
            type: 'multiple',
            options: [
                'LLM 大語言模型',
                '知識庫 / RAG 系統',
                '對話管理系統',
                '打印機'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 客服需要 LLM 理解和生成回覆、知識庫提供專業答案、對話管理追蹤上下文。打印機不是必需組件。'
        },
        {
            id: 'aics2',
            category: 'AI 客服',
            question: '什麼是 RAG (Retrieval-Augmented Generation)？',
            type: 'single',
            options: [
                '檢索增強生成，結合知識庫檢索與 LLM 生成',
                '一種圖片格式',
                '隨機答案生成器',
                '數據庫類型'
            ],
            correctAnswers: [0],
            explanation: 'RAG 先從知識庫檢索相關內容，再結合 LLM 生成答案。這樣可以讓 AI 客服基於企業專有知識回答問題，減少幻覺。'
        },
        {
            id: 'aics3',
            category: 'AI 客服',
            question: 'AI 客服如何處理超出知識範圍的問題？',
            type: 'single',
            options: [
                '設置兜底策略，識別無法回答時轉人工客服',
                '隨便編造答案',
                '直接關閉對話',
                '重複同一個回答'
            ],
            correctAnswers: [0],
            explanation: '好的 AI 客服應該識別自己的能力邊界，當無法回答時誠實告知並提供轉人工選項，而不是編造可能錯誤的答案。'
        },
        {
            id: 'aics4',
            category: 'AI 客服',
            question: '常用的 AI 客服搭建平台有哪些？',
            type: 'multiple',
            options: [
                'Dify',
                'Coze（扣子）',
                'FastGPT',
                'Microsoft Excel'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Dify、Coze、FastGPT 都是可以快速搭建 AI 客服的平台，支持知識庫、對話流程、多渠道接入。Excel 不是客服搭建工具。'
        },
        {
            id: 'aics5',
            category: 'AI 客服',
            question: 'AI 客服的「意圖識別」是什麼意思？',
            type: 'single',
            options: [
                '識別用戶想要做什麼（查詢、投訴、購買等）',
                '識別用戶的身份',
                '識別用戶的位置',
                '識別用戶的設備'
            ],
            correctAnswers: [0],
            explanation: '意圖識別是理解用戶問題背後的目的（如查詢訂單、退款申請、產品諮詢），然後路由到相應的處理流程。'
        },
        {
            id: 'aics6',
            category: 'AI 客服',
            question: 'AI 客服接入微信的常見方式有哪些？',
            type: 'multiple',
            options: [
                '公眾號自動回覆接口',
                '企業微信機器人',
                '微信小程序客服',
                '直接修改微信APP'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '可以通過公眾號接口、企業微信機器人、小程序客服等官方渠道接入 AI 客服。不能直接修改微信客戶端。'
        }
    ],

    // AI自動化工作流
    aiWorkflow: [
        {
            id: 'aiw1',
            category: 'AI 工作流',
            question: 'AI 自動製圖工作流通常包含哪些步驟？',
            type: 'multiple',
            options: [
                '文案分析生成提示詞',
                '調用 AI 繪圖 API',
                '後處理（裁剪、調色）',
                '人工手繪每一張圖'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 自動製圖流程：分析需求生成 prompt → 調用 API 生成圖片 → 後處理優化。可以實現大規模自動化，無需人工手繪。'
        },
        {
            id: 'aiw2',
            category: 'AI 工作流',
            question: 'AI 批量生成小紅書圖文的工作流程是什麼？',
            type: 'single',
            options: [
                '選題 → AI生成文案 → AI生成配圖 → 組合排版 → 定時發布',
                '只需要手動寫文案',
                '只需要AI生成圖片',
                '全程需要人工操作'
            ],
            correctAnswers: [0],
            explanation: '完整的自動化流程：基於熱點或模板選題、LLM 生成文案、AI 繪圖製作配圖、自動組合排版、通過 API 或 RPA 發布。'
        },
        {
            id: 'aiw3',
            category: 'AI 工作流',
            question: 'AI 自動剪片工作流常用哪些工具？',
            type: 'multiple',
            options: [
                '剪映（自動字幕、智能剪輯）',
                'RunwayML（AI 視頻生成）',
                'Descript（AI 語音編輯）',
                '純手工剪輯'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '剪映提供自動字幕和智能剪輯、RunwayML 可以 AI 生成視頻素材、Descript 支持 AI 語音編輯。這些工具可以大幅提高效率。'
        },
        {
            id: 'aiw4',
            category: 'AI 工作流',
            question: '什麼是「批量發布」自動化？',
            type: 'single',
            options: [
                '使用 RPA 或 API 同時向多個平台發布內容',
                '手動一個一個發布',
                '只發布一次',
                '刪除所有內容'
            ],
            correctAnswers: [0],
            explanation: '批量發布自動化可以將同一內容適配不同格式，同時發布到抖音、小紅書、微信等多平台，大幅提高運營效率。'
        },
        {
            id: 'aiw5',
            category: 'AI 工作流',
            question: 'AI 視頻腳本生成到成片的自動化流程是什麼？',
            type: 'single',
            options: [
                '話題輸入 → LLM寫腳本 → TTS語音 → 素材匹配 → 自動剪輯',
                '只需要準備視頻素材',
                '只需要AI寫腳本',
                '必須全程人工操作'
            ],
            correctAnswers: [0],
            explanation: '完整流程：輸入話題 → LLM 生成視頻腳本 → TTS 轉語音 → 自動匹配素材 → AI 輔助剪輯合成，可實現大規模自動化生產。'
        }
    ],

    // N8N 工作流
    n8n: [
        {
            id: 'n8n1',
            category: 'N8N',
            question: '什麼是 N8N？',
            type: 'single',
            options: [
                '開源的可視化工作流自動化平台',
                '一種編程語言',
                '社交媒體平台',
                '數據庫管理系統'
            ],
            correctAnswers: [0],
            explanation: 'N8N 是開源的工作流自動化工具，通過可視化拖拽方式連接不同應用和服務，實現自動化流程，類似 Zapier 但更靈活且可自部署。'
        },
        {
            id: 'n8n2',
            category: 'N8N',
            question: 'N8N 相比 Dify 的優勢是什麼？',
            type: 'multiple',
            options: [
                '更強的通用自動化能力，不限於 AI',
                '支持更多第三方服務集成',
                '開源可私有部署',
                'Dify 完全無法做自動化'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'N8N 是通用自動化平台，集成數百種服務；Dify 專注於 AI 應用。兩者可以結合使用：N8N 做流程編排，調用 Dify 的 AI 能力。'
        },
        {
            id: 'n8n3',
            category: 'N8N',
            question: 'N8N 的基本概念「節點 (Node)」是什麼？',
            type: 'single',
            options: [
                '執行特定操作的功能單元，如發送郵件、調用 API',
                '服務器硬體',
                '用戶帳號',
                '工作流名稱'
            ],
            correctAnswers: [0],
            explanation: '節點是 N8N 的基本構建單元，每個節點執行一個特定操作（如 HTTP 請求、數據轉換、發送通知），節點連接起來形成工作流。'
        },
        {
            id: 'n8n4',
            category: 'N8N',
            question: 'N8N 如何觸發工作流執行？',
            type: 'multiple',
            options: [
                'Webhook 觸發（外部調用）',
                '定時觸發（Cron）',
                '手動執行',
                '只能手動執行'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'N8N 支持多種觸發方式：Webhook（外部調用）、定時任務（如每天早上8點）、手動執行、其他服務觸發（如收到郵件）。'
        },
        {
            id: 'n8n5',
            category: 'N8N',
            question: 'N8N 中如何調用 AI 大模型？',
            type: 'single',
            options: [
                '使用 AI 節點或 HTTP Request 節點調用 API',
                '無法調用 AI',
                '需要另外購買插件',
                '只能用 GPT-2'
            ],
            correctAnswers: [0],
            explanation: 'N8N 內置 AI 節點支持多種 LLM，也可以用 HTTP Request 節點調用任意 AI API（如 OpenAI、Claude、本地模型等）。'
        },
        {
            id: 'n8n6',
            category: 'N8N',
            question: 'N8N 工作流的數據如何傳遞？',
            type: 'single',
            options: [
                '前一個節點的輸出自動作為後一個節點的輸入',
                '需要手動複製貼上',
                '數據無法傳遞',
                '只能傳遞數字'
            ],
            correctAnswers: [0],
            explanation: 'N8N 採用數據流模式，每個節點處理數據後輸出給下游節點。可以使用表達式如 {{$json.fieldName}} 引用前面節點的數據。'
        },
        {
            id: 'n8n7',
            category: 'N8N',
            question: 'N8N 常用的實用場景有哪些？',
            type: 'multiple',
            options: [
                '自動化社交媒體發布',
                '客戶數據同步',
                'AI 內容生成流水線',
                '替代操作系統'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'N8N 常用於自動發布內容、CRM數據同步、AI生成內容、報表自動化等場景。它是工具不是操作系統。'
        },
        {
            id: 'n8n8',
            category: 'N8N',
            question: '如何部署自己的 N8N 實例？',
            type: 'multiple',
            options: [
                'Docker 一鍵部署',
                'npm 安裝',
                '使用官方雲服務',
                '只能使用官方雲服務'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'N8N 支持 Docker 部署（推薦）、npm 直接安裝、官方雲服務。自部署版本功能完整且免費，雲服務按量收費更方便。'
        }
    ],

    // AI 變現
    aiMonetization: [
        {
            id: 'aim1',
            category: 'AI 變現',
            question: '在香港/內地利用 AI 賺取收益的常見方式有哪些？',
            type: 'multiple',
            options: [
                'AI 自媒體帳號運營（流量主、帶貨）',
                'AI 代運營服務',
                '開設 AI 培訓課程',
                'AI 一定能暴富'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '實際可行的變現方式包括：運營AI相關帳號變現、為企業提供AI代運營、開課教學等。但需要持續投入，不是快速暴富的捷徑。'
        },
        {
            id: 'aim2',
            category: 'AI 變現',
            question: '什麼是「AI + 知識付費」模式？',
            type: 'single',
            options: [
                '用 AI 輔助創作課程內容，銷售知識產品',
                'AI 會自動付費',
                '所有知識都免費',
                '需要購買 AI 股票'
            ],
            correctAnswers: [0],
            explanation: '利用 AI 提高課程、電子書、模板等知識產品的生產效率，然後通過平台銷售變現。AI 負責輔助創作，人負責品質把控和銷售。'
        },
        {
            id: 'aim3',
            category: 'AI 變現',
            question: 'AI 頭像/寫真服務的商業模式是什麼？',
            type: 'single',
            options: [
                '用 AI 繪圖生成個性化頭像或寫真，按張或按套收費',
                '免費贈送',
                '只能自用',
                '需要專業攝影棚'
            ],
            correctAnswers: [0],
            explanation: '用 Midjourney、SD 等工具訓練用戶風格的 LoRA，生成個性化頭像或寫真。可以在淘寶、閒魚、小紅書等平台接單變現。'
        },
        {
            id: 'aim4',
            category: 'AI 變現',
            question: 'AI 配音/有聲書的變現途徑有哪些？',
            type: 'multiple',
            options: [
                '為作者提供 AI 配音服務',
                '製作 AI 有聲書上架平台',
                '提供 AI 語音克隆私人訂製',
                'AI 配音無法商用'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '可以用 AI TTS 提供配音服務、製作有聲書、語音克隆等。需注意版權和平台規則，部分平台已接受標明的 AI 配音內容。'
        },
        {
            id: 'aim5',
            category: 'AI 變現',
            question: 'AI 帶貨直播的技術方案是什麼？',
            type: 'single',
            options: [
                '數字人 + 語音合成 + 自動化腳本，24小時無人直播',
                '只能真人直播',
                '完全沒有這種技術',
                'AI 會自己去購物'
            ],
            correctAnswers: [0],
            explanation: 'AI 帶貨直播使用數字人形象、TTS 語音、自動化腳本實現無人值守直播。適合特定品類，但平台政策和用戶接受度是關鍵考量。'
        },
        {
            id: 'aim6',
            category: 'AI 變現',
            question: '個人做 AI 自媒體應該如何選擇賽道？',
            type: 'multiple',
            options: [
                '選擇自己有專業背景的領域',
                '結合 AI 解決真實需求',
                '關注但不盲從熱門賽道',
                '什麼熱門做什麼'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '成功的 AI 自媒體需要：專業背景提供獨特視角、解決真實問題而非炒概念、理性選擇賽道而非盲目跟風。'
        }
    ]
};

if (typeof window !== 'undefined') {
    window.modernQuestions_part7 = modernQuestions_part7;
}
