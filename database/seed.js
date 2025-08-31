const mongoose = require("mongoose");
const User = require("./schema/User");
const Event = require("./schema/Event");
const sampleData = require("./sample_data.json");

// Replace with your MongoDB URI (from Atlas or local MongoDB)
const MONGO_URI = "mongodb://127.0.0.1:27017/campus_pulse";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB Connected");

    await User.deleteMany({});
    await Event.deleteMany({});

    const users = await User.insertMany(sampleData.users);
    console.log("Users added");

    const events = sampleData.events.map(e => ({
      ...e,
      createdBy: users[0]._id   // link event to first user
    }));

    await Event.insertMany(events);
    console.log("Events added");

    mongoose.connection.close();
  })
  .catch(err => console.log(err));
