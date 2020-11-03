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
    .attr("value", 4)
    .attr("step", "1")
    .attr("pattern", "\d+")
    .on("change", function () {

    });
let chessboardHeight = 246
d3.select("#cnf-wrapper").style("height")
d3.select("#editor-wrapper")
    .style("height", (document.getElementById("cnf-wrapper").offsetHeight - 70) + "px")

d3.select("#chess-wrapper")
    .style("height", (chessboardHeight) + "px")

d3.select("#output-wrapper")
    .style("height", (document.getElementById("cnf-wrapper").offsetHeight - 70 - chessboardHeight) + "px")

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
    d3.select("#chessBoardNormal").selectAll("*").remove()
    d3.select("#chessBoardNormal")
        .style("visibility", x !== 0 ? "visible" : "hidden")
    var chessBoard = document.getElementById("chessBoardNormal");
    d3.select("#chessBoardNormal").style("width", (32*x+4) + "px")
    let locationArr = outputString.split("|v").slice(1).join("").split(" ").map(d => parseInt(d)).filter(d => d>0)

    for (var i = 0; i < x; i++) {
        var row = chessBoard.appendChild(document.createElement("div"));
        for (var j = 0; j < x; j++) {
            var span = document.createElement('span');
            var img = document.createElement('img');
            img.src = "images/Queen-icon.png"
            img.style.height = "32px"
            img.style.width = "32px"
            img.style.position = "absolute"

            if (i & 1) { // odd
                if (j & 1) { // white
                    span.style.backgroundColor = "white";
                    drawQueen(i,j,span,img)
                } else { // black
                    span.style.backgroundColor = "#d0d8e8";
                    drawQueen(i,j,span,img)
                }
            } else {  // even
                if (j & 1) { // black
                    span.style.backgroundColor = "#d0d8e8";
                    drawQueen(i,j,span,img)
                }
                else {
                    span.style.backgroundColor = "white";
                    drawQueen(i,j,span,img)
                }
            }
            row.appendChild(span);
        }
    }

    function drawQueen(i,j,span,img) {
        if (locationArr.includes(i*x+j+1)){
            span.appendChild(img)
        }
    }

}

