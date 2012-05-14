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

console.log(largestPrimeFactor(600851475143));