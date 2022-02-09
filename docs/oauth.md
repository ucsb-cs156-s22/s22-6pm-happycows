# OAuth Setup

This Spring Boot application is set up to use Google OAuth as it's authentication scheme.

Setting this up on localhost requires the first two steps below; getting this to work on Heroku requires an additional third step.

1. Obtaining a Google *client id* and *client secret*, which is
   done at the [Google Developer Console](https://console.cloud.google.com/).
2. Configuring the `.env` file with these values.
3. Copying the `.env` values to the Heroku app's configuration values.

Each of these three steps is explained in more detail below.

# About the `.env` and `.env.SAMPLE` files.

* The `.env` file is created by copying it from `.env.SAMPLE` and then editing it, e.g.
  
  ```
  cp .env.SAMPLE .env
  ```
* Recall that `.env` and `.env.SAMPLE` will not show up in regular directory listings; files starting with `.` are considered
  hidden files.  Use `ls -a`, or configure your Mac finder/Windows explorer to show hidden files.
* As explained below, put your client-id and client-secret into `.env`, NOT in `.env.SAMPLE` 
* `.env` is never committed to the GitHub repo
* There is more information about `.env` vs. `.env.SAMPLE` on this page if you are interested: [docs/environment-variables](environment-variables.md).


## Step 1: Obtain a Google client id and client secret

1. Login to the Google Developer Console at <https://console.cloud.google.com/>.

2. Create a new project on the top left (or select the project you would like to create your OAuth app in)

2. On the upper left, there is a hamburger menu icon that provides a left navigation menu.
   
   * Look for `APIs and Services` then `Credentials`.
   * On that page, near the top, click the button for `+ CREATE CREDENTIALS`
   * This makes a pull-down menu where you can select `OAuth Client ID`
   * For Application Type, select `Web Application`
   * For name, choose something you will remember; I suggest using the name of your repo, or the name of the Heroku application
   * Scroll down to the part of the page that says: `Authorized redirect URIs`

3. Under `Authorized redirect URIs`, you'll need to click the `+ ADD URI` button twice to enter two addresses:

   * For localhost, enter: `http://localhost:8080/login/oauth2/code/google`
     - Note that this *must* be `http` not `https`
   * For Heroku, enter: `https://myappname.herokuapp.com/login/oauth2/code/google`
     - Note that you should substitute in *your* app name in place of `my-app-name`
     - Note that this *must* be `https` not `http`

   ![image](https://user-images.githubusercontent.com/1119017/149854295-8e1c4c63-929c-4706-972d-1962c644a40a.png)

   Then click the blue `CREATE` button.
   
   You will now see the client id and client secret values.
   
   Keep this window open, since you'll need these values in the next step.
   
## Step 2: Copy `.env.SAMPLE` to `.env` and enter values

In the frontend directory, use this command to copy `.env.SAMPLE` to `.env`.  Recall that you
may need to use `ls -a` to get the files to show up, since they are hidden files on Unix-like systems.

```
cp .env.SAMPLE .env
```

The file `.env.SAMPLE` **should not be edited;** it is intended to
be a template for creating a file called `.env` that contains
your repository secrets.

The `.env` is in the `.gitignore` because **a file containing secrets should NOT be committed to GitHub, not even in a private repo.

After copying, the file `.env` looks like this:

```
GOOGLE_CLIENT_ID=see-instructions
GOOGLE_CLIENT_SECRET=see-instructions
ADMIN_EMAILS=phtcon@ucsb.edu
```

Replace `see-instructions` with the appropriate values.

For ADMIN_EMAILS, add your own email and any teammates you are collaborating with after phtcon.ucsb.edu; you can separate multiple emails with commas, e.g.

```
ADMIN_EMAILS=phtcon@ucsb.edu,cgaucho@ucsb.edu,ldelplaya@ucsb.edu
```

With this done, you should be all set to run on localhost.

For Heroku, there is one more step.

## Step 3: Copying `.env` values to Heroku

The easy way, using the Heroku CLI:

(Note: if you don't access to the Heroku CLI, scroll down to "the tedious way")

1.  Make sure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) installed.
2.  Login with `heroku login`
3.  Use this command, with the name of your app in place of `my-heroku-app`

    ```
    heroku config:set --app my-heroku-app  `cat .env` 
    ```

    You should get output like this:

    ```
    Setting GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ADMIN_EMAILS and restarting ⬢ demo-spring-react-example... done, v6
    ```

    You can check the values by visiting the `Settings` tab 
    in the Heroku Dashboard, and clicking `Reveal Config Vars`

    If the command fails with the following error:

    ```
     is invalid. Must be in the format FOO=bar.
    ```

    Ensure that your `.env` file does not have any empty lines, then retry the command.

The slightly more tedious way: 

1. In the Heroku Dashboard, visit the `Settings` tab 
   then click `Reveal Config Vars`.
2. For each variable in `.env`, create a Config Var entry
   with the corresponding name and value.  
   
   Be sure that you preserve case: if it's `CLIENT_SECRET`, you must use `CLIENT_SECRET` not `client_secret`.

3. When finished, restart the application by going to the 
   `Deploy` tab and clicking `Deploy Branch`.

## Troubleshooting

If you see this:

<img src="https://user-images.githubusercontent.com/1119017/149856156-575fb638-7db8-460a-a344-9069145aa242.png" alt="Redirect URI Mismatch" width="600" />


Try clicking the little arrow to open up the additional message:

<img src="https://user-images.githubusercontent.com/1119017/149856193-512acb25-2bfc-4e53-991b-f61de37f1ed6.png" alt="Request Details" width="600" />


Now, you'll see  the Redirect URI that the app is expecting.

If you go back to the [Google Developer Console](https://console.cloud.google.com/) you can see what you really entered.

For example, when I was getting this error message, it's because I put in this for my Redirect URI:

![image](https://user-images.githubusercontent.com/1119017/149856340-98acd5e4-8712-4723-a899-e3bf2f06d3fa.png)

Rookie mistake!  I literally had `my-heroku-app` instead of `demo-spring-react-example`. 

Change it to the correct URI, click save.  Then go back to the URL for the home page of your app and refresh the page (you don't need to restart the Heroku backend; just refresh your browser page.)  Click login again, and you should get something like this:


<img src="https://user-images.githubusercontent.com/1119017/149856532-b1cda813-bd3f-4fd1-a79e-630e5929d7be.png" alt="Choose an Account" width="600" />


Success!
  
