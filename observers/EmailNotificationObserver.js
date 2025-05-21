const OrderStatusObserver = require("./OrderStatusObserver");
const sendMail = require("../nodemailer/sendMail");
const { Account } = require("../models/account");

class EmailNotificationObserver extends OrderStatusObserver {
  async update(order, prevStatus) {
    try {
      // Get customer email from order
      const customer = await Account.findById(order.customerId);
      if (!customer || !customer.email) {
        console.error("Customer email not found for order:", order._id);
        return;
      }

      // Prepare email data based on status change
      const emailData = this._prepareEmailData(order, prevStatus);

      // Send notification email
      await sendMail(customer.email, "order-status", emailData);
    } catch (error) {
      console.error("Error sending order status notification email:", error);
    }
  }

  _prepareEmailData(order, prevStatus) {
    // Create appropriate email content based on the status change
    const statusMessages = {
      pending: "Your order has been received and is pending confirmation.",
      confirmed: "Your order has been confirmed and is being prepared.",
      delivering: "Your order is now out for delivery!",
      completed: "Your order has been delivered. Enjoy your meal!",
    };

    return {
      orderId: order._id,
      orderItems: order.items,
      prevStatus: prevStatus,
      newStatus: order.status,
      statusMessage:
        statusMessages[order.status] || "Your order status has been updated.",
      totalPrice: order.totalPrice,
    };
  }
}

module.exports = EmailNotificationObserver;
