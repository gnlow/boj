import { flow, pipe } from "fp/function.ts"
import { simplifyNs } from "util/simplify.ts"
import { range } from "fp/NonEmptyArray.ts"
import { dropLeft } from "fp/Array.ts"
import { repeat, bypass } from "util/tool.ts"
import { assertEquals } from "https://deno.land/std@0.127.0/testing/asserts.ts"

import { main } from "./main.ts"

const goBack = ([n, ...ns]: number[]) => [...ns, n]

const card = (n: number) =>
    pipe(
        range(1, n),
        repeat<number[]>(n - 1, flow(
            dropLeft(1),
            goBack,
        )),
        ([n]) => n
    )

Deno.test("my test", () => {
    for (let i=6;i<100;i++) {
        console.log(i)
        assertEquals(main(i+""), card(i))
    }
})