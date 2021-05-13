# flxapi
> API
[link](https://flxapi.herokuapp.com)


## Routes

### GET routes and their uses
> 

### PUT method routes

>"/people/:id" - it is used to update the document with the specified id in the database collection. The request body must be an object which contains the key-value pairs you wish to update. 

>"/people" - used to update documents that match the specified query in the request body. 

<p>N/B: The request body must be in JSON format, the 'database query' should ve</p>
<p>Below is an illustration of how the request body should be.</p>

```     
{   
    "query": <database query>,
    "update": <update object>
}
```



DELETE methods routes

"/people/:id" - used to update the document with the specified id in the database collection.

