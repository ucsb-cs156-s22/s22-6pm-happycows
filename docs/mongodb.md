 # Configuring for MongoDB

 In the file `.env.SAMPLE` you'll find the variable `MONGODB_URI`:

 ```text
MONGODB_URI=see-instructions-in-readme
 ```


 After copying this to `.env`, you should change the value in `.env` (leave `.env.SAMPLE` unmodified!) from `see-instructions-in-readme` to a MongoDB connection URL such as this.  
 
 Note that a real string will have a different value for `usernameGoesHere`, `passwordGoesHere`,  `abcde`, and possibly for `database`.

```
mongodb+srv://usernameGoesHere:passwordGoesHere@cluster0.abcde.mongodb.net/database?retryWrites=true&w=majority
```

For information on where to get the MongoDB URL string, consult the MongoDB 
documentation on the course website: <https://ucsb-cs156.github.io/topics/mongodb/>
 
Note that the application will at least start up with fake values for the username, password, and database, but if the host in the URI does not exist, you
may get a fatal error on startup (i.e. at the `mvn spring-boot:run` stage.)