class PizzaDirector {
    constructor(builder) {
        this.builder = builder;
    }
    changeBuilder(builder) {
        this.builder = builder;
    }
    buildCustomPizza(pizzaData) {
        this.builder.reset()
            .setName(pizzaData.name)
            .setDescription(pizzaData.description)
            .setPrice(pizzaData.price)
            .setCategory(pizzaData.category)
            .setImage(pizzaData.image)
            .buildBase(pizzaData.pizzaBase)
            .buildSauce(pizzaData.sauce);
        
        if (Array.isArray(pizzaData.toppings)) {
            pizzaData.toppings.forEach(topping => {
                this.builder.addTopping(topping);
            });
        } else if (typeof pizzaData.toppings === 'string') {
            pizzaData.toppings.split(',').forEach(topping => {
                this.builder.addTopping(topping.trim());
            });
        }
        
        if (Array.isArray(pizzaData.vegetables)) {
            pizzaData.vegetables.forEach(vegetable => {
                this.builder.addVegetable(vegetable);
            });
        } else if (typeof pizzaData.vegetables === 'string') {
            pizzaData.vegetables.split(',').forEach(vegetable => {
                this.builder.addVegetable(vegetable.trim());
            });
        }
        
        return this.builder.getResult();
    }
}

module.exports = PizzaDirector;