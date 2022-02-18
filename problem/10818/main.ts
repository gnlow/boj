import { pipe, flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import * as O from "fp/Option.ts"
import { toArray } from "fp/ReadonlyArray.ts"
import { fromArray, min, max, flap, NonEmptyArray } from "fp/NonEmptyArray.ts"
import { Ord } from "fp/number.ts"

const assertNonEmpty = 
    (ns: number[]) =>
    pipe(
        ns,
        fromArray,
        O.getOrElse(() => [0] as NonEmptyArray<number>),
    )

export const main = flow(
    simplifyNs,
    ([_, ns]) => ns,
    toArray,
    assertNonEmpty,
    ns => flap(ns)([
        min(Ord),
        max(Ord),
    ]),
    ([a, b]) => a + " " + b,
)