import PriceUtils from "./PriceUtils";

export const findPayment = (data: any[]) => {
  const noPayment = data.find((i) => i.paymentStatus === "unpaid");
  return noPayment;
};

export const findDoneService = (data: any[]) => {
  const done = data.find(
    (i) => i.status === "waiting" || i.status === "running"
  );
  return done;
};

export const fintPricePaymented = (data: any[]) => {
  const list = data?.filter((i) => i.paymentStatus === "paid");
  if (!list) return PriceUtils.format(0);
  let totalPrice = 0;
  for (const item of list) {
    totalPrice += item?.service_examination?.price;
  }
  return totalPrice;
};

export const findPriceTotal = (data: any[]) => {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += item?.service_examination?.price;
  }
  const price = fintPricePaymented(data);
  return totalPrice - price;
};
