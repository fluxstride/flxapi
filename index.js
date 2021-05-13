let express = require("express");
let { MongoClient, ObjectId } = require("mongodb");
let connectionString =
    "mongodb+srv://admin:admin@apis.eqlrf.mongodb.net/api1?retryWrites=true&w=majority";

let app = express();
let port = process.env.PORT || 4000;
app.use(express.json());

let client = new MongoClient(connectionString, { useUnifiedTopology: true });

app.get("/", (req, res) => {
    res.send("welcome to flxapi");
});

// initializing CRUD operations

// C -> CREATE
// Creating a single document
app.post("/person", (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        console.log("A successful connection has been made to the db");
        let db = connectedClient.db("samuel");

        let person = req.body;

        db.collection("db").insertOne(
            {
                name: person.name,
                email: person.email,
                country: person.country,
            },
            (err, data) => {
                
                if (err) {
                    return res.status(500).json({ message: err });
                }
                return res.status(200).json({
                    message: "A new document has been created succesfully",
                    data: data.ops[0],
                })
                if(!req.body){
                	res.status(500).json(message:"request body can't be empty")
                }
            },
        );
    });
});
//Creating multiple documents
app.post("/people", (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        console.log("A successful connection has been made to the db");
        let db = connectedClient.db("samuel");

        let people = req.body;

        db.collection("db").insertMany([...people], (err, data) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            return res.status(200).json({
                message: "A new set of documents have been created",
                data: {
                    createCount: data.ops.length,
                    createdDocuments: data.ops,
                },
            });
        });
    });
});

// R -> READ
// Getting a single document
app.get("/people/:id", (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        console.log("Connected to db successfully");
        let db = connectedClient.db("samuel");
        let id =
            req.params.id.length === 24
                ? req.params.id
                : "60963f0ab7be5a2f5e1b1346";

        db.collection("db").findOne({ _id: ObjectId(id) }, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            } else if (!result) {
                return res.status(404).json({
                    message: "Can't find a document with the specified id",
                });
            }
            return res.status(200).json({
                message: "Document fetched successfully",
                data: result,
            });
        });
    });
});
// Getting multiple documents
app.get("/people", (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        console.log("Connected to db successfully");
        let db = connectedClient.db("samuel");
        db.collection("db")
            .find({})
            .toArray((err, result) => {
                if (!result.length) {
                    return res.status(404).json({
                        message: "Database is empty",
                    });
                }
                if (err) {
                    return res.status(500).json({ message: err });
                }
                return res.status(200).json({
                    message: "Documents fetched successfully",
                    data: result,
                });
            });
    });
});

// U -> UPDATE
app.put("/people/:id", (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        console.log("Connected to db successfully");
        let db = connectedClient.db("samuel");
        let person = req.body;

        let setV = {};
        if (person.name) {
            setV.name = person.name;
        }
        if (person.email) {
            setV.email = person.email;
        }
        if (person.country) {
            setV.country = person.country;
        }

        console.log(req.params.id.length);

        //error handler
        let id =
            req.params.id.length === 24
                ? req.params.id
                : "60963f0ab7be5a2f5e1b1346";

        //querying the database
        db.collection("db").findOneAndUpdate(
            { _id: ObjectId(id) },
            {
                $set: {
                    ...setV,
                },
            },
            { returnOriginal: false },
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: err });
                } else if (!result["value"]) {
                    return res.status(404).json({
                        message: "Can't find a document with the specified id",
                    });
                }
                return res.status(200).json({
                    message: "Document updated successfully",
                    data: result["value"],
                });
            },
        );
    });
});

// update many documents using a single key-value pair query at a time
app.put("/people", (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        console.log("Connected to db successfully");

        let requestBody = req.body;

        //let query = JSON.parse(req.query.query);
        console.log(requestBody);

        let updateObj = {};
        if (requestBody.update.name) {
            updateObj.name = requestBody.update.name;
        }
        if (requestBody.update.email) {
            updateObj.email = requestBody.update.email;
        }
        if (requestBody.update.country) {
            updateObj.country = requestBody.update.country;
        }

        let db = connectedClient.db("samuel");

        db.collection("db").updateMany(
            requestBody["query"],
            {
                $set: updateObj,
            },
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: err });
                } else if (!result) {
                    return res.status(404).json({
                        message:
                            "Can't find a documents with the specified query",
                    });
                }
                return res.status(200).json({
                    message: "Document updated successfully",
                    data: { updateCount: result.result.nModified },
                });
            },
        );
    });
});

//Delete operation
app.delete("/people/:id", (req, res) => {
    client.connect((err, connectedClient) => {
        let db = connectedClient.db("samuel");

        //error handler
        let id =
            req.params.id.length === 24
                ? req.params.id
                : "60963f0ab7be5a2f5e1b1346";

        //querying the database
        db.collection("db").findOneAndDelete(
            { _id: ObjectId(id) },
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: err });
                } else if (!result["value"]) {
                    return res.status(404).json({
                        message: "Can't find a document with the specified id",
                    });
                }
                return res.status(200).json({
                    message: "Document deleted successfully",
                    data: { deletedDocument: result["value"] },
                });
            },
        );
    });
});

app.listen(port, () => {
    console.log("server listening to port " + port);
});
