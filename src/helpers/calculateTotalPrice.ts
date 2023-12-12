import PriceUtils from "./PriceUtils";

export function calculateTotalPrice(data: any) {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += item?.service_examination?.price;
  }
  const price = PriceUtils.format(totalPrice);
  return price;
}

export function calculateTotalPriceNoFomat(data: any) {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += item?.service_examination?.price;
  }
  return totalPrice;
}
export function calculateTotalPricePrescription(data: any) {
  let totalPrice = 0;
  for (const prescription of data) {
    for (const item of prescription?.medicines || []) {
      totalPrice += item?.medicineId?.price * item?.quantity;
    }
  }
  return totalPrice;
}

export function calculateTotalPricePrescription2(data: any) {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += item?.medicineId?.price;
  }
  const price = PriceUtils.format(totalPrice);
  return price;
}
export function totalPrice(data: any) {
  let totalPrice = 0;
  for (const item of data) {
    totalPrice += item?.price;
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

export function readNumberToVietnameseWords(number: number) {
  const unit = ["", "nghìn", "triệu", "tỷ"];
  const numberWords = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const separator = " ";

  function readThreeDigits(number: number) {
    const hundred = Math.floor(number / 100);
    const ten = Math.floor((number % 100) / 10);
    const one = number % 10;

    let result = "";
    if (hundred > 0) {
      result += numberWords[hundred] + separator + "trăm" + separator;
    }

    if (ten > 1) {
      result += numberWords[ten] + separator + "mươi" + separator;
    } else if (ten === 1) {
      result += "mười" + separator;
    }

    if (one > 0 && ten !== 1) {
      result += numberWords[one] + separator;
    }

    return result;
  }

  if (number === 0) {
    return "không đồng";
  }

  let result = "";
  let unitIndex = 0;

  while (number > 0) {
    const threeDigits = number % 1000;
    if (threeDigits > 0) {
      result =
        readThreeDigits(threeDigits) + unit[unitIndex] + separator + result;
    }

    number = Math.floor(number / 1000);
    unitIndex++;
  }

  return result.trim();
}
