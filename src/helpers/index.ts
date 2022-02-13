export const getGradeAverage = (grades: string[]) => {
  const gradeValues: number[] = grades.map(grade => parseInt(grade));

  const total = gradeValues.reduce((acc, curr) => {
    return acc + curr;
  });

  const average = total / gradeValues.length;

  return average.toFixed(3);
};
