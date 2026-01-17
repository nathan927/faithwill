/**
 * AI 知識溫故知新 - 2025-2026 最新題庫 (第八部分)
 * AI 熱門賽道、必備工具、RPA 自動化
 */

const modernQuestions_part8 = {
    // AI 熱門賽道
    aiTracks: [
        {
            id: 'ait1',
            category: 'AI 熱門賽道',
            question: '2025-2026 年個人 AI 創業的熱門賽道有哪些？',
            type: 'multiple',
            options: [
                'AI 短視頻/自媒體',
                'AI 客服/銷售機器人',
                'AI 教育/培訓',
                'AI 炒股保證賺錢'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 內容創作、智能客服、教育培訓都是可行的個人賽道。但任何投資都有風險，不存在保證賺錢的項目。'
        },
        {
            id: 'ait2',
            category: 'AI 熱門賽道',
            question: 'AI + 本地生活的應用場景有哪些？',
            type: 'multiple',
            options: [
                'AI 探店視頻製作',
                '餐廳 AI 客服預訂',
                '本地商家 AI 運營服務',
                'AI 完全取代實體店'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可以輔助探店內容製作、自動化預訂客服、幫助本地商家運營線上曝光。但 AI 是輔助工具，不能完全取代實體服務。'
        },
        {
            id: 'ait3',
            category: 'AI 熱門賽道',
            question: '做 AI 工具評測自媒體需要注意什麼？',
            type: 'multiple',
            options: [
                '保持客觀中立，真實體驗',
                '及時跟進最新工具動態',
                '建立個人專業形象',
                '所有工具都說好話'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '評測要客觀中立才能建立信任、需要持續追蹤行業動態、打造專業人設。一味說好話會失去公信力。'
        },
        {
            id: 'ait4',
            category: 'AI 熱門賽道',
            question: 'AI + 電商的變現方式有哪些？',
            type: 'multiple',
            options: [
                'AI 生成商品主圖/詳情頁',
                'AI 客服提高轉化率',
                'AI 選品和數據分析',
                'AI 自動發貨'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可以生成電商圖片、智能客服、數據分析選品。物流發貨需要實體操作，AI 暫時無法替代。'
        },
        {
            id: 'ait5',
            category: 'AI 熱門賽道',
            question: '個人做 AI 代運營服務應該如何定位？',
            type: 'single',
            options: [
                '專注特定行業或場景，提供專業解決方案',
                '什麼都做，來者不拒',
                '只做免費服務',
                '不需要任何專業知識'
            ],
            correctAnswers: [0],
            explanation: '專注特定領域（如餐飲AI客服、電商AI運營）更容易建立專業形象和口碑，也能提供更有針對性的服務。'
        },
        {
            id: 'ait6',
            category: 'AI 熱門賽道',
            question: 'AI 繪本/童書製作的市場機會是什麼？',
            type: 'single',
            options: [
                '用 AI 快速生成插圖，降低繪本製作成本',
                '完全取代作家',
                '沒有市場需求',
                '只能做成人內容'
            ],
            correctAnswers: [0],
            explanation: 'AI 繪圖大幅降低插圖成本，讓個人也能製作精美繪本。但故事創意和教育價值仍需人工把控，是人機協作的好場景。'
        }
    ],

    // AI 必備工具
    aiTools: [
        {
            id: 'tool1',
            category: 'AI 必備工具',
            question: '以下哪些是常用的 AI 文案工具？',
            type: 'multiple',
            options: [
                'ChatGPT / Claude',
                'Copy.ai',
                'Jasper',
                'Photoshop'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'ChatGPT、Claude、Copy.ai、Jasper 都是 AI 文案生成工具。Photoshop 是圖像編輯軟體，不是文案工具。'
        },
        {
            id: 'tool2',
            category: 'AI 必備工具',
            question: '常用的 AI 圖像生成工具有哪些？',
            type: 'multiple',
            options: [
                'Midjourney',
                'DALL-E 3',
                'Stable Diffusion',
                'Word'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Midjourney、DALL-E 3、Stable Diffusion 是主流 AI 繪圖工具。Word 是文字處理軟體。'
        },
        {
            id: 'tool3',
            category: 'AI 必備工具',
            question: 'AI 視頻生成領域的代表工具有哪些？',
            type: 'multiple',
            options: [
                'Runway Gen-2/3',
                'Pika Labs',
                'Sora (OpenAI)',
                'Excel'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Runway、Pika、Sora 都是 AI 視頻生成工具，可以從文字或圖片生成視頻。Excel 是電子表格軟體。'
        },
        {
            id: 'tool4',
            category: 'AI 必備工具',
            question: 'AI 語音/TTS 工具有哪些？',
            type: 'multiple',
            options: [
                'ElevenLabs',
                '劍乃',
                'Azure TTS',
                '記事本'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'ElevenLabs 支持高質量語音克隆、劍乃是中文語音工具、Azure TTS 是微軟的語音服務。記事本是文本編輯器。'
        },
        {
            id: 'tool5',
            category: 'AI 必備工具',
            question: 'AI 翻譯工具的代表有哪些？',
            type: 'multiple',
            options: [
                'DeepL',
                'Google Translate',
                '通義千問翻譯',
                'Docker'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'DeepL 以高質量著稱、Google Translate 覆蓋語言最廣、通義千問支持中文和多語言。Docker 是容器化工具。'
        },
        {
            id: 'tool6',
            category: 'AI 必備工具',
            question: 'AI OCR（文字識別）工具有哪些？',
            type: 'multiple',
            options: [
                '通義千問視覺',
                'GPT-4 Vision',
                '百度 OCR',
                '音頻播放器'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '通義千問、GPT-4V 等多模態模型支持 OCR，百度 OCR 是專業認認服務。音頻播放器與 OCR 無關。'
        },
        {
            id: 'tool7',
            category: 'AI 必備工具',
            question: 'AI 搜索工具有哪些特點？',
            type: 'multiple',
            options: [
                '整合搜索結果，給出總結性回答',
                '提供來源引用',
                '可以進行多輪對話追問',
                '完全取代專業研究'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Perplexity 等 AI 搜索工具能整合多源信息、提供引用、支持追問。但專業研究仍需人工驗證和深入分析。'
        },
        {
            id: 'tool8',
            category: 'AI 必備工具',
            question: '什麼是 AI 去背景工具？',
            type: 'single',
            options: [
                '自動識別並移除圖片背景，保留主體',
                '添加背景音樂',
                '翻譯文字',
                '壓縮視頻'
            ],
            correctAnswers: [0],
            explanation: 'Remove.bg、Photoroom 等工具使用 AI 自動識別主體，一鍵去除背景，常用於電商圖片和證件照處理。'
        }
    ],

    // AI RPA 自動化
    aiRpa: [
        {
            id: 'rpa1',
            category: 'AI RPA',
            question: '什麼是 RPA (Robotic Process Automation)？',
            type: 'single',
            options: [
                '機器人流程自動化，模擬人操作電腦執行重複任務',
                '一種機器人玩具',
                '遊戲引擎',
                '社交平台'
            ],
            correctAnswers: [0],
            explanation: 'RPA 是軟體機器人，可以模擬人類在電腦上的操作（點擊、輸入、複製等），自動執行重複性任務，提高效率。'
        },
        {
            id: 'rpa2',
            category: 'AI RPA',
            question: 'AI + RPA 結合的優勢是什麼？',
            type: 'multiple',
            options: [
                'AI 負責理解和決策，RPA 負責執行操作',
                '處理非結構化數據（如識別票據信息）',
                '實現更智能的自動化流程',
                'RPA 和 AI 完全無關'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 增強 RPA 的智能：如 OCR 識別票據、NLP 理解郵件內容、決策需要轉發給誰，RPA 執行具體操作。'
        },
        {
            id: 'rpa3',
            category: 'AI RPA',
            question: '常見的 RPA 工具有哪些？',
            type: 'multiple',
            options: [
                'UiPath',
                '影刀 RPA',
                'Power Automate',
                'WeChat'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'UiPath 是國際領先的 RPA 工具、影刀是國內流行的 RPA、Power Automate 是微軟的自動化工具。WeChat 是通訊軟體。'
        },
        {
            id: 'rpa4',
            category: 'AI RPA',
            question: 'RPA 在社交媒體運營中的應用有哪些？',
            type: 'multiple',
            options: [
                '自動發布內容到多個平台',
                '自動回覆評論和私信',
                '批量收集數據和截圖',
                '自動增加真實粉絲'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'RPA 可以自動發布、回覆、收集數據。但無法產生「真實」粉絲，刷量行為違反平台規則且無實際價值。'
        },
        {
            id: 'rpa5',
            category: 'AI RPA',
            question: '使用 RPA 需要注意的風險有哪些？',
            type: 'multiple',
            options: [
                '可能違反平台服務條款',
                '需要定期維護以適應界面變化',
                '大量異常操作可能被封號',
                'RPA 完全無風險'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '使用 RPA 需注意：遵守平台規則、應對界面變化、控制操作頻率避免封號。任何自動化工具都有使用邊界。'
        },
        {
            id: 'rpa6',
            category: 'AI RPA',
            question: 'Browser Use 是什麼類型的工具？',
            type: 'single',
            options: [
                'AI 驅動的瀏覽器自動化框架，讓 AI 操控瀏覽器',
                '普通的瀏覽器',
                '視頻編輯軟體',
                '遊戲平台'
            ],
            correctAnswers: [0],
            explanation: 'Browser Use 是讓 LLM 直接操控瀏覽器的工具，AI 可以看懂網頁內容並執行點擊、輸入等操作，實現智能網頁自動化。'
        },
        {
            id: 'rpa7',
            category: 'AI RPA',
            question: 'Claude Computer Use 的功能是什麼？',
            type: 'single',
            options: [
                '讓 Claude 直接操控電腦界面執行任務',
                '在電腦上安裝 Claude',
                '用電腦打電話',
                '維修電腦硬體'
            ],
            correctAnswers: [0],
            explanation: 'Claude Computer Use 允許 Claude 看到螢幕並操控鍵盤滑鼠，可以執行複雜的電腦操作任務，是 AI Agent 的重要進展。'
        },
        {
            id: 'rpa8',
            category: 'AI RPA',
            question: '企業導入 RPA 的典型流程是什麼？',
            type: 'single',
            options: [
                '流程梳理 → 選型 → 開發 → 測試 → 部署 → 運維',
                '直接全面上線',
                '只需要買軟體',
                '讓員工自己摸索'
            ],
            correctAnswers: [0],
            explanation: '成功導入 RPA 需要：先梳理適合自動化的流程、選擇工具、開發機器人、充分測試、逐步部署、持續運維優化。'
        }
    ],

    // N8N 進階
    n8nAdvanced: [
        {
            id: 'n8na1',
            category: 'N8N 進階',
            question: 'N8N 如何實現條件分支？',
            type: 'single',
            options: [
                '使用 IF 節點根據條件走不同分支',
                '無法實現條件分支',
                '只能線性執行',
                '需要編寫大量代碼'
            ],
            correctAnswers: [0],
            explanation: 'N8N 的 IF 節點可以根據條件（如金額>100）將流程分為不同分支，類似編程中的 if-else 邏輯。'
        },
        {
            id: 'n8na2',
            category: 'N8N 進階',
            question: 'N8N 如何處理循環操作？',
            type: 'single',
            options: [
                '數據項會自動遍歷處理，或使用 Loop Over Items 節點',
                '不支持循環',
                '只能處理單個數據',
                '需要手動逐個執行'
            ],
            correctAnswers: [0],
            explanation: 'N8N 天然支持數據列表，每個 item 會自動被後續節點處理。複雜循環可用 Loop Over Items 節點明確控制。'
        },
        {
            id: 'n8na3',
            category: 'N8N 進階',
            question: 'N8N 如何處理錯誤？',
            type: 'multiple',
            options: [
                '設置 Error Trigger 節點捕獲錯誤',
                '配置節點的錯誤處理選項（繼續/停止）',
                '使用 Try/Catch 模式',
                '錯誤會被忽略'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'N8N 支持多種錯誤處理：Error Trigger 統一處理、單節點配置錯誤行為、設計 Try/Catch 分支。生產環境必須處理錯誤。'
        },
        {
            id: 'n8na4',
            category: 'N8N 進階',
            question: 'N8N 如何存儲和讀取數據？',
            type: 'multiple',
            options: [
                '連接數據庫（MySQL、PostgreSQL等）',
                '使用文件節點讀寫文件',
                '連接 Google Sheets',
                'N8N 無法存儲數據'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'N8N 可以連接各種數據庫、讀寫本地或雲端文件、連接 Google Sheets/Airtable 等，靈活存取數據。'
        },
        {
            id: 'n8na5',
            category: 'N8N 進階',
            question: 'N8N 如何調用自定義 API？',
            type: 'single',
            options: [
                '使用 HTTP Request 節點配置請求方法、URL、參數和認證',
                '只能用內置節點',
                '需要聯繫 N8N 官方',
                '無法調用外部 API'
            ],
            correctAnswers: [0],
            explanation: 'HTTP Request 節點可以調用任意 REST API，支持 GET/POST/PUT/DELETE，可配置 Headers、Body、認證等。'
        },
        {
            id: 'n8na6',
            category: 'N8N 進階',
            question: 'N8N 中如何使用 JavaScript/Python 代碼？',
            type: 'single',
            options: [
                '使用 Code 節點編寫自定義邏輯',
                '不支持編寫代碼',
                '需要購買專業版',
                '只能用拖拽'
            ],
            correctAnswers: [0],
            explanation: 'N8N 的 Code 節點支持 JavaScript（默認）和 Python，可以編寫複雜的數據處理、計算邏輯，補充節點功能不足。'
        },
        {
            id: 'n8na7',
            category: 'N8N 進階',
            question: 'N8N 如何設計子工作流 (Sub-workflow)？',
            type: 'single',
            options: [
                '創建獨立工作流，用 Execute Workflow 節點調用',
                '所有邏輯必須在一個工作流中',
                '不支持子工作流',
                '需要第三方插件'
            ],
            correctAnswers: [0],
            explanation: '複雜流程可拆分為多個工作流，用 Execute Workflow 節點調用，便於維護和重用，類似編程中的函數調用。'
        },
        {
            id: 'n8na8',
            category: 'N8N 進階',
            question: 'N8N 如何實現定時執行？',
            type: 'single',
            options: [
                '使用 Schedule Trigger 節點設置 Cron 表達式',
                '只能手動執行',
                '需要額外購買定時功能',
                '讓電腦保持開機'
            ],
            correctAnswers: [0],
            explanation: 'Schedule Trigger 支持 Cron 表達式（如每天早上9點），可以精確控制工作流的定時執行，N8N 服務會自動觸發。'
        }
    ],

    // AI 內容矩陣
    contentMatrix: [
        {
            id: 'cm1',
            category: 'AI 內容矩陣',
            question: '什麼是「AI 內容矩陣」策略？',
            type: 'single',
            options: [
                '用 AI 批量生成內容，多帳號多平台分發',
                '只做一個帳號',
                '完全手動創作',
                '不發布任何內容'
            ],
            correctAnswers: [0],
            explanation: 'AI 內容矩陣是用 AI 提高內容生產效率，結合多帳號運營策略，在多個平台分發，擴大覆蓋面和變現能力。'
        },
        {
            id: 'cm2',
            category: 'AI 內容矩陣',
            question: '做 AI 內容矩陣需要注意什麼？',
            type: 'multiple',
            options: [
                '內容需要差異化，避免完全重複',
                '遵守各平台規則',
                '注重內容質量而非純粹數量',
                '完全複製貼上效果最好'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '成功的內容矩陣需要差異化內容（避免被判定為搬運）、遵守平台規則（避免封號）、保證質量（才能獲得推薦）。'
        },
        {
            id: 'cm3',
            category: 'AI 內容矩陣',
            question: '如何用 AI 提高內容生產效率？',
            type: 'multiple',
            options: [
                'AI 生成初稿，人工審核修改',
                'AI 批量生成多個版本',
                'AI 輔助選題和標題優化',
                '完全不需要人工參與'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'AI 可以生成初稿、多版本內容、輔助選題等。但人工審核把關是必要的，純 AI 內容容易被識別且質量難保證。'
        },
        {
            id: 'cm4',
            category: 'AI 內容矩陣',
            question: 'AI 生成內容如何避免同質化？',
            type: 'multiple',
            options: [
                '加入個人觀點和經驗',
                '使用不同的風格和角度',
                '結合真實案例',
                '所有內容用同一個 prompt'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '避免同質化：融入個人特色、變換表達風格、用真實案例支撐。重複使用相同 prompt 會產生雷同內容。'
        }
    ],

    // 中國AI工具生態
    chinaAiEcosystem: [
        {
            id: 'cae1',
            category: '中國 AI 生態',
            question: '內地常用的 AI 工作流平台有哪些？',
            type: 'multiple',
            options: [
                '扣子 (Coze)',
                'Dify',
                'FastGPT',
                '只有國外工具'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '扣子是字節跳動的 AI 平台、Dify 和 FastGPT 都是國產開源 AI 應用開發平台，在國內使用更穩定。'
        },
        {
            id: 'cae2',
            category: '中國 AI 生態',
            question: '扣子 (Coze) 的特點是什麼？',
            type: 'multiple',
            options: [
                '免費使用多種 AI 模型',
                '可視化 Bot 搭建',
                '支持發布到多個平台',
                '只能用 GPT-4'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '扣子提供免費的雲雀等模型、可視化搭建 AI Bot、支持發布到飛書/微信/抖音等平台，是入門 AI 應用的好選擇。'
        },
        {
            id: 'cae3',
            category: '中國 AI 生態',
            question: '在香港使用 AI 的優勢是什麼？',
            type: 'multiple',
            options: [
                '可以同時訪問國際和國內 AI 服務',
                '網絡環境相對自由',
                '便於對接兩地客戶',
                '完全沒有優勢'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '香港可訪問 OpenAI、Claude 等國際服務，也能用國內服務；網絡環境開放；地理位置適合服務兩地市場。'
        },
        {
            id: 'cae4',
            category: '中國 AI 生態',
            question: '內地使用 Claude/ChatGPT 的合規方式是什麼？',
            type: 'single',
            options: [
                '通過合規的 API 代理服務或國內適配版本',
                '直接訪問官網',
                '沒有合規方式',
                '使用盜版軟體'
            ],
            correctAnswers: [0],
            explanation: '可以使用合規的 API 中轉服務或選用國內大模型（如通義、文心）。直接訪問需要科學上網，需注意合規風險。'
        }
    ]
};

if (typeof window !== 'undefined') {
    window.modernQuestions_part8 = modernQuestions_part8;
}
