export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
};

export const getStockStatus = (stock: number, stockMinimo: number) => {
  if (stock === 0) return 'agotado';
  if (stock <= stockMinimo) return 'stock_bajo';
  return 'normal';
};