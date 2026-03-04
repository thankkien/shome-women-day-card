import { data } from "../configs/data";
import { randomInRange } from "./random";

const keys = Object.keys(data);
const values = Object.values(data);

const getLetter = () => {
  const randomIndex = randomInRange(0, keys.length - 1);
  return values[randomIndex];
};

export const getLetterBody = () => {
  const letter = getLetter();
  return letter.split("\n").map((line) => ({ text: line, isBody: true }));
};
