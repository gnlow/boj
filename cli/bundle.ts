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

`

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
                        console.log(main(require("fs").readFileSync("/dev/stdin")+""))
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

        const process = Deno.run({
            cmd: [
                "cmd",
                "/c",
                "terser",
                "dist/1000.js",
                "-o",
                "dist/1000.min.js",
                "--config-file",
                "terser.config.json"
            ]
        })
        await process.status()
        process.close()
    }
)