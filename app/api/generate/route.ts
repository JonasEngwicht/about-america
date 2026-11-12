import OpenAI from 'openai';
import { NextResponse } from 'next/server';
const openai=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
export async function POST(req:Request){
 const secret=req.headers.get('x-admin-secret');
 if(!process.env.ADMIN_SECRET||secret!==process.env.ADMIN_SECRET) return NextResponse.json({error:'Unauthorized'},{status:401});
 const {sourceText,sourceUrl}=await req.json();
 if(!sourceText||!sourceUrl) return NextResponse.json({error:'sourceText and sourceUrl required'},{status:400});
 const r=await openai.responses.create({model:'gpt-4.1-mini',input:`Create a neutral English news brief from the supplied source only. Never invent facts. Return JSON with title, dek, body, category. Clearly attribute claims. Source URL: ${sourceUrl}

Source:
${sourceText}`});
 return NextResponse.json({draft:r.output_text,sourceUrl,status:'draft_needs_human_review'});
}