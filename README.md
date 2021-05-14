# flxapi

> API
> [link](https://flxapi.herokuapp.com)

## Routes

### POST method routes and their use

> `"/person"` - it is used to create a new document in the database collection.

<p>Note: The request body must be an object containing the following keys ("name","email","country") and these keys can have any value of your choice.
<p>Below is an illustration of how the request body should be.
```
{
    "name": <name value>,
    "email": <email value>,
    "country": <country value>
}
```
<p> Test the route with the example request body below
```
{
   "name":"TestPerson",
   "email":"TestPerson@gmail.com",
   "country":"TestCountry"
}
```

> `"/people"` - it is used to create a new set of documents.

<p>Note: The request body must be an array of objects contianing the following keys ("name","email","country") and the keys can have any value of your choice.
<p>Below is an illustration of how the request body should be.

```
[
    {
        "name": <name value>,
        "email": <email value>,
        "country": <country value>
    },
    {
        "name": <name value>,
        "email": <email value>,
        "country": <country value>
    },
    {
        "name": <name value>,
        "email": <email value>,
        "country": <country value>
    }
]
```

### GET method routes and their use

> `"/person/:id"` - it is used to read/fetch the document with the specified id. Use this id "609d265862db0e00155e5dcd" for test.

> `"/people"` - it is used to read/fetch all documents in the database collection.

### PUT method routes and their use

> `"/people/:id"` - it is used to update the document with the specified id in the database collection. The request body must be an object which contains the key-value pairs you wish to update.

<p>Below is an illustration of how the request body should be.

```
{
    <key-value pairs>
}
```

> `"/people"` - used to update documents that match the specified query in the request body.

<p>Below is an illustration of how the request body should be.</p>

```
{
    "query": <database query object>,
    "update": <update object>
}
```

### DELETE methods routes and their use

> `"/people/:id"` - used to delete the document with the specified id in the database collection.
