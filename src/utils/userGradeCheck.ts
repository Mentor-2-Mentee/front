export const userGradeCheck = (
  ableGrade: string[],
  userGrade?: string
): boolean => {
  return Boolean(ableGrade.findIndex((grade) => grade === userGrade) !== -1);
};
