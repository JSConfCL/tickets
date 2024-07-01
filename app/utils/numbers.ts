export const formatCurrency = (
  num?: number | null,
  currency?: string | null,
): string | null => {
  if (num == null || currency == null) {
    return null;
  }

  let money = num;

  if (currency === "USD") {
    money = num / 100;
  }

  // ToDo: Include i18n
  return Intl.NumberFormat("es-CL", {
    currency: currency,
    style: "currency",
  }).format(money);
};
