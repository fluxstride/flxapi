# flxapi
> API
[link](https://flxapi.herokuapp.com)


## Routes

### GET routes and their uses
>"/person/:id" - it is used to read/fetch the document with the specified id. Use this id for test(609d265862db0e00155e5dcd)

>"/people" - it is used to read/fetch all documents in the database collection.

### PUT method routes

>"/people/:id" - it is used to update the document with the specified id in the database collection. The request body must be an object which contains the key-value pairs you wish to update.
<p>Below is an illustration of how the request body should be.</p>

```
{
  <key-value pairs> 
}
```

>"/people" - used to update documents that match the specified query in the request body. 

<p>Below is an illustration of how the request body should be.</p>

```     
{   
    "query": <database query object>,
    "update": <update object>
}
```



DELETE methods routes

"/people/:id" - used to update the document with the specified id in the database collection.

