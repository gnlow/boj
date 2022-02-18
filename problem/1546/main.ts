import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { bimap } from "fp/Tuple.ts"
import { create } from "fp/std/Tuple.ts"
import { map } from "fp/Array.ts"
import { mean } from "fp/std/Array.ts"
import { fromArray, max } from "fp/NonEmptyArray.ts"
import { Ord } from "fp/number.ts"
import * as O from "fp/Option.ts"

export const main = flow(
    simplifyNs,
    ([
        [_n],
        [...as],
    ]) => as,
    fromArray,
    as => create([as, as]),
    bimap(
        O.map(max(Ord)),
        O.map(mean),
    ),
    map(O.getOrElse(() => 0)),
    ([meanV, m]) => meanV / m * 100
)