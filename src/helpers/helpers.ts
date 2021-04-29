import APIError from "./APIError";

const isDateValid = (oldDate: Date, newDate: Date): any => {
  if (newDate < oldDate) {
    return false;
  }

  return true;
};

export { isDateValid };
