/**
 *  Utility for formatting a value as currency
 *  Used for example for representing a movie revenue to dollars
 * @param value The amount of money
 * @param toCurrency The currency we want
 */

const handleFormatAsCurrency = (value: number, toCurrency: string) => {
  const valueInCurrency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: toCurrency,
    maximumSignificantDigits: 9,
  }).format(value);

  return valueInCurrency;
};
export default handleFormatAsCurrency;
