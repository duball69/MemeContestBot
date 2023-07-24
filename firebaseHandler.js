const admin = require('firebase-admin');

function initializeFirebase() {
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY); // Get the serviceAccount from the config variable

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://memecontestbot-20f9e.firebaseio.com' // Replace with your Firebase Realtime Database URL
  });
}

module.exports = { initializeFirebase };
