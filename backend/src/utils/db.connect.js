const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/employee");
        console.log(`mongodb connected \${db.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = { connectDB };

