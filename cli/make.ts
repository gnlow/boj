import { progress, success } from "./util/log.ts"
import { run } from "./util/run.ts"

const defaultCode = 
`import { flow } from "fp/function.ts"
import { simplifyNs, print } from "util/simplify.ts"

export const main = flow(
    simplifyNs,
)`

export async function make(targets: number[]) {
    progress("Start >make")
    await Promise.all(targets.map(
        async target => {
            const path = `problem/${target}/`
            await Deno.mkdir(path)
            await Promise.all([
                Deno.writeTextFile(path + "main.ts", defaultCode)
            ])
            success(`Generate '${path}main.ts'`)
            await run(`
                cmd /c
                code ${path}main.ts
            `)
            success(`Open ${path}main.ts`)
        }
    ))
}