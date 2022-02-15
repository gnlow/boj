const targets = Deno.args

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
        const bundled = emitResult.files["deno:///bundle.js"]
        await Deno.writeTextFile(`dist/${target}.js`, bundled)
    }
)