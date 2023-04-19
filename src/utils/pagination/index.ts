export const calculateMaxPage = (total: number, per_page: number) => {
  return Math.floor((total - 1) / per_page) + 1;
};
