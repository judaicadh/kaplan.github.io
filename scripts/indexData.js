const algoliasearch = require('algoliasearch');
const items = require('/items.json'); // Adjust path accordingly

const client = algoliasearch('YourApplicationID', 'YourAdminAPIKey');
const index = client.initIndex('archival_items');

index
    .saveObjects(items.rows, { autoGenerateObjectIDIfNotExist: true })
    .then(({ objectIDs }) => {
        console.log(objectIDs);
    })
    .catch(err => {
        console.error(err);
    });