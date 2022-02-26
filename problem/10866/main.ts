import { flow } from "fp/function.ts"
import { simplify, print } from "util/simplify.ts"
import {
    dropLeft,
    dropRight,
    reduce,
    isEmpty,
    prepend,
    append,
    head,
    last,
} from "fp/Array.ts"
import { bypass, assert } from "tool"
import { getOrElse } from "fp/Option.ts"

let result: any[] = []

const log = <A>(a: A) => result.push(a)
const len = <A>(as: A[]) => as.length

const _front = flow(
    head,
    getOrElse(() => -1 as unknown),
    log,
)
const _back = flow(
    last,
    getOrElse(() => -1 as unknown),
    log,
)

const front = bypass(_front)
const back = bypass(_back)
const push_front = prepend
const push_back = append
const pop_front = flow(
    front,
    dropLeft(1)
)
const pop_back = flow(
    back,
    dropRight(1)
)
const size = bypass(flow(
    len,
    log,
))
const empty = bypass(flow(
    isEmpty,
    b => b ? 1 : 0,
    log,
))
const commands = {
    push_front,
    push_back,
    pop_front,
    pop_back,
    size,
    empty,
    front,
    back,
}

type Id<A> = (a: A) => A
type Cmd = Id<number[]>

const getCmd = ([cmd, x]: string[]) => {
    if (cmd == "push_front" || cmd == "push_back") {
        return commands[cmd](Number(x))
    } else {
        return commands[cmd as keyof typeof commands] as Cmd
    }
}

export const main = flow(
    bypass(() => result = []),
    simplify,
    assert<string[][]>(),
    dropLeft(1),
    reduce(
        [] as number[], 
        (a, [cmd, x]) => getCmd([cmd, x])(a)
    ),
    () => result,
    print,
)