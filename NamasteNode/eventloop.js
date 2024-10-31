const fs = require("fs");

const a = 100;

setImmediate(()=> console.log("setImmediate"));

fs.readFile("./hello.txt", "utf-8", () => {
    console.log("File read cb executed.");
});

setTimeout(() => console.log("setTimeout callback executed."), 0);

function printA(){
    console.log("Value of a = ", a);
    
}

printA();

console.log("Last line of a file.");
