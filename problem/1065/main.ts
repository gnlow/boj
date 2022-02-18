import { pipe, flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { split } from "fp/string.ts"
import {
    map,
    mapWithIndex,
    dropLeft,
    every,
    filter,
} from "fp/ReadonlyArray.ts"
import { range } from "fp/NonEmptyArray.ts"

const getInterval =
    (l: readonly number[]) =>
    mapWithIndex(
        (i, x: number) => x - l[i-1]
    )(l)

const allSame =
    (l: readonly number[]) =>
    every(x => x == l[0])(l)

const isHansu =
    (n: number) =>
    pipe(
        n,
        String,
        split(""),
        map(Number),
        getInterval,
        dropLeft(1),
        allSame,
    )

export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    n => range(1, n),
    filter(isHansu),
    l => l.length
)