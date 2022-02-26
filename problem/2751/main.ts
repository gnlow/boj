import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { sort, map, uniq, dropLeft } from "fp/ReadonlyArray.ts"
import { Ord, Eq } from "fp/number.ts"
import { split, trim } from "fp/string.ts"

export const main = flow(
    trim,
    split("\n"),
    dropLeft(1),
    map(Number),
    ns => (ns as number[]).sort(),
    map(console.log),
)