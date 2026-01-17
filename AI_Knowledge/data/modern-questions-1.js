/**
 * AI 知識溫故知新 - 2025-2026 最新 AI 工具題庫 (第一部分)
 * Claude Code CLI, MCP, Skills 系統
 */

const modernQuestions_part1 = {
    // Claude Code CLI 相關題目
    claudeCodeCLI: [
        {
            id: 'cc1',
            category: 'Claude Code CLI',
            question: 'Claude Code CLI 是什麼？',
            type: 'single',
            options: [
                '一個在終端機中直接與 Claude AI 互動的命令行工具',
                '一個網頁編輯器',
                '一個圖像生成工具',
                '一個數據庫管理系統'
            ],
            correctAnswers: [0],
            explanation: 'Claude Code CLI 是 Anthropic 推出的命令行工具，讓開發者可以在終端機中直接與 Claude AI 互動，進行編程輔助、檔案操作和代碼編寫等任務。'
        },
        {
            id: 'cc2',
            category: 'Claude Code CLI',
            question: '如何在 Claude Code CLI 中執行檔案編輯操作？',
            type: 'single',
            options: [
                '直接描述你想要的修改，Claude 會使用內建工具自動編輯',
                '需要手動複製貼上代碼',
                '必須先退出 CLI 再用編輯器',
                '只能讀取不能修改檔案'
            ],
            correctAnswers: [0],
            explanation: 'Claude Code CLI 具有檔案讀寫工具，你只需描述想要的修改，Claude 會自動使用 view_file、write_to_file、replace_file_content 等工具來執行編輯。'
        },
        {
            id: 'cc3',
            category: 'Claude Code CLI',
            question: 'Claude Code CLI 中的 /compact 命令有什麼作用？',
            type: 'single',
            options: [
                '壓縮對話歷史以節省 context 空間',
                '壓縮程式碼檔案',
                '減少輸出的字數',
                '關閉詳細模式'
            ],
            correctAnswers: [0],
            explanation: '/compact 命令會壓縮對話歷史，將冗長的歷史記錄總結成精簡版本，釋放 context window 空間以便處理更長的對話。'
        },
        {
            id: 'cc4',
            category: 'Claude Code CLI',
            question: '在 Claude Code CLI 中，如何讓 Claude 執行終端命令？',
            type: 'single',
            options: [
                '直接告訴 Claude 你想執行什麼命令，它會自動請求批准後執行',
                '需要輸入特殊的指令前綴',
                'Claude Code 不支持執行終端命令',
                '必須手動在另一個終端執行'
            ],
            correctAnswers: [0],
            explanation: 'Claude Code CLI 有 run_command 工具，你描述需求後，Claude 會提議執行相應的命令，等待你批准後自動執行並顯示結果。'
        },
        {
            id: 'cc5',
            category: 'Claude Code CLI',
            question: 'Claude Code CLI 的 SafeToAutoRun 參數是用來做什麼的？',
            type: 'single',
            options: [
                '標記安全命令可以自動執行無需用戶批准',
                '設置密碼保護',
                '啟用安全模式',
                '加密傳輸數據'
            ],
            correctAnswers: [0],
            explanation: 'SafeToAutoRun 讓 Claude 標記某些安全的只讀命令（如 ls、cat 等）可以自動執行，減少用戶需要手動批准的次數，提高效率。'
        },
        {
            id: 'cc6',
            category: 'Claude Code CLI',
            question: '如何在 Claude Code CLI 中使用自定義 Skills？',
            type: 'single',
            options: [
                '將 SKILL.md 文件放在 .claude/skills 目錄',
                '在命令行輸入 /skill 命令',
                '需要購買額外的授權',
                'Claude Code 不支持自定義 Skills'
            ],
            correctAnswers: [0],
            explanation: 'Skills 是擴展 Claude 能力的指令文件，放在 .claude/skills 目錄下，Claude 會自動識別並根據 SKILL.md 中的描述來擴展其功能。'
        },
        {
            id: 'cc7',
            category: 'Claude Code CLI',
            question: 'Claude Code CLI 中的 browser_subagent 工具有什麼功能？',
            type: 'single',
            options: [
                '啟動一個子代理來控制瀏覽器進行自動化操作',
                '打開網頁瀏覽器',
                '下載網頁內容',
                '檢查網絡連接'
            ],
            correctAnswers: [0],
            explanation: 'browser_subagent 可以啟動一個專門的子代理來控制瀏覽器，執行點擊、輸入、截圖等操作，並自動錄製成 WebP 視頻。'
        },
        {
            id: 'cc8',
            category: 'Claude Code CLI',
            question: '在 Claude Code CLI 中，task_boundary 工具的作用是什麼？',
            type: 'single',
            options: [
                '管理任務狀態和進度，讓用戶了解當前工作階段',
                '設置任務超時時間',
                '限制 Claude 的工作範圍',
                '結束當前對話'
            ],
            correctAnswers: [0],
            explanation: 'task_boundary 用於標記任務的開始、進度更新和狀態變化，幫助用戶了解 Claude 正在進行什麼工作以及完成了什麼。'
        },
        {
            id: 'cc9',
            category: 'Claude Code CLI',
            question: 'Claude Code CLI 如何處理大型代碼庫？',
            type: 'multiple',
            options: [
                '使用 grep_search 搜索特定內容',
                '使用 view_file_outline 查看文件結構',
                '使用 find_by_name 查找文件',
                '一次性讀取所有文件到記憶體'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Claude Code CLI 使用多種工具來高效處理大型代碼庫：grep_search 搜索內容、view_file_outline 查看結構、find_by_name 查找文件，而不是一次性讀取所有內容。'
        },
        {
            id: 'cc10',
            category: 'Claude Code CLI',
            question: '如何在 Claude Code CLI 中讓操作自動化而不需每次確認？',
            type: 'single',
            options: [
                '在 workflow 文件中使用 // turbo 或 // turbo-all 註解',
                '設置環境變數 AUTO_CONFIRM=true',
                '使用 --force 參數',
                '無法實現自動化'
            ],
            correctAnswers: [0],
            explanation: '在 .agent/workflows 目錄下的 workflow 文件中，使用 // turbo 標記單個步驟或 // turbo-all 標記整個流程可以自動執行命令。'
        }
    ],

    // MCP (Model Context Protocol) 相關題目
    mcp: [
        {
            id: 'mcp1',
            category: 'MCP 協議',
            question: 'MCP (Model Context Protocol) 是什麼？',
            type: 'single',
            options: [
                '一個讓 AI 模型與外部工具和服務互動的標準協議',
                '一種新的程式語言',
                '一個數據加密標準',
                '一個網絡傳輸協議'
            ],
            correctAnswers: [0],
            explanation: 'MCP 是 Anthropic 推出的開放協議，讓 AI 模型能夠通過標準化的方式與外部工具、API 和服務進行互動。'
        },
        {
            id: 'mcp2',
            category: 'MCP 協議',
            question: 'MCP Server 的主要功能是什麼？',
            type: 'single',
            options: [
                '提供工具 (Tools)、資源 (Resources) 和提示 (Prompts) 給 AI 模型',
                '存儲 AI 模型的權重',
                '訓練 AI 模型',
                '監控 AI 模型的性能'
            ],
            correctAnswers: [0],
            explanation: 'MCP Server 向 AI 模型暴露三種能力：Tools（可執行的功能）、Resources（可讀取的數據）和 Prompts（預定義的提示模板）。'
        },
        {
            id: 'mcp3',
            category: 'MCP 協議',
            question: '以下哪些是常見的 MCP Server 應用場景？',
            type: 'multiple',
            options: [
                '連接數據庫查詢數據',
                '整合第三方 API 服務',
                '操作本地文件系統',
                '取代人類程式員'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'MCP Server 常用於擴展 AI 的能力，如查詢數據庫、調用 API、操作文件等。它是增強 AI 能力的工具，而非取代人類。'
        },
        {
            id: 'mcp4',
            category: 'MCP 協議',
            question: '如何創建一個基本的 MCP Server？',
            type: 'single',
            options: [
                '使用 Python (FastMCP) 或 TypeScript (MCP SDK) 定義 tools 和 resources',
                '必須使用 C++ 編寫底層代碼',
                '只能通過官方 API 申請',
                '需要專門的硬體設備'
            ],
            correctAnswers: [0],
            explanation: '可以使用 Python 的 FastMCP 庫或 TypeScript 的 MCP SDK 快速創建 MCP Server，定義 tools 函數和 resources 端點即可。'
        },
        {
            id: 'mcp5',
            category: 'MCP 協議',
            question: 'MCP 中的 Tool 和 Resource 有什麼區別？',
            type: 'single',
            options: [
                'Tool 是可執行的動作，Resource 是可讀取的數據',
                'Tool 是免費的，Resource 是付費的',
                '沒有區別，只是名稱不同',
                'Tool 用於輸入，Resource 用於輸出'
            ],
            correctAnswers: [0],
            explanation: 'Tool 代表可執行的功能或動作（如發送郵件、查詢數據），Resource 代表可讀取的靜態或動態數據（如文件內容、API 響應）。'
        },
        {
            id: 'mcp6',
            category: 'MCP 協議',
            question: '在 Claude Desktop 中如何配置 MCP Server？',
            type: 'single',
            options: [
                '在 claude_desktop_config.json 中添加 mcpServers 配置',
                '在系統環境變數中設置',
                '通過 GUI 界面點擊添加',
                '發送郵件給 Anthropic 申請'
            ],
            correctAnswers: [0],
            explanation: '在 Claude Desktop 的配置文件 claude_desktop_config.json 中，添加 mcpServers 字段來配置本地或遠程的 MCP Server。'
        },
        {
            id: 'mcp7',
            category: 'MCP 協議',
            question: 'MCP 協議使用什麼格式進行通訊？',
            type: 'single',
            options: [
                'JSON-RPC 2.0',
                'XML-RPC',
                'GraphQL',
                'SOAP'
            ],
            correctAnswers: [0],
            explanation: 'MCP 協議基於 JSON-RPC 2.0 標準進行通訊，使用 JSON 格式的請求和響應來實現 AI 與工具之間的互動。'
        },
        {
            id: 'mcp8',
            category: 'MCP 協議',
            question: '為什麼 MCP 對 AI 應用開發很重要？',
            type: 'multiple',
            options: [
                '統一了 AI 與工具互動的標準',
                '讓不同 AI 模型可以使用相同的工具',
                '減少了開發者的重複工作',
                '完全取代了傳統 API'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'MCP 的價值在於標準化、可互換性和減少重複開發。它並不取代傳統 API，而是提供了一個讓 AI 使用 API 的標準方式。'
        }
    ],

    // Skills 系統相關題目
    skills: [
        {
            id: 'sk1',
            category: 'Skills 系統',
            question: '什麼是 Claude Code 中的 Skills？',
            type: 'single',
            options: [
                '擴展 Claude 能力的指令文件夾，包含特定任務的知識和流程',
                '用戶的個人技能評估',
                '程式語言的語法規則',
                'Claude 的付費功能'
            ],
            correctAnswers: [0],
            explanation: 'Skills 是包含 SKILL.md 和相關資源的文件夾，為 Claude 提供特定任務的專業知識、腳本和流程指導。'
        },
        {
            id: 'sk2',
            category: 'Skills 系統',
            question: 'SKILL.md 文件必須包含哪些內容？',
            type: 'multiple',
            options: [
                'YAML frontmatter 包含 name 和 description',
                '詳細的 Markdown 指令說明',
                '至少 1000 行代碼',
                'PDF 格式的用戶手冊'
            ],
            correctAnswers: [0, 1],
            explanation: 'SKILL.md 需要 YAML frontmatter（包含 name 和 description）以及 Markdown 格式的詳細指令，不需要代碼量限制或 PDF 手冊。'
        },
        {
            id: 'sk3',
            category: 'Skills 系統',
            question: '如何讓 Claude 自動識別並使用某個 Skill？',
            type: 'single',
            options: [
                '在 SKILL.md 的 description 中清楚描述使用場景',
                '每次都手動告訴 Claude',
                '設置環境變數',
                '購買 Skill 授權'
            ],
            correctAnswers: [0],
            explanation: 'Claude 會根據 SKILL.md 的 description 中描述的使用場景，自動判斷當前任務是否需要用該 Skill，然後主動讀取載入。'
        },
        {
            id: 'sk4',
            category: 'Skills 系統',
            question: '一個 Skill 文件夾可以包含哪些內容？',
            type: 'multiple',
            options: [
                'SKILL.md 主指令文件',
                'scripts/ 輔助腳本目錄',
                'examples/ 參考實現目錄',
                'resources/ 額外資源目錄'
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: 'Skill 文件夾可以包含主指令文件 SKILL.md，以及 scripts/、examples/、resources/ 等目錄來提供腳本、範例和額外資源。'
        },
        {
            id: 'sk5',
            category: 'Skills 系統',
            question: '如何用命令手動載入一個 Skill？',
            type: 'single',
            options: [
                '使用 Bash("openskills read <skill-name>") 或類似命令',
                '重新啟動 Claude',
                '在設置中勾選',
                '無法手動載入'
            ],
            correctAnswers: [0],
            explanation: '可以通過執行 openskills read <skill-name> 命令來手動讀取和載入特定的 Skill 到當前對話中。'
        },
        {
            id: 'sk6',
            category: 'Skills 系統',
            question: '以下哪些是實用的 Skill 類型？',
            type: 'multiple',
            options: [
                'frontend-design：前端設計指導',
                'systematic-debugging：系統性除錯流程',
                'mcp-builder：MCP Server 創建指南',
                'auto-coffee-maker：自動咖啡機控制'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '前端設計、系統性除錯和 MCP 建構都是實用的開發 Skills。自動咖啡機控制通常不是 AI 編程輔助的範疇。'
        },
        {
            id: 'sk7',
            category: 'Skills 系統',
            question: '創建 Skill 時，description 應該如何撰寫？',
            type: 'single',
            options: [
                '清楚說明觸發條件和使用時機',
                '越簡短越好',
                '使用技術術語讓 Claude 理解',
                '只寫 Skill 的名稱'
            ],
            correctAnswers: [0],
            explanation: 'description 應該清楚描述何時使用這個 Skill（觸發條件），讓 Claude 能夠自動判斷當前任務是否適合使用。'
        },
        {
            id: 'sk8',
            category: 'Skills 系統',
            question: 'Skills 系統相比直接寫 Prompt 有什麼優勢？',
            type: 'multiple',
            options: [
                '可重用性高',
                '可包含輔助腳本和資源',
                '自動根據任務載入',
                '完全不需要維護'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Skills 可重用、可包含腳本和資源、可自動載入，但仍需要維護更新以適應新的需求和工具變化。'
        }
    ]
};

// 合併到全局變量
if (typeof window !== 'undefined') {
    window.modernQuestions_part1 = modernQuestions_part1;
}
