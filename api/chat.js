// /api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Invalid request format: "messages" array required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4', // or 'gpt-3.5-turbo' depending on your plan
        messages,
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.error('OpenAI API error:', data);
      return res.status(500).json({ message: 'OpenAI API error', error: data });
    }

    const reply = data.choices?.[0]?.message?.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
}
