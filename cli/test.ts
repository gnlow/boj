import { success, progress } from "./util/log.ts"
import { run } from "./util/run.ts"

export async function test(targets: number[]) {
    progress("Start >test")
    console.log(
        await run(
            `deno test --allow-net --allow-read --import-map=import_map.json cli/_test.ts -- ${targets.join(" ")}`
        )
    )
}