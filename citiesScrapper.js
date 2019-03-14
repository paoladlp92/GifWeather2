const fs = require("fs");
const client = require("mongodb").MongoClient;

fs.readFile('./mx.json', 'utf8', function(error, data) {
    if(error) {
        console.log(error);
        return;
    }
    const parsedData = JSON.parse(data);
    client.connect("mongodb://localhost:27017", function(errordb, dbClient) {
        if(errordb) {
            console.log(errordb);
            return;
        }
        const db = dbClient.db("mexicanCities");
        db.createCollection("Cities", function(errorcollection, cities) {
            if(errorcollection) {
                console.log(errorcollection);
                return;
            }

            const citiesToInsert = parsedData.map(parsedElement => {
                return {name: parsedElement.city};
            });

            cities.insertMany(citiesToInsert, function(errorinsert, result) {
                if(errorinsert)
                console.log(errorinsert);
            });
            console.log("Cities added succesfuly");
            dbClient.close();
            process.exit(0);
        });
    });
});
//mexican cities csv
//https://simplemaps.com/data/mx-cities
//https://simplemaps.com/resources/free-country-cities