/**
 * AI 知識溫故知新 - 預設題庫
 * 包含入門、進階、專家三個難度的題目
 */

const defaultQuestions = {
    // 入門模式題目
    beginner: [
        {
            id: 'b1',
            category: '機器學習基礎',
            question: '什麼是機器學習 (Machine Learning)?',
            type: 'single',
            options: [
                '讓電腦從數據中學習並做出預測或決策的技術',
                '一種程式語言',
                '電腦硬體的一部分',
                '網頁設計的技術'
            ],
            correctAnswers: [0],
            explanation: '機器學習是讓電腦從數據中自動學習規律，而不需要人類明確編寫每一條規則。\n\n█ 傳統編程 vs 機器學習：\n\n傳統方式（手寫規則）：\n「如果郵件包含『中獎』『免費』且包含連結 → 標記為垃圾郵件」\n• 問題：騙子改用其他詞彙就繞過了\n• 問題：要寫幾萬條規則才能覆蓋所有情況\n\n機器學習方式（從數據學習）：\n「給模型 100 萬封郵件 + 垃圾/非垃圾標籤，讓它自己學會判斷」\n• 優勢：自動發現數百種垃圾郵件特徵\n• 優勢：新型騙子出現時可繼續學習\n\n█ 學習流程詳解：\n\n1. 收集數據：獲取足夠的樣本\n   Netflix 收集了數十億次用戶觀看記錄\n\n2. 訓練模型：讓機器從數據中發現規律\n   模型發現：看完《虔渊》的用戶很可能也喜歡《北京遭遇西雅圖》\n\n3. 應用預測：對新數據做出判斷\n   當新用戶看完一部電影，系統立即推薦相似電影\n\n█ 真實案例深入：\n\nGmail 垃圾郵件過濾：\n每天傳遞數十億封郵件，準確率達 99.9%。系統會分析郵件內容、發送者資訊、HTML 結構、連結特徵等數百個元素，並不斷從用戶的「標記為垃圾郵件」操作中學習。\n\nSpotify 每週探索歌單：\n分析你的應聽習慣（音樂風格、節奏、時段），找到與你品味相似的用戶，推薦他們喜歡但你還沒聽過的歌曲。'
        },
        {
            id: 'b2',
            category: '機器學習基礎',
            question: '以下哪個是監督學習 (Supervised Learning) 的特點?',
            type: 'single',
            options: [
                '訓練數據有標籤 (Labels)',
                '訓練數據沒有標籤',
                '不需要訓練數據',
                '只能處理圖像數據'
            ],
            correctAnswers: [0],
            explanation: '監督學習是最常用的機器學習方法，就像有老師教你一樣：給你題目和正確答案，讓你學會解題方法。\n\n█ 核心理念：\n• 輸入 (X)：已知的特徵（如房屋面積、位置、屋齡）\n• 標籤 (Y)：正確答案（如房價）\n• 目標：學習 X → Y 的對應關係\n\n█ 兩大經典問題類型：\n\n分類問題（輸出離散類別）：\n• 垃圾郵件檢測：輸出「垃圾」或「正常」\n• 病理診斷：輸出「良性」或「惡性」\n• 信用評估：輸出「批準」或「拒絕」\n\n回歸問題（輸出連續數值）：\n• 房價預測：輸出 500 萬\n• 股價預測：輸出 156.32\n• 銷量預測：輸出 1,250 件\n\n█ 完整案例：房價預測\n\n訓練數據（標籤數據）：\n   房屋 A：80㎡、上環區、屋齡 5 年 → 價格：800 萬\n   房屋 B：120㎡、香港仔、屋齡 2 年 → 價格：2,500 萬\n   ...（數千筆記錄）\n\n預測新房屋：\n   房屋 C：100㎡、南山區、屋齡 10 年 → 預測價格？\n   模型根據學到的規律，計算出預測價 1,100 萬\n\n█ 為何需要「標籤」？\n標籤就是正確答案，用來告訴模型它預測得對不對。没有標籤，模型就像沒有答案的練習題，無法學習。'
        },
        {
            id: 'b3',
            category: '機器學習基礎',
            question: '什麼是非監督學習 (Unsupervised Learning)?',
            type: 'single',
            options: [
                '從無標籤數據中發現隱藏模式的學習方法',
                '需要人工持續監督的學習方法',
                '只能用於分類問題',
                '必須使用神經網絡'
            ],
            correctAnswers: [0],
            explanation: '非監督學習像偵探，在沒有答案的情況下從數據中發現隱藏的規律和結構。\n\n█ 為何需要非監督學習？\n• 現實中 80% 以上的數據沒有標籤\n• 標註數據昂貴、耗時\n• 某些問題根本不知道「正確答案」是什麼\n\n█ 三種主要任務：\n\n1. 聚類 (Clustering)：將相似的數據分組\n\n   客戶分群案例：\n   輸入：10萬個客戶的購買記錄\n   輸出：自動分成 5 個群組\n   • 結果 A：高頭高頻 → VIP 客戶\n   • 結果 B：只買折扣品 → 價格敏感客戶\n   • 結果 C：只看不買 → 璥網客戶\n\n2. 異常檢測：找出不尋常的數據點\n\n   信用卡詐騙檢測案例：\n   模型學習你平時的消費模式：\n   • 正常：香港便利店、餐廳、超市\n   • 異常：凌晨 3 點在亞洲買珠寶 → 囉器警報！\n\n3. 降維：將高維數據壓縮到低維\n\n   圖像壓縮案例：\n   一張 1000×1000 的圖片有 100 萬維\n   降維後可能只需要 50 維就能保留主要特徵\n\n█ 與監督學習的區別：\n監督學習：「這是貓」 → 學習識別貓\n非監督學習：「這堆圖片關係是什麼？」 → 自動發現有些是貓、有些是狗'
        },
        {
            id: 'b4',
            category: '深度學習',
            question: '什麼是神經網絡 (Neural Network)?',
            type: 'single',
            options: [
                '受人類大腦結構啟發的計算模型',
                '一種電腦硬體',
                '數據庫管理系統',
                '網絡安全技術'
            ],
            correctAnswers: [0],
            explanation: '神經網絡是模仿人腦學習方式的數學模型，是現代 AI 的核心技術。\n\n█ 為什麼叫「神經網絡」？\n人腦有 860 億個神經元，它們透過突觸相連。神經網絡用「人工神經元」模仿這種結構。\n\n█ 基本結構（分三層）：\n\n輸入層：接收原始數據\n   例：一張 28×28 的手寫數字圖片 → 784 個像素值\n\n隱藏層：處理和提取特徵\n   例：第一層識別線條，第二層識別圆弧，第三層組合成數字\n\n輸出層：產生最終結果\n   例：10 個數字（代表 0-9）的機率，取最高者\n\n█ 工作原理（簡化版）：\n\n1. 前向傳播：數據從輸入層逐層傳遞到輸出層\n   每個神經元收到輸入 → 計算加權和 → 通過激活函數 → 產生輸出\n\n2. 計算損失：比較預測和實際的差距\n   模型說「這是 5」，實際是 8 → 這個差距就是損失\n\n3. 反向傳播：根據損失調整權重\n   從輸出層往回，計算每個神經元對錯誤的「責任」，調整權重\n\n4. 重複疊代：用大量數據反覆放步驟 1-3\n   經過十萬次調整後，模型準確率從 10% 提升到 99%\n\n█ 真實案例：手寫數字識別\n\nMNIST 數據集包含 6 萬張手寫數字圖片，是 AI 的「Hello World」。一個簡單的三層神經網絡就能達到 98% 準確率，比許多人識別別人的字還要準。'
        },
        {
            id: 'b5',
            category: '深度學習',
            question: '深度學習 (Deep Learning) 與傳統機器學習的主要區別是什麼?',
            type: 'single',
            options: [
                '使用多層神經網絡自動提取特徵',
                '運行速度更快',
                '不需要數據',
                '只能在手機上運行'
            ],
            correctAnswers: [0],
            explanation: '深度學習是使用「深層」神經網絡的機器學習，能自動發現數據中的複雜模式。\n\n█ 傳統機器學習的困境：\n\n假設要建立一個「貓狗分類器」：\n\n傳統方法（特徵工程）：\n1. 專家手動設計特徵：耳朵形狀、眼睛大小、髭鬚長度...\n2. 撰寫代碼提取這些特徵\n3. 用特徵訓練分類器\n\n問題：\n• 不同角度的貓特徵完全不同\n• 需要專家知識，耗時漫長\n• 換個任務要重新設計\n\n█ 深度學習如何解決：\n\n深度學習方法（自動特徵）：\n1. 給模型大量貓狗照片 + 標籤\n2. 模型自動學習需要關注的特徵\n3. 不需要人類指定「看哪裡」\n\n█ 為何叫「深度」？\n\n「深度」指的是網絡層數：\n• 2層：淺層網絡\n• 10層：中等深度\n• 152層：ResNet（圖像識別經典模型）\n• GPT-4：數千億參數，極深網絡\n\n█ 層層遞進的特徵：\n\n以人臉識別為例：\n第 1 層：檢測基本邊緣、明暗變化\n第 3 層：識別紋理、弧線\n第 5 層：識別眼睛、鼻子等部件\n第 10 層：理解完整人臉\n\n█ 真實案例：\n\nImageNet 競賽：2012 年，AlexNet（8層深度網絡）將圖像分類錯誤率從 26% 降到25%，震驚學術界。此後深度學習迅速成為 AI 主流。'
        },
        {
            id: 'b6',
            category: '自然語言處理',
            question: 'NLP 代表什麼?',
            type: 'single',
            options: [
                'Natural Language Processing (自然語言處理)',
                'Neural Learning Process',
                'Network Layer Protocol',
                'New Language Program'
            ],
            correctAnswers: [0],
            explanation: 'NLP（Natural Language Processing）是讓機器理解人類語言的技術，ChatGPT 就是 NLP 的經典應用。\n\n█ 為何語言很難？\n\n人類語言充滿歧義和隱含意義：\n\n• 詞義歧義：\n  「蘋果」→ 可以是水果，也可以是公司\n  「銀行在河邊」→ 金融機構還是河岸？\n\n• 句法歧義：\n  「我看見他在公園跟女朋友散步」\n  誰在公園？我還是他？\n\n• 隱含意義：\n  「今天天氣真好」可能是想出門\n  「這個成績很有趣」可能是委婉批評\n\n█ NLP 核心任務：\n\n1. 語言理解：讓機器讀懂文字\n   • 分詞、詞性標注、实體識別\n   • 情感分析、意圖識別\n\n2. 語言生成：讓機器寫出成人話\n   • 機器翻譯、文本摘要\n   • 對話生成（ChatGPT）\n\n█ 真實案例：\n\nGoogle 翻譯：\n2016 年引入神經網絡後，翻譯質量大幅提升。它不再是逐字翻譯，而是理解整句的意思后重新用另一種語言表達。\n\nSpotify 的歌詞分析：\n使用 NLP 分析歌詞止意，判斷歌曲情緒（歡快/憂傷/勵志），結合音樂特徵做更精準的推薦。'
        },
        {
            id: 'b7',
            category: '自然語言處理',
            question: '以下哪個是 NLP 的常見應用?',
            type: 'single',
            options: [
                '機器翻譯',
                '圖像壓縮',
                '視頻編輯',
                '音樂創作'
            ],
            correctAnswers: [0],
            explanation: '機器翻譯是 NLP 的經典應用，讓電腦自動翻譯不同語言的文字。\n\nNLP 主要應用領域：\n• 機器翻譯：Google Translate、DeepL\n• 情感分析：判斷評價正面/負面\n• 聊天機器人：自動客服對話\n• 語音識別：Siri、語音輸入法\n• 文本摘要：自動生成文章摘要\n• 問答系統：搜索引擎、智能助手\n\n實際例子：\n• 電商評價分析：自動分類好評/差評\n• 新聞推薦：根據內容匹配興趣'
        },
        {
            id: 'b8',
            category: '電腦視覺',
            question: '電腦視覺 (Computer Vision) 主要處理什麼類型的數據?',
            type: 'single',
            options: [
                '圖像和視頻數據',
                '文字數據',
                '音頻數據',
                '數字數據'
            ],
            correctAnswers: [0],
            explanation: '電腦視覺是讓機器「看懂」圖像的技術。就像人類用眼睛看物體、用大腦理解內容一樣，電腦視覺讓機器能夠從像素中提取意義。\n\n█ 為什麼難？\n對人類來說「看」很簡單，但對機器來說極其複雜：\n• 一張圖片對機器來說只是一堆數字（像素值 0-255）\n• 同一物體在不同角度、光線下看起來完全不同\n• 要理解「這是一隻貓」需要理解形狀、紋理、上下文\n\n█ 核心任務詳解：\n\n1. 圖像分類：判斷圖片屬於哪個類別\n   • 輸入：一張圖片\n   • 輸出：類別標籤（如「貓」「狗」「汽車」）\n   • 應用：照片自動分類、產品品質檢測\n\n2. 物體檢測：找出圖片中所有物體的位置\n   • 輸入：一張圖片\n   • 輸出：每個物體的邊界框 + 類別\n   • 應用：自動駕駛識別行人和車輛\n\n3. 圖像分割：精確到像素級別的區域劃分\n   • 輸入：一張圖片\n   • 輸出：每個像素屬於哪個物體\n   • 應用：醫療影像中分割腫瘤邊界\n\n█ 技術原理：\n深度學習讓電腦視覺突飛猛進，CNN（卷積神經網絡）能自動學習：\n• 第一層：檢測邊緣、紋理\n• 中間層：識別部件（如眼睛、輪胎）\n• 深層：理解完整物體\n\n█ 真實案例：\nTesla 自動駕駛系統每秒處理 8 個攝像頭的畫面，即時識別路況並做出駕駛決策。它需要在毫秒內識別行人、車輛、交通燈、跭線等數十種物體。'
        },
        {
            id: 'b9',
            category: '電腦視覺',
            question: '以下哪個是電腦視覺的應用?',
            type: 'single',
            options: [
                '人臉識別',
                '語音助手',
                '文字翻譯',
                '音樂推薦'
            ],
            correctAnswers: [0],
            explanation: '人臉識別是電腦視覺最成熟的應用，它能在數千人中瞬間找到特定人物。\n\n█ 工作流程詳解：\n\n1. 人臉檢測：從圖片中找到人臉位置\n   • 即使背景複雜也能定位所有人臉\n\n2. 特徵提取：分析面部特徵\n   • 兩眼間距、鼻子長度、顔骨線條等\n   • 轉換為 128 維向量（數字指紋）\n\n3. 特徵比對：與數據庫比較\n   • 計算與已儲存人臉的相似度\n   • 超過閾值即判定為同一人\n\n█ 技術挑戰：\n• 光線變化：陰影、背光會影響識別\n• 姿態差異：正面、側面圖如何統一\n• 年齡變化：十年前的照片能否匹配\n• 雙胞胎：如何區分極度相似的人\n\n█ 應用場景深入：\n\n手機解鎖：\nApple Face ID 使用 3D 掸描，放射 30,000 個紅外線點建立面部 3D 模型，即使在黑暗中也能識別，防止用照片訸騙。\n\n機場通關：\n深圳機場使用人臉識別自動通關，將乘客人臉與護照照片對比，平均 3 秒完成身份驗證。\n\n支付驗證：\n在中國的支付寶、微信支付中，人臉即可完成支付，每秒處理數千萬筆交易。'
        },
        {
            id: 'b10',
            category: '強化學習',
            question: '強化學習 (Reinforcement Learning) 的核心概念是什麼?',
            type: 'single',
            options: [
                '智能體通過與環境互動獲得獎勵來學習',
                '從帶標籤的數據中學習',
                '從無標籤的數據中發現模式',
                '手動編程規則'
            ],
            correctAnswers: [0],
            explanation: '強化學習通過「試錯」方式學習，像訓練寵物一樣給予獎勵和懲罰。\n\n核心概念：\n• 智能體 (Agent)：學習者\n• 環境 (Environment)：互動對象\n• 狀態 (State)：當前情況\n• 動作 (Action)：可選擇的行動\n• 獎勵 (Reward)：行動的回報\n\n學習過程：\n觀察狀態 → 選擇動作 → 獲得獎勵 → 更新策略\n\n經典例子：\n• AlphaGo：圍棋對弈\n• 遊戲 AI：學玩電子遊戲\n• 機器人控制：學習行走'
        },
        {
            id: 'b11',
            category: '數據處理',
            question: '什麼是訓練數據 (Training Data)?',
            type: 'single',
            options: [
                '用於訓練機器學習模型的數據集',
                '模型的輸出結果',
                '電腦的處理器',
                '軟體的安裝文件'
            ],
            correctAnswers: [0],
            explanation: '訓練數據是機器學習的「教材」，模型從中學習規律。\n\n數據劃分（典型比例）：\n• 訓練集 (70%)：用於學習\n• 驗證集 (15%)：調整超參數\n• 測試集 (15%)：最終評估\n\n數據品質要求：\n• 代表性：涵蓋各種情況\n• 準確性：標籤正確\n• 充足性：數量足夠\n\n例子：\n• 垃圾郵件分類：萬封郵件 + 垃圾/非垃圾標籤\n• 房價預測：千戲房屋特徵 + 成交價'
        },
        {
            id: 'b12',
            category: '數據處理',
            question: '為什麼需要測試數據 (Test Data)?',
            type: 'single',
            options: [
                '評估模型對未見過數據的泛化能力',
                '加速模型訓練',
                '減少數據存儲',
                '改善數據質量'
            ],
            correctAnswers: [0],
            explanation: '測試數據像模擬考試，檢驗模型面對新問題的表現。\n\n為何重要？\n• 避免過擬合：只能解見過的題目\n• 評估泛化能力：面對新數據的表現\n• 提供客觀評估：真實生產環境的參考\n\n使用原則：\n• 絕對不能在訓練過程中使用\n• 只在最終評估時使用一次\n• 與訓練數據保持獨立\n\n例子：\n• 學生備考：練習題 → 模擬考 → 真正考試\n• 模型訓練：訓練集 → 驗證集 → 測試集'
        },
        {
            id: 'b13',
            category: '模型評估',
            question: '什麼是過擬合 (Overfitting)?',
            type: 'single',
            options: [
                '模型在訓練數據上表現很好，但在新數據上表現差',
                '模型訓練時間過長',
                '使用的數據過多',
                '電腦內存不足'
            ],
            correctAnswers: [0],
            explanation: '過擬合就像死記硬背答案，遇到新題目就不會做。\n\n表現特徵：\n• 訓練集準確率很高\n• 測試集準確率很低\n• 兩者差距越大越嚴重\n\n常見原因：\n• 模型過於複雜\n• 訓練數據太少\n• 訓練次數過多\n\n解決方法：\n• 增加訓練數據\n• 正則化技術（Dropout、L1/L2）\n• 簡化模型架構\n• 早停止（Early Stopping）\n\n例子：模型記住所有訓練圖片的細節，但不會識別新圖'
        },
        {
            id: 'b14',
            category: '模型評估',
            question: '準確率 (Accuracy) 是如何計算的?',
            type: 'single',
            options: [
                '正確預測數 / 總預測數',
                '錯誤預測數 / 總預測數',
                '訓練時間 / 測試時間',
                '模型大小 / 數據大小'
            ],
            correctAnswers: [0],
            explanation: '準確率是最直觀的評估指標，計算正確預測的比例。\n\n計算公式：\n準確率 = 正確預測數 / 總數\n\n例子說明：\n• 100 個樣本，預測對 85 個 → 準確率 85%\n\n何時適用：\n• 類別平衡的數據集\n• 每類預測同樣重要\n\n何時不適用：\n• 不平衡數據：如 95% 是負類，全預測負類也有 95% 準確率\n• 需考慮用 Precision、Recall、F1-Score\n\n其他常用指標：\n• 精確率：預測正類中有多少是實際正類\n• 召回率：實際正類中有多少被預測為正類'
        },
        {
            id: 'b15',
            category: '人工智能倫理',
            question: 'AI 偏見 (AI Bias) 通常來源於什麼?',
            type: 'single',
            options: [
                '訓練數據中的偏見',
                'AI 有自己的想法',
                '電腦硬體問題',
                '軟體版本問題'
            ],
            correctAnswers: [0],
            explanation: 'AI 偏見主要來自訓練數據中的偏見，AI 會學習並放大這些偏見。\n\n偏見來源：\n• 數據收集不均衡：某些群體代表不足\n• 歷史偏見：過去決策的不公平\n• 標籤偏見：標註人員的主觀判斷\n\n實際案例：\n• 招聘系統：只學習過去錄取的模式 → 性別偏見\n• 人臉識別：訓練數據缺乏多元化 → 肆色偏見\n• 信貸評估：歷史數據反映社會不平等 → 經濟偏見\n\n解決方法：\n• 多元化數據收集\n• 公平性審計\n• 人工審查機制'
        },
        {
            id: 'b16',
            category: '大型語言模型',
            question: 'GPT 代表什麼?',
            type: 'single',
            options: [
                'Generative Pre-trained Transformer',
                'General Purpose Technology',
                'Global Processing Tool',
                'Graphical Programming Terminal'
            ],
            correctAnswers: [0],
            explanation: 'GPT 是 Generative Pre-trained Transformer 的縮寫，是目前最強大的語言模型架構。\n\n名稱拆解：\n• Generative：生成式，可產生新內容\n• Pre-trained：預訓練，在大量數據上學習\n• Transformer：基於注意力機制的架構\n\n發展歷程：\n• GPT-1：基礎概念驗證\n• GPT-2：語言生成能力突破\n• GPT-3：多任務能力\n• GPT-4：多模態 + 更強推理\n\n應用場景：\n• ChatGPT：智能對話\n• 代碼生成：GitHub Copilot\n• 內容創作：文章、廣告文案'
        },
        {
            id: 'b17',
            category: '大型語言模型',
            question: '什麼是 Prompt（提示詞）?',
            type: 'single',
            options: [
                '給 AI 的輸入指令或問題',
                'AI 的內部程序',
                '電腦的開機密碼',
                '網絡連接地址'
            ],
            correctAnswers: [0],
            explanation: 'Prompt 是給 AI 的指令或問題，好的 Prompt 能大幅提升 AI 回應質量。\n\nPrompt 設計原則：\n• 明確具體：清楚說明任務目標\n• 提供上下文：給足背景信息\n• 設定角色：指定 AI 身份\n• 給例子：展示期望的格式\n\n技巧分類：\n• Zero-shot：直接提問\n• Few-shot：提供幾個例子\n• Chain-of-Thought：引導逐步思考\n\n例子對比：\n• 差：「寫一篇文章」\n• 好：「你是科技記者，寫一篇 500 字的文章介紹 GPT-4，讀者是普通大眾」'
        },
        {
            id: 'b18',
            category: '機器學習類型',
            question: '分類 (Classification) 問題的目標是什麼?',
            type: 'single',
            options: [
                '將數據分配到離散的類別',
                '預測連續數值',
                '發現數據中的聚類',
                '減少數據維度'
            ],
            correctAnswers: [0],
            explanation: '分類問題的目標是將輸入數據分配到預定義的離散類別中，如垃圾郵件檢測（垃圾/非垃圾）或圖像識別（貓/狗）。'
        },
        {
            id: 'b19',
            category: '機器學習類型',
            question: '回歸 (Regression) 問題的目標是什麼?',
            type: 'single',
            options: [
                '預測連續數值',
                '將數據分類',
                '聚類數據',
                '數據壓縮'
            ],
            correctAnswers: [0],
            explanation: '回歸問題的目標是預測連續數值輸出，如房價預測、溫度預測、股票價格預測等。'
        },
        {
            id: 'b20',
            category: '神經網絡基礎',
            question: '什麼是激活函數 (Activation Function)?',
            type: 'single',
            options: [
                '為神經網絡引入非線性的函數',
                '啟動電腦的程序',
                '數據加密的方法',
                '網絡連接的協議'
            ],
            correctAnswers: [0],
            explanation: '激活函數為神經網絡引入非線性，使網絡能夠學習複雜的模式。常見的激活函數包括 ReLU、Sigmoid、Tanh 等。'
        },
        {
            id: 'b21',
            category: '模型訓練',
            question: '什麼是損失函數 (Loss Function)?',
            type: 'single',
            options: [
                '衡量模型預測與實際值差距的函數',
                '計算電腦功耗的函數',
                '測量網絡速度的函數',
                '統計用戶數量的函數'
            ],
            correctAnswers: [0],
            explanation: '損失函數（也稱目標函數或成本函數）用於衡量模型預測值與實際值之間的差距。訓練的目標是最小化這個差距。'
        },
        {
            id: 'b22',
            category: '模型訓練',
            question: '什麼是梯度下降 (Gradient Descent)?',
            type: 'single',
            options: [
                '一種優化算法，用於最小化損失函數',
                '數據下載的速度',
                '電腦溫度下降',
                '網絡延遲減少'
            ],
            correctAnswers: [0],
            explanation: '梯度下降是一種迭代優化算法，通過計算損失函數的梯度，逐步調整模型參數，使損失函數達到最小值。'
        },
        {
            id: 'b23',
            category: '數據增強',
            question: '數據增強 (Data Augmentation) 的目的是什麼?',
            type: 'single',
            options: [
                '通過對現有數據進行變換來增加訓練數據量',
                '刪除不需要的數據',
                '壓縮數據大小',
                '加密敏感數據'
            ],
            correctAnswers: [0],
            explanation: '數據增強通過對現有數據進行各種變換（如旋轉、翻轉、裁剪等）來人工增加訓練數據量，有助於提高模型的泛化能力。'
        },
        {
            id: 'b24',
            category: 'AI 應用',
            question: '以下哪個是 AI 在醫療領域的應用?',
            type: 'single',
            options: [
                '醫學影像診斷',
                '視頻遊戲',
                '社交媒體',
                '音樂播放'
            ],
            correctAnswers: [0],
            explanation: 'AI 在醫療領域有廣泛應用，包括醫學影像診斷、藥物研發、疾病預測、個性化治療方案等。'
        },
        {
            id: 'b25',
            category: 'AI 基礎',
            question: '人工智能 (AI)、機器學習 (ML) 和深度學習 (DL) 的關係是什麼?',
            type: 'single',
            options: [
                'AI 包含 ML，ML 包含 DL',
                'DL 包含 ML，ML 包含 AI',
                '三者完全獨立',
                '三者完全相同'
            ],
            correctAnswers: [0],
            explanation: 'AI 是最廣泛的概念，機器學習是 AI 的一個子集，而深度學習又是機器學習的一個子集。DL ⊂ ML ⊂ AI。'
        }
    ],

    // 進階模式題目
    advanced: [
        {
            id: 'a1',
            category: '神經網絡架構',
            question: 'CNN (卷積神經網絡) 最適合處理什麼類型的數據?',
            type: 'single',
            options: [
                '圖像和具有空間結構的數據',
                '時間序列數據',
                '表格數據',
                '純文本數據'
            ],
            correctAnswers: [0],
            explanation: 'CNN 專門設計用於處理具有網格狀拓撲結構的數據，如圖像（2D 網格）。卷積層能夠有效捕獲局部空間特徵。'
        },
        {
            id: 'a2',
            category: '神經網絡架構',
            question: 'RNN (循環神經網絡) 的主要用途是什麼?',
            type: 'single',
            options: [
                '處理序列數據，如時間序列或文本',
                '圖像分類',
                '靜態數據分析',
                '數據壓縮'
            ],
            correctAnswers: [0],
            explanation: 'RNN 設計用於處理序列數據，它能夠記住之前的信息並用於當前的處理。適用於時間序列預測、自然語言處理等。'
        },
        {
            id: 'a3',
            category: '神經網絡架構',
            question: 'LSTM 解決了 RNN 的什麼問題?',
            type: 'single',
            options: [
                '梯度消失問題，使模型能學習長期依賴',
                '運算速度問題',
                '內存佔用問題',
                '並行計算問題'
            ],
            correctAnswers: [0],
            explanation: 'LSTM（長短期記憶網絡）通過引入門控機制解決了標準 RNN 的梯度消失問題，使模型能夠學習和記住長期依賴關係。'
        },
        {
            id: 'a4',
            category: 'Transformer',
            question: 'Transformer 架構的核心機制是什麼?',
            type: 'single',
            options: [
                '自注意力機制 (Self-Attention)',
                '卷積運算',
                '循環連接',
                '池化操作'
            ],
            correctAnswers: [0],
            explanation: 'Transformer 的核心是自注意力機制，它允許模型在處理序列時直接關注任意位置的信息，無需逐步處理，大大提高了並行性。'
        },
        {
            id: 'a5',
            category: 'Transformer',
            question: '以下哪些是基於 Transformer 架構的模型?',
            type: 'multiple',
            options: [
                'BERT',
                'GPT',
                'AlexNet',
                'T5'
            ],
            correctAnswers: [0, 1, 3],
            explanation: 'BERT、GPT 和 T5 都是基於 Transformer 架構的模型。AlexNet 是經典的卷積神經網絡，不是基於 Transformer。'
        },
        {
            id: 'a6',
            category: '正則化',
            question: 'Dropout 正則化的工作原理是什麼?',
            type: 'single',
            options: [
                '在訓練時隨機將部分神經元輸出設為零',
                '刪除不重要的訓練數據',
                '減少網絡層數',
                '降低學習率'
            ],
            correctAnswers: [0],
            explanation: 'Dropout 在訓練過程中隨機將一定比例的神經元輸出置零，迫使網絡學習更魯棒的特徵，有效防止過擬合。'
        },
        {
            id: 'a7',
            category: '正則化',
            question: 'L1 正則化和 L2 正則化的主要區別是什麼?',
            type: 'single',
            options: [
                'L1 傾向於產生稀疏權重，L2 傾向於產生小但非零的權重',
                'L1 用於分類，L2 用於回歸',
                'L1 更快，L2 更準確',
                '沒有區別'
            ],
            correctAnswers: [0],
            explanation: 'L1 正則化（Lasso）傾向於將部分權重壓縮為零，產生稀疏模型；L2 正則化（Ridge）傾向於將權重縮小但不會變成零。'
        },
        {
            id: 'a8',
            category: '優化器',
            question: 'Adam 優化器結合了哪些優化技術的優點?',
            type: 'multiple',
            options: [
                'Momentum (動量)',
                'RMSprop (自適應學習率)',
                'L1 正則化',
                'Dropout'
            ],
            correctAnswers: [0, 1],
            explanation: 'Adam (Adaptive Moment Estimation) 結合了 Momentum 和 RMSprop 的優點，既使用動量加速收斂，又自適應調整每個參數的學習率。'
        },
        {
            id: 'a9',
            category: '批次標準化',
            question: 'Batch Normalization 的主要優點是什麼?',
            type: 'multiple',
            options: [
                '加速訓練收斂',
                '減少對初始化的敏感性',
                '有一定的正則化效果',
                '減少模型參數數量'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Batch Normalization 通過對每層輸入進行標準化，加速訓練收斂、減少對初始化的依賴，並提供輕微的正則化效果。'
        },
        {
            id: 'a10',
            category: '遷移學習',
            question: '什麼是遷移學習 (Transfer Learning)?',
            type: 'single',
            options: [
                '將在一個任務上學習的知識應用到另一個相關任務',
                '將數據從一台電腦傳輸到另一台',
                '將模型從 CPU 遷移到 GPU',
                '將代碼從一種語言翻譯到另一種'
            ],
            correctAnswers: [0],
            explanation: '遷移學習是將在大規模數據集上預訓練的模型應用到新的相關任務上，通常只需要少量數據就能取得好效果。'
        },
        {
            id: 'a11',
            category: '模型評估',
            question: '在不平衡數據集上，為什麼準確率可能不是好的評估指標?',
            type: 'single',
            options: [
                '模型可能只預測多數類也能獲得高準確率',
                '準確率計算太慢',
                '準確率只適用於回歸問題',
                '準確率需要太多數據'
            ],
            correctAnswers: [0],
            explanation: '在不平衡數據集上，如果 95% 都是負類，模型只需預測所有樣本為負類就能達到 95% 準確率，但這並沒有學到有用的模式。'
        },
        {
            id: 'a12',
            category: '模型評估',
            question: 'F1 Score 是什麼的調和平均?',
            type: 'single',
            options: [
                '精確率 (Precision) 和召回率 (Recall)',
                '準確率和錯誤率',
                '訓練損失和驗證損失',
                '學習率和批次大小'
            ],
            correctAnswers: [0],
            explanation: 'F1 Score = 2 × (Precision × Recall) / (Precision + Recall)，是精確率和召回率的調和平均，在不平衡數據集上更有意義。'
        },
        {
            id: 'a13',
            category: '模型評估',
            question: 'ROC 曲線衡量的是什麼?',
            type: 'single',
            options: [
                '在不同閾值下，真正例率和假正例率的關係',
                '訓練時間和準確率的關係',
                '數據大小和模型性能的關係',
                '學習率和收斂速度的關係'
            ],
            correctAnswers: [0],
            explanation: 'ROC (Receiver Operating Characteristic) 曲線展示了在不同分類閾值下，真正例率 (TPR) 與假正例率 (FPR) 之間的權衡關係。'
        },
        {
            id: 'a14',
            category: '超參數調優',
            question: '以下哪些是常見的超參數?',
            type: 'multiple',
            options: [
                '學習率 (Learning Rate)',
                '批次大小 (Batch Size)',
                '網絡層數',
                '訓練數據'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '超參數是在訓練前需要設定的參數，包括學習率、批次大小、網絡架構等。訓練數據不是超參數。'
        },
        {
            id: 'a15',
            category: '交叉驗證',
            question: 'K-Fold 交叉驗證的目的是什麼?',
            type: 'single',
            options: [
                '更可靠地評估模型性能，減少評估結果的方差',
                '加速模型訓練',
                '減少數據存儲',
                '增加訓練數據'
            ],
            correctAnswers: [0],
            explanation: 'K-Fold 交叉驗證將數據分成 K 份，輪流使用每份作為驗證集，得到 K 個評估結果的平均值，提供更穩定可靠的性能估計。'
        },
        {
            id: 'a16',
            category: '注意力機制',
            question: '在 Transformer 中，Query、Key、Value 的作用是什麼?',
            type: 'single',
            options: [
                'Query 和 Key 計算注意力權重，Value 是被加權的內容',
                'Query 是問題，Key 是答案，Value 是評分',
                '三者是同一個東西的不同名稱',
                'Query 存儲數據，Key 加密數據，Value 解密數據'
            ],
            correctAnswers: [0],
            explanation: '在注意力機制中，Query 和 Key 通過點積計算相似度得到注意力權重，這些權重用於對 Value 進行加權求和。'
        },
        {
            id: 'a17',
            category: '詞嵌入',
            question: 'Word Embedding 相比 One-Hot Encoding 的優勢是什麼?',
            type: 'multiple',
            options: [
                '維度更低，更高效',
                '能捕捉詞語之間的語義關係',
                '相似詞語有相似的向量表示',
                '不需要任何訓練'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Word Embedding 將詞語映射到低維稠密向量，能夠捕捉語義關係，相似詞語的向量距離更近。這需要從數據中學習。'
        },
        {
            id: 'a18',
            category: 'GAN',
            question: 'GAN (生成對抗網絡) 由哪兩個部分組成?',
            type: 'single',
            options: [
                '生成器 (Generator) 和判別器 (Discriminator)',
                '編碼器 (Encoder) 和解碼器 (Decoder)',
                '輸入層和輸出層',
                '前向網絡和反向網絡'
            ],
            correctAnswers: [0],
            explanation: 'GAN 由生成器和判別器組成。生成器試圖生成逼真的假數據，判別器試圖區分真假數據，兩者相互對抗、共同進步。'
        },
        {
            id: 'a19',
            category: '自編碼器',
            question: '自編碼器 (Autoencoder) 的主要用途是什麼?',
            type: 'multiple',
            options: [
                '無監督特徵學習',
                '數據降維',
                '去噪',
                '圖像分類'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '自編碼器通過編碼-解碼過程學習數據的壓縮表示，可用於特徵學習、降維和去噪。它主要用於無監督學習，不是分類模型。'
        },
        {
            id: 'a20',
            category: '集成學習',
            question: 'Random Forest 是什麼類型的集成方法?',
            type: 'single',
            options: [
                'Bagging (自助聚合)',
                'Boosting (提升)',
                'Stacking (堆疊)',
                '以上都不是'
            ],
            correctAnswers: [0],
            explanation: 'Random Forest 是 Bagging 方法的典型應用，它建立多棵決策樹並對結果進行投票或平均，每棵樹使用隨機抽樣的數據和特徵。'
        }
    ],

    // 專家模式題目
    expert: [
        {
            id: 'e1',
            category: '模型優化',
            question: '以下哪些技術可以加速大型模型的訓練?',
            type: 'multiple',
            options: [
                '混合精度訓練 (Mixed Precision Training)',
                '梯度累積 (Gradient Accumulation)',
                '分佈式訓練 (Distributed Training)',
                '增加全連接層數量'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '混合精度訓練使用 FP16 減少內存、加速計算；梯度累積允許有效增大批次大小；分佈式訓練利用多 GPU/節點並行。增加層數會增加而非減少訓練時間。'
        },
        {
            id: 'e2',
            category: 'Transformer 進階',
            question: '為什麼 Transformer 需要位置編碼 (Positional Encoding)?',
            type: 'single',
            options: [
                '自注意力機制本身是位置無關的，需要額外的位置信息',
                '增加模型參數量',
                '防止過擬合',
                '加速計算'
            ],
            correctAnswers: [0],
            explanation: '與 RNN 不同，Transformer 的自注意力機制並行處理所有位置，不含固有的順序信息。位置編碼注入序列的位置信息，使模型理解詞語順序。'
        },
        {
            id: 'e3',
            category: '知識蒸餾',
            question: '知識蒸餾 (Knowledge Distillation) 的核心思想是什麼?',
            type: 'single',
            options: [
                '用大型教師模型的輸出訓練小型學生模型',
                '刪除模型中不重要的參數',
                '量化模型權重',
                '增加訓練數據量'
            ],
            correctAnswers: [0],
            explanation: '知識蒸餾讓小型學生模型學習大型教師模型的輸出分佈（軟標籤），從而將教師的knowledge transfer到更輕量的學生模型中。'
        },
        {
            id: 'e4',
            category: '模型壓縮',
            question: '以下哪些是常見的模型壓縮技術?',
            type: 'multiple',
            options: [
                '剪枝 (Pruning)',
                '量化 (Quantization)',
                '知識蒸餾 (Knowledge Distillation)',
                '數據增強 (Data Augmentation)'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '剪枝移除不重要的權重，量化降低權重精度，知識蒸餾壓縮模型架構。數據增強是增加訓練數據多樣性的技術，不是模型壓縮。'
        },
        {
            id: 'e5',
            category: 'BERT',
            question: 'BERT 的預訓練任務包括哪些?',
            type: 'multiple',
            options: [
                'Masked Language Model (MLM)',
                'Next Sentence Prediction (NSP)',
                '圖像分類',
                '語音識別'
            ],
            correctAnswers: [0, 1],
            explanation: 'BERT 使用兩個預訓練任務：MLM 隨機遮蓋詞語讓模型預測，NSP 判斷兩個句子是否連續。這是純文本任務，不涉及圖像或語音。'
        },
        {
            id: 'e6',
            category: '注意力變體',
            question: 'Multi-Head Attention 相比 Single-Head 的優勢是什麼?',
            type: 'single',
            options: [
                '可以同時關注不同子空間的信息',
                '計算更快',
                '參數更少',
                '不需要 Query、Key、Value'
            ],
            correctAnswers: [0],
            explanation: 'Multi-Head Attention 將注意力分成多個頭，每個頭學習關注不同的表示子空間，捕獲更豐富的模式。參數量會增加而非減少。'
        },
        {
            id: 'e7',
            category: '對比學習',
            question: '對比學習 (Contrastive Learning) 的核心思想是什麼?',
            type: 'single',
            options: [
                '拉近相似樣本、推遠不相似樣本的表示',
                '比較不同模型的性能',
                '對比訓練前後的結果',
                'A/B 測試'
            ],
            correctAnswers: [0],
            explanation: '對比學習通過最大化正樣本對的相似度、最小化負樣本對的相似度來學習有意義的表示，是自監督學習的重要方法。'
        },
        {
            id: 'e8',
            category: 'RL 進階',
            question: '什麼是 Policy Gradient 方法?',
            type: 'single',
            options: [
                '直接優化策略函數以最大化期望獎勵',
                '使用梯度下降訓練分類器',
                '計算損失函數的梯度',
                '優化價值函數'
            ],
            correctAnswers: [0],
            explanation: 'Policy Gradient 方法直接對策略進行參數化並優化，通過計算策略梯度來更新參數以最大化期望累積獎勵，不需要學習價值函數。'
        },
        {
            id: 'e9',
            category: 'RL 進階',
            question: 'Actor-Critic 方法結合了什麼?',
            type: 'single',
            options: [
                'Policy-based 方法和 Value-based 方法',
                '監督學習和非監督學習',
                'CNN 和 RNN',
                '前向傳播和反向傳播'
            ],
            correctAnswers: [0],
            explanation: 'Actor-Critic 結合了策略梯度（Actor 學習策略）和價值函數（Critic 評估狀態價值），Critic 的評估幫助減少 Actor 更新的方差。'
        },
        {
            id: 'e10',
            category: 'NLP 進階',
            question: 'Subword Tokenization (如 BPE) 的優勢是什麼?',
            type: 'multiple',
            options: [
                '有效處理未見過的詞 (OOV)',
                '減少詞彙表大小',
                '保留詞語的形態學信息',
                '完全消除歧義'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'BPE 等 Subword 方法將詞語分解為子詞單元，能處理 OOV、控制詞彙表大小、保留詞根詞綴等形態信息。但不能完全消除語義歧義。'
        },
        {
            id: 'e11',
            category: '因果推理',
            question: '在機器學習中，相關性 (Correlation) 和因果性 (Causation) 的關係是什麼?',
            type: 'single',
            options: [
                '相關不等於因果，需要額外的因果推理方法',
                '相關性就是因果性',
                '因果性就是相關性',
                '兩者完全無關'
            ],
            correctAnswers: [0],
            explanation: '相關性只表明變量之間存在統計關聯，不能證明因果關係。因果推理需要額外的假設或實驗設計，如隨機對照試驗或因果圖模型。'
        },
        {
            id: 'e12',
            category: '可解釋性',
            question: '以下哪些是模型可解釋性方法?',
            type: 'multiple',
            options: [
                'SHAP (Shapley Additive Explanations)',
                'LIME (Local Interpretable Model-agnostic Explanations)',
                'Attention Visualization',
                'Dropout'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'SHAP 和 LIME 是常用的模型無關解釋方法，Attention Visualization 用於解釋注意力模型。Dropout 是正則化技術，不是解釋方法。'
        },
        {
            id: 'e13',
            category: 'LLM',
            question: 'In-Context Learning 的特點是什麼?',
            type: 'single',
            options: [
                '通過在提示中提供示例來引導模型，無需更新權重',
                '需要大量標註數據進行微調',
                '必須重新訓練整個模型',
                '只能用於圖像任務'
            ],
            correctAnswers: [0],
            explanation: 'In-Context Learning 是 LLM 的emergent能力，模型通過提示中的少量示例學習任務模式，不需要梯度更新或微調權重。'
        },
        {
            id: 'e14',
            category: 'LLM',
            question: 'RLHF (Reinforcement Learning from Human Feedback) 的流程包括哪些步驟?',
            type: 'multiple',
            options: [
                '收集人類對模型輸出的偏好排序',
                '訓練獎勵模型',
                '使用 PPO 等算法優化語言模型',
                '刪除所有訓練數據'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'RLHF 包括：收集人類偏好數據、訓練獎勵模型來預測人類偏好、使用 RL 算法（如 PPO）優化語言模型以最大化獎勵。'
        },
        {
            id: 'e15',
            category: 'Diffusion Models',
            question: 'Diffusion Models 的核心思想是什麼?',
            type: 'single',
            options: [
                '學習逐步去噪的過程來生成數據',
                '學習圖像的邊緣特徵',
                '直接生成高分辨率圖像',
                '壓縮圖像數據'
            ],
            correctAnswers: [0],
            explanation: 'Diffusion Models 通過前向過程逐步向數據添加噪聲，然後學習逆向去噪過程。生成時從純噪聲開始，逐步去噪得到真實樣本。'
        },
        {
            id: 'e16',
            category: '模型部署',
            question: 'ONNX 的作用是什麼?',
            type: 'single',
            options: [
                '提供跨框架的模型交換格式',
                '訓練神經網絡',
                '收集訓練數據',
                '標註數據'
            ],
            correctAnswers: [0],
            explanation: 'ONNX (Open Neural Network Exchange) 是一種開放的模型格式，允許在不同深度學習框架之間轉換和部署模型，提高互操作性。'
        },
        {
            id: 'e17',
            category: 'Prompt Engineering',
            question: '以下哪些是有效的 Prompt Engineering 技巧?',
            type: 'multiple',
            options: [
                'Chain-of-Thought (思維鏈)',
                'Few-shot Learning (少樣本學習)',
                '提供清晰的任務描述',
                '使用完全隨機的輸入'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Chain-of-Thought 引導模型逐步推理，Few-shot 提供示例，清晰的描述幫助模型理解任務。隨機輸入無法有效引導模型行為。'
        },
        {
            id: 'e18',
            category: 'RAG',
            question: 'RAG (Retrieval-Augmented Generation) 解決了 LLM 的什麼問題?',
            type: 'multiple',
            options: [
                '知識過時問題',
                '幻覺/編造事實問題',
                '需要私有知識的場景',
                '所有計算資源問題'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'RAG 通過檢索外部知識庫來增強 LLM，解決知識截止日期、幻覺和私有知識訪問問題。但不直接解決計算資源問題。'
        },
        {
            id: 'e19',
            category: '多模態',
            question: 'CLIP 模型的核心思想是什麼?',
            type: 'single',
            options: [
                '對齊圖像和文本的嵌入空間',
                '生成高分辨率圖像',
                '進行語音識別',
                '視頻編輯'
            ],
            correctAnswers: [0],
            explanation: 'CLIP 通過對比學習訓練，將圖像和其對應的文本描述映射到相同的嵌入空間，實現強大的零樣本圖像分類能力。'
        },
        {
            id: 'e20',
            category: 'AI 安全',
            question: '以下哪些是 LLM 面臨的安全挑戰?',
            type: 'multiple',
            options: [
                '提示注入攻擊 (Prompt Injection)',
                '越獄攻擊 (Jailbreaking)',
                '數據洩露風險',
                '硬體故障'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '提示注入讓模型執行非預期指令，越獄繞過安全限制，訓練數據可能洩露。這些是 LLM 特有的安全問題，硬體故障是通用 IT 問題。'
        }
    ]
};

// 導出供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = defaultQuestions;
}

// 整合現代 AI 工具題庫
function mergeModernQuestions() {
    // 等待所有現代題庫加載完成
    if (typeof modernQuestions_part1 === 'undefined' ||
        typeof modernQuestions_part2 === 'undefined' ||
        typeof modernQuestions_part3 === 'undefined' ||
        typeof modernQuestions_part4 === 'undefined' ||
        typeof modernQuestions_part5 === 'undefined' ||
        typeof modernQuestions_part6 === 'undefined' ||
        typeof modernQuestions_part7 === 'undefined' ||
        typeof modernQuestions_part8 === 'undefined') {
        return;
    }

    // 入門模式：添加基礎 AI 工具題目
    const beginnerModern = [
        ...modernQuestions_part1.claudeCodeCLI.slice(0, 5),
        ...modernQuestions_part1.mcp.slice(0, 4),
        ...modernQuestions_part1.skills.slice(0, 4),
        ...modernQuestions_part3.github.slice(0, 5),
        ...modernQuestions_part3.promptEngineering.slice(0, 5),
        ...modernQuestions_part4.perplexity,
        ...modernQuestions_part4.doubao,
        ...modernQuestions_part4.apiUsage.slice(0, 4),
        // Part 6: 基礎設施入門
        ...modernQuestions_part6.vps,
        ...modernQuestions_part6.cliCommands.slice(0, 5),
        ...modernQuestions_part6.githubProject,
        // Part 7: 社交媒體入門
        ...modernQuestions_part7.douyin.slice(0, 3),
        ...modernQuestions_part7.xiaohongshu.slice(0, 3),
        ...modernQuestions_part7.wechat.slice(0, 3),
        ...modernQuestions_part7.aiCustomerService.slice(0, 3),
        // Part 8: AI 基礎工具
        ...modernQuestions_part8.aiTools.slice(0, 4)
    ];

    // 進階模式：添加中級 AI 工具題目
    const advancedModern = [
        ...modernQuestions_part1.claudeCodeCLI.slice(5),
        ...modernQuestions_part1.mcp.slice(4),
        ...modernQuestions_part1.skills.slice(4),
        ...modernQuestions_part2.cursor,
        ...modernQuestions_part2.antigravity,
        ...modernQuestions_part2.trae,
        ...modernQuestions_part3.promptEngineering.slice(5),
        ...modernQuestions_part3.vpn,
        ...modernQuestions_part3.aiArt,
        ...modernQuestions_part4.qianwen,
        ...modernQuestions_part4.openrouter,
        ...modernQuestions_part4.apiUsage.slice(4),
        // Part 6: 基礎設施進階
        ...modernQuestions_part6.vpnTools,
        ...modernQuestions_part6.cliCommands.slice(5),
        ...modernQuestions_part6.docker.slice(0, 5),
        ...modernQuestions_part6.cloudflare,
        // Part 7: 社交媒體進階 + N8N 基礎
        ...modernQuestions_part7.douyin.slice(3),
        ...modernQuestions_part7.xiaohongshu.slice(3),
        ...modernQuestions_part7.wechat.slice(3),
        ...modernQuestions_part7.aiCustomerService.slice(3),
        ...modernQuestions_part7.aiWorkflow,
        ...modernQuestions_part7.n8n,
        // Part 8: AI賽道 + AI工具進階
        ...modernQuestions_part8.aiTracks,
        ...modernQuestions_part8.aiTools.slice(4)
    ];

    // 專家模式：添加高級 AI 工具題目
    const expertModern = [
        ...modernQuestions_part2.kiro,
        ...modernQuestions_part2.eigent,
        ...modernQuestions_part2.opencode,
        ...modernQuestions_part2.jira,
        ...modernQuestions_part4.chineseAI,
        ...modernQuestions_part5.workflow,
        ...modernQuestions_part5.modelSelection,
        ...modernQuestions_part5.projectPractice,
        ...modernQuestions_part5.efficiency,
        ...modernQuestions_part5.troubleshooting,
        ...modernQuestions_part5.futureTrends,
        // Part 6: 高級開發運維
        ...modernQuestions_part6.docker.slice(5),
        ...modernQuestions_part6.lora,
        ...modernQuestions_part6.webHosting,
        // Part 7: AI 變現策略
        ...modernQuestions_part7.aiMonetization,
        // Part 8: AI RPA + N8N 進階 + 中國生態
        ...modernQuestions_part8.aiRpa,
        ...modernQuestions_part8.n8nAdvanced,
        ...modernQuestions_part8.contentMatrix,
        ...modernQuestions_part8.chinaAiEcosystem
    ];

    // 合併到預設題庫
    defaultQuestions.beginner = [...defaultQuestions.beginner, ...beginnerModern];
    defaultQuestions.advanced = [...defaultQuestions.advanced, ...advancedModern];
    defaultQuestions.expert = [...defaultQuestions.expert, ...expertModern];

    console.log(`題庫已更新：入門 ${defaultQuestions.beginner.length} 題，進階 ${defaultQuestions.advanced.length} 題，專家 ${defaultQuestions.expert.length} 題`);
}

// 頁面加載完成後整合題庫
document.addEventListener('DOMContentLoaded', function () {
    // 延遲執行以確保所有腳本都已加載
    setTimeout(mergeModernQuestions, 100);
});

