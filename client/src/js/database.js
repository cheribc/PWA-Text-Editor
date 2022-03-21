import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate'))
            {
                console.log('jate database already exists');
            return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// Method that accepts some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content) => {
    
    console.log('PUT to the database');
    // connect to DB and version we want to use
    const jateDb = await openDB('jate', 1);
    // make new transaction...need to specify the DB we are posting to and the data privileges. 
    const tx = jateDb.transaction('jate', 'readwrite');
    // open the object store
    const store = tx.objectStore('jate');
    // use the .add() method to pass in content
    const request = store.put({ id: 1, value: content });
    // confirm the data was added
    const result = await request;
    console.log('🚀 - data saved to the database', result.value);
};

// Method that gets all the content from the database
export const getDb = async () => {
    console.log('GET from the database');

    // connect to DB and version we want to use
    const jateDb = await openDB('jate', 1);
    // make new transaction...need to specify the DB we are posting to and the data privileges. 
    const tx = jateDb.transaction('jate', 'readonly');
    // open the object store
    const objStore = tx.objectStore('jate');
    // use the .get() method to grab specified content in the DB
    const request = store.get(1);
    // confirm that the data was fetched
    const result = await request;
    result
        ? console.log('🚀 - data retrieved from the database', result.value)
        : console.log('🚀 - data not found in the database');
        // Optional Chaining-Check to see if a variable is defined and return it if it is
        return result?.value;
    };



initdb();