// /api/submit-to-monday.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, phone, email, fallbackQuestion } = req.body;

  if (!fullName || !phone || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const boardId = 9365290800;
  const itemName = fullName;

  const formattedPhone = `+1${phone.replace(/\D/g, '').slice(-10)}`;

  const columnValues = {
    phone_mkrvn3jx: {
      phone: formattedPhone,
      countryShortName: 'US'
    },
    email_mkrvwb5m: {
      email: email,
      text: fullName
    }
  };

  // Include fallbackQuestion if present
  if (fallbackQuestion) {
    columnValues["long_text_mkrzeg3q"] = fallbackQuestion;
  }

  const columnValuesStr = JSON.stringify(columnValues)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

  const query = `
    mutation {
      create_item(
        board_id: ${boardId},
        item_name: "${itemName}",
        column_values: "${columnValuesStr}"
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
      console.error('Monday API error:', JSON.stringify(data.errors, null, 2));
      return res.status(500).json({ message: 'Monday API error', errors: data.errors });
    }

    return res.status(200).json({ message: 'Item created successfully', data });
  } catch (error) {
    console.error('Request failed:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
