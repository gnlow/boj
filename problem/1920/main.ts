import { flow } from "fp/function.ts"
import { split } from "fp/string.ts"

function* lazySplit(str: string) {
    let result = ""
    for (const char of str) {
        if (char == " ") {
            yield result
            result = ""
        } else {
            result += char
        }
    }
    yield result
}

export const main = flow(
    split("\n"),
    ([_0, ns, _1, ms]) => {
        const nsStack: string[] = []
        const lazyNs = lazySplit(ns)
        const lazyMs = lazySplit(ms)
        let result = ""
        let nsDone = false
        for (const m of lazyMs) {
            result += (() => {
                if (!nsDone) {
                    while (!nsStack.includes(m)) {
                        const nextNs = lazyNs.next()
                        if (nextNs.done) {
                            nsDone = true
                            return "0"
                        } else {
                            nsStack.push(nextNs.value)
                        }
                    }
                } else {
                    return nsStack.includes(m) ? "1" : "0"
                }
                return "1"
            })() + "\n"
        }
        return result
    }
)