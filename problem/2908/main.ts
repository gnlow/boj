import { flow } from "fp/function.ts"
import { simplify, print } from "util/simplify.ts"

import { NonEmptyArray, map, max } from "fp/NonEmptyArray.ts"
import { Ord } from "fp/number.ts"

export const main = flow(
    simplify,
    ([[a, b]]) => [a, b] as NonEmptyArray<string>,
    map(flow(
        s => [...s].reverse().join(""),
        Number,
    )),
    max(Ord),
)