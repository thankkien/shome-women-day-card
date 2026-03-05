import { data } from "../configs/data";
import { randomInRange } from "./random";

const keys = Object.keys(data);
const values = Object.values(data);
const length = keys.length;

const validIndexes = (idx) =>
  typeof idx === "number" && idx >= 0 && idx < length;

const storeToLocalStorage = (idx) => {
  localStorage.setItem("letterIndex", idx);
};

const getFromLocalStorage = () => {
  const idx = Number(localStorage.getItem("letterIndex"));
  return validIndexes(idx) ? idx : null;
};

const getLetter = () => {
  const idx = getFromLocalStorage();
  if (idx !== null) {
    return values[idx];
  }
  const randomIndex = randomInRange(0, length - 1);
  storeToLocalStorage(randomIndex);
  return values[randomIndex];
};

const DEFAULT_LETTER =
  "Dù ở vai trò nào, bạn cũng đang làm rất tốt theo cách riêng của mình. S.Home nhìn thấy điều đó và luôn biết ơn vì bạn đã ở đây.\nChúc bạn ngày 8/3 thật tràn đầy yêu thương, nhiều tiếng cười và thật nhiều ước mơ được thực hiện. From S.Home with love 💐";

export const getLetterBody = () => {
  const letter = getLetter() || DEFAULT_LETTER;
  return letter.split("\n").map((line) => ({ text: line, isBody: true }));
};
