import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"

export const main = flow(
    simplifyNs,
    ([[a, b, v]]) => [a, b, v],
    ([a, b, v]) => 1 + Math.ceil((v - a) / (a - b))
)