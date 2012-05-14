function sumOfEven(limit) {
    var temp, sum = 0, a = 0, b = 1;
    while (b < limit) {
        temp = a;
        a = b;
        b += temp;
        if ((b & 1) === 0) {
            sum += b;
        }
    }
    return sum;
}

var problem = {
    solution: sumOfEven,
    args: [4e6],
    result: 4613732
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