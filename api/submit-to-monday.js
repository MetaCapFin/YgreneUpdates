// pages/api/submit-to-monday.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const boardId = "9365290800";

  // Prepare column values using proper formatting for phone/email columns
  const columnValues = {
    phone_mkrvn3jx: { phone: phone, countryShortName: "us" },
    email_mkrvwb5m: { email: email, text: email },
  };

  const mutation = `
    mutation {
      create_item (
        board_id: ${boardId},
        item_name: "${name}",
        column_values: """${JSON.stringify(columnValues)}"""
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
        Authorization: `Bearer ${process.env.MONDAY_API_KEY}`, // Securely stored in Vercel env vars
      },
      body: JSON.stringify({ query: mutation }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Monday API error:", result.errors);
      return res.status(500).json({
        error: "Monday API error",
        details: result.errors,
      });
    }

    res.status(200).json({ success: true, itemId: result.data.create_item.id });
  } catch (error) {
    console.error("Error submitting to Monday.com:", error);
    res.status(500).json({ error: "Server error" });
  }
}


