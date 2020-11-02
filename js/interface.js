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

d3.select("#cnf-wrapper").style("height")
d3.select("#editor-wrapper")
    .style("height", (document.getElementById("cnf-wrapper").offsetHeight - 70) + "px")

function submit() {
    console.log("hi")
    $("#editor").html(() => {
        // return SAT_expression(parseInt(document.getElementById("inputNumber").value))
       return format(SAT_expression(parseInt(document.getElementById("inputNumber").value)))
    })
}

function format(result) {
    return "<code><span style='color: #636b73'>" + result
        .replace("positions", "positions</span>")
            .replace("p ", "<span style='color: #8f4214'>p ")
            .replace("1 ", "</span><span style='color: #130095'>1 ")
        .split("\n")
        .join("<br/>")
    + "</span></code>"
}