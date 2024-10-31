const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 3;

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key)=>{
    console.log("crypto 1 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key)=>{
    console.log("crypto 2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key)=>{
    console.log("crypto 3 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key)=>{
    console.log("crypto 4 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key)=>{
    console.log("crypto 5 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key)=>{
    console.log("crypto 6 done");
});

