require("dotenv").config();
let express = require("express");
let { MongoClient, ObjectId } = require("mongodb");
let connectionString = process.env.MONGODB_URI || process.env.OFF_URI


let app = express();
let port = process.env.PORT || 4000;
app.use(express.json());

let client = new MongoClient(connectionString, { useUnifiedTopology: true });

app.get("/", (req, res) => {
    res.send("welcome to flxapi");
});

// initializing CRUD operations

// C -> CREATE
// create a single document
app.post("/person", (req, res) => {
    client.connect((err, connectedClient) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        console.log("A successful connection has been made to the db");
        let db = connectedClient.db("samuel");

        let person = req.body;
        db.collection("db").findOne({email:person["email"]},(err,data)=>{
        if(data){
        	res.status(500).json({message:"A document with the specified email already exits, try using another email"})
        }else if(!data){
        if((!person.name && !person.email && !person.country) || typeof person === "string"){
            return res.status(500).json({message:"Problem with the request body"})
        }
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
                if((!person.name && !person.email && !person.country) || typeof person === "string"){
                    return res.status(500).json({message:"Problem with the request body"})
                }
                return res.status(200).json({
                    message: "A new document has been created succesfully",
                    data: data.ops[0],
                })
            },
        );
        }
        })
    });
});


// R -> READ
// fetch a single document
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
// fetch multiple documents
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
                        message: "Database is empty please create a new document",
                    });
                }
                if (err) {
                    return res.status(500).json({ message: err });
                }
                return res.status(200).json({
                    message: "Documents fetched successfully",
                    data: {   
                               documentsCount: result.length,
                               documents:result
                          }
                });
            });
    });
});

// U -> UPDATE
// update a single document
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


//Delete operation
// delete a single document 
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
