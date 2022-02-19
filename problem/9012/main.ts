import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { map, reduce } from "fp/ReadonlyArray.ts"
import { join } from "fp/std/ReadonlyArray.ts"
import { split } from "fp/string.ts"
import { fromPredicate, some, chain, fold } from "fp/Option.ts"

const getPar =
    (n: string) =>
    (p: number) =>
    p + (n == "(" ? 1 : -1)

export const main = flow(
    simplify,
    ([_n, ...ss]) => ss,
    map(flow(
        ([s]) => s,
        split(""),
        reduce(
            some(0),
            (p, n) => {
                return chain(flow(
                    getPar(n),
                    fromPredicate(n => n >= 0)
                ))(p)
            }
        ),
        chain(fromPredicate(n => n == 0)),
        fold(
            () => "NO",
            () => "YES",
        ),
    )),
    join("\n"),
)