module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: [
    "js/cart.logic.js",
    "js/storage.js"
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 60,
      lines: 60,
      functions: 60,
      branches: 50
    }
  }
};