const x = [];

y = [12,2,3,4,5,6,7,4,78,3];
for(const i in y){
    setTimeout(() => x.push(y[i]), 100)
    // console.log(x);
}

// console.log('final x', x);
