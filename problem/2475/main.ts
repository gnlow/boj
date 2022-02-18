import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { map } from "fp/ReadonlyArray.ts"
import { sum } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplifyNs,
    ([ns]) => ns,
    map(n => n ** 2),
    sum,
    x => x % 10,
)