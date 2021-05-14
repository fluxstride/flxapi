# flxapi

<p> URL

> [https://flxapi.herokuapp.com](https://flxapi.herokuapp.com)

## Routes

### POST method routes and their use

> 1.`"/person"` - it is used to create a new document in the database collection.

<p>Note: The request body must be an object containing the following keys ("name","email","country") and these keys can have any value of your choice.
<p>Below is an illustration of how the request body should be.

```
{
    "name": <name value>,
    "email": <email value>,
    "country": <country value>
}
```

<p>example:

```
{
   "name":"newPerson",
   "email":"newPerson@gmail.com",
   "country":"USA"
}
```


> 2.`"/people"` - it is used to create a new set of documents.

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

<p>example:

```
[
   {
      "name":"person1",
      "email":"person1@gmail.com",
      "country":"country1"
   },
   {
      "name":"person2",
      "email":"person2@gmail.com",
      "country":"country2"
   },
   {
      "name":"person3",
      "email":"person3@gmail.com",
      "country":"country3"
   }
]
```


### GET method routes and their use

> 1.`"/person/:id"` - it is used to read/fetch the document with the specified id. Use this id "609e6c62ce8dfc001578df71" for test.
[https://flxapi.herokuapp.com/people/609e6c62ce8dfc001578df71](https://flxapi.herokuapp.com/people/609e6c62ce8dfc001578df71)

> 2.`"/people"` - it is used to read/fetch all documents in the database collection.
[https://flxapi.herokuapp.com/people](https://flxapi.herokuapp.com/people)


### PUT method routes and their use

> 1.`"/people/:id"` - it is used to update the document with the specified id in the database collection. The request body must be an object which contains the key-value pairs you wish to update.

<p>Below is an illustration of how the request body should be.

```
{
    <key-value pairs>
}
```

<p>example:

```
{
   "name":"newName",
   "email":"newName@gmail.com",
   "country":"newCountry"
}
```



> 2.`"/people"` - used to update documents that match the specified query in the request body.

<p>Below is an illustration of how the request body should be.</p>

```
{
    "query": <database query object>,
    "update": <update object>
}
```

<p>example:

```
{
   "query":{
      "name":"person1",
      "email":"person1@gmail.com",
      "country":"country1"
   },
   "update":{
      "name":"updateName",
      "email":"updateEmail@gmail.com",
      "country":"updateCountry"
   }
}
```


### DELETE methods routes and their use

> 1.`"/people/:id"` - used to delete the document with the specified id in the database collection.
