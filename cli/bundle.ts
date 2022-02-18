const targets = Deno.args

const docify = (s: string) => s.split("\n").join("\n * ")

const sign = (n: string, source: string) =>
`/**
 * @preserve
 * @author Gnlow
 * https://www.acmicpc.net/user/gnlowing
 * 
 * Using 'fp-ts' library
 * https://github.com/gcanti/fp-ts
 * 
 * Using 'fp-ts-std' library
 * https://github.com/samhh/fp-ts-std
 * 
 * Original Code
 * https://github.com/gnlow/boj/tree/main/problem/${n}
 * \`\`\`ts
 * ${docify(source)}
 * \`\`\`
 */
/**
 * fp-ts
 * @license
 * MIT License
 * 
 * Copyright (c) 2017-present Giulio Canti
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/**
 * fp-ts-std
 * @license
 * MIT License
 *
 * Copyright (c) 2020 Sam Ashley Horvath-Hunt
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
`
const run = async (cmd: string) => {
    const process = Deno.run({
        cmd: cmd
            .trim()
            .split("\n")
            .map(x => x.trim().split(" "))
            .flat()
    })
    await process.status()
    process.close()
}
targets.forEach(
    async target => {
        const main = await Deno.emit(
            `problem/${target}/main.ts`,
            {
                bundle: "module",
                importMapPath: "import_map.json"
            }
        )
        const emitResult = await Deno.emit(
            `/run.ts`,
            {
                bundle: "module",
                check: false,
                sources: {
                    "/run.ts": `
                        import { main } from "./main.ts"
                        console.log(main(require("fs").readFileSync(0)+""))
                    `,
                    "/main.ts": main.files["deno:///bundle.js"]
                }
            }
        )
        const bundled = sign(
            target,
            await Deno.readTextFile(`problem/${target}/main.ts`)
        ) + emitResult.files["deno:///bundle.js"]
        await Deno.writeTextFile(
            `dist/${target}.js`, 
            bundled
        )

        await run(`
            cmd /c
            terser
            dist/${target}.js
            -o dist/${target}.min.js
            --config-file terser.config.json
        `)
        await run(`
            cmd /c
            code dist/${target}.min.js
        `)
    }
)