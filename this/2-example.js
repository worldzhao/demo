var name = 'window'

function Person(name) {
  this.name = name
  this.show1 = function() {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function() {
    return function() {
      console.log(this.name)
    }
  }
  this.show4 = function() {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // personA
personA.show1.call(personB) // personB

personA.show2() // personA
personA.show2.call(personB) // personA

personA.show3()() // window
personA.show3().call(personB) // personB
personA.show3.call(personB)() // window

personA.show4()() // personA
personA.show4().call(personB) // personA
personA.show4.call(personB)() // personA ❌ personB ⭕️

// 1. 箭头函数的this无法通过bind，call，apply来直接修改。
// 2. 改变作用域中this的指向可以改变箭头函数的this