import { FetchWrapper } from "./Modules/fetchWrapper.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("Document loaded....");

    document
      .getElementById("btn-planets")
      .addEventListener("click", fetchPlanets);
  },
  false
);

async function fetchPlanets() {
  console.log("Fetching planets...");

  // Get the filter values from the input fields
  const name = document.getElementById("filter-name").value;
  const minMass = document.getElementById("filter-min-mass").value;
  const maxMass = document.getElementById("filter-max-mass").value;

  // Build the query parameters for the URL
  let queryParams = [];

  if (name) {
    queryParams.push(`name=${name}`);
  }
  if (minMass) {
    queryParams.push(`minMass=${minMass}`);
  }
  if (maxMass) {
    queryParams.push(`maxMass=${maxMass}`);
  }

  // Construct the full API URI with query parameters
  const uri = `http://localhost/space-api/planets?${queryParams.join("&")}`;

  // Fetch the planets data using FetchWrapper
  const fetchWrapper = new FetchWrapper();
  const response = await fetchWrapper.sendRequest(uri);

  const planets = response["data"];
  console.log(planets);

  // Render the list of planets into an HTML table
  let planetsList = "";
  planets.forEach((planet) => {
    planetsList += `
      <tr>
          <td>${planet.planetID}</td>
          <td>${planet.name}</td>
          <td>${planet.sideralOrbit}</td>
          <td>${planet.sideralRotation}</td>
          <td>${planet.mass}</td>
          <td>${planet.equaRadius}</td>
          <td>${planet.gravity}</td>
          <td>${planet.discoveryDate}</td>
          <td>${planet.discoveredBy}</td>
      </tr>
    `;
  });

  // Inject the planets data into the HTML table
  document.getElementById("planets-list").innerHTML = planetsList;
}
