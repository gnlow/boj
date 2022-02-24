import { flow, pipe } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { range, reduce } from "fp/NonEmptyArray.ts"

const permu = (n: number, r: number) => pipe(
    range(r, n),
    reduce(1, (b, a) => b * a),
)

export const main = flow(
    simplifyNs,
    ([[n, r]]) => [n, r],
    ([n, r]) =>
        r == 0
        ? 1
        : permu(n, n - r + 1) / permu(r, 1),
)