const targets = Deno.args

const sign = (n: string) =>
`/*
    Made by Gnlow
    https://www.acmicpc.net/user/gnlowing
    https://github.com/gnlow/boj/tree/main/problem/${n}
*/

`

targets.forEach(
    async target => {
        const emitResult = await Deno.emit(
            `/run.ts`,
            {
                bundle: "module",
                check: false,
                sources: {
                    "/run.ts": `
                        import { main } from "./main.ts"
                        console.log(main(require("fs").readFileSync("/dev/stdin")+""))
                    `,
                    "/main.ts": await Deno.readTextFile(`problem/${target}/main.ts`)
                }
            }
        )
        const bundled = sign(target) + emitResult.files["deno:///bundle.js"]
        await Deno.writeTextFile(
            `dist/${target}.js`, 
            bundled
        )
        console.log(bundled)
    }
)