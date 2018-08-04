class A {
    constructor() {
        this.a = 10;
        this.b = 20;
    }
    a() {

    }

    static aa() {
        console.log(2)
    }
}

class B extends A {
    constructor() {
        super();
        this.c = 30;
        this.bb();
        // 静态方法只能通过构造函数的属性或者使用类名来调用
        this.constructor.aa();
        A.aa();
    }
    bb() {
        console.log(3)
    }
}
new B()