var name = "window";

var person1 = {
  name: "person1",
  show1: function () {
    console.log(this.name);
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name);
    };
  },
  show4: function () {
    return () => console.log(this.name);
  },
};
var person2 = { name: "person2" };

person1.show1(); // person1
person1.show1.call(person2); // person2

person1.show2(); // window
person1.show2.call(person2); // error ❌ window ⭕️

person1.show3()(); // window
person1.show3().call(person2); // person2
person1.show3.call(person2)(); // window

person1.show4()(); // person1
person1.show4().call(person2); // error ❌ person1 ⭕️
person1.show4.call(person2)(); // person2

// 1. 箭头函数的this无法通过bind，call，apply来直接修改。
// 2. 改变作用域中this的指向可以改变箭头函数的this
