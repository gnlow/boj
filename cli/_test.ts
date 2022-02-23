import { success, progress } from "./util/log.ts"
import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts"
import { parse } from "https://deno.land/std@0.125.0/encoding/yaml.ts"

const targets = Deno.args

targets.forEach(
    target => Deno.test(
        `Problem #${target}`,
        async t => {
            const { main } = await import(`../problem/${target}/main.ts`)
            const cases: Record<string, unknown> = {
                ...await Deno.readTextFile(`problem/${target}/test.yaml`)
                    .then(parse)
                    .catch(() => ({})) as Record<string, unknown>,
                ...await Deno.readTextFile(`problem/${target}/problem.yaml`)
                    .then(parse)
                    .then((x: any) => x.예제)
                    .catch(() => ({})) as Record<string, unknown>
            }
            progress([
                `Load 'problem/${target}/test.yaml'`,
                `Load 'problem/${target}/problem.yaml'`,
            ])
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
            success(`End testing #${target}`)
        }
    )
)