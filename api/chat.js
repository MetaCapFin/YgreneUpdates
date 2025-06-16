// /api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'Invalid request format: "message" string required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is missing.');
    return res.status(500).json({ message: 'Missing OpenAI API Key' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      // inside your fetch() POST body
      body: JSON.stringify({
         model: 'gpt-3.5-turbo',
         messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ OpenAI API error:', data);
      return res.status(500).json({ message: 'OpenAI API error', error: data });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(500).json({ message: 'No reply returned from OpenAI', data });
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
}

