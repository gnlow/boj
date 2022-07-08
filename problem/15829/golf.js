console.log([...(require("fs").readFileSync(0)+"").split`
`[1]].reduce((p,c,i)=>p+(b=BigInt)(c.charCodeAt()-96)*31n**b(i),0n)%1234567891n+"")