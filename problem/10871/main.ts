import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"

export const main = flow(
    simplifyNs,
    ([[_, x], ns]) => ns.filter(n => n < x),
    
    ns => [ns],
    print,
)