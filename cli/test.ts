import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts"
import { parse } from "https://deno.land/std@0.125.0/encoding/yaml.ts"

const targets = Deno.args
targets.forEach(
    target => Deno.test(
        `Problem #${target}`,
        async t => {
            const { main } = await import(`../problem/${target}/main.ts`)
            const cases = parse(
                await Deno.readTextFile(`problem/${target}/test.yaml`)
            ) as Record<string, unknown>
            await Promise.all(Object.entries(cases).map(
                ([input, output], i) => t.step({
                    name: `Case #${i}\n  ${input}  ->  ${output}`,
                    fn: async () => {
                        assertEquals(main(input), output)
                    },
                    sanitizeOps: false,
                    sanitizeResources: false,
                    sanitizeExit: false,
                })
            ))
        }
    )
)