/**
 * AI 知識溫故知新 - 2025-2026 最新題庫 (第六部分)
 * 基礎設施與開發工具：VPS, VPN 工具, CLI 指令, Docker, Cloudflare, 網站架設
 */

const modernQuestions_part6 = {
    // VPS 相關
    vps: [
        {
            id: 'vps1',
            category: 'VPS 基礎',
            question: '什麼是 VPS (Virtual Private Server)？',
            type: 'single',
            options: [
                '虛擬專用伺服器，在物理伺服器上劃分的獨立虛擬環境',
                '一種社交媒體平台',
                '視頻播放軟體',
                '電子支付系統'
            ],
            correctAnswers: [0],
            explanation: 'VPS 是在實體伺服器上透過虛擬化技術創建的獨立運行環境，擁有獨立的 CPU、記憶體和存儲空間，介於共享主機和獨立伺服器之間。'
        },
        {
            id: 'vps2',
            category: 'VPS 基礎',
            question: 'VPS 相比共享主機 (Shared Hosting) 的優勢是什麼？',
            type: 'multiple',
            options: [
                '獨享資源，性能更穩定',
                '擁有 root 權限，可自由配置',
                '獨立 IP 地址',
                '完全免費'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'VPS 提供獨享資源、root 權限和獨立 IP，但需要付費。共享主機多用戶共用資源，限制較多但價格便宜。'
        },
        {
            id: 'vps3',
            category: 'VPS 基礎',
            question: '常見的 VPS 提供商有哪些？',
            type: 'multiple',
            options: [
                'Vultr',
                'DigitalOcean',
                'Linode',
                'Microsoft Word'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Vultr、DigitalOcean、Linode 都是知名的 VPS 提供商。Microsoft Word 是文書處理軟體。'
        },
        {
            id: 'vps4',
            category: 'VPS 基礎',
            question: 'VPS 的常見用途有哪些？',
            type: 'multiple',
            options: [
                '架設網站和 Web 應用',
                '搭建 VPN/代理服務',
                '運行 Discord/Telegram 機器人',
                '替代個人電腦日常使用'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'VPS 常用於架站、VPN 服務、運行機器人等。雖然技術上可以用作遠程桌面，但不適合日常電腦使用。'
        },
        {
            id: 'vps5',
            category: 'VPS 基礎',
            question: '如何連接到 Linux VPS？',
            type: 'single',
            options: [
                '使用 SSH 客戶端（如 Terminal、PuTTY）連接',
                '用瀏覽器直接訪問',
                '發送電子郵件',
                '打電話給技術支援'
            ],
            correctAnswers: [0],
            explanation: '連接 Linux VPS 最常用的方式是透過 SSH (Secure Shell)，使用命令 ssh user@ip_address 或 PuTTY 等工具。'
        }
    ],

    // VPN 工具（翻牆工具）
    vpnTools: [
        {
            id: 'vpnt1',
            category: 'VPN 工具',
            question: 'V2Ray 是什麼？',
            type: 'single',
            options: [
                '一個支持多種代理協議的網絡工具平台',
                '一款遊戲',
                '視頻編輯軟體',
                '音樂播放器'
            ],
            correctAnswers: [0],
            explanation: 'V2Ray 是 Project V 的核心工具，支持 VMess、VLESS、Trojan 等多種協議，可用於翻牆和科學上網。'
        },
        {
            id: 'vpnt2',
            category: 'VPN 工具',
            question: 'V2Ray 支持哪些代理協議？',
            type: 'multiple',
            options: [
                'VMess',
                'VLESS',
                'Trojan',
                'HTTP/2'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'V2Ray 支持 VMess（原生協議）、VLESS（輕量版）、Trojan 等加密協議。HTTP/2 是傳輸層協議，不是代理協議。'
        },
        {
            id: 'vpnt3',
            category: 'VPN 工具',
            question: 'Clash 是什麼類型的工具？',
            type: 'single',
            options: [
                '基於規則的多協議代理客戶端',
                '及時通訊軟體',
                '文件管理器',
                '圖片編輯器'
            ],
            correctAnswers: [0],
            explanation: 'Clash 是一個跨平台的代理客戶端，支持多種協議，特色是支持基於規則的流量分流（如特定網站走代理，其他直連）。'
        },
        {
            id: 'vpnt4',
            category: 'VPN 工具',
            question: 'Clash Verge 相比原版 Clash 的優勢是什麼？',
            type: 'multiple',
            options: [
                '更現代的圖形介面',
                '基於 Tauri 框架，體積更小',
                '支持 Clash Premium 核心',
                '完全相同沒有區別'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Clash Verge 是 Clash 的新一代 GUI 客戶端，使用 Tauri 框架開發，界面更現代，體積更小，支持 Premium 核心功能。'
        },
        {
            id: 'vpnt5',
            category: 'VPN 工具',
            question: '什麼是代理訂閱 (Subscription)？',
            type: 'single',
            options: [
                '包含多個代理節點信息的 URL，客戶端可自動獲取和更新',
                '付費訂閱雜誌',
                'YouTube 頻道訂閱',
                '電子報訂閱'
            ],
            correctAnswers: [0],
            explanation: '代理訂閱是一個 URL 鏈接，包含多個代理服務器的配置信息，客戶端可以定期拉取以獲得最新節點列表。'
        },
        {
            id: 'vpnt6',
            category: 'VPN 工具',
            question: '使用 Clash 時，如何設置規則分流？',
            type: 'single',
            options: [
                '在配置文件的 rules 部分定義域名或 IP 的匹配規則',
                '隨機分配',
                '只能全局代理',
                '需要每次手動切換'
            ],
            correctAnswers: [0],
            explanation: 'Clash 配置文件中的 rules 部分可以定義分流規則，例如 DOMAIN-SUFFIX,google.com,Proxy 表示 Google 相關域名走代理。'
        },
        {
            id: 'vpnt7',
            category: 'VPN 工具',
            question: '什麼是節點延遲 (Latency) 測試？',
            type: 'single',
            options: [
                '測量從本地到代理服務器的網絡響應時間',
                '測試網速',
                '檢測服務器容量',
                '計算流量使用量'
            ],
            correctAnswers: [0],
            explanation: '節點延遲是數據包從本地發送到服務器再返回的時間（毫秒），延遲越低表示連接越快速穩定。'
        },
        {
            id: 'vpnt8',
            category: 'VPN 工具',
            question: 'TUN 模式和系統代理模式的區別是什麼？',
            type: 'single',
            options: [
                'TUN 模式可接管所有流量，系統代理只對支持代理設置的應用生效',
                '沒有區別',
                'TUN 模式更慢',
                '系統代理更安全'
            ],
            correctAnswers: [0],
            explanation: 'TUN 模式創建虛擬網卡接管所有網絡流量，可代理不支持代理設置的應用。系統代理只對遵循系統代理設置的應用生效。'
        }
    ],

    // CLI 指令
    cliCommands: [
        {
            id: 'cli1',
            category: 'npm 指令',
            question: 'npm init 命令的作用是什麼？',
            type: 'single',
            options: [
                '初始化一個新的 Node.js 項目，創建 package.json',
                '安裝所有依賴',
                '啟動項目',
                '發佈包到 npm'
            ],
            correctAnswers: [0],
            explanation: 'npm init 會引導你創建 package.json 文件，這是 Node.js 項目的配置文件，包含項目信息和依賴列表。'
        },
        {
            id: 'cli2',
            category: 'npm 指令',
            question: 'npm install 和 npm install --save-dev 的區別是什麼？',
            type: 'single',
            options: [
                '--save-dev 安裝為開發依賴，只在開發時使用',
                '完全相同',
                '--save-dev 速度更快',
                '--save-dev 是舊版命令'
            ],
            correctAnswers: [0],
            explanation: '普通安裝會記錄在 dependencies（生產依賴），--save-dev 會記錄在 devDependencies（開發依賴，如測試框架、構建工具）。'
        },
        {
            id: 'cli3',
            category: 'npm 指令',
            question: 'npm run dev 通常用於什麼？',
            type: 'single',
            options: [
                '啟動開發服務器，支持熱重載',
                '構建生產版本',
                '運行測試',
                '發佈到伺服器'
            ],
            correctAnswers: [0],
            explanation: 'npm run dev 通常配置為啟動開發服務器（如 Vite、Next.js），提供熱重載功能，代碼修改後自動刷新頁面。'
        },
        {
            id: 'cli4',
            category: 'npm 指令',
            question: 'npx 和 npm 的區別是什麼？',
            type: 'single',
            options: [
                'npx 可以直接執行包而不需要全局安裝',
                '完全相同',
                'npx 是 npm 的舊版',
                'npx 只能安裝包'
            ],
            correctAnswers: [0],
            explanation: 'npx 可以直接運行 npm 包中的命令而無需全局安裝，如 npx create-react-app my-app 可以直接創建項目。'
        },
        {
            id: 'cli5',
            category: 'Claude Code 指令',
            question: 'Claude Code CLI 中，如何壓縮對話歷史？',
            type: 'single',
            options: [
                '使用 /compact 命令',
                '使用 /clear 命令',
                '重新啟動程序',
                '無法壓縮'
            ],
            correctAnswers: [0],
            explanation: '/compact 命令會將對話歷史壓縮成摘要，釋放 context window 空間，讓你可以繼續更長的對話。'
        },
        {
            id: 'cli6',
            category: 'Claude Code 指令',
            question: 'Claude Code 中如何查看可用的斜線命令？',
            type: 'single',
            options: [
                '輸入 / 然後查看自動補全提示',
                '輸入 help',
                '按 F1',
                '查看官方文檔'
            ],
            correctAnswers: [0],
            explanation: '在 Claude Code CLI 中輸入 / 會顯示可用的斜線命令列表，如 /compact、/clear 等。'
        },
        {
            id: 'cli7',
            category: 'Python 指令',
            question: 'pip install -r requirements.txt 的作用是什麼？',
            type: 'single',
            options: [
                '從 requirements.txt 文件批量安裝所有依賴',
                '創建 requirements.txt',
                '更新 pip',
                '刪除所有包'
            ],
            correctAnswers: [0],
            explanation: 'requirements.txt 列出項目所需的 Python 包，pip install -r requirements.txt 會自動安裝文件中列出的所有依賴。'
        },
        {
            id: 'cli8',
            category: 'Python 指令',
            question: 'python -m venv venv 的作用是什麼？',
            type: 'single',
            options: [
                '創建一個名為 venv 的 Python 虛擬環境',
                '安裝 Python',
                '運行 Python 腳本',
                '卸載 Python'
            ],
            correctAnswers: [0],
            explanation: 'python -m venv venv 創建虛擬環境，隔離項目依賴，避免不同項目的包版本衝突。'
        },
        {
            id: 'cli9',
            category: 'Python 指令',
            question: '如何激活 Python 虛擬環境？',
            type: 'single',
            options: [
                'Windows: venv\\Scripts\\activate，Mac/Linux: source venv/bin/activate',
                '直接運行 python',
                '重啟電腦',
                '安裝 virtualenv'
            ],
            correctAnswers: [0],
            explanation: '激活虛擬環境後，pip 安裝的包會放在虛擬環境目錄中，不影響全局 Python 環境。'
        },
        {
            id: 'cli10',
            category: 'Git 指令',
            question: 'git clone 命令的作用是什麼？',
            type: 'single',
            options: [
                '複製遠程倉庫到本地',
                '創建新分支',
                '提交代碼',
                '推送代碼'
            ],
            correctAnswers: [0],
            explanation: 'git clone <url> 會將遠程倉庫完整複製到本地，包括所有歷史記錄和分支。'
        }
    ],

    // GitHub 項目管理
    githubProject: [
        {
            id: 'ghp1',
            category: 'GitHub 項目',
            question: 'README.md 文件的作用是什麼？',
            type: 'single',
            options: [
                '項目說明文檔，顯示在倉庫首頁',
                '存儲用戶密碼',
                '配置構建選項',
                '記錄 Git 歷史'
            ],
            correctAnswers: [0],
            explanation: 'README.md 是項目的「門面」，用 Markdown 格式撰寫，介紹項目功能、安裝方法、使用說明等，會自動顯示在 GitHub 倉庫首頁。'
        },
        {
            id: 'ghp2',
            category: 'GitHub 項目',
            question: '一個好的 README 應該包含哪些內容？',
            type: 'multiple',
            options: [
                '項目介紹和功能說明',
                '安裝和使用指南',
                '依賴要求',
                '作者的銀行帳號'
            ],
            correctAnswers: [0, 1, 2],
            explanation: '好的 README 包含項目介紹、安裝步驟、使用方法、依賴要求、許可證等。個人隱私信息不應該放在公開文檔中。'
        },
        {
            id: 'ghp3',
            category: 'GitHub 項目',
            question: '克隆項目後，一般的啟動步驟是什麼？',
            type: 'single',
            options: [
                '閱讀 README，安裝依賴，運行啟動命令',
                '直接雙擊打開',
                '發郵件給作者',
                '無需任何操作'
            ],
            correctAnswers: [0],
            explanation: '標準流程：1) 閱讀 README 了解要求，2) 安裝依賴（npm install 或 pip install），3) 配置環境變數，4) 運行啟動命令。'
        },
        {
            id: 'ghp4',
            category: 'GitHub 項目',
            question: '.env 文件的作用是什麼？',
            type: 'single',
            options: [
                '存儲環境變數如 API 密鑰，不應該上傳到 Git',
                '存儲項目代碼',
                '記錄 Git 日誌',
                '配置編輯器'
            ],
            correctAnswers: [0],
            explanation: '.env 文件存儲環境變數（如 API_KEY=xxx），包含敏感信息，應該加入 .gitignore 避免上傳到公開倉庫。'
        },
        {
            id: 'ghp5',
            category: 'GitHub 項目',
            question: '.gitignore 文件的作用是什麼？',
            type: 'single',
            options: [
                '列出不需要被 Git 追蹤的文件和目錄',
                '忽略 Git 錯誤',
                '隱藏倉庫',
                '加密文件'
            ],
            correctAnswers: [0],
            explanation: '.gitignore 告訴 Git 哪些文件不需要追蹤，如 node_modules/、.env、__pycache__/ 等，避免上傳不必要或敏感的文件。'
        }
    ],

    // Docker
    docker: [
        {
            id: 'dk1',
            category: 'Docker 基礎',
            question: 'Docker 是什麼？',
            type: 'single',
            options: [
                '一個容器化平台，用於打包和運行應用程序',
                '一種程式語言',
                '數據庫管理系統',
                '操作系統'
            ],
            correctAnswers: [0],
            explanation: 'Docker 是容器化技術的代表，將應用程序及其依賴打包成容器，確保在任何環境中都能一致運行。'
        },
        {
            id: 'dk2',
            category: 'Docker 基礎',
            question: 'Docker 容器和虛擬機 (VM) 的主要區別是什麼？',
            type: 'single',
            options: [
                '容器共享宿主機內核，更輕量快速；VM 有獨立內核',
                '完全相同',
                'Docker 更慢',
                'VM 不需要操作系統'
            ],
            correctAnswers: [0],
            explanation: 'Docker 容器共享宿主機操作系統內核，啟動秒級，佔用資源少。VM 需要完整的虛擬操作系統，啟動慢，資源佔用大。'
        },
        {
            id: 'dk3',
            category: 'Docker 基礎',
            question: 'Dockerfile 的作用是什麼？',
            type: 'single',
            options: [
                '定義如何構建 Docker 鏡像的腳本文件',
                '存儲 Docker 密碼',
                'Docker 的配置文件',
                'Docker 的日誌文件'
            ],
            correctAnswers: [0],
            explanation: 'Dockerfile 是一個文本文件，包含一系列指令（如 FROM、RUN、COPY），用於自動化構建 Docker 鏡像。'
        },
        {
            id: 'dk4',
            category: 'Docker 指令',
            question: 'docker run 命令的作用是什麼？',
            type: 'single',
            options: [
                '從鏡像創建並啟動一個容器',
                '構建鏡像',
                '刪除容器',
                '查看日誌'
            ],
            correctAnswers: [0],
            explanation: 'docker run 會從指定的鏡像創建一個新容器並啟動它。例如 docker run -d -p 80:80 nginx 會啟動一個 Nginx 容器。'
        },
        {
            id: 'dk5',
            category: 'Docker 指令',
            question: 'docker-compose up 命令的作用是什麼？',
            type: 'single',
            options: [
                '根據 docker-compose.yml 啟動多個容器服務',
                '更新 Docker',
                '刪除所有容器',
                '構建單個鏡像'
            ],
            correctAnswers: [0],
            explanation: 'docker-compose up 讀取 docker-compose.yml 文件，一次性啟動多個互相關聯的服務容器，適合複雜應用部署。'
        },
        {
            id: 'dk6',
            category: 'Docker 指令',
            question: 'docker ps 和 docker ps -a 的區別是什麼？',
            type: 'single',
            options: [
                'docker ps 顯示運行中的容器，-a 顯示所有容器包括已停止的',
                '完全相同',
                '-a 只顯示最新的',
                '-a 刪除容器'
            ],
            correctAnswers: [0],
            explanation: 'docker ps 只列出正在運行的容器，加上 -a (--all) 會列出所有容器，包括已停止的。'
        },
        {
            id: 'dk7',
            category: 'Docker 技巧',
            question: 'Docker Volume 的作用是什麼？',
            type: 'single',
            options: [
                '持久化容器數據，容器刪除後數據仍保留',
                '增加容器音量',
                '壓縮容器大小',
                '加密容器'
            ],
            correctAnswers: [0],
            explanation: 'Docker Volume 用於持久化存儲，將數據保存在宿主機上。容器刪除後，Volume 中的數據不會丟失。'
        },
        {
            id: 'dk8',
            category: 'Docker 技巧',
            question: '-d 參數在 docker run 中的作用是什麼？',
            type: 'single',
            options: [
                '以後台模式 (detached) 運行容器',
                '刪除容器',
                '調試模式',
                '下載鏡像'
            ],
            correctAnswers: [0],
            explanation: '-d (detached) 讓容器在後台運行，不佔用當前終端。沒有 -d 的話，容器輸出會直接顯示在終端中。'
        }
    ],

    // LoRA 訓練
    lora: [
        {
            id: 'lora1',
            category: 'LoRA 訓練',
            question: '什麼是 LoRA (Low-Rank Adaptation)？',
            type: 'single',
            options: [
                '一種低秩適應技術，用較少參數微調大型模型',
                '一種新的 AI 模型',
                '圖片格式',
                '音頻壓縮技術'
            ],
            correctAnswers: [0],
            explanation: 'LoRA 是一種高效的微調方法，通過添加低秩矩陣來調整預訓練模型，只需訓練很少的參數（約 0.1%），大大降低資源需求。'
        },
        {
            id: 'lora2',
            category: 'LoRA 訓練',
            question: 'LoRA 相比完整微調的優勢是什麼？',
            type: 'multiple',
            options: [
                '需要的 GPU 記憶體更少',
                '訓練速度更快',
                '模型文件更小',
                '效果總是更好'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'LoRA 的優勢是資源需求低、訓練快、文件小。效果視具體任務而定，不一定總比完整微調好。'
        },
        {
            id: 'lora3',
            category: 'LoRA 訓練',
            question: '進行 Stable Diffusion LoRA 訓練通常需要多少張圖片？',
            type: 'single',
            options: [
                '10-50 張高質量圖片通常足夠',
                '至少 10000 張',
                '只需要 1 張',
                '不需要任何圖片'
            ],
            correctAnswers: [0],
            explanation: '對於 Stable Diffusion 的 LoRA 訓練，10-50 張高質量、一致風格的圖片通常足以訓練出不錯的效果。'
        },
        {
            id: 'lora4',
            category: 'LoRA 訓練',
            question: 'LoRA 訓練中的 rank (秩) 參數有什麼影響？',
            type: 'single',
            options: [
                '秩越高表示能力越強但文件越大，通常用 4-128',
                '秩應該設為最大值',
                '秩不影響訓練',
                '秩只影響訓練速度'
            ],
            correctAnswers: [0],
            explanation: 'Rank 決定了 LoRA 矩陣的大小。較高的 rank（如 64-128）能學習更複雜的特徵，但文件更大；較低的 rank（如 4-16）更輕量。'
        },
        {
            id: 'lora5',
            category: 'LoRA 訓練',
            question: '常用的 LoRA 訓練工具有哪些？',
            type: 'multiple',
            options: [
                'kohya_ss',
                'LoRA Easy Training Scripts',
                'sd-scripts',
                'Microsoft Excel'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'kohya_ss 和 sd-scripts 是熱門的 Stable Diffusion LoRA 訓練工具。Excel 是電子表格軟體，不用於模型訓練。'
        }
    ],

    // Cloudflare
    cloudflare: [
        {
            id: 'cf1',
            category: 'Cloudflare',
            question: 'Cloudflare 是什麼？',
            type: 'single',
            options: [
                '提供 CDN、DNS、安全防護等服務的網絡平台',
                '雲端存儲服務',
                '電子郵件服務',
                '社交媒體平台'
            ],
            correctAnswers: [0],
            explanation: 'Cloudflare 是一個網絡服務平台，提供 CDN 加速、DDoS 防護、DNS 管理、SSL 證書等多種服務，有很多免費功能。'
        },
        {
            id: 'cf2',
            category: 'Cloudflare',
            question: 'Cloudflare 的免費功能包括哪些？',
            type: 'multiple',
            options: [
                '免費 SSL/TLS 證書',
                '基本 DDoS 防護',
                '免費 CDN 加速',
                '無限制企業級功能'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'Cloudflare 免費計劃提供 SSL 證書、基本 DDoS 防護、CDN 加速等。企業級高級功能需要付費。'
        },
        {
            id: 'cf3',
            category: 'Cloudflare',
            question: 'Cloudflare Pages 可以用來做什麼？',
            type: 'single',
            options: [
                '免費托管靜態網站和 Jamstack 應用',
                '運行數據庫',
                '發送電子郵件',
                '視頻直播'
            ],
            correctAnswers: [0],
            explanation: 'Cloudflare Pages 是免費的靜態網站托管服務，支持 Git 自動部署，適合博客、文檔站點、前端項目等。'
        },
        {
            id: 'cf4',
            category: 'Cloudflare',
            question: 'Cloudflare Workers 的作用是什麼？',
            type: 'single',
            options: [
                '在邊緣節點運行 JavaScript 代碼的 Serverless 平台',
                '雇傭員工的平台',
                '監控服務器的工具',
                '設計網頁的軟體'
            ],
            correctAnswers: [0],
            explanation: 'Cloudflare Workers 讓你在全球邊緣節點運行 JavaScript 代碼，可用於 API 代理、請求處理、A/B 測試等，免費計劃每天 10 萬次請求。'
        },
        {
            id: 'cf5',
            category: 'Cloudflare',
            question: '如何將域名接入 Cloudflare？',
            type: 'single',
            options: [
                '將域名的 NS 記錄指向 Cloudflare 的名稱服務器',
                '發郵件申請',
                '付費購買',
                '無需任何操作'
            ],
            correctAnswers: [0],
            explanation: '接入 Cloudflare 需要在域名註冊商處將 NS (Name Server) 記錄改為 Cloudflare 提供的地址，然後 DNS 管理就轉移到 Cloudflare。'
        }
    ],

    // 網站架設
    webHosting: [
        {
            id: 'wh1',
            category: '網站架設',
            question: '什麼是域名 (Domain Name)？',
            type: 'single',
            options: [
                '網站的網址，如 example.com，是 IP 地址的可讀別名',
                '網站的密碼',
                '服務器的硬體',
                '編程語言'
            ],
            correctAnswers: [0],
            explanation: '域名是網站地址的可讀形式，DNS 會將域名解析為對應的 IP 地址，讓用戶可以用容易記憶的名稱訪問網站。'
        },
        {
            id: 'wh2',
            category: '網站架設',
            question: 'DNS 的全稱和作用是什麼？',
            type: 'single',
            options: [
                'Domain Name System，將域名解析為 IP 地址',
                'Data Network Service，傳輸數據',
                'Digital Naming Standard，命名標準',
                'Direct Network Signal，網絡信號'
            ],
            correctAnswers: [0],
            explanation: 'DNS (Domain Name System) 是「域名系統」，負責將人類可讀的域名（如 google.com）轉換為電腦可識別的 IP 地址。'
        },
        {
            id: 'wh3',
            category: '網站架設',
            question: '常見的 DNS 記錄類型有哪些？',
            type: 'multiple',
            options: [
                'A 記錄：域名指向 IPv4 地址',
                'CNAME 記錄：域名指向另一個域名',
                'MX 記錄：郵件服務器',
                'ZIP 記錄：壓縮文件'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'A 記錄指向 IP、CNAME 做別名、MX 用於郵件。沒有 ZIP 記錄，ZIP 是壓縮格式。'
        },
        {
            id: 'wh4',
            category: '網站架設',
            question: '什麼是 Web Hosting (網頁託管)？',
            type: 'single',
            options: [
                '提供存放網站文件和運行網站的服務器服務',
                '設計網頁的工作',
                '網絡安全服務',
                '域名註冊'
            ],
            correctAnswers: [0],
            explanation: 'Web Hosting 是讓網站文件能夠被訪問的服務，提供存儲空間、網絡帶寬、運行環境等，讓網站能 24 小時在線。'
        },
        {
            id: 'wh5',
            category: '網站架設',
            question: '什麼是 CDN (Content Delivery Network)？',
            type: 'single',
            options: [
                '內容分發網絡，將內容緩存到全球節點加速訪問',
                '編程語言',
                '數據庫類型',
                '操作系統'
            ],
            correctAnswers: [0],
            explanation: 'CDN 在全球多地設置緩存節點，用戶訪問時從最近的節點獲取內容，大大減少延遲，提升訪問速度。'
        },
        {
            id: 'wh6',
            category: '網站架設',
            question: 'CDN 的主要好處有哪些？',
            type: 'multiple',
            options: [
                '加速網站訪問速度',
                '減輕源服務器負載',
                '提供 DDoS 防護',
                '自動寫代碼'
            ],
            correctAnswers: [0, 1, 2],
            explanation: 'CDN 加速訪問、分擔源站流量、抵禦攻擊。但不能自動生成網站代碼。'
        },
        {
            id: 'wh7',
            category: '網站架設',
            question: 'SSL/TLS 證書的作用是什麼？',
            type: 'single',
            options: [
                '加密網站和用戶之間的通訊，啟用 HTTPS',
                '加速網站',
                '存儲密碼',
                '設計網頁'
            ],
            correctAnswers: [0],
            explanation: 'SSL/TLS 證書啟用 HTTPS 加密連接，保護數據傳輸安全，瀏覽器會顯示安全鎖標誌，也是 SEO 排名因素之一。'
        },
        {
            id: 'wh8',
            category: '網站架設',
            question: '如何獲取免費 SSL 證書？',
            type: 'multiple',
            options: [
                "Let's Encrypt",
                'Cloudflare 免費 SSL',
                '各託管商提供的免費證書',
                'SSL 證書必須付費'
            ],
            correctAnswers: [0, 1, 2],
            explanation: "Let's Encrypt 提供免費自動化證書，Cloudflare 也免費提供，很多託管商也有免費 SSL 選項，不一定要付費。"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.modernQuestions_part6 = modernQuestions_part6;
}
