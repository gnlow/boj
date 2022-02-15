export function main(input: string) {
    const [[a, b]] = input.split("\n").map(x => x.split(" ").map(Number))

    return a + b
}