import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { chain, fromPredicate, fold } from "fp/Either.ts"
import { not } from "fp/Predicate.ts"

const range =
    (a: number, b: number) =>
    (n: number) =>
    a <= n && n <= b

const rangeThen =
    (a: number, b: number, t: string) =>
    fromPredicate(
        not(range(a, b)),
        () => t
    )

export const main = flow(
    simplify,
    ([[n]]) => n,
    rangeThen(90, 100, "A"),
    chain(rangeThen(80, 89, "B")),
    chain(rangeThen(70, 79, "C")),
    chain(rangeThen(60, 69, "D")),
    fold(
        t => t,
        () => "F"
    )
)