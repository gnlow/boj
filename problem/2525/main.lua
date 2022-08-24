a,b,c=io.read("*n","*n","*n")
d=a*60+b+c
print(
    d // 60 % 24 ..
    " " ..
    d % 60
)