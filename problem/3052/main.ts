import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { map, reduce } from "fp/ReadonlyArray.ts"

export const main = flow(
    simplifyNs,
    map(([n]) => n % 42),
    reduce(
        [] as number[],
        (arr, n) => arr.includes(n) ? arr : [...arr, n]
    ),
    arr => arr.length,
)