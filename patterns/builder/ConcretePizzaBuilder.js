const PizzaBuilder = require('./PizzaBuilder');

class ConcretePizzaBuilder extends PizzaBuilder {
    constructor() {
        super();
        this.reset();
    }
    
    reset() {
        this.pizza = {
            name: '',
            description: '',
            price: 0,
            category: null,
            image: null,
            pizzaBase: '',
            sauce: '',
            toppings: [],
            vegetables: []
        };
        return this;
    }
    
    setName(name) {
        this.pizza.name = name;
        return this;
    }
    
    setDescription(description) {
        this.pizza.description = description;
        return this;
    }
    
    setPrice(price) {
        this.pizza.price = Number(price);
        return this;
    }
    
    setCategory(categoryId) {
        this.pizza.category = categoryId;
        return this;
    }
    
    setImage(image) {
        if (image) {
            this.pizza.image = image;
        }
        return this;
    }
    
    buildBase(base) {
        this.pizza.pizzaBase = base;
        return this;
    }
    
    buildSauce(sauce) {
        this.pizza.sauce = sauce;
        return this;
    }
    
    addTopping(topping) {
        if (topping && topping.trim()) {
            this.pizza.toppings.push(topping.trim());
        }
        return this;
    }
    
    addVegetable(vegetable) {
        if (vegetable && vegetable.trim()) {
            this.pizza.vegetables.push(vegetable.trim());
        }
        return this;
    }
    
    getResult() {
        // Validate required fields
        if (!this.pizza.name) throw new Error("Pizza name is required");
        if (!this.pizza.price) throw new Error("Pizza price is required");
        if (!this.pizza.category) throw new Error("Pizza category is required");
        if (!this.pizza.pizzaBase) throw new Error("Pizza base is required");
        if (!this.pizza.sauce) throw new Error("Pizza sauce is required");
        
        const result = {...this.pizza};
        return result;
    }
}

module.exports = ConcretePizzaBuilder;