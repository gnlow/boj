import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { map } from "fp/Array.ts"

export const main = flow(
    simplify,
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