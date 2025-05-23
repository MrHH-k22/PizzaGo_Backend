const nodemailer = require("nodemailer");

// Create reusable transporter
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.NODEMAILER_ACCOUNT,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function sendMail(to, type, data) {
  let subject = "Announcement from PizzaGo";
  let html = "";

  // Generate email content based on type
  switch (type) {
    case "order-status":
      subject = `Pizza Order Status Update: ${data.newStatus.toUpperCase()} - PizzaGo`;
      html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f7fc;
          color: #333;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
        }
        h2 {
          color: #d84315;
          text-align: center;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: bold;
          margin: 10px 0;
          background-color: #f5a623;
          color: white;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        .items-table th, .items-table td {
          padding: 8px;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Pizza Order Status Update</h2>
        <p>Hello,</p>
        <p>Your order status has been updated.</p>
        <div class="status-badge">${data.newStatus.toUpperCase()}</div>
        <p>${data.statusMessage}</p>
        
        <h3>Order Summary:</h3>
        <table class="items-table">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          ${data.orderItems
            .map(
              (item) => `
            <tr>
              <td>${item.foodItemId.name || "Pizza Item"}</td>
              <td>${item.quantity}</td>
              <td>$${item.quantity * item.foodItemId.price}</td>
            </tr>
          `
            )
            .join("")}
          <tr>
            <td colspan="2"><strong>Total:</strong></td>
            <td><strong>$${data.totalPrice.toFixed(2)}</strong></td>
          </tr>
        </table>
        
        <div class="footer">
          <p>Thank you for choosing PizzaGo!</p>
        </div>
      </div>
    </body>
  </html>
  `;
      break;
    // Other email types can be added here
  }

  // Actually send the email - this part was missing
  try {
    const info = await transporter.sendMail({
      from: `"PizzaGo" <${process.env.NODEMAILER_ACCOUNT}>`,
      to: to,
      subject: subject,
      html: html,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Export the function
module.exports = sendMail;
