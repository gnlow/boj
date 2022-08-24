[a, b] = (require("fs").readFileSync(0)+"").split`\n`.map(Number)
console.log(((a<0)^(b<0))+(b<0)*2+1)