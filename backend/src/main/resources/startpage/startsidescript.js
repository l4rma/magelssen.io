let weather = document.getElementById("weather");
let searchBtn = document.getElementById("search-button");
let searchBar = document.getElementById("search-bar");
let dateField = document.getElementById("date-container");
let timeField = document.getElementById("time-container");
let searchEngineDropDown = document.getElementById("search-engine-dropdown");

searchBar.value = "";

async function getWeather() {
  let response = await fetch(
    "http://wttr.in/Oslo+Norway?format=Oslo: +%c+%t\n"
  );
  let text = await response.text();
  weather.innerHTML = text;
}
getWeather();

function doSearch() {
    let searchEngine = searchEngineDropDown.options[searchEngineDropDown.selectedIndex].text;
    let search = searchBar.value;
    let url = "";

    if (searchEngine === "Google") {
        url = "https://www.google.com/search?q=";
    } else if (searchEngine === "DuckDuckGo") {
        url = "https://duckduckgo.com/?q=";
    } else if (searchEngine === "YouTube") {
        url = "https://www.youtube.com/results?search_query=";
    }
    window.location = url+search;
}

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    doSearch();
});

let today = new Date();
let date = today.toLocaleDateString('en-GB', { weekday:"long", month:"numeric", day:"numeric", time:"numeric"});
let time = today.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute: '2-digit'});
dateField.innerHTML = date;
timeField.innerHTML = time;


