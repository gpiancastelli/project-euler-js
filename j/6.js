function difference(limit) {
    function squareSum(limit) {
        var i, s = 1,
            e = Math.log(limit) / Math.LN10;
        // special case: limit is a power of 10
        if (e - (e << 0) === 0) {
            s = limit * (limit >> 1) + (limit >> 1);
        }
        else {
            for (i = 2; i <= limit; i += 1) {
                s += i;
            }
        }
        return s * s;
    }

    function sumSquare(limit) {
        var i, s = 1;
        for (i = 2; i <= limit; i += 1) {
            s += i * i;
        }
        return s;
    }

    return squareSum(limit) - sumSquare(limit);
}

var problem = {
    solution: difference,
    args: [100],
    result: 25164150
};$(document).ready(function () {
    prettyPrint();
    $('#r').click(function () {
        var start = new Date(),
            result = problem.solution.apply(null, problem.args),
            end = new Date(),
            success = problem.result === result;
        $('#text').
            addClass(success ? 'success' : 'failure').
            text(success ? 'Success' : 'Failure');
        $('#solution').
            text(result).
            prepend($('<span class=t>Result:</span>'));
        $('#time').
            text(end.getTime() - start.getTime() + ' ms').
            prepend($('<span class=t>Elapsed:</span>'));
        $('<img/>').
            attr('src', 'i/' + (success ? 's.png' : 'f.png')).
            attr('alt', success ? '\u2714' : '\u2718').
            appendTo($('#icon').empty());
    });
});