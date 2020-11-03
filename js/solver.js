// helper functions

// cnf formula exactly one of the variables in the chosen list to be true

function exactly_one(list) {
    let temp = ""
    temp=temp+atleast_one(list)
    temp=temp+atmost_one(list)
    return temp
}

// cnf formula for atleast one of the variables in the chosen list to be true
function atleast_one(list) {
    let temp=""
    list.forEach(item => {
        temp = temp +" " + item
    })
    temp=temp+" 0\n"
    return temp
}

// cnf formula for atmost one of the variables in the chosen list to be true
function atmost_one(list) {
    let temp=""
    list.forEach(function (x) {
        list.slice(list.indexOf(x) + 1).forEach(y => {
            temp = temp +" -"+x+" -"+y+" 0\n"
        })
    })
    return temp
}

// function to map position (r,c) 0 <= r,c < N, in an NxN grid to the integer
// position when the grid is stored linearly by rows.

function varmap(r,c,N) {
    return r*N+c+1
}

// range
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }
    if (typeof step == 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
}

/**
 * @return {string}
 */
function SAT_expression(N){
// Start Solver: Comments
    let output="c SAT Expression for N="+N+((N === 1)? " queen\n": " queens\n")
    let size = N*N
    output = output + "c Chess board has "+size+((N === 1)? " position\n": " positions\n")

// Exactly 1 queen per row
    let tempG = ""
    range(0,N).forEach(row => {
        let A=[]
        range(0,N).forEach(column => {
            let position = varmap(row,column,N)
            A.push(position)
        })
        tempG = tempG+exactly_one(A)
    })


// Exactly 1 queen per column
    range(0,N).forEach(column => {
        let A=[]
        range(0,N).forEach(row => {
            let position = varmap(row,column,N)
            A.push(position)
        })
        tempG = tempG+exactly_one(A)
    })


// Atmost 1 queen per negative diagonal from left
    range(N-1,-1,-1).forEach(row => {
        let A=[]
        range(0,N-row).forEach(x => {
            A.push(varmap(row+x,x,N))
        })
        tempG=tempG+atmost_one(A)
    })


// Atmost 1 queen per negative diagonal from top
    range(1,N).forEach(column => {
        A=[]
        range(0,N-column).forEach(x => {
            A.push(varmap(x,column+x,N))
        })
        tempG=tempG+atmost_one(A)
    })

// Atmost 1 queen per positive diagonal from right
    range(N-1,-1,-1).forEach(row => {
        let A=[]
        range(0,N-row).forEach(x => {
            A.push(varmap(row+x,N-1-x,N))
        })
        tempG=tempG+atmost_one(A)
    })

// Atmost 1 queen per positive diagonal from top
    range(N-2,-1,-1).forEach(column => {
        A=[]
        range(0,column+1).forEach(x => {
            A.push(varmap(x,column-x,N))
        })
        tempG=tempG+atmost_one(A)
    })

    output = output +  'p cnf ' + (N*N) + ' ' + (tempG.split('\n').length - 1) + '\n' + tempG
    return output
}