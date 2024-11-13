import { FetchWrapper } from "./Modules/fetchWrapper.js";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log("Document loaded....");

    document
      .getElementById("planet-form")
      .addEventListener("submit", createPlanet);
  },
  false
);

async function createPlanet(event) {
  event.preventDefault();

  // Get the form field values
  const name = document.getElementById("planet-name").value;
  const sideralOrbit = document.getElementById("sideral-orbit").value;
  const sideralRotation = document.getElementById("sideral-rotation").value;
  const mass = document.getElementById("mass").value;
  const equaRadius = document.getElementById("equa-radius").value;
  const gravity = document.getElementById("gravity").value;
  const discoveryDate = document.getElementById("discovery-date").value || null; // Use null if no value provided
  const discoveredBy = document.getElementById("discovered-by").value;

  // Build the planet object
  const planetData = [
    {
      planetID: null,
      name,
      sideralOrbit: parseFloat(sideralOrbit),
      sideralRotation: parseFloat(sideralRotation),
      mass: mass.toString(),
      equaRadius: parseFloat(equaRadius),
      gravity: gravity.toString(),
      discoveryDate,
      discoveredBy,
    },
  ];

  const uri = "http://localhost/space-api/planets";

  const fetchWrapper = new FetchWrapper();
  try {
    const response = await fetchWrapper.sendRequest(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planetData),
    });

    console.log("Planet created successfully:", response);
    alert("Planet created successfully!");

    document.getElementById("planet-form").reset();
  } catch (error) {
    console.error("Error creating planet:", error);
    alert("Failed to create planet.");
  }
}
