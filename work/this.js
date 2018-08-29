global.name = 'liwei';

var obj = {
  name: 'ye',
  getName: function () {
    console.log(this)
    return function () {
      console.log(this.name)
      console.log('this.name');
    }
  }
}

let obj2 = {
   name: 'q',
   getName: () => {
      console.log(this)// {}
      let that = this
      return () => {
          console.log(this)
          console.log('this')
      }
   }
}

// console.log(obj.getName()());
// console.log(obj2.getName()());

// console.log(obj2 instanceof Object) // true

obj2.getName()();

console.log((() => {console.log(this)})())




