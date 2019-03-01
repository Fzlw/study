let log = console.log;
// Object.is() 比较两个值是否相等,除下面的其他跟=== 一样
log(0 === -0, Object.is(0, -0));// true, false

log(NaN === NaN, Object.is(NaN, NaN));//false, true

let obj = { "name": "liwei", "age": 100 };
// Object.assign()
// Object.getOwnPropertyDescriptor()
//Object.keys()
log(Object.keys(obj));// [ 'name', 'age' ]

//Object.values()
log(Object.values(obj));// [ 'liwei', 100 ]

//Object.entries()
log(Object.entries(obj));// [ [ 'name', 'liwei' ], [ 'age', 100 ] ]


// set get 

let a = {
  _name: 'sys',
  get name() {
    log('get');
    return 999;
  },
  set name(val) {
    this._name = val;
  }
}

log(a.name);
log(a.name = 'liwei');
log(a._name);