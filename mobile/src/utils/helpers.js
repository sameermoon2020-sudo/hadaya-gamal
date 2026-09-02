export const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('ar-SA');
};

export const truncateText = (text, length = 50) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const openWhatsApp = (phoneNumber, message = '') => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return url;
};