# flxapi
> Below is the hosted API
[link](https://flxapi.herokuapp.com)


## Routes

### GET routes and their uses
> 

### PUT method routes

>"/people/:id" - it is used to update the document with the specified id in the database collection. The request body must be an object which contains the key-value pairs you wish to update. 

>"/people" - used to update documents that match the specified query in the request body. 

<p>N/B: The <queryObject> must be in JSON format and the request body must be an object which contains the key-value pairs you wish to use in initiating the update.</p>
<p>Below is an illustration of how the request body should be.</p>

 ```     
        {"name" : <name value>,
        "email" : <email value>,
        "country" : <country value>}
 ```



DELETE methods routes

"/people/:id" - used to update the document with the specified id in the database collection.

