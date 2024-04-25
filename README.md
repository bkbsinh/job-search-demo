# job-search-demo

This is a demo project simulating a simple job search web application.
The job details are retrieved from an open API of the Bundesagentur für Arbeit (https://jobsuche.api.bund.dev/).
The API only provides some useful information such as job title, location, employer and public date. There's nor salary neither URL to the employer website for a direct application. 
The application generates a random salary for each job as well as a fake apply form. Please don't take it for serious.    

SET UP
1. Clone the repository & install the required dependencies 

2. Create the environment file for NextJS ".env.local" containing at least the required variables:
    - NEXT_PUBLIC_BACKEND_URL: the domain of Flask backend api, e. g. "http://localhost:5000".
    - NEXT_PUBLIC_GOOGLE_ID & NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: your google credentials to enable logging in with Google OAuth (https://developers.google.com/identity/protocols/oauth2?hl=de).
    - NEXT_AUTH_URL: the root URL for NextAuth.js, should be "http://localhost:3000/"
    - NEXT_AUTH_SECRET: the secret key used to encrypt NextAuth.js JWT (https://next-auth.js.org/configuration/options#nextauth_secret).

3. Cd into the "backend" folder: 
    - This is the place where the Flask application lives
    - Create a "settings.py" file for environment variables. The required ones are:
        - SENDER, RECIPIENTS & APP_PASSWORD: for setting up the SMTP service (see backend/utils/mailing.py) (https://www.febooti.com/products/automation-workshop/tutorials/enable-google-app-passwords-for-smtp.html).
        - JWT_SECRET: must match the NEXT_AUTH_SECRET for decoding authorization token sent from frontend side.

4. After setting up the required environment:
    - Start the Flask application: cd /backend -> python start_app.py
    - Start the NextJS application at the root folder: npm run dev

The whole application should be then up and running.

USAGE  
Frontend:
1. Login Page: "http://localhost:3000/login"
    - A middleware is used to ensure unauthenticated users will be redirected to the login page (see middleware.js).
    - Log in using Google OAuth or casual credentials with email & password.
    - The signup page hasn't been created. You can create one at your preferrence or simply add new users from backend side (see the section below).
2. Profile Page: "http://localhost:3000/profile"
    - You can navigate to the profile page by clicking on the profile icon near the "Sign Out" button.
    - Here you can upload your profile image and resume. I put a Musterlebenslauf.pdf at the root folder, which you can use to try out the apply function.
3. Homepage: "http://localhost:3000/"
    - Fill in the form to start search for jobs.
    - Submitting the form will redirect to the result page
4. Result Page: "http://localhost:3000/search?position=xxx&location=xxx"
    - Show all the search result given the input from the search form (if navigated from the homepage) or the search parameters.
    - Click on a job to show job details and "Apply" button.
5. Apply Page: "http://localhost:3000/apply?id=xxx"
    - Apply for the job with id "xxx"
    - As mentioned above, this is a fake apply form. It simply sends an email from SENDER to the RECIPIENTS with the message in "Anschreiben" field and the resume as attachment. 

Backend:  
    - The database is already populated with some data.   
    - You can insert more data by executing a GET request with search parameters, e. g. localhost:5000/db/djob?position=Web Developer&location=Frankfurt (see backend/app/dev.py, backend/utils/processing.py - fetch.py - crud.py).  
    - Each search request from frontend side will query data directly from the database to avoid abusing the open API.  
    - You can add new user to the database with any tool that interacts with SQLite or adjust the view function for GET /dev/new_user (backend/app/dev.py).  

The application is not completed. There are surely some bugs not being fixed by now. Please contact me in case needed: ktsinh.nguyen.94@gmail.com
