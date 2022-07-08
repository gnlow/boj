import { flow } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"

export const main = flow(
    simplifyNs,
    ([[n]]) => n,
    n => {
        const five = ~~(n / 5) - [0, 1, 2, 0, 1][n % 5]
        if (five < 0) return -1
        const three = ~~((n - five * 5) / 3)
        if (five * 5 + three * 3 < n) return -1
        return five + three
    }
)