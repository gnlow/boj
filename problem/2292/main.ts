import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"

export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    n => Math.ceil(Math.sqrt((n - 1) / 3) + 0.5)
)