export const formatDate = (str: string | null | undefined): string | null => {
  if (!str) {
    return null;
  }

  return new Date(str).toLocaleString();
};
