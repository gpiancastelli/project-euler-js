function largestPrimeFactor(n) {
    var d = Math.ceil(Math.sqrt(n));

    function isPrime(n) { 
        var i, limit = Math.ceil(Math.sqrt(n));
        // since the main loop generates odd numbers only
        // we can start testing primality dividing by 3
        for (i = 3; i <= limit; i += 2) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    // start with an odd number
    d = (d & 1) === 0 ? d - 1 : d;

    //while (!(isPrime(d) && n % d === 0)) {
    while (!(n % d === 0 && isPrime(d))) {
        d -= 2; // odd numbers only
    }
    return d;
}

var problem = {
    solution: largestPrimeFactor,
    args: [600851475143],
    result: 6857
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