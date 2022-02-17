import { flow } from "fp/function.ts"
import { trim, split } from "fp/string.ts"

export const main = flow(
    trim,
    split(" "),
    l => l[0] == "" ? 0 : l.length,
)