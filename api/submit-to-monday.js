const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const boardId = 9365290800; // Your Monday board ID
  const apiKey = process.env.MONDAY_API_KEY;

  const columnValues = {
    phone_mkrvn3jx: {
      phone: phone,
      countryShortName: "us"
    },
    email_mkrvwb5m: {
      email: email,
      text: email
    }
  };

  const mutation = `
    mutation {
      create_item (
        board_id: ${boardId},
        item_name: "${name}",
        column_values: ${JSON.stringify(JSON.stringify(columnValues))}
      ) {
        id
      }
    }
  `;

  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey
      },
      body: JSON.stringify({ query: mutation })
    });

    const data = await response.json();

    if (data.errors) {
      console.error("Monday API error:", data.errors);
      return res.status(500).json({ error: "Monday API error", details: data.errors });
    }

    return res.status(200).json({ message: "Lead submitted successfully", itemId: data.data.create_item.id });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: "Failed to submit lead" });
  }
};
