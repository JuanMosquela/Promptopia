import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { revalidateTag } from "next/cache";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    const reqTag = req.nextUrl.searchParams.get("tag");
    console.log(reqTag);
    revalidateTag(reqTag);

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
