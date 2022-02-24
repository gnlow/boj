import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { range } from "fp/NonEmptyArray.ts"

export const main = flow(
    simplifyNs,
    ([[a], [b], [c]]) => a * b * c,
    String,
    n => [...n],
    ns =>
        range(0, 9).map(flow(
            String,
            i => ns.filter(n => n == i).length,
        )),
    print,
)