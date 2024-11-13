import { FetchWrapper } from "./Modules/fetchWrapper.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("Document loaded....");

    
    document
      .getElementById("btn-missions")
      .addEventListener("click", fetchMissions);
  },
  false
);

async function fetchMissions() {
  console.log("Fetching Missions...");

  // Get the filter values from the input fields
  const companyName = document.getElementById("filter-company-name").value;
  const minCost = document.getElementById("filter-min-cost").value;
  const maxCost = document.getElementById("filter-max-cost").value;

  // Build the query parameters for the URL
  let queryParams = [];

  if (companyName) {
    queryParams.push(`companyName=${companyName}`);
  }
  if (minCost) {
    queryParams.push(`minCostOfMission=${minCost}`);
  }
  if (maxCost) {
    queryParams.push(`maxCostOfMission=${maxCost}`);
  }

  // Construct the full API URI with query parameters
  const uri = `http://localhost/space-api/missions?${queryParams.join("&")}`;

  // Fetch the missions data using FetchWrapper
  const fetchWrapper = new FetchWrapper();
  const response = await fetchWrapper.sendRequest(uri);


  const missions = response["data"];
  console.log(missions);

  // Render the list of missions into an HTML table
  let missionsList = "";
  missions.forEach((mission) => {
    missionsList += `
      <tr>
          <td>${mission.missionID}</td>
          <td>${mission.companyName}</td>
          <td>${mission.spaceStationId}</td>
          <td>${mission.launchDate}</td>
          <td>${mission.status}</td>
          <td>${mission.costOfTheMissions}</td>
          <td>${mission.missionDuration}</td>
          <td>${mission.crewSize}</td>
          <td>${mission.location_id}</td>
      </tr>
    `;
  });

  // Inject the missions data into the HTML table
  document.getElementById("missions-list").innerHTML = missionsList;
}
