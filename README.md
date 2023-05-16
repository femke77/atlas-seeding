USAGE:

Example usage is using the movie database org API.

```
https://www.themoviedb.org
```

Sign up for an api key:

```
https://www.themoviedb.org/settings/api
```

Create a database/collection on MongoDB Atlas, grab the connection string and insert it into your config/connection.js. Be sure you include the database name in the connection string otherwise it will just point to 'test'.
I left the connection string exposed in my connection.js if you need to see what it looks like.

Go to insomnia and hit the endpoint you are interested in with your api key.

Once you have it working and your response object is correct, click the down arrow next to the send button and choose to create client code with javascript/fetch.

Make sure you install node-fetch@2 so that you can use fetch on the server side. 

Paste the client code into the seed.js
Refer to seed.js for remaining code.

This particular api only gives part of the poster path, as it should to reduce repeatative code stored in the the db, so here is how to contruct the whole poster path for your code:

````
https://image.tmdb.org/t/p/original/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg
````
