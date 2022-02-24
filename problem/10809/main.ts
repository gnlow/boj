import { flow } from "fp/function.ts"
import { simplify, print } from "util/simplify.ts"

export const main = flow(
    simplify,
    ([[str]]) => str,
    str => 
        [..."abcdefghijklmnopqrstuvwxyz"].map(
            char => str.indexOf(char)
        ),
    ns => [ns],
    print,
)