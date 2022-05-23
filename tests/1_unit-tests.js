const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const puzzles = require('../controllers/puzzle-strings.js');

const validPuzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."

const invalidCharPuzzle = "..9..5.1.85.4....2432...a..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."

const invalidLenPuzzle = "..9..5.1.85.4....2432.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."

suite('UnitTests', () => {
  for (let puzzle of puzzles) {
    test('#Logic handles a valid puzzle string of 81 characters', () => {
      assert.equal(solver.validate(puzzle[0]).valid, true)
    })    
  }

  test('#Logic handles a puzzle string with invalid characters', () => {
    assert.equal(solver.validate(invalidCharPuzzle).valid, false)
    assert.equal(solver.validate(invalidCharPuzzle).error, "Invalid characters in puzzle" )
  })  

  test('#Logic handles a puzzle string that is not 81 characters in length', () => {
    assert.equal(solver.validate(invalidLenPuzzle).valid, false)
    assert.equal(solver.validate(invalidLenPuzzle).error, "Expected puzzle to be 81 characters long" )
  })  

  test('#Logic handles a valid row placement', () => {
    assert.equal(solver.checkRowPlacement(validPuzzle, 0, 0, 2), true)
  })  

  test('#Logic handles a invalid row placement', () => {
    assert.equal(solver.checkRowPlacement(validPuzzle, 0, 0, 9), false)
  })

  test('#Logic handles a valid column placement', () => {
    assert.equal(solver.checkColPlacement(validPuzzle, 0, 0, 3), true)
  })  

  test('#Logic handles a invalid column placement', () => {
    assert.equal(solver.checkColPlacement(validPuzzle, 0, 0, 8), false)
  })

  test('#Logic handles a valid region placement', () => {
    assert.equal(solver.checkRegionPlacement(validPuzzle, 0, 0, 6), true)
  })  

  test('#Logic handles a invalid region placement', () => {
    assert.equal(solver.checkRegionPlacement(validPuzzle, 0, 0, 8), false)
  })

  test('#Valid puzzle strings pass the solver', () => {
    assert.equal(solver.solve(validPuzzle).valid, true)
  })  

  test('#Invalid puzzle strings fail the solver', () => {
    assert.equal(solver.solve(invalidCharPuzzle).valid, false)
  })

  test("Solver returns the expected solution for an incomplete puzzle", () => {
    assert.equal(solver.solve(puzzles[0][0]).solution, puzzles[0][1])
  })
});