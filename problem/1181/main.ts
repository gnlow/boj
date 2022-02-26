import { flow } from "fp/function.ts"
import { simplify, print } from "util/simplify.ts"
import { map, sort, dropLeft, uniq } from "fp/ReadonlyArray.ts"
import { Ord } from "fp/Ord.ts"

const lenDict: Ord<string> = {
    compare: (a: string, b: string) => 
        a.length > b.length
            ? 1
        : a.length < b.length
            ? -1
        : a > b
            ? 1
        : a < b
            ? -1
            : 0
    ,
    equals: (a: string, b: string) => a == b,
}

export const main = flow(
    simplify,
    dropLeft(1),
    map(([x]) => x),
    uniq(lenDict),
    sort(lenDict),
    print,
)