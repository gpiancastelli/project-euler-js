function largestPalindromic(digits) {
    var i, n, m, d, inf, sup, limit, number = 0;
    for (i = 1; i < digits; i += 1) {
        number = 10 * number + 9;
    }
    inf = number;
    sup = 10 * number + 9;

    function isPalindromic(n) {
        var p = 0, q = n, r;
        while (n > 0) {
            r = n % 10;
            p = 10 * p + r;
            n = Math.floor(n / 10);
        }
        return p === q;
    }

    for (n = sup * sup, m = inf * inf; n > m; n -= 1) {
        if (isPalindromic(n)) {
            limit = Math.ceil(Math.sqrt(n));
            d = sup;
            while (d >= limit) {
                if (n % d === 0 && n / d > inf) {
                    return n;
                }
                d -= 1;
            }
        }
    }
    return NaN;
}

var problem = {
    solution: largestPalindromic,
    args: [3],
    result: 906609
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