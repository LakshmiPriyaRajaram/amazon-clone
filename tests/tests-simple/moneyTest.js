import formatCurrency from "../../scripts/utils/money.js";

//automated tests
console.log('Test suite : Format currency')
console.log("converts cents to dollars");
formatCurrency(2095) === "20.95"
  ? console.log("passed")
  : console.log("failed");

console.log("works with 0");
formatCurrency(0) === "0.00" ? console.log("passed") : console.log("failed");

console.log("rounds off to nearest decimal");
formatCurrency(2000.5) === "20.01"
  ? console.log("passed")
  : console.log("failed");

console.log("rounds to nearest decimal");
formatCurrency(2000.4) === "20.00"
  ? console.log("passed")
  : console.log("failed");
