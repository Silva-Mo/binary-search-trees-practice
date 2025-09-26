const removeDuplicates = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (!newArray.includes(element)) {
      newArray.push(element);
    }
  });
  return newArray;
};

export { removeDuplicates };
