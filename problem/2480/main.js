l=(require("fs").readFileSync(0)+"").split` `.map(Number)

o = []
s = 0
prize = 0
l.forEach(x =>{
    if (o.includes(x)) {
        s = x
        if (prize == 0) {
            prize = 100
        } else if (prize == 100) {
            prize = 1000
        }
    }
    o.push(x)
})

console.log((prize || 100) * (s ? s + 10 : Math.max(...l)))