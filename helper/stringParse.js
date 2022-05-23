function stringParse(str) {

  const arr = []
  
  for (let i = 0; i < 9; i++) {
    
    let row = []
    
    for (let j = 0; j < 9; j++) {
      
      let num = 0

      if (str[j + i * 9] == ".") num = 0
      else num = Number(str[j + i * 9])
      
      row.push(num)
    } 
    arr.push(row)
  }
  return arr
}

module.exports = stringParse