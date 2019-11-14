const Firestore = require('@google-cloud/firestore');

const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS
const projectId = process.env.GOOGLE_PROJECT_ID

class FireStore {
  constructor(args){

    this.checkCredentials = this.checkCredentials.bind(this)
    this.testConnection = this.testConnection.bind(this)

    if ( !this.checkCredentials() ) return null
    
    this.db = new Firestore({
      projectId,
      keyFilename,
    });
  }

  checkCredentials(){
    if ( !keyFilename || !projectId ) throw 'GOOGLE_APPLICATION_CREDENTIALS and GOOGLE_PROJECT_ID env is required'
    else return true
  }

  testConnection(collectionName='trips'){
    this.db.collection(collectionName).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  save(data){}
}

module.exports.FireStore = FireStore
