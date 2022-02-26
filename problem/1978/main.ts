import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { filter } from "fp/ReadonlyArray.ts"
import { primesLess1k as primes } from "util/primes.ts"

export const main = flow(
    simplifyNs,
    ([_, ns]) => ns,
    filter(n => primes.includes(n)),
    ns => ns.length,
)