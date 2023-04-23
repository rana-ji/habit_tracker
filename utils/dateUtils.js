//function to format date in readable format
function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

//getting previous 7 days date from today
function getDatesArray(numDays) {
  const dates = [];
  const today = new Date();
  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
}

// exporting both the funcitons
module.exports = {
  formatDate,
  getDatesArray,
};
