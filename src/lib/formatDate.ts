// Deterministic date formatting helpers to avoid SSR/CSR differences
export function formatDMY(dateInput: string | number | Date) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  // Formatear la fecha forzando la zona horaria del club (Chile)
  return new Intl.DateTimeFormat("es-CL", { 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
    timeZone: "America/Santiago" 
  }).format(d).replace(/\//g, "-");
}

export function formatLocaleLong(dateInput: string | number | Date, locale = "es-CL") {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  // Aquí usamos America/Santiago para que los partidos se vean en el día correcto en Chile
  return new Intl.DateTimeFormat(locale, { 
    day: "2-digit", 
    month: "long", 
    year: "numeric", 
    timeZone: "America/Santiago" 
  }).format(d);
}

// Deterministic currency formatting to avoid SSR/CSR mismatch from
// `Number.prototype.toLocaleString` in different environments.
export function formatCurrencyCLP(amount?: number | null) {
  if (amount == null || Number.isNaN(Number(amount))) return ""
  // Format as CLP without fraction digits, use simple grouping with regex
  const num = Math.round(Number(amount))
  return `CLP ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}
