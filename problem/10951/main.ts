import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { map } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplifyNs,
    map(
        flow(
            ([a, b]) => a + b,
            String,
        )
    ),
    join("\n")
)