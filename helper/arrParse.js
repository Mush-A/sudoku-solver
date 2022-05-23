function arrParse(arr) {
  const str = []

  for (let i = 0; i < 9; i++) {
    
    for (let j = 0; j < 9; j++) {
    
      str.push(arr[i][j])
      
    }
   
  }

  return str.join('')
  
}

module.exports = arrParse;