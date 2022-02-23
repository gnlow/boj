import {
    pipe as $, b, i, c, bg,
    lawngreen,
    deepskyblue,
    mediumseagreen,
} from "https://denopkg.com/gnlow/blue/mod.ts"

const log = (head: string) => function (str: string | string[]) {
    let text
    if (typeof str == "string") {
        text = str
    } else {
        text = "\n    " + str.join("\n    ")
    }
    console.log(
        "\n" + head,
        c(deepskyblue)(text),
    )
}

export const success = log($(b, c(lawngreen))`Success: `)
export const progress = log($(b, c(mediumseagreen))`Progress:`)