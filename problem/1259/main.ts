import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"
import { map, dropRight } from "fp/ReadonlyArray.ts"

function isPalindrome(t: string) {
    return t == [...t].reverse().join("")
}

export const main = flow(
    simplifyNs,
    dropRight(1),
    map(flow(
        ([n]) => n,
        String,
        isPalindrome,
        b => b ? "yes" : "no"
    )),
    print,
)