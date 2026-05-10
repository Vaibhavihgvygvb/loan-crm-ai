export const formatCurrency = (
  amount: number
) => {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);
};

export const formatNumber = (
  value: number
) => {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);
};

export const formatPercentage = (
  value: number
) => {
  return `${value}%`;
};

export const formatDate = (
  date: string
) => {
  return new Date(
    date
  ).toLocaleString();
};