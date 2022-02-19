import { flow, pipe } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { map } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"

export const main = flow(
    simplifyNs,
    ([_n, ns, _m, ms]) => [ns, ms],
    ([ns, ms]) => pipe(
       ms,
       map(m => +ns.includes(m)+""),
    ),
    join("\n"),
)