require('dotenv').config()
const admin = require("firebase-admin");

const serviceAccount = require("../config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

module.exports = admin
