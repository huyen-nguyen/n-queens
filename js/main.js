let outputString = ""
function scroll() {
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
}

function at_bottom() {
    var height = document.getElementById("output").offsetHeight;
    return (document.getElementById("output").scrollTop + height) >= document.getElementById("output").scrollHeight;
}

Module['onRuntimeInitialized'] = function () {
    $().ready(function () {
        $('#runbutton').removeAttr("disabled")
        $('#result').text('Ready');
    })
}
Module['print'] = function (text) {
    var bottom = at_bottom();
    $('#output').append("<code>" + text + "</code><br/>")
    outputString = outputString + ("|" + text)
    if (bottom) {
        scroll();
    }
};
Module['printErr'] = function (text) {
    $('#output').append("<code>--error-- " + text + "</code><br/>")
    // outputString = outputString + ("--error-- " + text + "\n")
    scroll();
};


must_stop = false;
running = false;

function check_result(result) {

    if (must_stop) {
        $('#output').append("<code>Stopped.<code><br/>")
        $('#result').text('Ready');
        $('#playbut').removeClass("fa-stop");
        $('#playbut').addClass("fa-play");

        scroll();
        must_stop = false;
        running = false;
        return;
    }

    var nconfl = num_conflicts();
    $('#result').text(nconfl + " confl");
    if (result == 0) {
        $('#result').html('<b>SATISFIABLE</b>');
        colorNormal(parseInt(document.getElementById("inputNumber").value))
        running = false;
    } else if (result == 1) {
        $('#result').html('<b>UNSATISFIABLE</b>');
        colorNormal(parseInt(document.getElementById("inputNumber").value))
        running = false;
    } else if (result == 2) {
        window.setTimeout(function () {
            var result = cont_query();
            check_result(result);
        }, 50);
    }

    if (!running) {
        $('#playbut').removeClass("fa-stop");
        $('#playbut').addClass("fa-play");
    }
}

$().ready(function () {
    $('#runbutton').click(function () {
        outputString = ""
        if (running) {
            must_stop = true;
            $('#output').append("<code>Stopping...</code><br/>")
            // outputString = outputString + ("Stopping...\n")
            scroll();
            return;
        }
        let val = parseInt(document.getElementById("inputNumber").value)
        if (!isValid(val)) {
            $('#editor').html("<code style='color: #a00000'>invalid input!</code>")
            $('#output').html("")
            $('#chessBoardNormal').html("")
            return
        }
        $("#editor").html(formatCNF(sat(val)))
        $("#clipboard").html(formatCNFbr(sat(val)))
        running = true;
        $('#playbut').removeClass("fa-play");
        $('#playbut').addClass("fa-stop");

        $('#result').text('Running');

        var source = sat(val);
        try {
            var result = cms_query(source)
            check_result(result);
        } catch (err) {
            console.log(result);
            console.log(err);
            running = false;
            must_stop = false;
            $('#result').text('Error');
        }
    })
})

function cms_query(source) {
    $('#output').html("");
    scroll();
    var solve_function = Module.cwrap('cstart_solve', 'number', ['string']);
    ret = solve_function(source);
    return ret;
}

function cont_query() {
    var cont_function = Module.cwrap('ccontinue_solve', 'number');
    ret = cont_function();
    return ret;
}

function num_conflicts() {
    var num_conflicts_function = Module.cwrap('cget_num_conflicts', 'number');
    ret = num_conflicts_function();
    return ret;
}
