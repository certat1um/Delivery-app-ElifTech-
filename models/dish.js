const path = require('path');
const fs = require('fs');

class Dish {
    static async getDishById(id) {
        const dishes = await Dish.getStaticDishes();
        return dishes.find(d => d.id === id);
    }
    
    static async getStaticDishes() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '../variables', 'dishes.json'),
                'utf-8',
                (err, content) => {
                    if(err) reject(err)
                    else resolve(JSON.parse(content));
                }
            )
        });
    }
}

module.exports = Dish;