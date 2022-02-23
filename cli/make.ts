export async function make(targets: number[]) {
    const defaultCode = 
    `import { flow } from "fp/function.ts"
    import { simplify } from "util/simplify.ts"

    export const main = flow(
        simplify,
    )`

    await Promise.all(targets.map(
        async target => {
            const path = `problem/${target}/`
            await Deno.mkdir(path)
            await Promise.all([
                Deno.writeTextFile(path + "main.ts", defaultCode),
                Deno.writeTextFile(path + "test.yaml", "")
            ])
        }
    ))
}