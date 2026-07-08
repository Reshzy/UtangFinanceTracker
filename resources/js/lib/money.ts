/**
 * Formats an integer amount in the smallest currency unit for display.
 */
export function formatMoney(amountInSmallestUnit: number, currency = 'PHP'): string {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amountInSmallestUnit / 100);
}
