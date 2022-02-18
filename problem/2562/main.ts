import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { flatten, reduceWithIndex } from "fp/ReadonlyArray.ts"
import { map } from "fp/Array.ts"
import { join } from "fp/std/Array.ts"

export const main = flow(
    simplifyNs,
    flatten,
    reduceWithIndex(
        [0],
        (j, [n, i], m) =>
            m > n
            ? [m, j + 1]
            : [n, i]
    ),
    map(String),
    join("\n"),
)