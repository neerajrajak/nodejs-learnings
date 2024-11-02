
const { MongoClient } = require("mongodb");

const URI = "mongodb+srv://fitapp-user:fitapp2024@fitapp-01.lcn5r.mongodb.net/?retryWrites=true&w=majority&appName=fitapp-01";

const client = new MongoClient(URI);

const dbname = "namastenode";

async function main() {
    await client.connect();
    console.log("connected to server.");
    
    const db = client.db(dbname);
    const collection = db.collection("User");
    return "done";
}

main()
.then(console.log)
.catch(console.error)
.finally(()=> client.close());
