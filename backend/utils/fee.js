// Helper function to calculate total
const calculateTotal = (cartItems, shippingFee) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingFee + tax;
  return total;
};


module.exports = calculateTotal;