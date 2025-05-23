const axios = require('axios');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, company, questions } = req.body;

        const columnValues = JSON.stringify({
            text_mkp8etzd: firstName,
            text_mkp83zaw: lastName,
            email_mkp8f725: { email: email, text: email },
            long_text_mkp8qjwq: questions
        });

        const query = `
            mutation {
                create_item (
                    board_id: 8753908537,
                    item_name: "${company}",
                    column_values: "${columnValues.replace(/"/g, '\\"')}"
                ) {
                    id
                }
            }
        `;

        const url = 'https://api.monday.com/v2';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MONDAY_API_TOKEN}`
        };

        try {
            const response = await axios.post(url, { query }, { headers });
            if (response.data.errors) {
                console.error('Error creating item:', response.data.errors);
                res.status(500).json({ error: 'Failed to create item.', details: response.data.errors });
            } else {
                res.status(200).json({ message: 'Item created successfully!', data: response.data });
            }
        } catch (error) {
            console.error('Error creating item:', error.response ? error.response.data : error.message);
            res.status(500).json({ error: 'Failed to create item.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
