export const formatCurrency = (
  num: number | null | undefined,
  currency: string,
): string | null => {
  if (num == null) {
    return null;
  }

  // ToDo: Include i18n
  return Intl.NumberFormat("es-CL", {
    currency: currency,
    style: "currency",
  }).format(num);
};
