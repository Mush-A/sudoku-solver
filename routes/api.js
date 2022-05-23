'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const rowNumber = require("../helper/rowNumber.js");
const stringParse = require("../helper/stringParse.js");

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      
      const {puzzle, coordinate, value} = req.body;

      if (!coordinate || !value || !puzzle) {
        return res.json({ error: "Required field(s) missing" })
      }

      if (!value.match(/^[1-9]$/g)) {
        return res.json({ error: "Invalid value" })
      }

      if (!coordinate.match(/^[a-iA-I][1-9]$/g)) {
        return res.json({ error: "Invalid coordinate" })
      }
      
      const strValidity = solver.validate(puzzle)

      if (!strValidity.valid) {
        return res.json({error: strValidity.error})
      }

      const coord = coordinate.split(/(?<=[a-zA-Z])(?=[1-9])/g);
      const row = rowNumber(coord[0]) - 1
      const column = coord[1] - 1

      if (stringParse(puzzle)[row][column] == value) {
        return res.json({valid: true})
      }

      const conflict = []

      if (!solver.checkRowPlacement(puzzle, row, column, value)) {
        conflict.push("row")
      }
      
      if (!solver.checkColPlacement(puzzle, row, column, value)) {
        conflict.push("column")
      }
      
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
        conflict.push("region")
      }

      if (conflict.length > 0) {
        return res.json({valid: false, conflict})
      }
      
      return res.json({valid: true})
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {

      const { puzzle } = req.body;

      if (!puzzle) {
        return res.json({ error: "Required field missing" })
      }

      const strValidity = solver.validate(puzzle)

      if (!strValidity.valid) {
        return res.json({error: strValidity.error})
      }

      const answer = solver.solve(puzzle)

      if (answer.valid) {
        
        return res.json({solution: answer.solution})
        
      } else {

        return res.json({error: answer.error})
        
      }
      
    });
};
