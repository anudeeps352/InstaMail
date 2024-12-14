import getPromptTemplate from '@/utils/prompts';
import { generateEmail } from '@/services/open-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { productName, productDescription, cta } = await req.json();
  const PromptTemplate = getPromptTemplate(cta);

  try {
    const emailDraft = await generateEmail(
      productName,
      productDescription,
      PromptTemplate
    );
    return NextResponse.json({ success: true, emailDraft }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
