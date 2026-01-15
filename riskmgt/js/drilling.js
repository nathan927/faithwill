/**
 * 貸後智庫 - Drilling 特訓模組
 * 包含題庫數據及練習邏輯
 */

// ============================================
// 題庫數據
// ============================================

const QuestionBank = {
    questions: [
        // ======== 情境判斷題 ========
        {
            id: 'sce-1',
            type: 'scenario',
            domain: 'fieldVisit',
            difficulty: 3,
            question: '您安排了客戶走訪，但客戶法人代表以「出差」為由已連續推遲3次。客戶經理報告說每次電話聯繫，對方都表示「下週一定配合」。您應該如何處理？',
            options: [
                { id: 'A', text: '繼續等待，尊重客戶的時間安排，再約下次時間' },
                { id: 'B', text: '將此列為預警信號，上報風險管理部門，同時嘗試突擊走訪或與其他管理層聯繫' },
                { id: 'C', text: '直接發函要求客戶配合，否則視為違約' },
                { id: 'D', text: '改為電話訪談，既然見不到面就用電話代替' }
            ],
            answer: 'B',
            explanation: '法人代表連續推遲走訪是**高風險預警信號**。根據貸後管理最佳實踐，這種情況應該：\n\n1. **立即列為預警信號並上報**——三次推遲已超出正常範圍\n2. **嘗試突擊走訪**——不預約直接到現場，觀察真實經營狀態\n3. **聯繫其他管理層**——財務負責人、副總經理等\n4. **核查其他信息**——是否有訴訟、執行、負面輿情等\n\n選項A過於被動；選項C太激進可能激化矛盾；選項D電話無法替代現場觀察。'
        },
        {
            id: 'sce-2',
            type: 'scenario',
            domain: 'fieldVisit',
            difficulty: 3,
            question: '走訪某製造企業時，您發現廠房內只有2條生產線在運轉，而客戶申報時稱有8條生產線。客戶解釋說「現在是淡季，訂單少」。您應該如何判斷？',
            options: [
                { id: 'A', text: '接受客戶解釋，這是正常的產能調節' },
                { id: 'B', text: '要求查看近三個月訂單明細及生產排程，核實是否真的是「淡季效應」' },
                { id: 'C', text: '直接認定客戶虛報產能，啟動預警程序' },
                { id: 'D', text: '不作深究，專注於其他檢查項目' }
            ],
            answer: 'B',
            explanation: '開工率僅25%（2/8）確實是異常信號，但需要進一步核實：\n\n**應該做的核查**：\n• 查看近三個月訂單記錄——是否真的訂單減少\n• 對比歷史同期——去年同期開工率如何\n• 查看生產排程——未來是否有訂單恢復跡象\n• 詢問行業情況——同行是否也面臨類似問題\n\n選項A輕信口頭解釋太草率；選項C未經核實就下結論太武斷；選項D迴避問題不負責任。\n\n**核實後常見結論**：\n✓ 如果有訂單記錄支持——確為淡季，記錄觀察即可\n✗ 如果訂單記錄缺失或矛盾——升級預警等級'
        },
        {
            id: 'sce-3',
            type: 'scenario',
            domain: 'financial',
            difficulty: 4,
            question: '審閱某貿易公司財務報表時，您發現：營收同比增長30%，但應收帳款增長了80%；毛利率連續三年穩定在15%；經營活動現金流淨額為負。這家公司最可能存在什麼問題？',
            options: [
                { id: 'A', text: '業務高速增長期的正常現象，需要墊付資金拓展市場' },
                { id: 'B', text: '可能存在虛增收入或放寬信用政策，收入質量存疑' },
                { id: 'C', text: '毛利率穩定說明業務結構健康，應收帳款增長只是暫時現象' },
                { id: 'D', text: '這是季節性波動的影響，無需特別關注' }
            ],
            answer: 'B',
            explanation: '這組數據呈現出**典型的財務造假紅旗**：\n\n| 指標 | 表現 | 風險解讀 |\n|------|------|----------|\n| 應收帳款增速 | 80% > 營收增速30%的2倍以上 | 收入可能是「賒銷」堆出來的紙面收入 |\n| 毛利率 | 連續三年穩定15% | 違背市場波動常理，可能是人為「調節」結果 |\n| 經營現金流 | 淨額為負 | 收入高但錢收不回來 |\n\n**結論**：三個指標同時異常，強烈暗示：\n• 可能存在虛增收入\n• 或過度放寬信用政策換取「紙面業績」\n• 或涉及融資性貿易'
        },
        {
            id: 'sce-4',
            type: 'scenario',
            domain: 'fundTrack',
            difficulty: 4,
            question: '某客戶獲得500萬元流動資金貸款，用途為「購買原材料」。查看放款後銀行流水，發現資金當天轉至A公司，次日A公司將同等金額轉至B公司，第三天B公司將490萬轉回借款人實控人的個人賬戶。這屬於什麼情況？',
            options: [
                { id: 'A', text: '正常的供應鏈資金流動，原材料採購需要多層分銷商' },
                { id: 'B', text: '典型的資金回流，借款人涉嫌套取銀行資金，應立即上報並考慮提前收貸' },
                { id: 'C', text: '可能是暫時周轉，需要等客戶解釋後再判斷' },
                { id: 'D', text: '只要資金最終用於經營就可以，具體流向不必過於追究' }
            ],
            answer: 'B',
            explanation: '這是**教科書級別的資金回流案例**：\n\n**資金流向圖**：\n```\n銀行 → 借款人 → A公司 → B公司 → 實控人個人賬戶\n         ↑___________________________|（形成閉環）\n```\n\n**問題所在**：\n1. **流轉速度極快**：3天內完成回流\n2. **金額高度一致**：幾乎全額轉移（490/500=98%）\n3. **終點是個人賬戶**：非經營性用途\n4. **用途不實**：聲稱買原材料，實際未見原材料\n\n**這構成**：\n• 違反貸款合同約定用途\n• 涉嫌套取銀行資金\n• 可能觸及騙取貸款罪\n\n**應即時行動**：上報風險部門、凍結賬戶、要求書面說明、考慮提前收貸。'
        },
        {
            id: 'sce-5',
            type: 'scenario',
            domain: 'problemLoan',
            difficulty: 3,
            question: '您收到輿情監控系統預警：某貸款客戶的實際控制人被媒體報導「涉及民間借貸糾紛」。客戶經理聯繫客戶後，客戶表示「只是一點小誤會，已經解決了」。您應該如何處理？',
            options: [
                { id: 'A', text: '客戶已解釋，記錄在案即可，無需進一步行動' },
                { id: 'B', text: '要求客戶提供書面說明及相關證據（如和解協議），同時獨立核查裁判文書網、執行信息' },
                { id: 'C', text: '立即提前收貸，民間借貸糾紛說明資金鏈已斷裂' },
                { id: 'D', text: '暫不處理，等待正式法律文書再說' }
            ],
            answer: 'B',
            explanation: '**民間借貸糾紛是重要預警信號**，但需核實後再定性：\n\n**正確處理流程**：\n1. **要求書面說明**——口頭解釋不足以消除疑慮\n2. **獨立核查**——裁判文書網、中國執行信息公開網、企業信用信息公示系統\n3. **評估影響**——糾紛金額、是否涉及擔保、是否影響主業\n4. **視情況決定**——如屬實但已解決，記錄觀察；如發現其他問題，升級預警\n\n**為什麼不選其他選項**：\n• A：口頭解釋不等於事實，未經核實不能接受\n• C：僅憑媒體報導就收貸太草率，可能引發法律糾紛\n• D：等待正式文書意味著已錯過最佳處置時機\n\n**實控人財務狀況是企業的「先行指標」**——個人出問題，企業往往很快跟著出問題。'
        },

        // ======== 紅旗識別題（多選） ========
        {
            id: 'red-1',
            type: 'redFlag',
            domain: 'tradeFin',
            difficulty: 3,
            question: '以下哪些是「融資性貿易」的典型紅旗信號？（多選）',
            options: [
                { id: 'A', text: '合同約定固定年化收益率12%' },
                { id: 'B', text: '交易對手是終端使用企業' },
                { id: 'C', text: '合同明確「不對貨物質量/數量負責」' },
                { id: 'D', text: '資金在封閉圈內循環流轉' },
                { id: 'E', text: '毛利率隨市場價格波動' },
                { id: 'F', text: '往來函件使用「欠款」「借款」等措辭' }
            ],
            answer: ['A', 'C', 'D', 'F'],
            isMultiple: true,
            explanation: '**融資性貿易的紅旗信號解析**：\n\n✅ **A - 固定年化收益率**：真實貿易的利潤隨市場波動，約定固定收益=借貸性質\n\n❌ **B - 交易對手是終端使用企業**：這恰恰是真實貿易的特徵，不是紅旗\n\n✅ **C - 不對貨物負責**：違背買賣合同基本義務，說明「貨」只是道具\n\n✅ **D - 資金封閉循環**：典型的「空轉」特徵，錢繞一圈回到起點\n\n❌ **E - 毛利率隨市場波動**：這是正常貿易特徵，不是紅旗\n\n✅ **F - 使用「欠款」「借款」措辭**：暴露了交易的真實性質是融資而非買賣'
        },
        {
            id: 'red-2',
            type: 'redFlag',
            domain: 'fieldVisit',
            difficulty: 3,
            question: '走訪客戶時，以下哪些情況屬於「高風險預警信號」需要立即上報？（多選）',
            options: [
                { id: 'A', text: '辦公室張貼了法院的「查封公告」' },
                { id: 'B', text: '前台無人值守，但辦公區有員工正常工作' },
                { id: 'C', text: '發現其他金融機構人員在場追債' },
                { id: 'D', text: '財務室鎖著門，財務人員說「外出報稅」' },
                { id: 'E', text: '廠房內主要設備有搬離跡象（地面有拖痕、螺絲拆卸痕跡）' },
                { id: 'F', text: '員工私下反映近三個月工資均延遲發放' }
            ],
            answer: ['A', 'C', 'E', 'F'],
            isMultiple: true,
            explanation: '**高風險預警信號識別**：\n\n✅ **A - 法院查封公告**：說明已進入司法程序，資產可能被凍結，必須立即上報！\n\n❌ **B - 前台無人**：可能是人員調配問題，單獨不構成高風險\n\n✅ **C - 其他機構追債**：說明多頭借債且已出現償還問題\n\n❌ **D - 財務外出報稅**：正常業務活動，但可預約下次核查時間\n\n✅ **E - 設備搬離跡象**：可能在轉移資產、逃避債務！需立即核實抵押物狀態\n\n✅ **F - 工資連續延遲**：資金鏈緊張的明確信號，員工往往比財報更早反映問題\n\n**記住**：見到A（查封）、C（追債）、E（資產轉移）任何一項，應在24小時內上報。'
        },
        {
            id: 'red-3',
            type: 'redFlag',
            domain: 'financial',
            difficulty: 4,
            question: '審閱財務報表時，以下哪些指標組合最可能反映「虛假收入」問題？（多選）',
            options: [
                { id: 'A', text: '營收增長30%，應收帳款增長60%' },
                { id: 'B', text: '營收增長30%，經營活動現金流增長35%' },
                { id: 'C', text: '毛利率連續5年穩定在18%（波動<1%）' },
                { id: 'D', text: '存貨周轉率從4次/年降至1.5次/年' },
                { id: 'E', text: '銷售費用隨營收同比例增長' },
                { id: 'F', text: '經營現金流淨額<淨利潤的40%' }
            ],
            answer: ['A', 'C', 'D', 'F'],
            isMultiple: true,
            explanation: '**虛假收入的財務指標特徵**：\n\n✅ **A - 應收帳款高於營收增速**：收入做上去了，但錢收不回來=可能是虛增的「紙面收入」\n\n❌ **B - 現金流與營收同步增長**：這是健康的財務表現\n\n✅ **C - 毛利率異常穩定**：真實業務受原材料、競爭、訂單結構影響，毛利率會波動。連續5年不動=人為「調節」\n\n✅ **D - 存貨周轉率暴跌**：存貨堆積可能是虛增存貨資產，或產品滯銷但不願減值\n\n❌ **E - 銷售費用同步增長**：正常現象，增長需要投入\n\n✅ **F - 現金流遠低於利潤**：「利潤是意見，現金是事實」。有利潤無現金=利潤可能是假的\n\n**經驗法則**：單一指標異常可能有解釋，三個以上同時異常要高度警惕。'
        },

        // ======== 案例分析題 ========
        {
            id: 'case-1',
            type: 'case',
            domain: 'tradeFin',
            difficulty: 4,
            question: '【案例背景】\n\n通號物資集團（央企）與永安運輸貿易公司簽訂煤炭買賣合同，單據齊全（合同、發票、貨權轉移單、結算單）。\n\n**關鍵細節**：\n• 框架協議寫明「資金循環制使用」「甲方同意籌集資金5000萬元用於合作項目」\n• 補充協議約定「年投資回報率不低於12%」（600萬÷5000萬）\n• 往來函件反復提及「欠款」「借款」，而非「貨款」「交貨」\n• 國資委2017年通報認定為「以貿易為名，實為出借資金」\n\n**問題**：法院最終認定此交易為「融資性貿易」，買賣合同無效。以下哪項是法院認定的最關鍵證據？',
            options: [
                { id: 'A', text: '單據不齊全，缺少關鍵交易憑證' },
                { id: 'B', text: '合同條款自相矛盾：名為買賣，實約固定收益；名為貨款，實稱借款' },
                { id: 'C', text: '交易金額過大，超出正常業務規模' },
                { id: 'D', text: '交易對手信用評級過低' }
            ],
            answer: 'B',
            explanation: '**法院認定邏輯解析**：\n\n本案的關鍵在於：**表面形式與實質內容的矛盾**\n\n| 表面形式 | 實質內容 |\n|---------|----------|\n| 買賣合同 | 「資金循環制使用」「籌集資金用於合作」 |\n| 市場價格交易 | 「年投資回報率不低於12%」=固定利息 |\n| 「貨款」 | 往來函件稱「欠款」「借款」 |\n| 煤炭貿易 | 合同註明「不對貨物質量/數量負責」 |\n\n**法院判決要點**：\n1. 固定收益率條款違背貿易本質——真實貿易利潤隨市場波動\n2. 「借款」措辭暴露真實意圖——當事人自己都認為是借貸\n3. 不對貨物負責——說明貨物只是「過場道具」\n\n**這個案例告訴我們**：單據齊全≠交易真實。要看合同條款的實質內容，而非表面形式。'
        },
        {
            id: 'case-2',
            type: 'case',
            domain: 'fundTrack',
            difficulty: 4,
            question: '【案例背景】\n\n某製造企業獲得800萬元固定資產貸款，用途為「購買生產設備」。\n\n**放款後檢查發現**：\n• 放款第2天，600萬轉至「XX機械設備公司」\n• 第5天走訪發現，新設備確已到廠並安裝\n• 但設備銘牌顯示購置價格為380萬元\n• 剩餘220萬元去向不明\n• 客戶解釋：「設備安裝調試費、運費、培訓費都包含在內」\n\n**問題**：這種情況應該如何處置？',
            options: [
                { id: 'A', text: '設備確實到位，說明資金用途大致符合，記錄觀察即可' },
                { id: 'B', text: '要求客戶提供220萬元的支付憑證（安裝費發票、運費單據等），無法提供則認定為挪用' },
                { id: 'C', text: '立即認定為違約，啟動提前收貸程序' },
                { id: 'D', text: '220萬差額不算很大，不值得深究影響客戶關係' }
            ],
            answer: 'B',
            explanation: '**處置思路**：既不輕信口頭解釋，也不草率定性，而是**用證據說話**。\n\n**應核查的內容**：\n1. 安裝調試費發票——一般設備安裝費不超過設備價值10-15%\n2. 運輸費單據——大型設備運費有跡可查\n3. 培訓費合同及發票——正規培訓會有協議\n4. 與設備公司確認實際成交價\n\n**可能的結論**：\n\n✓ **情況一**：客戶能提供完整憑證，220萬確為相關費用→記錄在案，符合用途\n\n✗ **情況二**：客戶無法提供憑證，或憑證金額與220萬不符→\n• 認定為部分挪用\n• 要求書面說明資金去向\n• 評估是否構成實質違約\n• 視情況要求提前歸還挪用部分或追加擔保\n\n**關鍵原則**：220萬佔總貸款27.5%，絕非「小錢」。任何資金用途都要有據可查。'
        },

        // ======== 檢查清單題 ========
        {
            id: 'chk-1',
            type: 'checklist',
            domain: 'fieldVisit',
            difficulty: 2,
            question: '根據貸後管理規範，走訪前「必須完成」的4級重要性準備項目包括哪些？（多選）',
            options: [
                { id: 'A', text: '取得客戶最新工商登記資料副本' },
                { id: 'B', text: '準備上次走訪報告以便對比' },
                { id: 'C', text: '列印客戶申貸時的營業地址、廠房地址清單' },
                { id: 'D', text: '攜帶能拍攝帶時間戳照片的設備' },
                { id: 'E', text: '與客戶預約並確認關鍵管理層在場' },
                { id: 'F', text: '準備客戶最近三期財務報表對比表' }
            ],
            answer: ['A', 'C', 'D', 'E'],
            isMultiple: true,
            explanation: '**走訪前準備項目的重要性等級**：\n\n| 項目 | 重要性 | 說明 |\n|------|:------:|------|\n| ✅ 取得最新工商登記資料 | **4級** | 核對基本信息變更 |\n| ❌ 準備上次走訪報告 | 3級 | 重要但非必須 |\n| ✅ 列印地址清單 | **4級** | 確保走訪地點正確 |\n| ✅ 帶時間戳拍照設備 | **4級** | 證據留存必備 |\n| ✅ 確認管理層在場 | **4級** | 否則走訪價值大減 |\n| ❌ 準備財務報表對比表 | 3級 | 重要但非必須 |\n\n**4級項目的特點**：缺少任何一項，走訪就無法有效進行或證據無效。\n**3級項目的特點**：有助於提高走訪質量，但缺少不影響基本功能。'
        },
        {
            id: 'chk-2',
            type: 'checklist',
            domain: 'fieldVisit',
            difficulty: 2,
            question: '走訪某製造企業廠房時，以下哪些是「4級重要性」的必查項目？（多選）',
            options: [
                { id: 'A', text: '廠房地址與產權證明一致性' },
                { id: 'B', text: '生產車間環境整潔度（5S管理）' },
                { id: 'C', text: '生產線數量及開工率' },
                { id: 'D', text: '近期出貨頻率' },
                { id: 'E', text: '廠房佔地及建築面積核對' },
                { id: 'F', text: '質量檢測設備配備情況' }
            ],
            answer: ['A', 'C', 'E'],
            isMultiple: true,
            explanation: '**廠房走訪項目重要性分級**：\n\n| 項目 | 重要性 | 理由 |\n|------|:------:|------|\n| ✅ 地址與產權一致性 | **4級** | 確認資產真實性及所有權 |\n| ❌ 5S管理/整潔度 | 2級 | 管理水平參考，非核心 |\n| ✅ 生產線及開工率 | **4級** | 直接反映經營能力 |\n| ❌ 出貨頻率 | 2級 | 輔助判斷，非必查 |\n| ✅ 面積核對 | **4級** | 防止虛報規模 |\n| ❌ 質檢設備 | 2級 | 質量管理參考 |\n\n**4級項目核心邏輯**：\n• 涉及資產真實性（地址、面積）\n• 涉及經營真實性（開工率）\n• 涉及還款能力判斷（產能利用率）'
        },
        {
            id: 'chk-3',
            type: 'checklist',
            domain: 'fieldVisit',
            difficulty: 3,
            question: '走訪結束時，以下哪些證據必須留存並屬於「4級重要性」？（多選）',
            options: [
                { id: 'A', text: '公司門牌及辦公環境照片（帶時間戳）' },
                { id: 'B', text: '管理層訪談照片（需徵得同意）' },
                { id: 'C', text: '抵押物現狀照片（多角度詳細拍攝）' },
                { id: 'D', text: '訪談記錄簽字確認' },
                { id: 'E', text: '庫存物資照片' },
                { id: 'F', text: '相關證照照片（營業執照、產權證等）' }
            ],
            answer: ['A', 'C', 'D', 'F'],
            isMultiple: true,
            explanation: '**證據留存的4級重要性項目**：\n\n| 證據類型 | 重要性 | 理由 |\n|---------|:------:|------|\n| ✅ 門牌及環境照（帶時間戳） | **4級** | 證明確實到訪此地此時 |\n| ❌ 管理層訪談照 | 3級 | 需同意，非必須 |\n| ✅ 抵押物照片 | **4級** | 證明抵押物狀態 |\n| ✅ 訪談記錄簽字 | **4級** | 法律效力的關鍵 |\n| ❌ 庫存照片 | 3級 | 輔助證據 |\n| ✅ 證照照片 | **4級** | 確認資質有效性 |\n\n**4級證據的特點**：\n• 具有法律效力或可作為訴訟證據\n• 能證明走訪的真實性和客觀性\n• 涉及抵押物/擔保物的狀態確認'
        },

        // ======== 更多情境題 ========
        {
            id: 'sce-6',
            type: 'scenario',
            domain: 'riskAssess',
            difficulty: 3,
            question: '通過天眼查/企查查調查某貸款客戶時，您發現客戶實際控制人名下有8家公司，其中3家已被列入「經營異常名錄」，2家涉及法院執行案件。客戶解釋這些都是「以前的老公司，早就不管了」。您應該如何處理？',
            options: [
                { id: 'A', text: '這些是其他公司的問題，與本筆貸款客戶無關' },
                { id: 'B', text: '將實控人的整體風險狀況納入評估，視為「關聯風險」，提高監控等級' },
                { id: 'C', text: '要求實控人立即處理所有問題公司，否則不予續貸' },
                { id: 'D', text: '記錄在案，待問題波及本客戶時再處理' }
            ],
            answer: 'B',
            explanation: '**實控人風險傳導邏輯**：\n\n實控人名下企業的問題往往會相互傳導：\n• 經營異常公司可能佔用資金\n• 執行案件可能凍結關聯賬戶\n• 實控人精力分散，難以專注經營\n• 個人信用受損影響融資能力\n\n**正確處理方式**：\n1. **調查關聯情況**——這些公司與借款人是否有資金往來\n2. **評估傳染風險**——執行案件金額、凍結範圍\n3. **納入關聯風險監控**——提高走訪頻率、關注資金流向\n4. **在貸後報告中披露**——如實反映實控人整體風險狀況\n\n**為什麼不選其他**：\n• A：忽視風險傳導，不負責任\n• C：過於激進，可能沒有合同依據\n• D：被動等待，錯失預警時機'
        },
        {
            id: 'sce-7',
            type: 'scenario',
            domain: 'problemLoan',
            difficulty: 4,
            question: '某客戶貸款即將到期，客戶申請「借新還舊」（用新貸款歸還舊貸款本金）。風險評估發現：客戶近一年經營下滑30%，但仍有正常現金流；抵押物價值充足；客戶配合度良好。您的建議是？',
            options: [
                { id: 'A', text: '拒絕借新還舊，要求客戶自籌資金償還，否則啟動訴訟' },
                { id: 'B', text: '同意全額借新還舊，維護客戶關係' },
                { id: 'C', text: '可考慮借新還舊，但應縮減敞口、縮短期限、加強貸後監控' },
                { id: 'D', text: '建議客戶去其他銀行貸款還清本行欠款' }
            ],
            answer: 'C',
            explanation: '**借新還舊的風險平衡藝術**：\n\n**本案特點分析**：\n| 正面因素 | 負面因素 |\n|---------|----------|\n| 仍有正常現金流 | 經營下滑30% |\n| 抵押物充足 | 未來不確定性增加 |\n| 客戶配合良好 | 行業可能持續下行 |\n\n**建議方案**：\n1. **縮減敞口**——如原貸1000萬，新貸800萬，客戶自籌200萬\n2. **縮短期限**——如原3年期改為1年期，便於調整\n3. **加強監控**——提高走訪頻率（每季度→每月）\n4. **追加條件**——如要求追加保證人、經營數據月報等\n\n**為什麼不選其他**：\n• A：抵押物充足、仍有現金流，強硬拒絕可能激化矛盾\n• B：不考慮經營下滑、全額續貸是迴避風險\n• D：「踢皮球」不解決問題，且可能引發客戶資金鏈斷裂'
        },
        {
            id: 'sce-8',
            type: 'scenario',
            domain: 'financial',
            difficulty: 3,
            question: '審核某客戶提交的增值稅發票時，您發現近三個月開票金額與銀行流水入賬金額存在較大差異：開票2000萬，入賬僅800萬。客戶解釋「很多客戶是賬期付款，錢還在路上」。如何核實這個解釋？',
            options: [
                { id: 'A', text: '客戶解釋合理，商業慣例確實存在賬期' },
                { id: 'B', text: '要求提供應收賬款明細表及賬齡分析，核對大額應收款的付款進度' },
                { id: 'C', text: '這差異太大，直接認定收入虛增' },
                { id: 'D', text: '這屬於財務部門職責，非貸後人員需要關注的範圍' }
            ],
            answer: 'B',
            explanation: '**開票與入賬差異的核實方法**：\n\n差異1200萬（開票2000萬 - 入賬800萬），差異率高達60%，確實需要核實。\n\n**核實步驟**：\n1. **要求應收賬款明細表**——對應哪些客戶、金額多少\n2. **賬齡分析**——這1200萬分別欠了多久\n3. **抽查大額應收款**——前5大欠款客戶的付款歷史\n4. **詢問回款計劃**——預計何時能收回、有無催收記錄\n\n**判斷標準**：\n✓ **合理情況**：應收款客戶信譽良好、有明確付款計劃、歷史回款正常\n✗ **危險信號**：應收款集中於少數客戶、賬齡超90天比例高、催收記錄空白\n\n**貸後人員必須關注**：收入質量是還款能力的核心。開票高但收不回來=紙上富貴。'
        }
    ],

    // ============================================
    // 新增：基於MD文件知識精華的高質量題目
    // ============================================
    extendedQuestions: [
        // ======== 財報審查情境題 ========
        {
            id: 'fin-sce-1',
            type: 'scenario',
            domain: 'financial',
            difficulty: 4,
            question: '審閱某製造業客戶財報時，發現其毛利率連續5年穩定在18%（波動<1%），而同行業平均毛利率在14%-22%之間波動。這說明什麼？',
            options: [
                { id: 'A', text: '經營管理優秀，成本控制穩定' },
                { id: 'B', text: '可能存在人為調節財務數據，需深入核查' },
                { id: 'C', text: '市場定價能力強，議價能力穩定' },
                { id: 'D', text: '與行業關聯度低，屬於正常現象' }
            ],
            answer: 'B',
            explanation: '**毛利率異常穩定是財務造假紅旗**：\\n\\n真實業務受多種因素影響必然波動：\\n• 原材料價格波動\\n• 產品結構變化\\n• 市場競爭加劇\\n• 訂單淡旺季差異\\n\\n**連續5年波動<1%違背商業常理**，可能是：\\n• 人為「調節」毛利率\\n• 通過關聯交易平滑利潤\\n• 融資性貿易的「固定收益」特徵\\n\\n**應進一步核查**：\\n1. 前五大客戶/供應商變化\\n2. 產品結構是否真的單一\\n3. 與同行業對比分析'
        },
        {
            id: 'fin-sce-2',
            type: 'scenario',
            domain: 'financial',
            difficulty: 4,
            question: '某貿易公司預付帳款佔總資產比例從5%飆升至22%。客戶解釋「上游供應商要求先款後貨」。您應該如何評估？',
            options: [
                { id: 'A', text: '供應商議價能力強是常見現象，接受解釋' },
                { id: 'B', text: '預付比例異常偏高，需核查預付對象是否為關聯方、有無真實採購記錄' },
                { id: 'C', text: '這說明客戶信譽下降，供應商不願賒銷' },
                { id: 'D', text: '預付款增加有利於鎖定價格，是經營策略' }
            ],
            answer: 'B',
            explanation: '**預付帳款>15%是紅旗指標**：\\n\\n| 正常情況 | 異常情況 |\\n|---------|----------|\\n| 預付比例<10% | 預付比例>15% |\\n| 穩定或緩慢增長 | 突然飆升 |\\n| 對象為知名供應商 | 對象為新設或小型公司 |\\n\\n**22%的預付比例需重點核查**：\\n1. 預付對象工商信息（是否關聯方）\\n2. 採購合同及對應的到貨記錄\\n3. 預付款賬齡及回收情況\\n4. 是否存在為上下游提供融資的情況\\n\\n**預付款往往是資金轉移的通道**。'
        },
        {
            id: 'fin-sce-3',
            type: 'scenario',
            domain: 'financial',
            difficulty: 3,
            question: '某客戶聲稱月均營收5000萬元，但您查看其主要收款賬戶銀行流水，發現月均入賬僅800萬元。客戶解釋「大部分款項走其他銀行賬戶」。如何處理？',
            options: [
                { id: 'A', text: '要求提供所有銀行賬戶流水，匯總核對總入賬金額' },
                { id: 'B', text: '接受解釋，企業多開銀行賬戶很常見' },
                { id: 'C', text: '直接認定營收造假' },
                { id: 'D', text: '這是財務部門的事，貸後不需要關注' }
            ],
            answer: 'A',
            explanation: '**銀行流水是核實營收真實性的關鍵**：\\n\\n當主賬戶入賬與聲稱營收存在巨大差異時：\\n\\n1. **要求提供所有銀行賬戶清單**\\n2. **調取全部賬戶流水**（至少近6個月）\\n3. **計算總入賬金額**，與報表營收對比\\n4. **分析主要收款來源**，是否與報表客戶一致\\n\\n**可能的結論**：\\n✓ 全部賬戶匯總後金額匹配 → 解釋合理\\n✗ 全部賬戶匯總後仍差距巨大 → 收入可能虛增\\n\\n**貸後人員必須關注資金流與業務流的匹配性**。'
        },
        {
            id: 'fin-sce-4',
            type: 'scenario',
            domain: 'financial',
            difficulty: 4,
            question: '分析某客戶財報發現：存貨周轉率從每年4次驟降至1.2次，同時應收帳款周轉率也從8次降至3次，但營收卻增長了25%。這組數據最可能說明什麼？',
            options: [
                { id: 'A', text: '業務快速擴張的正常現象' },
                { id: 'B', text: '存貨和應收同時惡化配合營收增長，可能存在「做數」嫌疑' },
                { id: 'C', text: '行業整體下行導致回款變慢' },
                { id: 'D', text: '產品結構調整導致周轉變慢' }
            ],
            answer: 'B',
            explanation: '**三個指標同時異常是重大警示**：\\n\\n| 指標 | 變化 | 風險解讀 |\\n|------|------|----------|\\n| 存貨周轉率 | 4→1.2次 | 巨量存貨堆積 |\\n| 應收周轉率 | 8→3次 | 收款能力驟降 |\\n| 營收 | 增長25% | 紙面增長 |\\n\\n**邏輯矛盾**：\\n• 真正的業務增長，周轉率應保持或提升\\n• 營收增長但錢收不回來、貨賣不動 = 虛假繁榮\\n\\n**可能的造假手法**：\\n• 虛增營收掛在應收帳款\\n• 虛增存貨虛增資產\\n• 通過關聯交易虛構業務\\n\\n**這組數據需要重點核查銷售真實性**。'
        },
        {
            id: 'fin-sce-5',
            type: 'scenario',
            domain: 'financial',
            difficulty: 4,
            question: '某客戶經營現金流淨額連續三年大幅低於淨利潤（比例分別為35%、28%、22%），但每年都能按時償還貸款本息。這種情況應如何解讀？',
            options: [
                { id: 'A', text: '能按時還款說明經營正常，現金流比例低只是會計處理問題' },
                { id: 'B', text: '可能依靠融資性現金流（借新還舊）維持，需警惕資金鏈斷裂風險' },
                { id: 'C', text: '利潤都用於再投資，是快速發展期的正常現象' },
                { id: 'D', text: '比例逐年下降但絕對值可能是增長的' }
            ],
            answer: 'B',
            explanation: '**「利潤是意見，現金是事實」**\\n\\n經營現金流/淨利潤 連續三年下降至22%，說明：\\n• 賬面有利潤但實際沒有對應的現金流入\\n• 利潤可能虛增，或收入質量極差\\n\\n**能按時還款的可能解釋**：\\n1. **借新還舊**——用新貸款還舊貸款\\n2. **民間借貸**——以更高成本融資維持\\n3. **變賣資產**——不可持續的現金來源\\n\\n**這種模式的風險**：\\n一旦無法獲得新融資，資金鏈立即斷裂\\n\\n**應核查**：融資性現金流、總負債變化、其他銀行授信情況。'
        },

        // ======== 貿易融資紅旗題 ========
        {
            id: 'trade-red-1',
            type: 'redFlag',
            domain: 'tradeFin',
            difficulty: 4,
            question: '審查貿易融資業務時，以下哪些是「資金空轉」的典型特徵？（多選）',
            options: [
                { id: 'A', text: '資金收款後<3天即全額轉出' },
                { id: 'B', text: '轉入方是有實際業務往來的獨立供應商' },
                { id: 'C', text: '資金在3-5個賬戶間快速流轉後回到實控人賬戶' },
                { id: 'D', text: '每筆交易金額高度一致（如都是整百萬）' },
                { id: 'E', text: '交易對手的銀行賬戶有正常經營收支pattern' },
                { id: 'F', text: '轉出對象查無實際經營場所' }
            ],
            answer: ['A', 'C', 'D', 'F'],
            isMultiple: true,
            explanation: '**資金空轉的識別要點**：\\n\\n✅ **A - 資金快速轉出**：正常經營有資金沉澱，<3天全額轉出極不正常\\n\\n❌ **B - 有實際業務往來**：這是正常貿易特徵\\n\\n✅ **C - 資金回流**：形成閉環是空轉的核心特徵\\n\\n✅ **D - 金額高度一致**：真實貿易金額應有自然波動，整百萬太刻意\\n\\n❌ **E - 有正常經營pattern**：這說明對方是正常企業\\n\\n✅ **F - 查無經營場所**：說明對方可能是「過橋公司」\\n\\n**畫資金流向圖**是識別空轉的最有效方法。'
        },
        {
            id: 'trade-red-2',
            type: 'redFlag',
            domain: 'tradeFin',
            difficulty: 4,
            question: '以下哪些合同條款是「融資性貿易」的紅旗信號？（多選）',
            options: [
                { id: 'A', text: '約定「年投資回報率不低於12%」' },
                { id: 'B', text: '約定貨物品質符合國家標準' },
                { id: 'C', text: '約定「乙方不對貨物數量及質量負責」' },
                { id: 'D', text: '約定「資金循環制使用」' },
                { id: 'E', text: '約定分期付款及質保金條款' },
                { id: 'F', text: '往來函件使用「借款」「欠款」而非「貨款」' }
            ],
            answer: ['A', 'C', 'D', 'F'],
            isMultiple: true,
            explanation: '**合同紅旗條款識別**：\\n\\n✅ **A - 固定回報率**：買賣合同約定固定收益=借貸性質\\n\\n❌ **B - 品質標準**：正常買賣合同條款\\n\\n✅ **C - 不對貨物負責**：違背買賣合同基本義務，說明「貨」只是道具\\n\\n✅ **D - 資金循環制**：直接暴露融資安排本質\\n\\n❌ **E - 分期付款/質保金**：正常商業條款\\n\\n✅ **F - 借款/欠款措辭**：當事人自己都認為是借貸關係\\n\\n**記住**：看合同條款的「實質」，不看「表面形式」。'
        },
        {
            id: 'trade-red-3',
            type: 'redFlag',
            domain: 'tradeFin',
            difficulty: 3,
            question: '核查貿易真實性時，以下哪些費用與貿易規模不匹配的情況需要警惕？（多選）',
            options: [
                { id: 'A', text: '年營收10億元但運輸費僅20萬元' },
                { id: 'B', text: '運輸費佔營收比例與同行業基本一致' },
                { id: 'C', text: '聲稱有大量實體貨物流轉但倉儲費為零' },
                { id: 'D', text: '銷售人員數量隨營收增長同步增加' },
                { id: 'E', text: '營收暴增但銷售費用反而下降' },
                { id: 'F', text: '出口業務佔比大但無海運/報關費用' }
            ],
            answer: ['A', 'C', 'E', 'F'],
            isMultiple: true,
            explanation: '**費用匹配度分析是識別虛假貿易的利器**：\\n\\n✅ **A - 運輸費與營收嚴重不匹配**：10億營收只有20萬運輸費 = 0.002%，極不正常\\n\\n❌ **B - 與同行一致**：正常情況\\n\\n✅ **C - 倉儲費為零**：有大量貨物流轉但不需要倉儲？不可能\\n\\n❌ **D - 銷售人員同步增長**：正常業務擴張現象\\n\\n✅ **E - 營收增銷售費降**：誰在「幫忙賣貨」？邏輯不通\\n\\n✅ **F - 出口但無海運/報關費**：除非不是真出口\\n\\n**真實貿易一定有對應的物流成本**。'
        },
        {
            id: 'trade-red-4',
            type: 'redFlag',
            domain: 'tradeFin',
            difficulty: 4,
            question: '以下哪些交易結構特徵暗示「虛假貿易」可能性？（多選）',
            options: [
                { id: 'A', text: '交易形成A→B→C→A的閉環' },
                { id: 'B', text: '中間商B提供加工、配送等增值服務' },
                { id: 'C', text: '上游採購價高於下游銷售價（高買低賣）' },
                { id: 'D', text: '供應商目錄與客戶名單出現相同企業' },
                { id: 'E', text: '交易對手是實際使用物資的生產型終端企業' },
                { id: 'F', text: '人為增加中間環節，中間商無任何增值服務' }
            ],
            answer: ['A', 'C', 'D', 'F'],
            isMultiple: true,
            explanation: '**虛假交易結構識別**：\\n\\n✅ **A - 閉環交易**：貨物/資金繞一圈回到起點 = 純空轉\\n\\n❌ **B - 有增值服務**：中間商存在有合理商業理由\\n\\n✅ **C - 高買低賣**：違背商業常識，除非有隱藏的「利息」補償\\n\\n✅ **D - 供應商=客戶**：向同一家既買又賣 = 循環交易\\n\\n❌ **E - 交易對手是終端**：這是真實貿易的特徵\\n\\n✅ **F - 無增值的中間商**：問自己「這個中間商存在的價值是什麼？」\\n\\n**真實貿易是線性流動，虛假貿易是環形流動**。'
        },

        // ======== 案例分析題 ========
        {
            id: 'case-taihou-1',
            type: 'case',
            domain: 'tradeFin',
            difficulty: 5,
            question: '【貸後審查案例】\\n\\n某貿易公司申請5000萬授信，您採用「四線並行」審查法發現：\\n\\n帳務線：應收帳款增速60%>營收增速25%；毛利率連續三年穩定在15%\\n合同線：主要合同與前五大客戶的採購合同同日簽訂，價差僅3%\\n物流線：年營收8億但運輸費僅50萬，無自有倉儲\\n資金線：主賬戶收款後平均1.5天即全額轉出\\n\\n基於以上信息，最合理的判斷是？',
            options: [
                { id: 'A', text: '四條線都有異常但尚無實錘，建議降低授信額度至2000萬' },
                { id: 'B', text: '四條線同時亮紅燈，高度疑似融資性貿易，建議拒絕授信並上報' },
                { id: 'C', text: '貿易公司確實周轉快、利潤薄，這些指標屬於行業特性' },
                { id: 'D', text: '需要更多信息才能判斷，建議派人實地走訪後再決定' }
            ],
            answer: 'B',
            explanation: '**四線並行審查結論**：\\n\\n| 審查線 | 發現 | 判定 |\\n|--------|------|------|\\n| 帳務線 | 應收增速遠超營收+毛利率異常穩定 | 🚩 紅旗 |\\n| 合同線 | 同日簽訂+價差僅3% | 🚩 紅旗（過橋安排） |\\n| 物流線 | 8億營收僅50萬運輸費 | 🚩 紅旗（無實貨） |\\n| 資金線 | 1.5天全額轉出 | 🚩 紅旗（資金空轉） |\\n\\n**四條線同時異常 = 融資性貿易的典型特徵**\\n\\n這不是「需要更多信息」的階段，而是應該：\\n1. 立即上報風險管理部門\\n2. 拒絕授信申請\\n3. 如已有存量授信，評估是否提前收回\\n\\n**單靠降低額度無法防範此類風險**。'
        },
        {
            id: 'case-taihou-2',
            type: 'case',
            domain: 'tradeFin',
            difficulty: 5,
            question: '【法院判例學習】\\n\\n根據「通號vs永安」融資性貿易案，法院認定買賣合同無效的關鍵在於？\\n\\n**案情簡述**：\\n央企通號與永安公司簽訂煤炭買賣合同，單據齊全（合同、發票、貨權轉移單、結算單）。但框架協議明確記載「資金循環制使用」「籌集資金5000萬用於合作項目」，補充協議約定「年投資回報率不低於12%」。',
            options: [
                { id: 'A', text: '單據不完整，缺少入庫出庫記錄' },
                { id: 'B', text: '合同約定固定回報率+資金循環使用措辭，暴露名為買賣實為借貸' },
                { id: 'C', text: '交易金額超出正常業務規模' },
                { id: 'D', text: '雙方沒有真正交付過煤炭' }
            ],
            answer: 'B',
            explanation: '**法院認定邏輯**：\\n\\n本案的關鍵證據是**合同條款自相矛盾**：\\n\\n| 表面形式 | 實質內容 |\\n|---------|----------|\\n| 煤炭買賣合同 | 「資金循環制使用」「籌集資金用於合作」 |\\n| 市場價格交易 | 「年投資回報率不低於12%」= 固定利息 |\\n| 貨款往來 | 往來函件稱「欠款」「借款」 |\\n\\n**法院判決要點**：\\n1. 固定收益率條款 = 借貸屬性\\n2. 「資金循環制」= 融資安排\\n3. 當事人自己使用借款措辭 = 真實意圖暴露\\n\\n**單據齊全 ≠ 交易真實**——這是本案最重要的教訓。\\n\\n**看合同條款的「實質」而非「形式」**。'
        },
        {
            id: 'case-fund-1',
            type: 'case',
            domain: 'fundTrack',
            difficulty: 4,
            question: '【資金追蹤案例】\\n\\n貿易公司獲得3000萬貿易融資，聲稱用於採購「電子元器件」。放款後銀行流水顯示：\\n\\n• D+0：3000萬轉至「創達科技」\\n• D+1：創達科技轉2950萬至「盛輝電子」\\n• D+2：盛輝電子轉2900萬至「恒信投資」\\n• D+3：恒信投資轉2850萬至借款人實控人張某個人賬戶\\n\\n這屬於什麼情況？應如何處置？',
            options: [
                { id: 'A', text: '正常的供應鏈多層分銷，每層各取少量利潤' },
                { id: 'B', text: '典型資金回流，3天形成閉環，必須立即上報並考慮提前收貸' },
                { id: 'C', text: '需確認創達科技、盛輝電子是否真有供貨，再做判斷' },
                { id: 'D', text: '最終進入實控人個人賬戶可能是暫時周轉，等客戶解釋' }
            ],
            answer: 'B',
            explanation: '**教科書級別的資金回流**：\\n\\n```\\n銀行 → 借款人 → 創達科技 → 盛輝電子 → 恒信投資 → 實控人個人\\n         ↑_______________________________________|（3天閉環）\\n```\\n\\n**問題所在**：\\n1. **速度極快**：3天完成回流\\n2. **金額高度一致**：每環節僅扣減50萬（1.7%），接近全額轉移\\n3. **終點是個人賬戶**：不是經營性用途\\n4. **貿易融資未見貿易**：「電子元器件」在哪裡？\\n\\n**這構成**：\\n• 違反貸款合同約定用途\\n• 涉嫌套取銀行資金\\n\\n**必須立即**：上報風險部門、要求書面說明、考慮提前收貸。\\n\\n**不要等客戶解釋**，事實已經很清楚。'
        },

        // ======== 走訪檢查清單題 ========
        {
            id: 'chk-visit-1',
            type: 'checklist',
            domain: 'fieldVisit',
            difficulty: 3,
            question: '走訪客戶廠房時，以下哪些是「資產核實」的4級必做項目？（多選）',
            options: [
                { id: 'A', text: '廠房房產證或土地使用權證核查' },
                { id: 'B', text: '抵押物標識張貼確認' },
                { id: 'C', text: '資產是否被其他機構查封' },
                { id: 'D', text: '設備購置發票核對' },
                { id: 'E', text: '主要設備產權爭議（融資租賃或所有權保留）' },
                { id: 'F', text: '抵押資產周邊環境評估' }
            ],
            answer: ['A', 'C', 'E'],
            isMultiple: true,
            explanation: '**資產核實4級必做項目**：\\n\\n✅ **A - 產權證核查**：確認產權人與借款人關係\\n\\n❌ **B - 抵押標識**：3級重要，非必做\\n\\n✅ **C - 查封確認**：發現查封必須立即上報！\\n\\n❌ **D - 購置發票**：3級重要，輔助核實\\n\\n✅ **E - 產權爭議核查**：融資租賃設備產權歸出租人，不能作為抵押物\\n\\n❌ **F - 周邊環境**：2級，影響變現能力評估\\n\\n**4級項目的特點**：涉及資產權屬的核心問題，直接影響抵押物有效性。'
        },
        {
            id: 'chk-visit-2',
            type: 'checklist',
            domain: 'fieldVisit',
            difficulty: 3,
            question: '「資金用途追蹤」核查中，哪些屬於4級必做項目？（多選）',
            options: [
                { id: 'A', text: '貸款資金具體支出項目與合同約定用途對比' },
                { id: 'B', text: '資金使用進度與合同時間表對比' },
                { id: 'C', text: '資金支付憑證（轉賬記錄、發票、收據）' },
                { id: 'D', text: '項目完成尚需資金及來源' },
                { id: 'E', text: '資金流向關聯方情況' },
                { id: 'F', text: '資金回流或虛假交易跡象' }
            ],
            answer: ['A', 'C', 'E', 'F'],
            isMultiple: true,
            explanation: '**資金追蹤4級必做項目**：\\n\\n✅ **A - 用途對比**：資金用途是否符合合同約定是核查核心\\n\\n❌ **B - 進度對比**：3級，用於監控項目執行\\n\\n✅ **C - 支付憑證**：無憑證=無法證明資金用途\\n\\n❌ **D - 後續資金**：3級，評估項目完成可能性\\n\\n✅ **E - 關聯方流向**：資金流向關聯方是挪用的高風險信號\\n\\n✅ **F - 回流/虛假交易**：一旦發現必須立即上報\\n\\n**記住**：資金用途核查的核心是「錢去了哪裡」「有沒有證據」。'
        },
        {
            id: 'chk-visit-3',
            type: 'checklist',
            domain: 'fieldVisit',
            difficulty: 2,
            question: '根據風險預警檢查清單，以下哪些情況發現後必須在24小時內上報？（多選）',
            options: [
                { id: 'A', text: '法院查封、扣押文書張貼' },
                { id: 'B', text: '員工私下反映近期工資延遲發放' },
                { id: 'C', text: '其他金融機構人員在場追債' },
                { id: 'D', text: '經營規模與上次走訪相比有所萎縮' },
                { id: 'E', text: '設備搬離或資產轉移跡象' },
                { id: 'F', text: '管理層精神狀態異常（焦慮或迴避）' }
            ],
            answer: ['A', 'C', 'E'],
            isMultiple: true,
            explanation: '**24小時內必須上報的高風險信號**：\\n\\n✅ **A - 法院查封**：已進入司法程序，資產可能被凍結\\n\\n❌ **B - 工資延遲**：中度預警，72小時內響應\\n\\n✅ **C - 其他機構追債**：說明已有多頭借債且出現償還問題\\n\\n❌ **D - 規模萎縮**：黃色預警，7日內響應\\n\\n✅ **E - 資產轉移**：可能在轉移財產逃避債務\\n\\n❌ **F - 管理層異常**：中度預警，需進一步觀察\\n\\n**三級響應機制**：\\n🔴 紅色（24小時）：查封、資產轉移、追債\\n🟠 橙色（72小時）：逾期、資金挪用\\n🟡 黃色（7日）：經營惡化、行業風險'
        },
        {
            id: 'chk-visit-4',
            type: 'checklist',
            domain: 'fieldVisit',
            difficulty: 3,
            question: '走訪某生產型企業時，以下哪些是判斷「生產經營真實性」的4級必查項目？（多選）',
            options: [
                { id: 'A', text: '生產線數量及開工率' },
                { id: 'B', text: '生產車間環境整潔度（5S管理）' },
                { id: 'C', text: '廠房佔地及建築面積與申報對比' },
                { id: 'D', text: '近期出貨頻率' },
                { id: 'E', text: '廠房地址與產權證明一致性' },
                { id: 'F', text: '質量檢測設備配備情況' }
            ],
            answer: ['A', 'C', 'E'],
            isMultiple: true,
            explanation: '**生產核查4級必做項目**：\\n\\n✅ **A - 生產線及開工率**：直接反映經營能力，8條線只開2條需追問\\n\\n❌ **B - 5S管理**：2級，管理水平參考\\n\\n✅ **C - 面積核對**：防止虛報規模\\n\\n❌ **D - 出貨頻率**：2級，輔助判斷\\n\\n✅ **E - 地址一致性**：確認資產真實性及所有權\\n\\n❌ **F - 質檢設備**：2級，質量管理參考\\n\\n**生產核查的核心邏輯**：\\n• 工廠是否真的存在？（地址、面積）\\n• 工廠是否真的在生產？（開工率）\\n• 工廠產能是否與聲稱規模匹配？'
        }
    ],

    // 根據模式獲取題目
    getQuestionsByMode(mode, count = 10) {
        // 合併原有題目和擴展題目
        const allQuestions = [...this.questions, ...(this.extendedQuestions || [])];
        let filtered = allQuestions;

        switch (mode) {
            case 'scenario':
                filtered = allQuestions.filter(q => q.type === 'scenario');
                break;
            case 'redFlag':
                filtered = allQuestions.filter(q => q.type === 'redFlag');
                break;
            case 'case':
                filtered = allQuestions.filter(q => q.type === 'case');
                break;
            case 'checklist':
                filtered = allQuestions.filter(q => q.type === 'checklist');
                break;
            case 'weakness':
                const progress = DataManager.getProgress();
                if (progress && progress.wrongQuestions.length > 0) {
                    filtered = allQuestions.filter(q =>
                        progress.wrongQuestions.includes(q.id)
                    );
                }
                break;
            case 'review':
                const reviewIds = DataManager.getReviewQuestions();
                if (reviewIds.length > 0) {
                    filtered = allQuestions.filter(q => reviewIds.includes(q.id));
                }
                break;
            default:
                // quick模式：隨機混合
                break;
        }

        // 隨機打亂並取指定數量
        return this.shuffle(filtered).slice(0, Math.min(count, filtered.length));
    },

    // Fisher-Yates洗牌算法
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    // 根據ID獲取題目
    getQuestionById(id) {
        const allQuestions = [...this.questions, ...(this.extendedQuestions || [])];
        return allQuestions.find(q => q.id === id);
    },

    // 獲取題目總數
    getTotalCount() {
        return this.questions.length + (this.extendedQuestions ? this.extendedQuestions.length : 0);
    }
};

// ============================================
// Drilling 練習管理器
// ============================================

const DrillingManager = {
    currentSession: null,

    // 開始新練習
    startSession(mode) {
        const questions = QuestionBank.getQuestionsByMode(mode);

        if (questions.length === 0) {
            alert('該模式暫無可用題目');
            return null;
        }

        this.currentSession = {
            mode,
            questions,
            currentIndex: 0,
            answers: [],
            startTime: Date.now(),
            correct: 0,
            wrong: 0
        };

        DataManager.addHistory('開始練習', `${this.getModeLabel(mode)}模式，共${questions.length}題`);

        return this.currentSession;
    },

    // 獲取當前題目
    getCurrentQuestion() {
        if (!this.currentSession) return null;
        return this.currentSession.questions[this.currentSession.currentIndex];
    },

    // 提交答案
    submitAnswer(selectedAnswers) {
        if (!this.currentSession) return null;

        const question = this.getCurrentQuestion();
        let isCorrect;

        if (question.isMultiple) {
            // 多選題：必須完全一致
            const correctSet = new Set(question.answer);
            const selectedSet = new Set(selectedAnswers);
            isCorrect = correctSet.size === selectedSet.size &&
                [...correctSet].every(a => selectedSet.has(a));
        } else {
            // 單選題
            isCorrect = selectedAnswers[0] === question.answer;
        }

        // 記錄答案
        this.currentSession.answers.push({
            questionId: question.id,
            selected: selectedAnswers,
            correct: question.answer,
            isCorrect
        });

        if (isCorrect) {
            this.currentSession.correct++;
        } else {
            this.currentSession.wrong++;
        }

        // 更新進度數據
        DataManager.updateAnswerStats(isCorrect, question.domain, question.id);

        return {
            isCorrect,
            correctAnswer: question.answer,
            explanation: question.explanation
        };
    },

    // 跳過題目
    skipQuestion() {
        if (!this.currentSession) return;

        const question = this.getCurrentQuestion();
        this.currentSession.answers.push({
            questionId: question.id,
            selected: null,
            correct: question.answer,
            isCorrect: false,
            skipped: true
        });
        this.currentSession.wrong++;
    },

    // 下一題
    nextQuestion() {
        if (!this.currentSession) return null;

        this.currentSession.currentIndex++;

        if (this.currentSession.currentIndex >= this.currentSession.questions.length) {
            return this.finishSession();
        }

        return this.getCurrentQuestion();
    },

    // 結束練習
    finishSession() {
        if (!this.currentSession) return null;

        const session = this.currentSession;
        const duration = Math.round((Date.now() - session.startTime) / 1000 / 60);
        const accuracy = session.questions.length > 0
            ? Math.round((session.correct / session.questions.length) * 100)
            : 0;

        // 更新總學習時長
        const progress = DataManager.getProgress();
        if (progress) {
            progress.totalTime += duration;
            DataManager.saveProgress(progress);
        }

        // 記錄歷程
        DataManager.addHistory(
            '完成練習',
            `${this.getModeLabel(session.mode)}模式，答對${session.correct}/${session.questions.length}`,
            accuracy >= 70 ? 'good' : 'bad'
        );

        const result = {
            mode: session.mode,
            total: session.questions.length,
            correct: session.correct,
            wrong: session.wrong,
            accuracy,
            duration,
            answers: session.answers
        };

        this.currentSession = null;
        return result;
    },

    // 獲取進度百分比
    getProgressPercent() {
        if (!this.currentSession) return 0;
        return Math.round(
            (this.currentSession.currentIndex / this.currentSession.questions.length) * 100
        );
    },

    // 獲取模式標籤
    getModeLabel(mode) {
        const labels = {
            quick: '快速練習',
            scenario: '情境判斷',
            redFlag: '紅旗識別',
            case: '案例分析',
            checklist: '清單核對',
            weakness: '弱項強化',
            review: '間隔複習'
        };
        return labels[mode] || mode;
    }
};

// 導出
window.QuestionBank = QuestionBank;
window.DrillingManager = DrillingManager;
