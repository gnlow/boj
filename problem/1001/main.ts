import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"

export const main = flow(
    simplify,
    ([[a, b]]) => a - b
)