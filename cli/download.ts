import pptr, * as P from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import { stringify } from "https://deno.land/std@0.126.0/encoding/yaml.ts"

export async function download(targets: number[]) {
    const wsChromeEndpoint = "ws://localhost:9222/devtools/browser/634a8d6e-cbd2-4203-b588-ee93f9428294"

    const browser = await pptr.connect({
        browserWSEndpoint: wsChromeEndpoint,
    })
    const page = await browser.newPage()

    await Promise.all(targets.map(
        async target => {
            await page.goto(`https://www.acmicpc.net/problem/${target}`)
            await page.content()

            const examples: (string | number)[][] = []
            const problem = [
                await getProblemTitle(page),
                ...await getProblemInfo(page),
                ...await getProblemBody(page),
            ].filter(
                ([k, v]) => {
                    if (["제출", "정답", "맞힌 사람", "정답 비율"].includes(k))
                        return false
                    const matchExample = k.match(/예제 (입력|출력) (\d*)/)
                    if (matchExample) {
                        if (matchExample[1] == "입력") {
                            examples.push([toNumber(v)])
                        } else {
                            examples[examples.length - 1].push(toNumber(v))
                        }
                        return false
                    }
                    return true
                }
            )

            const result = Object.fromEntries([
                ["번호", Number(target)],
                ...problem
            ])
            result.예제 = Object.fromEntries(examples)
            await Deno.writeTextFile(
                `problem/${target}/problem.yaml`,
                stringify(
                    result,
                    {
                        indent: 4,
                        noCompatMode: true,
                    }
                ),
            )
        }
    ))

    async function getProblemTitle(page: P.Page) {
        const titleData = await page.$("#problem_title")
        const result = await titleData?.evaluate((e): string => e.textContent)

        return ["제목", result!]
    }
    async function getProblemInfo(page: P.Page) {
        const keyData = await page.$$("#problem-info th")
        const valData = await page.$$("#problem-info td")

        const key = await Promise.all(keyData.map(
            async el =>
                await el.evaluate(
                    (e): string => e.textContent.trim()
                )
        ))
        const val = await Promise.all(valData.map(
            async el =>
                await el.evaluate(
                    (e): string => e.textContent.trim()
                )
        ))
        const result = key.map((k, i) => [k, val[i]])
        return result
    }
    async function getProblemBody(page: P.Page) {
        const data = await page.$$("#problem-body section")

        const contents = await Promise.all(data.map(
            async el => [
                await $evaluate(
                    el,
                    ".headline > h2",
                    (e): string =>
                        e.childNodes[0].textContent.trim()
                ),
                await $evaluate(
                    el,
                    "div:not(.headline), pre",
                    (e): string =>
                        e.innerText.trim()
                ),
            ]
        ))

        return contents
    }

    async function $evaluate<T>(
        el: P.ElementHandle,
        selector: string,
        fn: (e: any) => T,
    ) {
        return (await el.$(selector))!.evaluate(fn)
    }

    function toNumber(str: string) {
        if (Number.isNaN(Number(str))){
            return str
        } else {
            return Number(str)
        }
    }
}