import prompts from '@/data/prompts.json';

export default function getPromptTemplate(cta: string): string {
  const template = prompts[cta as keyof typeof prompts];
  return template;
}
