export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { name, phone, email } = req.body;

  const boardId = "9365290800";

  // These must be proper JSON strings (escaped once)
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
        Authorization: `Bearer ${process.env.MONDAY_API_KEY}`
      },
      body: JSON.stringify({ query: mutation })
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Monday API error:", result.errors);
      return res.status(500).json({ error: "Monday API error", details: result.errors });
    }

    res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error("Error submitting to Monday.com:", error);
    res.status(500).json({ error: "Server error" });
  }
}
