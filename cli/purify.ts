export async function purify(targets: number[]) {
    await Promise.all(targets.map(
        async target => {
            const code = await Deno.readTextFile(`dist/${target}.js`)
            console.log([
                ...code.match(/(?<=function )(.*?)(?=\()/g) || [],
                ...code.match(/(?<=const ).*?(?= =.*?=>)/g) || [],
            ])
        }
    ))
}