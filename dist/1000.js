// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function main(input) {
    const [[a, b]] = input.split("\n").map((x)=>x.split(" ").map(Number)
    );
}
console.log(main(require("fs").readFileSync("/dev/stdin") + ""));
