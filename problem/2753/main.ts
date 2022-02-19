import { flow } from "fp/function.ts"

export const main = flow(
    Number,
    n =>
        n % 4 == 0
        && (
               n % 100 != 0
            || n % 400 == 0
        )
        ? 1
        : 0
)