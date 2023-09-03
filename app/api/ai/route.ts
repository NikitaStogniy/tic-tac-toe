import { NextResponse } from "next/server";
import { OpenAI } from "openai";


  
 export async function POST(req:Request, res:Response) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_KEY
    })
    const prompt = await req.json();
    const completion = await openai.chat.completions.create({

      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt.message }],
      max_tokens: 10,
      temperature: 0.6,
    });
    console.log(completion.choices[0].message)
    return NextResponse.json({ result: completion.choices[0].message }, {status: 200});
  }