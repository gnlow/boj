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
        const process = Deno.run({
            cmd: [
                "deno",
                "bundle",
                `temp/${target}.ts`,
                `dist/${target}.js`,
                "--no-check",
            ],
            stdout: "piped"
        })
        await process.output()
        process.close()
    }
)