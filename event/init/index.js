// const mongoose = require("mongoose");
// const Listing=require("../models/listing.js");
// const Data=require("./data.js");

// let mongourl="mongodb://localhost:27017/mydatabase";

// main()
// .then(()=>{
//     console.log("mongo working");
// });

// async function main(){
//     await mongoose.connect(mongourl);
// }; 

// const initDB=async ()=>{
//     await Listing.deleteMany({});
//     Data.data=Data.data.map((obj)=>({...obj,  owner:'67ea40ee7918ca67a42c005b'}))
//     await Listing.insertMany(Data.data);
//     console.log("inserted many");
// } 
// initDB(); 



const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Data = require("./data.js");
const User = require("../models/user.js");

const mongourl = "mongodb://localhost:27017/mydatabase";

async function main() {
  await mongoose.connect(mongourl);
  console.log("mongo working");
  await createUserAndSeedListings();
  process.exit();
}

async function createUserAndSeedListings() {
  try {
    // Remove existing users to avoid duplicate key error
    await User.deleteMany({});

    // Create a new user
    const user = new User({ email: "example@example.com", username: "example" });
    await user.setPassword("password");
    await user.save();

    // Delete existing listings and seed new ones with the created user's ID
    await Listing.deleteMany({});
    Data.data = Data.data.map((obj) => ({ ...obj, owner: user._id }));
    await Listing.insertMany(Data.data);   
    console.log("inserted many");
  } catch (err) {
    console.error(err);
  }
}

main();

