import { flow } from "fp/function.ts"
import { trim, split } from "fp/string.ts"
import { map } from "fp/ReadonlyArray.ts"

export const simplify = flow(
    trim,
    split("\n"),
    map(
        flow(
            split(" "),
            map(Number),
        )
    )
)