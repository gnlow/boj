import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"

// Array(10).fill().map((_,i)=>5**i) 
const p5 = [ 5, 25, 125, 625, 3125, 15625, 78125, 390625, 1953125 ]

export const main = flow(
    simplifyNs,
    ([[n]]) => p5.map(x => ~~(n / x)).reduce((p,c)=>p+c,0)
)