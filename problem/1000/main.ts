import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"

export const main = flow(
    simplifyNs,
    ([[a, b]]) => a + b
)