console.assert(
    process.env.OPENROUTER_API_KEY,
    'OPENROUTER_API_KEY is not set in env variables'
)

export type ModelConfig = {
    apikey: string;
    httpRefer: string;
    xTitle: string;
    port: number;
    models: string[];
    temperature: number;
    maxTokens: number;
    systemPrompt: string;

    provider: {
        sort: {
            by: string,
            partition: string,
        }
    }
}

export const config: ModelConfig = {
    apikey: process.env.OPENROUTER_API_KEY!,
    httpRefer: 'http://pos-ia.com',
    xTitle: 'SmartModelRouterGateway',
    port: 3000,
    models: [
        'google/gemma-4-31b-it:free',
        'qwen/qwen3-next-80b-a3b-instruct:free',
        'openai/gpt-oss-120b:free'
    ],
    temperature: 0.2,
    maxTokens: 100,
    systemPrompt: 'You are a helpful assistant.',

    provider:{
        sort: {
            by: 'price',
            partition: 'none'
        }
    }
}