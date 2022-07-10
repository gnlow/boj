import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"

export const main = flow(
    simplifyNs,
    ([[m, n]]) => {
        let l = Array(n-1).fill(0).map((_, i) => i+2)
        while(l.length){
            const i = l.shift()!
            i >= m && console.log(i)
            l = l.filter(x => x%i)
        }
    }
)