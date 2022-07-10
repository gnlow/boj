import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"

export const sol1 = flow(
    simplifyNs,
    ([[m, n]]) => {
        const result = []
        let l = Array(n-1).fill(0).map((_, i) => i+2)
        while(l.length){
            const i = l.shift()!
            i >= m && result.push(i)
            l = l.filter(x => x%i)
        }
        return result
    },
    print
)
export const sol2 = (m: number, n: number) => {
    let l = [2,3]
    let i=0
    let x
    while(n>(x=(2*3*5)*~~((i+1)/8)+[1,7,11,13,17,19,23,29][(i+1)%8])) {
    i++;
    l.push(x)
    }
    while(l.length){
        let i = l.shift()!
        i >= m && console.log(i)
        l = l.filter(x => x%i)
    }
}

Deno.bench("Sol1", () => {
    sol1("3 100000")
})