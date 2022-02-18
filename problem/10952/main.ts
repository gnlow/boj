import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { map, dropRight } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplify,
    dropRight(1),
    map(
        flow(
            ([a, b]) => a + b,
            String,
        )
    ),
    join("\n")
)