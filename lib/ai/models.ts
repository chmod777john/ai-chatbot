import {  createOpenAI } from '@ai-sdk/openai';
import { createDeepSeek  } from '@ai-sdk/deepseek';
const deepseek = createDeepSeek({
  baseURL: 'http://localhost:6006/v1',
  apiKey: 'sk-9e5f87ef885e43f1bce4c8f35ce309c6'
})

import { createOllama } from 'ollama-ai-provider';
const ollama = createOllama({
  baseURL: 'http://localhost:6006/v1'
})

const openai = createOpenAI({
  baseURL: 'http://localhost:6006/v1',
  apiKey: 'ollama'
})

import { fireworks } from '@ai-sdk/fireworks';
import {
  customProvider,
  extractReasoningMiddleware,
  LanguageModel,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'ds';

export const myProvider = customProvider({
  languageModels: {
    'chat-model-small': openai('gpt-4o-mini'),
    'chat-model-large': openai('gpt-4o'),
    'chat-model-reasoning': wrapLanguageModel({
      model: fireworks('accounts/fireworks/models/deepseek-r1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': openai('gpt-4-turbo'),
    'artifact-model': openai('gpt-4o-mini'),
    'ds': openai('deepseek-r1:32b') as LanguageModel
  },
  imageModels: {
    'small-model': openai.image('dall-e-2'),
    'large-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'Small model',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    name: 'Large model',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
];
