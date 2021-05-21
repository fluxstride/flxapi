# flxapi

<p> URL

> [https://flxapi.herokuapp.com](https://flxapi.herokuapp.com)

## Routes

### POST method route and its use

> -`"/person"` - it is used to create a new document in the database collection.

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



### GET method routes and their use

> 1.`"/person/:id"` - it is used to read/fetch the document with the specified id. Use this id "609e6c62ce8dfc001578df71" for test.
[https://flxapi.herokuapp.com/people/609e6c62ce8dfc001578df71](https://flxapi.herokuapp.com/people/609e6c62ce8dfc001578df71)

> 2.`"/people"` - it is used to read/fetch all documents in the database collection.
[https://flxapi.herokuapp.com/people](https://flxapi.herokuapp.com/people)


### PUT method route and its use

> -`"/people/:id"` - it is used to update the document with the specified id in the database collection. The request body must be an object which contains the key-value pairs you wish to update.

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



### DELETE methods route and its use

> -`"/people/:id"` - used to delete the document with the specified id in the database collection.
