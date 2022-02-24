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

export const print =
(nss: (number | string)[][]) =>
    nss.map(
        ns => ns.join(" ")
    ).join("\n")