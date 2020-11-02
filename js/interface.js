let selectPanelDiv = d3.select("#selectPanelDiv")

let inputDiv = selectPanelDiv.append("div")
    .attr("class", "markerOverlay")
    .style("top", (10) + "px")
    .style("left", (10) + "px")
;

inputDiv
    .append("input")
    .attr("class", "form-control")
    .attr("id", "inputNumber")
    .attr("type", "number")
    .attr("value", 5)
    .attr("step", "1")
    .attr("pattern", "\d+")
    .on("change", function () {

    });


// Get the input field
var input = document.getElementById("inputNumber");

// // Execute a function when the user releases a key on the keyboard
// input.addEventListener("keyup", function(event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.key === 'Enter') {
//         console.log(inputDiv)
//         // Cancel the default action, if needed
//         event.preventDefault();
//         // Trigger the button element with a click
//         document.getElementById("myBtn").click();
//     }
// });
