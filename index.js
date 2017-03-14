const fs = require('fs');
const thereIsDotEnv = fs.existsSync('.env')
if ( thereIsDotEnv ) require('dotenv').config()

const app = require('./server/app');
const db = require('./server/db');

const dbURI = process.env.DB_URI || 'mongodb://localhost/demo-passport-jwt';
const PORT = process.env.PORT || 3000;

db.open(dbURI);
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));