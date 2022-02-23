export const run = async (cmd: string) => {
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