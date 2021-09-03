export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // Open connection to the database `shop-shop` with the version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    // Create variables to hold reference to the database, transaction (tx), 
    // and object store
    let db, tx, store;

    // If version has changed (or if this is the first time using the database), 
    // run this method and create the three object stores
    request.onupgradeneeded = function(e) {
      const db = request.result;

      // Create object store for each type of data and set "primary" key index to
      // be the `_id` of the data
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // On database open succuess
    request.onsuccess = function(e) {

      // Save a reference of the database to the `db` variable
      db = request.result;

      // Open a transaction to whatever is passed into `storeName` 
      // must match one of the object store names
      tx = db.transaction(storeName, 'readwrite');

      // Save a reference to that object store
      store = tx.objectStore(storeName);

      // If there's any errors, display them
      db.onerror = function(e) {
        console.log('error', e);
      };

      // Checking what value of method is
      switch (method) {

        // Overwrite any data with the matching id for put requests
        case 'put': 
          store.put(object);
          resolve(object);
          break;

        // Getting all data from object store and return it for get requests
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;

        // Delete the item from the object store
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // When the transaction is complete, close the connection
      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
