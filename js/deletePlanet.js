import { FetchWrapper } from "./Modules/fetchWrapper.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("Document loaded....");

    document
      .getElementById("delete-planet-form")
      .addEventListener("submit", deletePlanet);
  },
  false
);

async function deletePlanet(event) {
  event.preventDefault();

  // Get the planet ID from the input field
  const planetID = document.getElementById("planet-id").value;

  if (!planetID) {
    alert("Please provide a Planet ID.");
    return;
  }

  // Create the request body with the planetID
  const bodyData = [
    {
      planetID: planetID,
    },
  ];

  // Send a DELETE request to remove the planet
  const uri = `http://localhost/space-api/planets`;

  const fetchWrapper = new FetchWrapper();

  const response = await fetchWrapper.sendRequest(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  console.log("Planet deleted successfully:", response);
  alert("Planet deleted successfully!");

  document.getElementById("delete-planet-form").reset();
  document.getElementById(
    "status-message"
  ).innerHTML = `<div class="alert alert-success">Planet ID ${planetID} has been deleted successfully!</div>`;
}
