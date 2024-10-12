

require("./xyz.js");
// const { sumVariable, calculateSum } =require("./calculate/sum.js");
// const { calculateMultiply } = require("./calculate/multiply.js");
const { calculateMultiply, calculateSum, sumVariable } = require("./calculate");
const data = require("./data.json");
const util = require("node:util");
// import { sumVariable, calculateSum } from "./sum.js";

console.log();

var a = 10;
var b = 20;

// console.log(globalThis);
// console.log(globalThis === global);

calculateSum(a,b);

calculateMultiply(a,b);

console.log(sumVariable);

console.log(data);
