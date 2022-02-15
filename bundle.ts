const targets = Deno.args

targets.forEach(
    async target => {
        await Deno.writeTextFile(
            `temp/${target}.ts`,
            `
                import { main } from "../${target}/main.ts"
                
                console.log(main(require("fs").readFileSync("/dev/stdin")+""))
            `
        )
        const emitResult = await Deno.emit(
            `temp/${target}.ts`,
            {
                bundle: "module",
                check: false,
            }
        )
        const bundled = emitResult.files["deno:///bundle.js"]
        await Deno.writeTextFile(`dist/${target}.js`, bundled)
    }
)