import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { map } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplify,
    ([[_n], ...nns]) => nns,
    map(
        flow(
            ([a, b]) => a + b,
            String,
        )
    ),
    join("\n")
)