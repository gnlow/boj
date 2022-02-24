import { flow, pipe } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { unsafeDeleteAt, map } from "fp/Array.ts"
import { range } from "fp/NonEmptyArray.ts"
import { flip } from "fp/function.ts"
import { curry2 } from "fp/std/Function.ts"

const cDeleteAt = pipe(
    unsafeDeleteAt,
    flip,
    curry2,
) as (a: number[]) => (b: number) => number[]


function bj(limit: number, is: number[]) {
    let best = 0
    is.map((x, i, l) => 
        unsafeDeleteAt(i, l)
        .map((y, j, l) => 
            unsafeDeleteAt(j, l)
            .map(
                (z, k, l) => {
                    const result = x + y + z
                    if (result <= limit && result > best) {
                        best = result
                    }
                }
            )
        )
    )
    return best
}

export const main = flow(
    simplifyNs,
    ([[_n, m], ns]) => bj(m, ns as number[]),
)