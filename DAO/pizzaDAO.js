const Pizza = require('../models/pizza');

class PizzaDAO {
    async addPizza(pizzaData) {
        try {
            const newPizza = new Pizza(pizzaData);
            return await newPizza.save();
        } catch (error) {
            console.error("Error adding new pizza:", error);
            throw error;
        }
    }
    async editPizza(pizzaData, id) {
        try {
            const updatedPizza = await Pizza.findByIdAndUpdate(id, pizzaData, {
                new: true,
            });
            return updatedPizza;
        }
        catch (error) {
            console.error("Error editing pizza:", error);
            throw error;
        }
    }
}
module.exports = new PizzaDAO();