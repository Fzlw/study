function Person(age) {
    this.age = age;
    this.sex = '男';
}

Person.prototype.hello = function() {
    console.log(this.age);
    console.log(this.sex);
}

let person1 = new Person(20);
let person2 = new Person(30);

// console.log(person1.__proto__.constructor);
// console.log(person2.sex);

function Time() {}
let time1= Time.prototype;

Time.prototype = {};
let time2= Time.prototype;
console.log(time1 === time2)