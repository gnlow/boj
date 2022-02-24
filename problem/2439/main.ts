import { flow } from "fp/function.ts"
import { makeBy } from "fp/ReadonlyArray.ts";
import { simplifyNs } from "util/simplify.ts"
import { join } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    n => makeBy(
        n,
        flow(
            i => "*".repeat(i + 1),
            x => x.padStart(n),
        )
    ),
    join("\n"),
)