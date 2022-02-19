import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { map, sort, dropRight } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"
import { Ord } from "fp/number.ts"

export const main = flow(
    simplifyNs,
    dropRight(1),
    map(flow(
        sort(Ord),
        ([a, b, c]) => a**2 + b**2 == c**2,
        b => b
            ? "right"
            : "wrong",
    )),
    join("\n"),
)