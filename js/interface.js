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
    .attr("value", 3)
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
        let val = parseInt(document.getElementById("inputNumber").value)
        return isValid(val) ? formatCNF(SAT_expression(val)) : "<code style='color: #a00000'>invalid input!</code>"
    })
}

function formatCNF(result) {
    return "<code><span style='color: #636b73'>" + result
            .replace("positions", "positions</span>")
            .replace("p ", "<span style='color: #8f4214'>p ")
            // .replace("1 position", )
            .replace("1 2 ", "</span><span style='color: #130095'>1 2 ")
            .replace("p cnf 1 2","p cnf 1 2</span><span style='color: #130095'>")
            .split("\n")
            .join("<br/>")
        + "</span></code>"
}

function cut(string) {
    if (string.length > 60) {
        let first = string.slice(0, 2)

    }
    return string
}

function isValid(val) {
    return !(isNaN(val) || parseInt(val) < 0);
}

function colorNormal(x) {
    var chessBoard = document.getElementById("chessboard");
    for (var i = 0; i < x; i++) {
        var row = chessBoard.appendChild(document.createElement("div"));
        for (var j = 0; j < x; j++) {
            var span = document.createElement('span');
            if (i & 1) { // odd
                if (j & 1) { // white

                } else { // black
                    span.style.backgroundColor = "#dbeef4";
                }
            } else {  // even
                if (j & 1) { // black
                    span.style.backgroundColor = "#dbeef4";
                }
            }
            row.appendChild(span);
        }
    }
}

function draw() {
    colorNormal(val)
}