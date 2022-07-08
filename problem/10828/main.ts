import { flow } from "fp/function.ts"
import { simplify, print } from "util/simplify.ts"

export const main = flow(
    simplify,
    ([_, ...cmd]) => cmd,
    cmd => {
        const result: string[] = []
        cmd.reduce((arr, [c, n]) => {
            const commands: Record<string, (n: string) => string> = {
                push: n => (arr.push(n), ""),
                pop: () => (arr.pop() || -1)+"",
                size: () => arr.length+"",
                empty: () => (arr.length ? 0 : 1)+"",
                top: () => (arr[arr.length - 1] || -1)+"",
            }
            const ret = commands[c](n)
            ret && result.push(ret)
            return arr
        }, [])
        return result
    },
    print,
)