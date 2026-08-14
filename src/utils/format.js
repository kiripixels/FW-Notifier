function formatMoney(amount) {
  if (!amount || amount.value === undefined || amount.value === null) return null;
  return `$${Number(amount.value).toFixed(2)} ${amount.currency}`;
}

function last(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(-n) : str;
}

function truncateEmail(email) {
  if (!email || typeof email !== 'string') return email;
  const atIndex = email.indexOf('@');
  if (atIndex <= 1) return email;

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex);
  const masked = localPart[0] + '*'.repeat(localPart.length - 1);

  return masked + domain;
}

module.exports = { formatMoney, last, truncateEmail };