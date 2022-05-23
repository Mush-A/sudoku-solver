function rowNumber (row) {

  let key = row.toUpperCase();
  
  const rowNums = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9
  }

  if (rowNums[key]) {
    return rowNums[key]
  }

  return false;
}

module.exports = rowNumber;