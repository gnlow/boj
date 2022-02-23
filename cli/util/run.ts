export const run = async (cmd: string) => {
    const process = Deno.run({
        cmd: cmd
            .trim()
            .split("\n")
            .map(x => x.trim().split(" "))
            .flat(),
        stdout: "piped",
        stderr: "piped"
    })
    const output = await process.output()
    process.close()

    return new TextDecoder().decode(output)
}