const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return "Недостатня вага";
  if (bmi < 25) return "Нормальна вага";
  if (bmi < 30) return "Надмірна вага";
  return "Ожиріння";
};

export default getBMICategory;
