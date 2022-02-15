import { flow } from "fp/function.ts"
import { split } from "fp/string.ts"
import { map } from "fp/ReadonlyArray.ts"

export const simplify = flow(
    split("\n"),
    map(
        flow(
            split(" "),
            map(Number),
        )
    )
)