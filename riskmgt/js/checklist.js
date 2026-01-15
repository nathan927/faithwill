/**
 * 貸後智庫 - 檢查清單模組
 * 處理清單展示、勾選及狀態保存
 */

// 檢查清單數據
const ChecklistData = {
    checklists: [
        {
            id: 'pre-visit',
            name: '走訪前準備',
            icon: '📋',
            items: [
                { id: 'pre-1', text: '已取得客戶最新工商登記資料副本', importance: 4, note: '從工商系統調取或要求客戶提供' },
                { id: 'pre-2', text: '已列印客戶申貸時的營業地址、廠房地址清單', importance: 4, note: '從貸款檔案中提取' },
                { id: 'pre-3', text: '已準備客戶最近三期財務報表對比表', importance: 3, note: '從信貸系統導出' },
                { id: 'pre-4', text: '已攜帶能拍攝帶時間戳照片的設備', importance: 4, note: '確保相機或手機設置正確' },
                { id: 'pre-5', text: '已與客戶預約並確認關鍵管理層在場', importance: 4, note: '電話或郵件確認法人、財務負責人出席' },
                { id: 'pre-6', text: '已準備上次走訪報告以便對比變化', importance: 3, note: '調閱貸後管理檔案' }
            ]
        },
        {
            id: 'office-check',
            name: '辦公環境核查',
            icon: '🏢',
            items: [
                { id: 'off-1', text: '辦公室地址與工商登記是否一致', importance: 4, note: '門牌號碼完全一致' },
                { id: 'off-2', text: '公司名稱標識是否清晰可見', importance: 4, note: '門口或前台位置' },
                { id: 'off-3', text: '前台或接待處是否有人值守', importance: 3, note: '正常工作時間內' },
                { id: 'off-4', text: '辦公面積是否與申報規模相符', importance: 4, note: '目測面積並記錄' },
                { id: 'off-5', text: '現場員工人數與申報是否匹配', importance: 3, note: '記錄實際人數' },
                { id: 'off-6', text: '員工是否在正常工作狀態', importance: 3, note: '觀察工作行為' },
                { id: 'off-7', text: '辦公設備是否正常運作', importance: 3, note: '電腦、電話、打印機等' },
                { id: 'off-8', text: '是否有業務洽談或電話響起', importance: 2, note: '觀察15-30分鐘' },
                { id: 'off-9', text: '是否張貼組織架構圖、管理制度', importance: 2, note: '牆面或公告欄' },
                { id: 'off-10', text: '是否有財務室或財務辦公區域', importance: 3, note: '獨立財務辦公空間' },
                { id: 'off-11', text: '水電費或物業費繳費憑證', importance: 2, note: '近三個月' }
            ]
        },
        {
            id: 'interview',
            name: '人員訪談核查',
            icon: '👥',
            items: [
                { id: 'int-1', text: '法定代表人或總經理是否在場', importance: 4, note: '如否記錄原因' },
                { id: 'int-2', text: '管理層身份證核對', importance: 4, note: '身份證原件，照片與本人是否相符' },
                { id: 'int-3', text: '描述主營業務和主要產品', importance: 4, note: '評估對業務熟悉程度' },
                { id: 'int-4', text: '前三大客戶及銷售佔比', importance: 3, note: '記錄客戶名稱及佔比' },
                { id: 'int-5', text: '主要供應商及採購週期', importance: 3, note: '評估供應鏈穩定性' },
                { id: 'int-6', text: '當前在手訂單金額', importance: 3, note: '預計交付時間' },
                { id: 'int-7', text: '上月營業收入及同比情況', importance: 3, note: '記錄增減幅度' },
                { id: 'int-8', text: '員工工資發放情況', importance: 4, note: '上次發薪日，是否有拖欠' },
                { id: 'int-9', text: '正式員工及臨時工人數', importance: 2, note: '比例是否合理' },
                { id: 'int-10', text: '最近半年離職率', importance: 3, note: '評估是否異常' },
                { id: 'int-11', text: '貸款資金使用項目', importance: 4, note: '是否符合合同約定' },
                { id: 'int-12', text: '其他銀行授信情況', importance: 4, note: '記錄銀行及金額' },
                { id: 'int-13', text: '是否有重大訴訟或處罰', importance: 4, note: '記錄詳情' },
                { id: 'int-14', text: '關聯企業經營狀況', importance: 3, note: '記錄關聯企業名稱' }
            ]
        },
        {
            id: 'financial-doc',
            name: '財務文件核查',
            icon: '📊',
            items: [
                { id: 'fin-1', text: '最近三個月銀行對賬單原件', importance: 4, note: '主要收款賬戶流水' },
                { id: 'fin-2', text: '主要收款賬戶及日均流水', importance: 3, note: '與申報營收是否匹配' },
                { id: 'fin-3', text: '異常大額資金進出', importance: 4, note: '記錄單筆大額交易' },
                { id: 'fin-4', text: '最近三個月銷售發票存根', importance: 3, note: '開票總額核對' },
                { id: 'fin-5', text: '採購合同、銷售合同原件', importance: 3, note: '合同對方真實性核查' },
                { id: 'fin-6', text: '應收賬款明細表', importance: 4, note: '賬齡超90天比例' },
                { id: 'fin-7', text: '最大單一應收賬款', importance: 3, note: '預計回款時間' },
                { id: 'fin-8', text: '應付賬款是否有逾期', importance: 3, note: '記錄逾期金額' },
                { id: 'fin-9', text: '財務賬簿記錄規範性', importance: 4, note: '與申報報表數據一致性' },
                { id: 'fin-10', text: '專職財務人員配備', importance: 3, note: '從業年限及專業性' },
                { id: 'fin-11', text: '稅務申報是否正常', importance: 4, note: '有無欠稅或處罰' },
                { id: 'fin-12', text: '納稅申報與財務報表一致性', importance: 4, note: '最近一期數據比對' }
            ]
        },
        {
            id: 'factory',
            name: '廠房生產核查',
            icon: '🏭',
            items: [
                { id: 'fac-1', text: '廠房地址與產權證明一致性', importance: 4, note: '門牌號碼核對' },
                { id: 'fac-2', text: '廠房佔地及建築面積', importance: 4, note: '目測與申報對比' },
                { id: 'fac-3', text: '生產線數量及開工率', importance: 4, note: '記錄開動條數' },
                { id: 'fac-4', text: '生產線工人數量', importance: 3, note: '正常生產狀態' },
                { id: 'fac-5', text: '生產設備運轉狀況', importance: 3, note: '聲音、運行情況' },
                { id: 'fac-6', text: '主要設備品牌型號及購置時間', importance: 3, note: '與申報是否一致' },
                { id: 'fac-7', text: '生產設備總價值', importance: 3, note: '估值與賬面對比' },
                { id: 'fac-8', text: '原材料庫存量', importance: 3, note: '可支持天數' },
                { id: 'fac-9', text: '產成品庫存狀況', importance: 3, note: '與明細表相符' },
                { id: 'fac-10', text: '是否有積壓或滯銷產品', importance: 3, note: '積壓金額' },
                { id: 'fac-11', text: '近期出貨頻率', importance: 2, note: '出庫記錄' },
                { id: 'fac-12', text: '物流車輛進出情況', importance: 2, note: '當日是否有車輛' },
                { id: 'fac-13', text: '生產車間環境整潔度', importance: 2, note: '5S管理情況' },
                { id: 'fac-14', text: '質量檢測設備或記錄', importance: 2, note: '質檢設施配備' }
            ]
        },
        {
            id: 'assets',
            name: '資產核實',
            icon: '🏦',
            items: [
                { id: 'ast-1', text: '廠房房產證或土地使用權證', importance: 4, note: '原件查看，產權人確認' },
                { id: 'ast-2', text: '租賃合同（如適用）', importance: 4, note: '租期及租金繳納情況' },
                { id: 'ast-3', text: '抵押資產現場狀況', importance: 4, note: '損毀或貶值跡象' },
                { id: 'ast-4', text: '抵押物標識張貼', importance: 3, note: '本行抵押標識' },
                { id: 'ast-5', text: '資產是否被查封', importance: 4, note: '其他機構查封跡象' },
                { id: 'ast-6', text: '主要設備產權爭議', importance: 4, note: '融資租賃或所有權保留' },
                { id: 'ast-7', text: '固定資產與明細表一致性', importance: 3, note: '實物盤點' },
                { id: 'ast-8', text: '車輛行駛證登記所有人', importance: 3, note: '所有人確認' },
                { id: 'ast-9', text: '設備購置發票', importance: 3, note: '購置時間與申報一致性' },
                { id: 'ast-10', text: '抵押資產周邊環境', importance: 2, note: '影響變現能力因素' },
                { id: 'ast-11', text: '是否存在重複抵押', importance: 4, note: '其他銀行或機構抵押權' }
            ]
        },
        {
            id: 'compliance',
            name: '安全合規',
            icon: '⚖️',
            items: [
                { id: 'com-1', text: '營業執照有效期及經營範圍', importance: 4, note: '範圍覆蓋實際業務' },
                { id: 'com-2', text: '生產許可證、質量認證', importance: 4, note: '許可證齊全性' },
                { id: 'com-3', text: '環保審批手續', importance: 4, note: '環評、排污許可' },
                { id: 'com-4', text: '消防設施配備', importance: 3, note: '滅火器、消防栓有效期' },
                { id: 'com-5', text: '特種設備年檢合格證', importance: 3, note: '鍋爐、壓力容器' },
                { id: 'com-6', text: '員工勞動保護用品', importance: 2, note: '安全帽、防護服等' },
                { id: 'com-7', text: '危險化學品存放規範', importance: 3, note: '符合安全規範' },
                { id: 'com-8', text: '近期監管部門檢查', importance: 2, note: '安監、環保檢查結果' }
            ]
        },
        {
            id: 'fund-usage',
            name: '資金用途追蹤',
            icon: '💰',
            items: [
                { id: 'fund-1', text: '貸款資金具體支出項目', importance: 4, note: '與合同約定用途對比' },
                { id: 'fund-2', text: '資金支付憑證', importance: 4, note: '轉賬記錄、發票、收據' },
                { id: 'fund-3', text: '設備採購資金使用核實', importance: 4, note: '設備是否到場可查看' },
                { id: 'fund-4', text: '原材料採購資金核實', importance: 3, note: '庫存是否相應增加' },
                { id: 'fund-5', text: '工程建設資金核實', importance: 4, note: '工程進度及施工現場' },
                { id: 'fund-6', text: '資金流向關聯方', importance: 4, note: '關聯企業或個人賬戶' },
                { id: 'fund-7', text: '資金回流或虛假交易', importance: 4, note: '異常資金循環跡象' },
                { id: 'fund-8', text: '資金使用進度', importance: 3, note: '與合同約定時間表對比' },
                { id: 'fund-9', text: '項目完成尚需資金', importance: 3, note: '金額及來源' }
            ]
        },
        {
            id: 'warning-signs',
            name: '風險預警信號',
            icon: '⚠️',
            items: [
                { id: 'warn-1', text: '客戶對走訪的配合態度', importance: 4, note: '是否推遲或拒絕' },
                { id: 'warn-2', text: '法院查封、扣押文書', importance: 4, note: '現場張貼執法文書' },
                { id: 'warn-3', text: '其他機構追債情況', importance: 4, note: '其他金融機構人員在場' },
                { id: 'warn-4', text: '經營規模變化', importance: 4, note: '與上次走訪對比' },
                { id: 'warn-5', text: '管理層精神狀態', importance: 3, note: '焦慮或迴避態度' },
                { id: 'warn-6', text: '員工私下反映', importance: 3, note: '工資、經營異常情況' },
                { id: 'warn-7', text: '水電表讀數', importance: 3, note: '長期用量是否很低' },
                { id: 'warn-8', text: '設備搬離或資產轉移', importance: 4, note: '資產減少跡象' },
                { id: 'warn-9', text: '周邊企業或物業反映', importance: 2, note: '客戶經營情況' }
            ]
        },
        {
            id: 'evidence',
            name: '證據留存',
            icon: '📸',
            items: [
                { id: 'evi-1', text: '公司門牌及辦公環境照片', importance: 4, note: '帶時間戳全景照片' },
                { id: 'evi-2', text: '管理層訪談照片', importance: 3, note: '徵得同意後拍攝' },
                { id: 'evi-3', text: '生產車間及設備照片', importance: 4, note: '多角度拍攝' },
                { id: 'evi-4', text: '庫存物資照片', importance: 3, note: '原材料及產成品' },
                { id: 'evi-5', text: '抵押物現狀照片', importance: 4, note: '多角度詳細拍攝' },
                { id: 'evi-6', text: '相關證照照片', importance: 4, note: '營業執照、產權證等' },
                { id: 'evi-7', text: '財務憑證照片', importance: 3, note: '模糊敏感信息' },
                { id: 'evi-8', text: '訪談記錄簽字確認', importance: 4, note: '客戶簽字' },
                { id: 'evi-9', text: '檢查表簽字蓋章', importance: 4, note: '客戶簽字蓋章' },
                { id: 'evi-10', text: '問題記錄及客戶說明', importance: 4, note: '異常情況書面記錄' }
            ]
        },
        {
            id: 'taihou-check',
            name: '貸後審查（四線並行）',
            icon: '👑',
            description: '貿易融資真實性深度審核清單',
            items: [
                // 帳務線審查
                { id: 'th-1', text: '應收帳款增速與營收增速對比', importance: 4, note: '應收增速>營收增速1.5倍為紅旗' },
                { id: 'th-2', text: '毛利率連續波動情況', importance: 4, note: '多年穩定（波動<1%）為異常' },
                { id: 'th-3', text: '經營現金流/淨利潤比例', importance: 4, note: '比例<50%屬高度可疑' },
                { id: 'th-4', text: '預付帳款佔總資產比例', importance: 4, note: '>15%需重點核查' },
                { id: 'th-5', text: '存貨周轉率變化趨勢', importance: 3, note: '周轉率<2次/年為警示' },
                // 合同線審查
                { id: 'th-6', text: '合同是否約定固定收益率/回報率', importance: 4, note: '「年回報率12%」= 融資性質' },
                { id: 'th-7', text: '合同是否約定「不對貨物負責」', importance: 4, note: '違背買賣合同基本義務' },
                { id: 'th-8', text: '往來函件用語（借款/欠款vs貨款）', importance: 4, note: '暴露交易真實性質' },
                { id: 'th-9', text: '上下游合同是否同日簽訂', importance: 4, note: '價差僅3%-5%為過橋安排' },
                { id: 'th-10', text: '前五大客戶/供應商穿透', importance: 4, note: '識別關聯方或循環交易' },
                // 物流線審查
                { id: 'th-11', text: '運輸費與營收規模匹配度', importance: 4, note: '10億營收僅20萬運費=異常' },
                { id: 'th-12', text: '倉儲費記錄', importance: 4, note: '大量貨物流轉但倉儲費為零=可疑' },
                { id: 'th-13', text: '原始倉儲單/運輸GPS記錄', importance: 3, note: '向第三方獨立核實' },
                { id: 'th-14', text: '驗收簽收單抽查', importance: 3, note: '確認實物交付' },
                // 資金線審查
                { id: 'th-15', text: '資金收款後停留時間', importance: 4, note: '<3天全額轉出=空轉特徵' },
                { id: 'th-16', text: '資金是否回流至實控人賬戶', importance: 4, note: '形成閉環=典型資金回流' },
                { id: 'th-17', text: '交易金額是否高度一致', importance: 3, note: '都是整百萬太刻意' },
                { id: 'th-18', text: '轉出對象經營場所核實', importance: 4, note: '查無經營場所=過橋公司' },
                { id: 'th-19', text: '發票與報關數據交叉驗證', importance: 4, note: '出口報關與發票不符=可疑' },
                { id: 'th-20', text: '稅務申報記錄交叉比對', importance: 3, note: '向稅務局調取核實' }
            ]
        }
    ],

    // 根據ID獲取清單
    getChecklistById(id) {
        return this.checklists.find(c => c.id === id);
    }
};

// 檢查清單模組
const ChecklistModule = {
    currentChecklist: null,

    // 初始化
    init() {
        this.renderSidebar();
        this.bindEvents();
    },

    // 渲染側邊欄
    renderSidebar() {
        const sidebar = document.getElementById('checklistSidebar');
        if (!sidebar) return;

        sidebar.innerHTML = ChecklistData.checklists.map(checklist => {
            const state = DataManager.getChecklistState(checklist.id);
            const completed = Object.values(state).filter(v => v).length;
            const total = checklist.items.length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

            return `
                <div class="checklist-type" data-checklist="${checklist.id}">
                    <span class="checklist-type-icon">${checklist.icon}</span>
                    <div class="checklist-type-info">
                        <div class="checklist-type-name">${checklist.name}</div>
                        <div class="checklist-type-count">${total} 項目</div>
                    </div>
                    <span class="checklist-type-progress">${percent}%</span>
                </div>
            `;
        }).join('');
    },

    // 綁定事件
    bindEvents() {
        document.getElementById('checklistSidebar')?.addEventListener('click', (e) => {
            const typeItem = e.target.closest('.checklist-type');
            if (typeItem) {
                const checklistId = typeItem.dataset.checklist;
                this.selectChecklist(checklistId);
            }
        });
    },

    // 選擇清單
    selectChecklist(checklistId) {
        // 更新側邊欄高亮
        document.querySelectorAll('.checklist-type').forEach(item => {
            item.classList.toggle('active', item.dataset.checklist === checklistId);
        });

        this.currentChecklist = checklistId;
        const checklist = ChecklistData.getChecklistById(checklistId);

        if (!checklist) return;

        this.renderChecklistContent(checklist);
    },

    // 渲染清單內容
    renderChecklistContent(checklist) {
        const main = document.getElementById('checklistMain');
        if (!main) return;

        const state = DataManager.getChecklistState(checklist.id);
        const completed = Object.values(state).filter(v => v).length;
        const total = checklist.items.length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        const importanceLabels = {
            4: '必做',
            3: '重要',
            2: '建議',
            1: '可選'
        };

        main.innerHTML = `
            <div class="checklist-detail">
                <div class="checklist-header">
                    <h2 class="checklist-title">${checklist.icon} ${checklist.name}</h2>
                    <div class="checklist-meta">
                        <span class="completion-badge">${completed}/${total} 已完成 (${percent}%)</span>
                        <button class="btn btn-outline btn-sm" id="resetChecklist">重置</button>
                    </div>
                </div>
                
                <div class="checklist-items">
                    ${checklist.items.map(item => `
                        <div class="check-item ${state[item.id] ? 'completed' : ''}" data-item-id="${item.id}">
                            <div class="check-box ${state[item.id] ? 'checked' : ''}"></div>
                            <div class="check-content">
                                <div class="check-text">${item.text}</div>
                                <div class="check-note">${item.note}</div>
                            </div>
                            <span class="check-importance importance-badge importance-${item.importance}">
                                ${importanceLabels[item.importance]}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // 綁定勾選事件
        main.querySelectorAll('.check-item').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.closest('.btn')) return; // 排除按鈕點擊
                const itemId = el.dataset.itemId;
                this.toggleItem(checklist.id, itemId, el);
            });
        });

        // 綁定重置按鈕
        document.getElementById('resetChecklist')?.addEventListener('click', () => {
            this.resetChecklist(checklist.id);
        });
    },

    // 切換項目狀態
    toggleItem(checklistId, itemId, element) {
        const state = DataManager.getChecklistState(checklistId);
        state[itemId] = !state[itemId];
        DataManager.saveChecklistState(checklistId, state);

        // 更新UI
        element.classList.toggle('completed', state[itemId]);
        element.querySelector('.check-box').classList.toggle('checked', state[itemId]);

        // 更新側邊欄進度
        this.updateSidebarProgress(checklistId);

        // 更新標題統計
        this.updateHeaderStats(checklistId);
    },

    // 更新側邊欄進度
    updateSidebarProgress(checklistId) {
        const checklist = ChecklistData.getChecklistById(checklistId);
        const state = DataManager.getChecklistState(checklistId);
        const completed = Object.values(state).filter(v => v).length;
        const total = checklist.items.length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        const typeItem = document.querySelector(`.checklist-type[data-checklist="${checklistId}"]`);
        if (typeItem) {
            typeItem.querySelector('.checklist-type-progress').textContent = `${percent}%`;
        }
    },

    // 更新標題統計
    updateHeaderStats(checklistId) {
        const checklist = ChecklistData.getChecklistById(checklistId);
        const state = DataManager.getChecklistState(checklistId);
        const completed = Object.values(state).filter(v => v).length;
        const total = checklist.items.length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        const badge = document.querySelector('.completion-badge');
        if (badge) {
            badge.textContent = `${completed}/${total} 已完成 (${percent}%)`;
        }
    },

    // 重置清單
    resetChecklist(checklistId) {
        if (confirm('確定要重置此清單的所有勾選狀態嗎？')) {
            DataManager.saveChecklistState(checklistId, {});
            const checklist = ChecklistData.getChecklistById(checklistId);
            this.renderChecklistContent(checklist);
            this.renderSidebar();
        }
    }
};

// 導出
window.ChecklistData = ChecklistData;
window.ChecklistModule = ChecklistModule;
