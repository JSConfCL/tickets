export const pluralize = (
  num: number | null,
  single: string,
  plural: string,
): string => {
  if (num == null) {
    return "";
  }

  return num === 1 ? single : plural;
};
