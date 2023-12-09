import numeral from "numeral";

export default class PriceUtils {
  static format = (price: any, currency = "đ") => {
    if (typeof price !== "number" && typeof price !== "string") {
      return price;
    }

    if (typeof price === "string") {
      if (price.indexOf(currency) !== -1) {
        return price;
      }
      return (
        numeral(parseInt(price)).format("0,0").replace(/,/g, ".") + currency
      );
    }

    return numeral(price).format("0,0").replace(/,/g, ".") + currency;
  };

  static removeDot = (value: any) => {
    return value
      .toString()
      .replace(/\./g, "")
      .replace(/\,/g, "")
      .replace(/[^\d\.]/g, "");
  };

  static addCommas = (number: any) => {
    if (number == undefined) {
      number = 0;
    }
    let numberString = PriceUtils.removeDot(number).toString();
    if (numberString.charAt(0) == "0" && numberString?.length > 1) {
      numberString = numberString?.slice(1);
    }
    if (numberString.length > 3) {
      const parts = [];
      const length = numberString.length;
      let count = 0;
      let part = "";
      for (let i = length - 1; i >= 0; i--) {
        if (count < 3 && i >= 0) {
          part += numberString[i];
          count++;
        } else {
          parts.push(part);
          part = numberString[i];
          count = 1;
        }
      }
      if (part.length > 0) parts.push(part);
      const reversed = parts.join(".");
      let normal = "";
      for (let i = reversed.length - 1; i >= 0; i--) {
        normal += reversed[i];
      }
      return normal;
    } else {
      return numberString;
    }
  };

  static readGroup = (group: any) => {
    let readDigit = [
      " Không",
      " Một",
      " Hai",
      " Ba",
      " Bốn",
      " Năm",
      " Sáu",
      " Bảy",
      " Tám",
      " Chín",
    ];
    var temp = "";
    if (group == "000") return "";
    temp = readDigit[parseInt(group.substring(0, 1))] + " Trăm";
    if (group.substring(1, 2) == "0")
      if (group.substring(2, 3) == "0") return temp;
      else {
        temp += " Lẻ" + readDigit[parseInt(group.substring(2, 3))];
        return temp;
      }
    else temp += readDigit[parseInt(group.substring(1, 2))] + " Mươi";
    if (group.substring(2, 3) == "5") temp += " Lăm";
    else if (group.substring(2, 3) != "0")
      temp += readDigit[parseInt(group.substring(2, 3))];
    return temp;
  };
}
