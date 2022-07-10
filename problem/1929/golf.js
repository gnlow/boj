[m,n]=(require("fs").readFileSync(0)+"").split` `
l = [2,3]
i=0
while(n>(x=(2*3*5)*~~((i+1)/8)+[1,7,11,13,17,19,23,29][(i+1)%8])) {
i++;
l.push(x)
}
while(l.length){
    i = l.shift()
    i >= m && console.log(i)
    l = l.filter(x => x%i)
}