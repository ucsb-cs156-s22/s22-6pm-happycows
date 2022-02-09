# H2 Database

When running on localhost, this code base uses a temporary database built on a technology called H2.

An H2 database is not necessarly suitable for a production application; it may not handle concurrent access with
good performance, for example.  But for testing purposes, it's just fine, and has some advantages:

* you don't have to manage a separate server process (all of the code is built-in to the Spring Boot framework)
* you don't have to install a separate database on your system (e.g. Postgres, MySQL, etc.)

# Resetting the Database

The temporary database is stored in the `target` directory, so any time you do a `mvn clean` operation, that database is wiped away
so that you can start from scratch.

This is both good and bad; the key thing is to be aware of this.

# The H2 Console

It isn't necessarily a course goal for you to become fully proficient in SQL (Structured Query Language, the language used to manipulate databases.)

But a little SQL can go a long way, and it can sometimes be helpful to peek under the hood at the database to see what's going on.

When running on localhost, an H2-Console can be accessed from the menu bar.  

<img alt="H2-Console button" img="https://user-images.githubusercontent.com/1119017/150202561-c945edc9-ec67-4d13-aa20-029521905ef2.png" width="200" />

When you click on `H2-Console`, you get a page like this one:


<img alt="H2 console login prompt" src="https://user-images.githubusercontent.com/1119017/150202636-31c4c579-cb15-4add-a4e9-37fd7d3a6c3e.png" width="500" />

The username/password are set in the file `src/main/resources/application-development.properties`, for example:

```
spring.datasource.username=sa
spring.datasource.password=password`
```

Note that the value `password` for a password is of course a terrible choice; but keep in mind that this is only for localhost testing, 
which is by definition not avaiable on the public internet, so security here is not a primary concern.  When deploying on Heroku, an entirely
different database system and password management system is in place.

Once you enter the username and password and press Connect, you may see a warning like this about the password `password`, which is probably fine to ignore.
If it annoys you, perhaps choose a different random (but not one that you use for any other system!)


<img alt="warning about password" src="https://user-images.githubusercontent.com/1119017/150203204-6ba97002-74df-4f0f-a7ba-239eaf659a6f.png" width="500" />

After that, you should see a page that looks like this.   We will leave it to you to discover the things you can do here.  An SQL tutorial may help; a good one can be found here: <https://www.w3schools.com/sql/>

![image](https://user-images.githubusercontent.com/1119017/150203565-860ed0dc-ed8d-4618-865e-f58673532669.png)

