import { flow, pipe } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { range } from "fp/NonEmptyArray.ts"
import { dropLeft } from "fp/Array.ts"
import { repeat } from "util/tool.ts"

const goBack = ([n, ...ns]: number[]) => [...ns, n]

const card = (n: number) =>
    pipe(
        range(1, n),
        repeat<number[]>(n - 1, flow(
            dropLeft(1),
            goBack,
        )),
        ([n]) => n
    )

export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    card,
)