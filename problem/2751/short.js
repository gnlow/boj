console.log((require("fs").readFileSync(0)+"").trim().split`
`.splice(1).map(Number).sort((a,b)=>a-b).join`
`)

console.log((require("fs").readFileSync(0)+"").trim().split`
`.slice(1).sort((a,b)=>a-b).join`
`)