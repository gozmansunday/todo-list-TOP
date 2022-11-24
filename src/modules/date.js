function getShortDate(fullDate) {
  const shortDate = `${fullDate.substring(8)}/${fullDate.substring(5,7)}`;
  return shortDate;
}

export const date = {
  getShortDate,
};