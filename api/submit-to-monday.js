// /api/submit-to-monday.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, phone, email } = req.body;

  if (!fullName || !phone || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const boardId = 9365290800;
  const itemName = fullName;
  const columnValues = {
    phone_mkrvn3jx: JSON.stringify({
      phone: "+1" + phone.replace(/\D/g, '').slice(-10)
    }),
    email_mkrvwb5m: email
  };

  const query = `
    mutation {
      create_item(
        board_id: ${boardId},
        item_name: "${itemName}",
        column_values: ${JSON.stringify(JSON.stringify(columnValues))}
      ) {
        id
      }
    }
  `;

  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.MONDAY_API_KEY
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Monday API error:', data.errors);
      return res.status(500).json({ message: 'Monday API error', errors: data.errors });
    }

    res.status(200).json({ message: 'Item created successfully', data });
  } catch (error) {
    console.error('Request failed:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
