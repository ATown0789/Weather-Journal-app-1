/* Global Variables */
const tempElement = document.getElementById("temp");
const dateElement = document.getElementById("date");
const clientRElement = document.getElementById("content");
// Create a new date instance dynamically with JS
let date = new Date();
let newDate =
  date.getDate() + 1 + "." + date.getMonth() + "." + date.getFullYear();

// Personal API Key for OpenWeathermap
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

let apiKey = "&appid=760e49c72462254c7acebcc4aaabf805";

// Function to GET Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
	console.log('getWeather data',data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById("generate");
generate.addEventListener("click", performAction);

// Function called by event listener
function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;
  getWeather(baseURL, zip, apiKey)
	.then((data) => {
		postData("http:localhost:8000/addData", {
		  temp: data.main.temp,
		  date: newDate,
		  userRes: feel,
		});
		console.log('feel',feel);
		updateUI(data.main.temp,date,feel);
	});
}

// Function to POST data
const postData = async (url = "", data = {}) => {
  console.log('postData data',data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data), //Create JSON string from a Javascript object.
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// postData('/add', {})
// Function to GET Project Data and update UI
const updateUI = async (weatherData, date, feel) => {
	console.log('feel', feel);
    temp.textContent = weatherData;
    dateElement.textContent = date;
   clientRElement.textContent = feel;
};
