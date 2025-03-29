const selectNumber = <T>(value: T, defaultValue = 0) => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return defaultValue;
};

export default selectNumber;
