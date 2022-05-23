const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const validPuzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

const invalidCharPuzzle = "..9..5.1.85.4....2432...a..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."

const invalidLenPuzzle = "..9..5.1.85."

const unsolvablePuzzle = "8.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

const validSolution = "769235418851496372432178956174569283395842761628713549283657194516924837947381625";

suite('Functional Tests', () => {
  
  test('Solve with valid puzzle: POST request to /api/solve', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle
    })
    .end((err, res) => {
      assert.equal(res.body.solution, validSolution);
      done();
    });
  });

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: ""
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Required field missing");
      done();
    });
  });

  test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: invalidCharPuzzle
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Invalid characters in puzzle");
      done();
    });
  });

  test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: invalidLenPuzzle
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
      done();
    });
  });

  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: unsolvablePuzzle
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Puzzle cannot be solved");
      done();
    });
  });

  test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle,
      coordinate: "A1",
      value: 7
    })
    .end((err, res) => {
      assert.equal(res.body.valid, true);
      done();
    });
  });

  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle,
      coordinate: "A1",
      value: 6
    })
    .end((err, res) => {
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 1);
      done();
    });
  });

  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle,
      coordinate: "A1",
      value: 8
    })
    .end((err, res) => {
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 2);
      done();
    });
  });

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle,
      coordinate: "E3",
      value: 9
    })
    .end((err, res) => {
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 3);
      done();
    });
  });

  test('Check a puzzle placement with missing required fields: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle,
      coordinate: "E3",
      value: ""
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Required field(s) missing");
      done();
    });
  });

  test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: invalidCharPuzzle,
      coordinate: "E3",
      value: "4"
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Invalid characters in puzzle");
      done();
    });
  });

  test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: invalidLenPuzzle,
      coordinate: "E3",
      value: "4"
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
      done();
    });
  });

  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle,
      coordinate: "Ek3",
      value: "4"
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Invalid coordinate");
      done();
    });
  });

  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      puzzle: validPuzzle,
      coordinate: "E3",
      value: "ff"
    })
    .end((err, res) => {
      assert.equal(res.body.error, "Invalid value");
      done();
    });
  });
});

