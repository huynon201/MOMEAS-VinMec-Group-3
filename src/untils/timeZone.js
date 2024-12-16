const options = {
  timeZone: "Asia/Ho_Chi_Minh",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

const formatDate = (date) => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }

  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
  return formattedDate;
};
module.exports = {
  formatDate,
};
