// Object literal
const myCar = {
    brand: "skoda",
    model: "octavia",
    color: "white",
    year: 2021,
    fullName: function() {
        return `this car is a ${this.brand} ${this.model}`
    }
}

console.log(myCar.year)
console.log(myCar.fullName())

// Object constructor
const myCar2 = new Object();
myCar2.brand = "Nissan";
myCar2.model = "Qashqai";
myCar2.color = "black";
myCar2.year = 2018;
myCar2.fullName = function() {
    return `this car is a ${this.brand} ${this.model}`
}
myCar2.age = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - myCar2.year;
}
myCar2.testiFunc = () => {
    return "testi"
}


console.log(`Car 2 age is now: ${myCar2.age()} years.`)

//When you want to access object properties using variables or strings  
let propertyName = "brand";
console.log(myCar2[propertyName])



let props = Object.keys(myCar2); //["brand", "model", "color", "year", "fullName"]

//or for loop returns all the property names in index
for (let i in myCar2){
    console.log(i)
}
//and you can use the property names to get the values
for (let i in myCar2) {
    if (typeof myCar2[i] !== "function"){
        console.log(myCar2[i]);
    }
}



const letVarFunction = () =>{
     
//var is function scoped
//let and const are block scoped
if (true) {
    var testVar = "var variable";
    let testLet = "let variable";
    const testConst = "const variable";
}

console.log(testVar); //works
console.log(testLet); //error
console.log(testConst); //error
}