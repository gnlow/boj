import { flow } from "fp/function.ts"
import { simplify, print } from "util/simplify.ts"
import { map, flap } from "fp/ReadonlyArray.ts"
import { filter } from "fp/Array.ts"

export const main = flow(
    simplify,
    ([[_n, _m], ...l]) => l,
    l => flap(l)([
        flow(
            map(flow(
                ([x]) => [...x],
                filter()
            ))
        )
    ])
)