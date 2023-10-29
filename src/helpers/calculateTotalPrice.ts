export function calculateTotalPrice(services: any) {
  let totalPrice = 0;
  for (const service of services) {
    totalPrice += service.price;
  }

  return totalPrice;
}
