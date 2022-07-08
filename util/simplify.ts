import { flow } from "fp/function.ts"
import { trim, split } from "fp/string.ts"
import { map } from "fp/ReadonlyArray.ts"


const simple =
    <T>(f: (s: string) => T) =>
    flow(
        trim,
        split("\n"),
        map(
            flow(
                split(" "),
                map(f),
            )
        )
    )
export const simplifyNs = simple(Number) as (s: string) => number[][]
export const simplify = simple(x => x) as (s: string) => string[][]

type Data = number | string
type SsOrS<T> = T[][] | T[]
type RSsOrS<T> = readonly (readonly T[])[] | readonly T[]

export const print =
(nss: SsOrS<Data> | RSsOrS<Data>) =>
    nss.map(
        ns =>
            typeof ns == "object"
                ? ns.join(" ")
                : ns
    ).join("\n")