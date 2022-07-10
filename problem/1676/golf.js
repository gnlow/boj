n=require("fs").readFileSync(0)
console.log(Array(3).fill().map((_,i)=>5**i*5).map(x=>~~(n/x)).reduce((p,c)=>p+c,0))