import { success, progress } from "./util/log.ts"
import { run } from "./util/run.ts"

export async function bundle(targets: number[]) {
    progress("Start >bundle")
    const docify = (s: string) => s.split("\n").join("\n * ")

    const sign = (n: number, source: string) =>
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
    await Promise.all(targets.map(
        async target => {
            const main = await Deno.emit(
                `problem/${target}/main.ts`,
                {
                    bundle: "module",
                    importMapPath: "import_map.json"
                }
            )
            progress("Bundle 'problem/${target}/main.ts'")
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
            progress(`Generate 'dist/${target}.js'`)
            await run(`
                cmd /c
                terser
                dist/${target}.js
                -o dist/${target}.min.js
                --config-file terser.config.json
            `)
            progress(`Minify 'dist/${target}.js' -> 'dist/${target}.min.js'`)
            await run(`
                cmd /c
                code dist/${target}.min.js
            `)
            success(`Open dist/${target}.min.js`)
        }
    ))
}