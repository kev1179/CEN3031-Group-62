# Work Completed in Sprint 2
### Frontend
* Beautified the about, login, and registration page
* Implemented a navigation bar that can be accessed from any page
* Connected the login and registration pages to the backend
* Created a color scheme for the website

### Backend
* Created system for user comments
* Implemented session cookie authentication for logged-in users
* Modified login and register functions for allowing cookie generation and making them more sophisticated
* Included UUIDs (Universal Unique Identifiers) for session tokens to increase security

# Frontend Unit Tests

# Cypress Tests

### Login User
Basic test that fills out information on the login page.

# Backend Unit Tests 

### TestHelloWorld
Basic test that compares two strings to make sure Go testing is working properly.
### TestSample
Another simple test which tests a function from the main server file.
### TestGetRequest
Sends an HTTP GET request to our server to make sure the server is communicating a basic message to the client.
### TestLogin
Sends a POST request containing a sample username and password contained in our database to our URL for handling login requests. 
The function checks to make sure the login attempt goes through successfully then attempts a username/password combo that does not work and checks to make sure that 
the user is not logged in.
### TestComment
Sends a POST request containing a comment a fictional user made and checks to make sure that the comment is inserted into the database correctly.
### TestRegister
Creates a made up username created using a randomizer function. This user is sent to the server using a POST request and then this test also checks to make sure this new user can be properly logged in.
  
Sends a POST request containing sample data of the user's first and last names, username, password, and email to our URL for handling register requests. It then sends another POST request containing the registered user's username and password to make sure the login attempt for that new user was successful. Finally, it performs the same action for a different user, but with the same username already contained in our database, and checks to make sure that the user could not register. This, of course, would be followed by a login attempt for that user, which would not be successful.
### TestCookie
Creates a cookie to place in the recorder, which gets copied to a new HTTP request. The cookie then gets extracted from the request, and the function checks if the cookie can be read while also comparing the extracted cookie's value to the value assigned from the session token.
### TestExpires
Creates a time variable that is before the current time and a session that contains the time variable to make sure that the user session is already expired.

# Backend API

### http://localhost:8080
Default server location. Contains directory of files in the server. No need to send requests here, but you can put this link in your browser to test that it works.
### http://localhost:8080/hello
Hello world page for the server. No need to send requests here, but it can be placed in the browser to check that it works.
### http://localhost:8080/getTest
A test for GET requests. Use typescript code to send a GET request here and check that the message is being returned to the front-end
### http://localhost:8080/login
Send POST request here containing username and password data. The server will then process the input and determine if the login attempt was successful or not by 
checking it with the database. Creates a cookie for the user's browsing session if the login attempt is successful.
### http://localhost:8080/register
Send POST request here containing all the data needed to create a new user. The server will then check that this is a new user, and 
if it is unique it will be placed into the database.
### http://localhost:8080/welcome
Creates a session token to track the User's activity during the status.
### http://localhost:8080/refresh
Renews the session token every 2 minutes. This is for security purposes.
### http://localhost:8080/logout
Logs user out of the session. Deletes the session token.