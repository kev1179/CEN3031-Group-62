# Back-End URL's to request and send data to 
## http://localhost:8080
Default server location. Contains directory of files in the server. No need to send requests here, but you can put this link in your browser to test that it works.
## http://localhost:8080/hello
Hello world page for the server. No need to send requests here, but it can be placed in the browser to check that it works.
## http://localhost:8080/getTest
A test for GET requests. Use typescript code to send a GET request here and check that the message is being returned to the front-end
## http://localhost:8080/login
Send POST request here containing username and password data. The server will then process the input and determine if the login attempt was successful or not by checking it with the database.
## http://localhost:8080/register
Send POST request here containing all the data needed to create a new user. The server will then check that this is a new user, and if it is unique it will be placed into the database.
## http://localhost:8080/getUsername
This returns the username of the active user in the browsing session.
