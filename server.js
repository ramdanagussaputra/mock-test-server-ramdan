// DEPENDENCIES
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

// SETUP ENVIROMENT VARIABLE
dotenv.config(path.join(__dirname, '.env'));

// SETUP DATABASE
mongoose.set('strictQuery', false);

(async () => {
    const DB = process.env.MONGODB_URL.replace(
        '<password>',
        process.env.MONGODB_PASSWORD
    );
    const con = await mongoose.connect(DB);

    console.log(con.connection.host);
})();

// SETUP PORT
const port = process.env.PORT || 9002;

// START SERVER
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
