
console.log("Inside Sum module");

// using common Js

var sumVariable = "I am a variable inside sum."
const calculateSum = (a,b)=>{
    console.log(a+b);
}

console.log(module.exports); // empty object

module.exports = {sumVariable, calculateSum }; 

// using esmodules

/*
export const sumVariable = "I am a variable inside sum."
export const calculateSum = (a,b)=>{
    console.log(a+b);
}
*/