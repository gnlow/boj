import { flow, pipe } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { map, sort } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"
import { bimap } from "fp/Tuple.ts"
import { contramap } from "fp/Ord.ts"
import { Ord } from "fp/number.ts"

const byAge = pipe(
    Ord,
    contramap((p: [number, string]) => p[0]),
)

export const main = flow(
    simplify,
    ([_n, ...ss]) => ss as [string, string][],
    map(bimap(x => x, Number)),
    sort(byAge),
    map(([age, number]) => age + " " + number),
    join("\n"),
)