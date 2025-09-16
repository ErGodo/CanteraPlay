// Deterministic date formatting helpers to avoid SSR/CSR differences
export function formatDMY(dateInput: string | number | Date) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export function formatLocaleLong(dateInput: string | number | Date, locale = "es-CL") {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

// Deterministic currency formatting to avoid SSR/CSR mismatch from
// `Number.prototype.toLocaleString` in different environments.
export function formatCurrencyCLP(amount?: number | null) {
  if (amount == null || Number.isNaN(Number(amount))) return ""
  // Format as CLP without fraction digits, use simple grouping with regex
  const num = Math.round(Number(amount))
  return `CLP ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}
