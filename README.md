# ✅ All answers

## 1) Difference between var, let, and const
- **var:** function-scoped, redeclare এবং reassign করা যায়, hoisting হয়।  
- **let:** block-scoped, reassign করা যায় কিন্তু redeclare করা যায় না।  
- **const:** block-scoped, reassign বা redeclare করা যায় না।  

```javascript
var a = 10;
let b = 20;
const c = 30;

b = 25; // ✅ Allowed
// c = 35; // ❌ Error
```
---
## 2) What is the difference between map(), forEach(), and filter()?

* **map(), forEach(), filter():**

  * map: array transform করে নতুন array return করে।
  * forEach: iterate করে, return কিছু দেয় না।
  * filter: condition পূরণ করা element নিয়ে নতুন array return করে।

```javascript
const nums = [1,2,3,4];

nums.forEach(n => console.log(n*2)); // 2,4,6,8
const squared = nums.map(n => n*n); // [1,4,9,16]
const even = nums.filter(n => n%2==0); // [2,4]
```
---
## 3) What are arrow functions in ES6?
* **Arrow Functions:**

  * short syntax function এর জন্য।
  * `this` নিজের নয়, lexical scope ব্যবহার করে।

```javascript
const add = (a,b) => a+b;
```
---
## 4) How does destructuring assignment work in ES6?
* **Destructuring Assignment:**

  * Array বা Object থেকে সহজে value extract করা যায়।

```javascript
// Array
const [x,y] = [1,2]; // x=1, y=2

// Object
const {name, age} = {name:'John', age:25};
```
---
## 5) Explain template literals in ES6. How are they different from string concatenation? ans gula dau
* **Template Literals:**

  * Backticks `` ` `` ব্যবহার করে variable & expression embed করা যায়।
  * Multi-line string সহজে লেখা যায়।

```javascript
const name = "John";
const age = 25;

const msg = `Hello, my name is ${name} and I am ${age} years old.`;
```

* Advantages: readable, clean syntax, multi-line support.
---

# 🔰 Live Link
## Github Live Link: https://mahbub-zaman.github.io/A6-Green_Earth/

## Netify Link https://mahbub-zaman-green-earth.netlify.app/