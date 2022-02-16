const targets = Deno.args

targets.forEach(
    async target => {
        const code = await Deno.readTextFile(`dist/${target}.js`)
        console.log([
            ...code.match(/(?<=function )(.*?)(?=\()/g) || [],
            ...code.match(/(?<=const ).*?(?= =.*?=>)/g) || [],
        ])
    }
)