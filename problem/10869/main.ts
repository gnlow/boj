import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { map } from "fp/Array.ts"

export const main = flow(
    simplifyNs,
    ([[a, b]]) => [
        a + b,
        a - b,
        a * b,
        a / b,
        a % b,
    ],
    map(Math.floor),
    l => l.join("\n"),
)