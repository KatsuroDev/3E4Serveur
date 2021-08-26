const firstName = 'Yannick';
console.log(firstName);

let age = 33;
age++;

console.log(age);

const test = 1 + true;
const test2 = 125 + '9';
console.log(test);
console.log(test2);

console.log(('b' + 'a' + + 'a' + 'a'));

function displayUser(firstName, age) {
    console.log(`Bonjour je m'appelle ${firstName} et j'ai ${age} ans`);
    
}

displayUser('Rosalie', 12);

const fruits = ['Kiwi', 'Banane', 'Fraise', 'Pamplemousse', 'Mangue'];

for(let fruit of fruits) {
    console.log(fruit);
}