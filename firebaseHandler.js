const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key JSON file

function initializeFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://memecontestbot-20f9e.firebaseio.com' // Replace with your Firebase Realtime Database URL
  });
}

module.exports = { initializeFirebase };
