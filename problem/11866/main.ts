import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { range } from "fp/NonEmptyArray.ts"

export const main = flow(
    simplifyNs,
    ([[n, k]]) => [n, k],
    ([n, k]) => {
        const r = range(1, n)
        const result: number[] = []
        range(0, n - 1).map(
            i => {
                console.log(i, k, n)
                result.push(r.splice((i + 1) * k % (n - i))[0])
            }
        )
        return result
    }
)