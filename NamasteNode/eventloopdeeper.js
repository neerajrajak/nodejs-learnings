const fs = require("fs");
const { promiseHooks } = require("v8");

const a = 100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise").then(() => console.log("Promise callback executed"));

fs.readFile("./hello.txt", "utf-8", () => {
  console.log("File read cb executed.");
});

process.nextTick(() => console.log("Procee nexttick callback executed"));

setTimeout(() => console.log("setTimeout callback executed."), 0);

function printA() {
  console.log("Value of a = ", a);
}

printA();

console.log("Last line of a file.");

