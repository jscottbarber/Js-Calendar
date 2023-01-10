// import { readFileSync, writeFileSync } from "fs"
// const fs = require("fs")

function readDb(dbName = "db.json") {
  fetch(dbName)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
}
// function readDb(dbName = "db.json") {
//   // read JSON object from file
//   const data = readFileSync(dbName, "utf8")
//   return JSON.parse(data)
// }

// function writeDb(obj, dbName = "db.json") {
//   if (!obj) return console.log("Please provide data to save")
//   try {
//     // TODO Could create a backup before overwriting
//     writeFileSync(dbName, JSON.stringify(obj)) //overwrites current data
//     return console.log("SAVE SUCESS")
//   } catch (err) {
//     return console.log("FAILED TO WRITE")
//   }
// }

// module.exports = { readDb, writeDb }

export { readDb }
