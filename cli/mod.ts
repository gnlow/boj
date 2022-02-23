import { bundle } from "./bundle.ts"
import { download } from "./download.ts"
import { make } from "./make.ts"
import { purify } from "./purify.ts"
import { test } from "./test.ts"

const commands = {
    bundle,
    b: bundle,

    download,
    d: download,

    make,
    m: make,

    purify,
    p: purify,

    test,
    t: test,
}

let targets: number[] = []

while (true) {
    const answer = prompt(
        [
            ...Object.keys(commands),
            "quit", "q",
        ].join(", ")
        + "\n targets: "
        + targets.join(" ")
        + "\n"
    ) || ""
    if (answer == "q") {
        break
    } else if (Number(answer[0])) {
        targets = answer.split(" ").map(Number)
    } else if (answer in commands) {
        console.log("do: " + answer)
        await commands[answer as keyof typeof commands](targets)
    }
}