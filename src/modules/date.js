function getShortDate(fullDate) {
  const dateDay = fullDate.substring(8);
    const dateMonth = fullDate.substring(5,7);
    const shortDate = `${dateDay}/${dateMonth}`;

    return shortDate;
}

export const date = {
  getShortDate,
};