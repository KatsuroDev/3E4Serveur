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

fruits.push("Pomme");

fruits.forEach(f => console.log(f));

const sum = (a, b) => a+b;

const result = sum(12,8);
console.log(result);

const filtered = fruits.filter(f => f.length > 5)
console.log(filtered);


const numbers = [10, 20, 30, 40];
const MULTIPLIER = 3;

const products = numbers.map(n => n*MULTIPLIER).filter(n => n > 75).map(n => n+9);
console.log(products);


const spiderman = {
    hero: 'SpiderMan',
    alterEgo: 'Peter Parker',
    movies: [{title:'Spider-Man: Homecoming'},{title:'Spider-Man: Far from Home'},{title:'Spider-Man: No Way Home'}]

};

const ironman = {
    hero: 'IronMan',
    alterEgo: 'Tony Stark',
    movies: [{title:'Iron Man 1'},{title:'Iron Man 2'},{title:'Iron Man 3'}]

};

class Avenger {
    constructor(hero, alterEgo, movies) {
        this.hero = hero
        this.alterEgo = alterEgo
        this.movies = movies
    }

    test() {
        
    }
}

const oneAvenger = new Avenger('Hulk', 'Bruce Banner', [{title:"Hulk"}, {title:"Avengers"}])

console.log(oneAvenger)
console.log(spiderman)