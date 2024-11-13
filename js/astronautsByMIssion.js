import { FetchWrapper } from "./Modules/fetchWrapper.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("Document loaded....");

    document
      .getElementById("btn-astronauts")
      .addEventListener("click", function () {
        const missionId = document.getElementById("mission-id-input").value;
        fetchAstronauts(missionId);
      });
  },
  false
);

async function fetchAstronauts(mission_id) {
  console.log("Fetching Astronauts...");

  // Check if mission_id is provided
  if (!mission_id) {
    console.error("Mission ID is missing");
    return;
  }

  const uri = `http://localhost/space-api/missions/${mission_id}/astronauts`;

  const fetchWrapper = new FetchWrapper();
  try {
    const response = await fetchWrapper.sendRequest(uri);
    const astronauts = response["astronauts"];
    console.log(astronauts);

    // Render the list of astronauts
    let astronautsList = "";
    astronauts.forEach((astronaut) => {
      astronautsList += `
        <tr>
            <td>${astronaut.astronautID}</td>
            <td>${astronaut.firstName}</td>
            <td>${astronaut.lastName}</td>
            <td>${astronaut.numOfMissions}</td>
            <td>${astronaut.nationality}</td>
            <td>${astronaut.inSpace}</td>
            <td>${astronaut.dateOfDeath}</td>
            <td>${astronaut.flightsCount}</td>
            <td>${astronaut.dateOfBirth}</td>
            <td>${astronaut.bio}</td>
            <td>${astronaut.wiki}</td>
            <td><img src="${astronaut.image}" alt="Astronaut Image" width="50" /></td>
            <td><img src="${astronaut.thumbnail}" alt="Astronaut Thumbnail" width="50" /></td>
        </tr>
      `;
    });

    // Inject the list of astronauts into the web document
    document.getElementById("astronauts-list").innerHTML = astronautsList;
  } catch (error) {
    console.error("Error during fetch operation:", error);
  }
}
