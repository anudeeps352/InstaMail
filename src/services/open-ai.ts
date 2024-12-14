import { getOpenAIKey } from '@/utils/getApiKey';

const OPENAI_API_KEY = getOpenAIKey();

export async function generateEmail(
  productName: string,
  productDescription: string,
  PromptTemplate: string
) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert email writer. Write a professional email for a company.',
        },
        {
          role: 'user',
          content: `
Write a professional email using the following details:
- Product Name: ${productName}
- Product Description: ${productDescription}
- Call to Action: ${PromptTemplate}
`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || 'Failed to generate email');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
