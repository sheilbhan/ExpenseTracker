export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if(!name) return "";

  const words = name.split(" ");
  let initals = "";

  for(let i = 0; i<Math.min(words.length,2); i++){
    initals += words[i][0];
  }
  return initals.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if(num == null || isNaN(num)) return "";

  const [integerPart,fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?= (\d{3}) + (?!\d))/g, ".");

  return fractionalPart
  ?`${formattedInteger}.${fractionalPart}`
  :formattedInteger;
};


import moment from 'moment';

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category || 'Other',
    amount: item?.amount || 0,
    month: moment(item?.date).format('MMM'), // "Jul", "Aug", etc.
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month : moment(item?.date).format("Do MMM YYYY"),
    amount : item?.amount,
    source : item?.source,
  }));

  return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date)-new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month : moment(item?.date).format('Do MMM'),
    amount : item?.amount,
    category: item?.category,

  }));

  return chartData;
};