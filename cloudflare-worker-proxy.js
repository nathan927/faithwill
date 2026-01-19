/**
 * AI Teacher API Proxy - Cloudflare Worker
 * 
 * 這個 Worker 作為 API 代理，隱藏真實的 API Key
 * 
 * 設置步驟：
 * 1. 在 Cloudflare Dashboard 創建一個新的 Worker
 * 2. 將此代碼貼上
 * 3. 在 Settings > Variables 添加環境變量：
 *    - OPENROUTER_API_KEY: 你的 OpenRouter API Key
 *    - ALLOWED_ORIGINS: 允許的網域（例如：https://nathanyuen.org）
 */

export default {
    async fetch(request, env) {
        // CORS 預檢請求處理
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        // 只接受 POST 請求
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        try {
            // 解析請求
            const body = await request.json();
            const { provider, model, messages, max_tokens } = body;

            // 獲取對應的 API Key（從環境變量）
            let apiKey = '';
            let endpoint = '';

            switch (provider) {
                case 'openrouter':
                default:
                    apiKey = env.OPENROUTER_API_KEY;
                    endpoint = 'https://openrouter.ai/api/v1/chat/completions';
                    break;
            }

            if (!apiKey) {
                return new Response(JSON.stringify({ error: 'API key not configured' }), {
                    status: 500,
                    headers: corsHeaders(),
                });
            }

            // 構建請求
            const apiResponse = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: model || 'xiaomi/mimo-v2-flash:free',
                    messages: messages,
                    max_tokens: max_tokens || 16384,
                }),
            });

            const data = await apiResponse.json();

            // 返回結果
            return new Response(JSON.stringify(data), {
                status: apiResponse.status,
                headers: corsHeaders(),
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: corsHeaders(),
            });
        }
    },
};

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };
}
