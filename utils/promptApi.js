const URL = "http://localhost:3000";

export const getAllPrompts = async () => {
  const res = await fetch(`${URL}/api/prompt`, {
    next: { revalidate: 0 },
  });

  return res.json();
};

export const addPrompt = async ({ prompt, userId, tag }) => {
  const res = await fetch(`${URL}/api/prompt/new`, {
    next: { revalidate: 0 },
    method: "POST",
    body: JSON.stringify({
      userId,
      prompt,
      tag,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return res.json();
};
