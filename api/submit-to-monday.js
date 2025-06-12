export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { fullName, phone, email } = req.body;

  const boardId = '9365290800';
  const phoneColumnId = 'phone_mkrvn3jx';
  const emailColumnId = 'email_mkrvwb5m';

  const columnValues = {
    [phoneColumnId]: phone,
    [emailColumnId]: email
  };

  const query = `
    mutation {
      create_item(
        board_id: ${boardId},
        item_name: "${fullName}",
        column_values: "${JSON.stringify(columnValues).replace(/"/g, '\\"')}"
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
      return res.status(500).json({ error: 'Failed to create item' });
    }

    res.status(200).json({ success: true, itemId: data.data.create_item.id });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

