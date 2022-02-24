import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { range, map } from "fp/NonEmptyArray.ts"
import { join } from "fp/std/Array.ts"

export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    n => range(1, n),
    map(String),
    join("\n"),
)