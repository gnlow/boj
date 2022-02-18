import { flow, pipe } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { range, map } from "fp/NonEmptyArray.ts"
import { join } from "fp/std/Array.ts"

const gugudan =
    (n: number) =>
    pipe(
        range(1, 9),
        map(m => `${n} * ${m} = ${n * m}`),
        join("\n"),
    )

export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    gugudan,
)