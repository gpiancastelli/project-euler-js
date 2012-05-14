function sumOfMultiple(limit) {
    var i, sum = 0;
    for (i = 3; i < limit; i += 1) {
        if (i % 3 === 0 || i % 5 === 0) {
            sum += i;
        }
    }
    return sum;
}

var problem = {
    solution: sumOfMultiple,
    args: [1000],
    result: 233168
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