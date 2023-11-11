import PriceUtils from "./PriceUtils";

export function calculateTotalPrice(data: any) {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += item?.service_examination?.price;
  }
  const price = PriceUtils.format(totalPrice);
  return price;
}

// function calculateTotalPrice(services: any) {
//   let totalPrice = 0;
//   for (const service of services) {
//     totalPrice += service.price;
//   }

//   return totalPrice;
// }
