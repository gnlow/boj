import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { flap, map } from "fp/Array.ts"
import { join } from "fp/std/Array.ts"

export const main = flow(
    simplifyNs,
    ([[h, m]]) => [h, m],
    ([h, m]) => (h + 24) * 60 + m - 45,
    x => flap(x)(
        [
            x => ~~ (x / 60 % 24),
            x => x % 60
        ]
    ),
    map(String),
    join(" "),
)