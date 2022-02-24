
import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { map } from "fp/Array.ts"

export const main = flow(
    simplifyNs,
    ([_t, ...data]) => data as number[][],
    map(
        ([h, _w, n]) =>
            ((n - 1) % h + 1) * 100 + ~~((n - 1) / h) + 1
    ),
    print,
)