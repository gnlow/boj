import { flow } from "fp/function.ts"
import { simplify } from "util/simplify.ts"
import { map } from "fp/ReadonlyArray.ts"
import { sum, join } from "fp/std/ReadonlyArray.ts"
import { split } from "fp/string.ts"

const tri = (n: number) => n * (n + 1) / 2

export const main = flow(
    simplify,
    ([_, ...ss]) => ss,
    map(flow(
        ([s]) => s,
        split("X"),
        map(flow(
            os => os.length,
            tri,
        )),
        sum,
        String,
    )),
    join("\n"),
)