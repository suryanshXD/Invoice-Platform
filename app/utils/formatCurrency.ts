export function formatCurrency(
  amount: number,
  currency: "USD" | "EUR" | "INR"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
