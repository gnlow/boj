import { pipe, flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { map } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"
import { split } from "fp/string.ts"

export const main = flow(
    simplify,
    ([_, ...ls]) => ls,
    map(
        ([n, s]) => pipe(
            s,
            split(""),
            map(
                x => x.repeat(Number(n))
            ),
            join("")
        )
    ),
    join("\n"),
)