import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { sort, dropLeft } from "fp/ReadonlyArray.ts"
import { Ord } from "fp/Ord.ts"

type Xy = [number, number]
const Ord: Ord<Xy> = {
    compare: ([x1, y1], [x2, y2]) =>
        x1 > x2
            ? 1
        : x1 < x2
            ? -1
        : y1 > y2
            ? 1
        : y1 < y2
            ? -1
            : 0,
    equals: ([x1, y1], [x2, y2]) =>
        x1 == x2 && y1 == y2
}

export const main = flow(
    simplifyNs,
    dropLeft(1),
    x => x as Xy[],
    sort(Ord),
    print,
)