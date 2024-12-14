export function getOpenAIKey(): string {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API Key is not set in the environment variables.');
  }

  return apiKey;
}