import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { primes } from "util/primes.ts"

const below = (n: number) => n % 1
const divisible = (b: number, a: number) => below(b / a) == 0

function gcdLcm(b: number, a: number) {
    let result = 1
    // console.log("!", b, a)
    for (let i=0;primes[i]<=a;i++) {
        if (divisible(b, primes[i]) && divisible(a, primes[i])) {
            // console.log(primes[i])
            b /= primes[i]
            a /= primes[i]
            result *= primes[i]
            // console.log("->", result, b, a)
            i = -1
        }
    }
    return [result, result * b * a]
}

export const main = flow(
    simplifyNs,
    ([[a, b]]) => [a, b],
    ([a, b]) => gcdLcm(a, b),
    print,
)