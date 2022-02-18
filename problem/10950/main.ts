import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { map } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplifyNs,
    ([[_n], ...nns]) => nns,
    map(
        flow(
            ([a, b]) => a + b,
            String,
        )
    ),
    join("\n")
)