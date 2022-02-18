import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { split } from "fp/string.ts"
import { map } from "fp/ReadonlyArray.ts"
import { sum } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplify,
    ([_, [s]]) => s,
    split(""),
    map(Number),
    sum,
)