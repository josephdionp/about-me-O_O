// Create an object with default properties (undefined or null values)
const person = {
    name: null,
    age: null
  };
  
  // Fill in the values later
  person.name = "Bob";
  person.age = 25;
  
  function greet() {
    return `Hello, my name is ${person.name} and I am ${person.age} years old.`;
  }
  console.log(greet()); // Output: { name: 'Bob', age: 25 }
  





// class Person {
//     constructor(name, age) {
//       this.name = name;
//       this.age = age;
//       this.address = { street: '123 Main St', city: 'Somewhere' };  // Using an object literal as a property
//     }
  
//     greet() {
//       return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
//     }
//   }
  
//   const person21 = new Person("Alice", 30);
//   person1.name = "Alice";
//   person1.age = 30;
//   console.log(person1.address); // Output: { street: '123 Main St', city: 'Somewhere' }
  



// //   class Person {
// //     constructor() {
// //       this.name = null;  // Empty value
// //       this.age = null;   // Empty value
// //     }
  
// //     greet() {
// //       return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
// //     }
// //   }
  
// //   const person1 = new Person();
// //   console.log(person1); // Output: Person { name: null, age: null }
  
// //   // Fill in the properties later
// //   person1.name = "Alice";
// //   person1.age = 30;
  
// //   console.log(person1.greet());  // Output: "Hello, my name is Alice and I am 30 years old."
  