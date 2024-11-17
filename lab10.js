//Task 1: WHAT IS AN API?
/* API: Application Programming Interface 
It is a middleware that allows two systems or applications to communicate through an agreed-upon protocol.
When one app needs data or services from another app, it sends a request to the server via API.
The server will respond with the requested information.

Example 
Google Map API: You open the restaurant. 
When a customer orders for delivery, you need to find their exact location.
You can request the address of your customer location sent to Google Maps via the Google Map API.
Google Maps will return the exact location of the customer's address.
This allows you to deliver the food to the right place.

The API is the connection between your restaurant (your application) and Google Maps (an external service), 
allowing you to get the necessary information to perform the task correctly.*/

//Task 2: HTTP METHODS
/* HTTP Method is a part that defines and shows the working status in the management part of both the client and the server
that shows the working of the web page that what is being managed and what data is being sent.
This part is a conversation between the front-end and back-end about what data will be received and what data will be sent

GET: HTTP request method used to retrieve the last saved representation of a resource state.
Example: A user wants to know the weather at their location at a specific moment.
The browser sends a GET request to the server, asking for weather information.
The server then responds with the weather details for that location.

POST: HTTP request method used to create a new resource within a collection or execute a controller.
Example: A user submits a registration form to sign up for an account on a website. The browser sends a POST request 
with the user's data to the server, which processes the request and creates a new user account.

PUT: HTTP request method that can insert a new resource into a store. This can also be used to update/replace 
     a mutable resource in the store.
Example: A user wants to change the password for their account. The browser sends a PUT request with the new password data 
to the server, which processes the request and updates the account's password.

DELETE: HTTP request method used to remove the item.
Example: A user wants to delete their account. The browser sends a DELETE request to the server, 
which processes the request and deletes the user's account.*/

//Task 3
//Use the Fetch API to make a GET request to a public API endpoint
function getApi() {
    fetch('https://api.coinbase.com/v2/currencies')
        .then(response => response.json())
        .then(data => {
            //check data from the api//
            console.log(data);
            //assigns the variable currencies with the data from the API//
            let currencies = data.data;
            //call createTable function and pass data into parameter//
            createTable(currencies);

        })
        //Implement error handling for the API call//
        .catch(error => console.error(`Error fretching data: `, error));
}

//using fetch with async and await//
/*async function getApi() {
    try {
        let response = await fetch('https://api.coinbase.com/v2/currencies');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);

        let currencies = data.data;
        createTable(currencies);

    } catch (error) {
        console.error(`Error:`, error);
    }
}*/

//Task 4 make a GET request using XMLHttpRequest
function getData() {
    //Create a new XMLHttpRequest object//
    let xhr = new XMLHttpRequest();
    //Use GET method to get data//
    xhr.open(`GET`, 'https://api.coinbase.com/v2/currencies', true);

    xhr.onload = function () {
        //Check if the request was successful//
        if (xhr.status === 200) {
            //Parse the response text to JSON//
            const data = JSON.parse(xhr.responseText);
            //check data//
            console.log(data);
            //assigns the variable currencies with the data from the API//
            let currencies = data.data;
            //call createTable function and pass data into parameter//
            createTable(currencies);
        } else {
            //Log an error if the request was error//
            console.log(`Error:`, xhr.status);
        }
    };

    //Send the request to the API
    xhr.send();
}

//create table//
function createTable(currencies) {
    //getElementById from html -- where to display the data//
    const tableBody = document.getElementById('outputTable');
    //Loop in array//
    currencies.forEach(currency => {

        //create row//
        let row = document.createElement(`tr`);

        //creaye column for id//
        let idColumn = document.createElement(`td`);
        //set text//
        idColumn.textContent = currency.id;
        //add ID into row//
        row.appendChild(idColumn);

        //get name from the api and add to the row//
        let nameColumn = document.createElement(`td`);
        nameColumn.textContent = currency.name;
        row.appendChild(nameColumn);

        //get min size from the api and add to the row//
        let minSizeColumn = document.createElement(`td`);
        minSizeColumn.textContent = currency.min_size;
        row.appendChild(minSizeColumn);

        //add column into body//
        tableBody.appendChild(row);
    })
}
//addEventListener when clicked//
document.getElementById(`loadDataFetch`).addEventListener(`click`, getApi);
//addEventListener when clicked//
document.getElementById(`loadDataXHR`).addEventListener(`click`, getData);

//Task 5: COMPARING FETCH API AND XMLHTTPREQUEST//
/*
Fetch API
- A modern, simpler API for making HTTP requests.
- Uses Promises for cleaner asynchronous handling with .then() or async/await.
- Easier to use and maintain in modern applications.

XMLHTTPREQUEST
- An older API, still used for HTTP requests.
- Requires more verbose code.
- Offers detailed control over the request lifecycle, like tracking progress.

Fetch API is more powerful and easier to understand as compared to XMLHttpRequest. 
It is also supported by all modern browsers but XMLHttpRequest is only supported by old browsers.

Example scenario 
Fetch API: Display real-time weather data on a website by using data from public API.

XMLHttpRequest: The user submits a comment, an XMLHttpRequest is made to submit the form data to the server, 
and the page is updated with the new comment without requiring a full page reload.
*/
