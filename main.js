// First require the dotenv config file
require('dotenv').config();

// This just checks to make sure SECRET_API_KEY is listed in the environment variables. Uncomment to see.
//console.log(process.env);

// Put the secret key in a variable
const api_key = process.env.SECRET_API_KEY;

// Copy/paste the RapidAPI code

const fetchData = () => {

    const http = require("https");

    const options = {
        "method": "GET",
        "hostname": "covid-193.p.rapidapi.com",
        "port": null,
        "path": "/statistics?country=USA",
        "headers": {
            // I tried several ways to assign the api_key here, but it didn't work. See next comment below.
            //"x-rapidapi-key": `${api_key}`,
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "useQueryString": true
        }
    };

    // Stack Overflow to the rescue! Add to the headers object with bracket notation: 
    // https://stackoverflow.com/questions/51875200/node-js-http-request-variable-in-options

    options.headers["x-rapidapi-key"] = api_key; // process.env.SECRET_API_KEY;  (Direct assignment also works)

    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {

            const body = Buffer.concat(chunks).toString();  // <--Note I used dot notation to add the toString function 
                                                            //    here and reduced a line of code from the example.

            // The response returned is a string. (API responses are almost always a string.) Uncomment the next console.log line to confirm.
            //console.log(body);

            // Yep, we have a big old string of stuff, so let's turn it into an array of JS objects with JSON.parse()
            // https://www.w3schools.com/js/js_json_parse.asp
            const obj = JSON.parse(body);

            // Uncomment the next console.log line to confirm. 
            //console.log(obj);

            // Now, I see the response array has nested objects, and a bunch of stuff I don't care about, 
            // so let's get just the response part.

            // Uncomment the next console.log line to confirm. 
            console.log(obj.response);

            // This is the info I'm looking for, so I'm declaring and initializing a constant variable to use so I don't have to keep typing obj.response.
            let myObj = obj.response;

            /*  Let's pause here and look at what we have in our results response: an array of objects, with a few objects with nested objects (cases, deaths, tests)
                Even though we've returned one set of results, it's still an array (see the [] square brackets?), so to get to all the values, you have to
                start with the index of the array you're accessing. So, anything you want to see/use will start with myObj[0]
                When your results return more than one array and put the results in a loop, and display the results with myObj[i] that works with the i++ counter ;)
                https://restfulapi.net/json-array/
                https://coderrocketfuel.com/article/3-ways-to-loop-over-an-array-in-nodejs
            */

            // Here are some console.log statements that help test what you want:

            //console.log(myObj[0].continent);
            //console.log(myObj[0].deaths.new);
            //console.log(myObj[0].cases.recovered);

            // Since Node.js is a server-side (backend) environment, you can't use the vanilla Javascript methods like document.getElementByID
            // and .innerHTML to display results on an HTML page. You have to use a node web framework like Express. This is covered in the next course.
            // https://expressjs.com/

        });
    });

    req.end();

} // end fetchData()

fetchData();