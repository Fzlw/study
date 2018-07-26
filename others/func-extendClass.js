class A {
    constructor() {
      this.x = 1;
    }
    b() {
        let t = this;
       class C {
          constructor() {
            this.x = 10;
          }
          c() {
            console.log('hello');
            t.d.call(this);
          }
       }
       return new C();
    }
    d() {
        console.log(this.x);
    }
}

new A().b().c();
