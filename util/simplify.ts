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
export const simplifyNs = simple(Number)
export const simplify = simple(x => x)

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