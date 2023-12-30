function formatDateForDefaultValue(inputDate) {
  // Convert input date string to Date object
  const dateObject = new Date(inputDate.replace(/(\d+)(st|nd|rd|th)/, "$1"));
  // Extract date components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  // Format date as 'yyyy-MM-dd'
  return year + "-" + month + "-" + day;
}

export default formatDateForDefaultValue;
