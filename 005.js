function smallestDivisible(limit) {
    var i, n = 1;

    function largestPower(n, limit) {
        var p, e = 2, largest = n;
        while ((p = Math.pow(n, e)) <= limit) {
            largest = p;
            e += 1;
        }
        return largest;
    }

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

    for (i = 3; i <= limit; i += 2) {
        if (isPrime(i)) {
            n *= largestPower(i, limit);
        }
    }

    return n * largestPower(2, limit);
}

console.log(smallestDivisible(20));