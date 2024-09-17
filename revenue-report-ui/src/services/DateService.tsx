const zeroPad = (val: number | string, places: number) => {
  if (!val) val = "";
  else val = val.toString();
  while (val.length < places) {
    val = "0" + val;
  }
  return val;
};
const currentDate = () => {
  const date = new Date();
  const dateString = `${zeroPad(date.getFullYear(), 4)}-${zeroPad(date.getMonth(), 2)}-${zeroPad(date.getDate(), 2)}`;
  console.log(dateString);
  return dateString;
};

const locateMonthApprox = (month: string) => {
  month = month.toLowerCase();
  if (month.includes("jan")) return "1";
  if (month.includes("feb")) return "2";
  if (month.includes("mar")) return "3";
  if (month.includes("apr")) return "4";
  if (month.includes("may")) return "5";
  if (month.includes("jun")) return "6";
  if (month.includes("jul")) return "7";
  if (month.includes("aug")) return "8";
  if (month.includes("sep")) return "9";
  if (month.includes("oct")) return "10";
  if (month.includes("nov")) return "11";
  if (month.includes("dec")) return "12";
  return new Date().getMonth();
};

export { zeroPad, currentDate, locateMonthApprox };
