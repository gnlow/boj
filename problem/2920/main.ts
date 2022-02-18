import { flow } from "fp/function.ts"
import { trim } from "fp/string.ts"

const check =
    (x: string) =>
    x == "1 2 3 4 5 6 7 8"
    ? "ascending"
    :
    x == "8 7 6 5 4 3 2 1"
    ? "descending"
    :
      "mixed"

export const main = flow(
    trim,
    check,
)