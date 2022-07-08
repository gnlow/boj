import { flow, pipe } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { range } from "fp/NonEmptyArray.ts"
import { dropLeft } from "fp/Array.ts"
import { repeat, bypass } from "util/tool.ts"

const cc = (arr: number[]): number => {
    const newArr = []
    for (let i=1;i<arr.length;i+=2) {
        newArr.push(arr[i])
    }
    if (newArr.length = 1) {
        return newArr[0]
    } else {
        return cc(newArr)
    }
}

const card = (n: number) => {
    const arr = []
    for (let i=2;i<n+1;i+=2) {
        arr.push(i)
    }
    return cc(arr)
}
    



export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    card,
)