class A {
  constructor() {
    this.name = 'a'
    this.sayName = () => {
      console.log(`I am ${this.name}`)
    }
  }
}

new A().sayName()

class B extends A {
  constructor() {
    super()
    this.name = 'b'
  }
}

new B().sayName()
