export function formatCurrency(
  value: number,
  isNegative: boolean = false
): string {
  if (isNegative) {
    value = value * -1;

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
