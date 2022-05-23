const stringParse = require("../helper/stringParse.js");
const arrParse = require("../helper/arrParse.js");

class SudokuSolver {

  validate(puzzleString) {

    if (puzzleString.length < 81 || puzzleString.length > 81) {
      return {
        valid: false,
        error: "Expected puzzle to be 81 characters long"
      }
    }
    
    for (let i = 0; i < puzzleString.length; i++) {
      if (!puzzleString[i].match(/^[1-9]$|^\.$/g)) {
        return {
          valid: false,
          error: "Invalid characters in puzzle" 
        }
      }
    }

    return {valid: true};
  }

  checkRowPlacement(puzzleString, row, column, value) {

    const arr = stringParse(puzzleString)

    for (let i = 0; i < arr.length; i++) {  
      
      if (arr[row][i] == value) {

          return false;
        
      }
      
    }

    return true;
    
  }

  checkColPlacement(puzzleString, row, column, value) {
    
    const arr = stringParse(puzzleString);

    for (let i = 0; i < arr.length; i++) {  
      
      if (arr[i][column] == value) {

          return false;
        
      }
      
    }

    return true;
    
  }

  checkRegionPlacement(puzzleString, row, column, value) {

    const arr = stringParse(puzzleString);
    
    let sqrt = Math.floor(Math.sqrt(arr.length));
    
    let boxRowStart = row - row % sqrt;
    
    let boxColStart = column - column % sqrt;
 
    for (let i = boxRowStart; i < boxRowStart + sqrt; i++) {
      
        for (let j = boxColStart; j < boxColStart + sqrt; j++) {
          
            if (arr[i][j] == value) {
              
                return false;
              
            }
          
        }
      
    }

    return true;
    
  }

  isSafe(arr, row, column, value) {

    for (let i = 0; i < arr.length; i++) {  
      
      if (arr[row][i] == value) {

          return false;
        
      }
      
    }

    for (let i = 0; i < arr.length; i++) {  
      
      if (arr[i][column] == value) {

          return false;
        
      }
      
    }

    let sqrt = Math.floor(Math.sqrt(arr.length));
    
    let boxRowStart = row - row % sqrt;
    
    let boxColStart = column - column % sqrt;
 
    for (let i = boxRowStart; i < boxRowStart + sqrt; i++) {
      
        for (let j = boxColStart; j < boxColStart + sqrt; j++) {
          
            if (arr[i][j] == value) {
              
                return false;
              
            }
          
        }
      
    }

    return true;
  }

  solve(puzzleString) {

    const validity = this.validate(puzzleString)

    if (!validity.valid) {
      return validity
    }

    const arr = stringParse(puzzleString);
    const n = arr.length;

    const self = this

    function sol(arr, n){
      
      let row = -1;
      let col = -1;
      let isEmpty = true;
      
      for (let i = 0; i < n; i++) {
        
        for (let j = 0; j < n; j++) {
          
          if (arr[i][j] == 0) {
            
              row = i;
              col = j;
              isEmpty = false;
              break;
            
          }
          
        }
      
        if (!isEmpty) {
          
            break;
          
        }
        
      }
      
      if (isEmpty) {
        
          return true;
        
      }
  
      for(let num = 1; num <= n; num++) {

          if (self.isSafe(arr, row, col, num)) {
            
              arr[row][col] = num;
            
              if (sol(arr, n)) {

                return true;
                
              } else {
                
                arr[row][col] = 0;
                
              }
            
          }
        
      }
      
      return false;
      
    }

    if (sol(arr, n)) {
      
      return { valid: true, solution: arrParse(arr) }
      
    } else {
      
      return { valid: false, error: 'Puzzle cannot be solved' }
      
    }
    
  }
  
}

module.exports = SudokuSolver;