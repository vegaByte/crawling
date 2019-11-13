const Firestore = require('@google-cloud/firestore');

const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS
const projectId = process.env.GOOGLE_PROJECT_ID

console.log({keyFilename, projectId})

if ( !keyFilename || !projectId ) throw 'GOOGLE_APPLICATION_CREDENTIALS and GOOGLE_PROJECT_ID env is required'

const db = new Firestore({
  projectId,
  keyFilename,
});

db.collection('trips').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
