// Write your JavaScript code here!
// Submit Values
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function() {
      // Initial permission for takeoff
      let takeoff = false;
      
      // Get values from submission
      let pilotNameInput = document.querySelector("input[name=pilotName]").value;
      let coPilotNameInput = document.querySelector("input[name=copilotName]").value;
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
      let cargoMassInput = document.querySelector("input[name=cargoMass]").value;
      let inputs = [pilotNameInput, coPilotNameInput, fuelLevelInput, cargoMassInput];

      // Validate submission for something
      let invalid = false;
      for(let i = 0; i < inputs.length; i++) {
         if (!inputs[i].trim()) {
            window.alert("All fields are required!");
            invalid = true;
         }
      }

      // Validate submission for text/numbers and send to indication if all inputs have something
      if (invalid === false) {
         event.preventDefault(); // All inputs in for validation
         if (!isNaN(inputs[0]) || !isNaN(inputs[1])) {
            window.alert("Make sure to write valid names for each field!");
         }
         else if (isNaN(inputs[0]) && isNaN(inputs[1])) {
            //print names of the pilots to the innerHTML for each section
            pilotStatus.innerHTML = `Pilot ${inputs[0]} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${inputs[1]} is ready for launch`;
         }

         if (isNaN(inputs[2]) || isNaN(inputs[3]))
            window.alert("Make sure to write valid numbers for each field!");
         else if (!isNaN(inputs[2]) && !isNaN(inputs[3])) {
            // Verify for fuel or weight
            if (inputs[2] < 10000 || inputs[3] > 10000){
               // event.preventDefault(); // All inputs in for validation
               faultyItems.style.visibility = "visible";
               launchStatus.innerHTML = "Shuttle Not Ready for Launch";
               launchStatus.style.color = "red";
               if (inputs[2] < 10000)
                  fuelStatus.innerHTML = "There is not enough fuel for the journey";
               else
                  fuelStatus.innerHTML = "Fuel level high enough for launch";
               if (inputs[3] > 10000)
                  cargoStatus.innerHTML = "Too much mass for the shuttle to take off";
               else
                  cargoStatus.innerHTML = "Cargo mass low enough for launch";
            }
            else if (inputs[2] >= 10000 && inputs[3] <= 10000 && isNaN(inputs[0]) && isNaN(inputs[1])){
               takeoff = true; // All inputs are valid, and meet the criteria
               faultyItems.style.visibility = "hidden"; // There are no faulty items to begin or anymore
               document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
               document.getElementById("launchStatus").style.color = "green";
            }
         }
      }
      
      // Call JSON objects and print
      destinationGo(takeoff);
   })
})

function destinationGo(boolean){
   if (boolean){
      let url = "https://handlers.education.launchcode.org/static/planets.json"
      fetch(url).then(function(response) {
         response.json().then( function(json) {
            const target = document.getElementById("missionTarget");
            target.innerHTML = "<h2>Mission Destination</h2><ol>"
            let index = Math.floor(Math.random()*json.length);
            target.innerHTML += `<li>Name: ${json[index].name}
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
               </ol><img src="${json[index].image}">`
         })
      })
   }
}