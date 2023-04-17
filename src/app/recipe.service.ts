import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Cuban Pasteles de Guayaba',
      'https://i0.wp.com/www.mybigfatcubanfamily.com/wp-content/uploads/2016/07/MyBigFatCubanFamilyHomemadePastelitosdeGuayabaRecipe.jpeg?w=650&ssl=1',
      ['1 pkg. Pepperidge Farm Puff Pastry Sheets', '1 bar guava paste'],
      ['Preheat oven to 400 degrees.', 'Thaw the puff pastry according to package directions.', 'Cut the puff pastry into 1-inch squares.', 'Place a small amount of guava paste in the center of each square.', 'Fold the pastry over the guava paste and press the edges together to seal.', 'Place the pastries on a baking sheet and bake for 15 minutes or until golden brown.', 'Remove from the oven and let cool.', 'Serve warm or at room temperature.', 'Enjoy!']
    ),
    new Recipe(
      2,
      'Miso Soup',
      'https://iamafoodblog.b-cdn.net/wp-content/uploads/2019/03/authentic-miso-soup-recipe-7932.jpg',
      ['2 cups dashi', '2-3 tablespoons miso', 'wakame seaweed', '1/2 package soft tofu', 'slicked green onions'],
      ['Make 2 cups of dashi according to the package instructions.','Bring to a simmer over medium high heat.', 'Remove the pot from the heat.', 'Get a bowl and ladle out a small amount of dashi into it and and stir the miso into the bowl of hot dashi.', 'Add seaweed, tofu, and green onions and gently heat over very low heat being sure not to bring it up to a simmer or boil – you don’t want the miso to be too hot because you’ll kill all of the amazing probiotics.', 'Serve immediately.'],
    ),
    new Recipe(
      3,
      'Cranberry Feta Salad',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F30%2Fe5%2F1f%2F30e51fc53e96c234c76fa1256e7fa968.jpg&f=1&nofb=1&ipt=e9f7d4461609c303b6324dbc87340f75047cd5442bd97ff155640d280b358769&ipo=images',
      ['1/2 cup dried cranberries', '1/2 cup water', '1/2 cup feta cheese', '1/2 cup walnuts', '1/2 cup dried cranberries', '1/2 cup water', '1/2 cup feta cheese', '1/2 cup walnuts'],
      ['In a small saucepan, bring the cranberries and water to a boil.', 'Reduce heat; simmer, uncovered, for 5 minutes or until cranberries are tender.', 'Drain and cool.', 'In a large bowl, combine the cranberries, feta cheese and walnuts.', 'In a small bowl, whisk the oil, vinegar, sugar, salt and pepper.', 'Pour over salad and toss to coat.', 'Serve immediately.'],
    ),
    new Recipe(
      4,
      'Latkes',
      'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_50/1651221/french-onion-latkes-today-121420-square.jpeg',
      ['2 pounds russet potatoes, peeled and shredded', '1 medium onion, shredded', '2 eggs, lightly beaten', '1/2 cup all-purpose flour', '1 teaspoon salt', '1/2 teaspoon pepper', 'vegetable oil'],
      ['In a large bowl, combine the potatoes, onion, eggs, flour, salt and pepper.', 'In a large skillet, heat 1/2 in. of oil over medium-high heat.', 'Drop batter by 1/4 cupfuls into hot oil.', 'Fry until golden brown on both sides, 3-4 minutes on each side.', 'Drain on paper towels.'],
    ),
    new Recipe(
      5,
      'Pumpkin Pie',
      'https://www.allrecipes.com/thmb/DXjy4ZXwgwPun42CBO-3f9-1358=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/23439-PerfectPumpkinPie_002-4x3-1-44d015659c5c4a0888238d8f22de2a5e.jpg',
      ['1 can pumpkin puree', '1 can sweetened condensed milk', '1 can evaporated milk', '1/2 cup brown sugar', '1 teaspoon cinnamon', '1 teaspoon ginger', '1/2 teaspoon nutmeg', '1/2 teaspoon cloves', '1/2 teaspoon salt', '1/2 teaspoon vanilla extract', '1/2 teaspoon lemon juice', '1/2 teaspoon lemon zest', '1 pie crust'],
      ['Preheat oven to 425 degrees F.', 'In a large bowl, whisk together pumpkin puree, sweetened condensed milk, evaporated milk, brown sugar, cinnamon, ginger, nutmeg, cloves, salt, vanilla extract, lemon juice, and lemon zest.', 'Pour mixture into pie crust and bake for 15 minutes.', 'Reduce oven temperature to 350 degrees F and bake for an additional 40-50 minutes or until a knife inserted in the center comes out clean.', 'Cool completely before serving.'],
    ),
    new Recipe(
      6,
      'Double Chcolate Chip Frappuccino',
      'https://i0.wp.com/thegirlinspired.com/wp-content/uploads/2022/03/Starbucks-Double-Chocolate-Chip-Frappuccino-17.jpg',
      ['1 cup milk', '1/2 cup chocolate syrup', '1/2 cup ice', '1/2 cup chocolate chips', '1/2 cup whipped cream'],
      ['In a blender, combine milk, chocolate syrup, ice, and chocolate chips.', 'Blend until smooth.', 'Pour into a glass and top with whipped cream.'],
    ),
    new Recipe(
      7,
      'Peruvian Fusion Ceviche',
      'https://www.machutravelperu.com/blog/wp-content/uploads/2020/10/fusion-food.jpg',
      ['1 lb. shrimp', '1 lb. scallops', '1 lb. mahi mahi', '1 lb. tilapia', '1 lb. calamari', '1 lb. octopus', '1 lb. clams', '1 lb. mussels', '1 lb. oysters', '1 lb. squid'],
      ['In a large bowl, combine shrimp, scallops, mahi mahi, tilapia, calamari, octopus, clams, mussels, oysters, and squid.', 'Add lime juice, cilantro, red onion, and salt and pepper to taste.', 'Cover and refrigerate for 30 minutes.', 'Serve with tortilla chips.'],
    ),
    new Recipe (
      8,
      'Italian Lemon Ice Cream',
      'https://1.bp.blogspot.com/-U7SnXrnMm_0/YRMIRFpQMTI/AAAAAAADMn4/OBFIgywiKzkK2F2M9ezqnE2Aie1XyYJRgCLcBGAsYHQ/s2048/Italian%2Bgranita%2Bal%2Blimone%2B2.jpg',
      ['1 cup sugar', '1 cup water', '1 cup lemon juice', '1 cup heavy cream', '1 cup milk', '1/2 cup sugar', '1/2 cup water', '1/2 cup lemon juice', '1/2 cup heavy cream', '1/2 cup milk'],
      ['In a small saucepan, combine 1 cup sugar and 1 cup water.', 'Bring to a boil.', 'Remove from the heat and stir in 1 cup lemon juice.', 'Pour into a 9x13 inch baking dish and freeze for 2 hours.', 'In a small saucepan, combine 1/2 cup sugar and 1/2 cup water.', 'Bring to a boil.', 'Remove from the heat and stir in 1/2 cup lemon juice.', 'Pour into a 9x13 inch baking dish and freeze for 2 hours.', 'In a large bowl, combine 1 cup heavy cream and 1 cup milk.', 'In a small saucepan, combine 1/2 cup heavy cream and 1/2 cup milk.', 'Stir in 1/2 cup sugar and 1/2 cup water.', 'Bring to a boil.', 'Remove from the heat and stir in 1/2 cup lemon juice.', 'Pour into a 9x13 inch baking dish and freeze for 2 hours.', 'In a large bowl, combine 1 cup heavy cream and 1 cup milk.', 'Stir in 1 cup sugar and 1 cup water.', 'Bring to a boil.', 'Remove from the heat and stir in 1 cup lemon juice.', 'Pour into a 9x13 inch baking dish and freeze for 2 hours.'],
    ),
    new Recipe(
      9,
      'Vegan Chocolate Chip Cookies',
      'https://www.purelykaylie.com/wp-content/uploads/2020/03/Vegan-Chocolate-Chip-Cookies-27.jpg',
      ['1 cup all-purpose flour', '1/2 cup unsweetened cocoa powder', '1/2 teaspoon baking soda', '1/2 teaspoon salt', '1/2 cup vegan butter', '1/2 cup brown sugar', '1/2 cup granulated sugar', '1 teaspoon vanilla extract', '1/2 cup vegan chocolate chips'],
      ['Preheat oven to 350 degrees F.', 'In a medium bowl, whisk together flour, cocoa powder, baking soda, and salt.', 'In a large bowl, cream together butter, brown sugar, and granulated sugar.', 'Add vanilla extract and mix until combined.', 'Add flour mixture and mix until combined.', 'Fold in chocolate chips.', 'Drop by rounded tablespoonfuls onto a baking sheet.', 'Bake for 8-10 minutes.'],
    ),
    new Recipe(
      10,
      'Cookie Dough Ice Cream',
      'https://www.theendlessmeal.com/wp-content/uploads/2021/08/Chocolate-Chip-Cookie-Dough-Ice-Cream-3.jpg',
      ['1 cup all-purpose flour', '1/2 cup unsweetened cocoa powder', '1/2 teaspoon baking soda', '1/2 teaspoon salt', '1/2 cup vegan butter', '1/2 cup brown sugar', '1/2 cup granulated sugar', '1 teaspoon vanilla extract', '1/2 cup vegan chocolate chips'],
      ['Preheat oven to 350 degrees F.', 'In a medium bowl, whisk together flour, cocoa powder, baking soda, and salt.', 'In a large bowl, cream together butter, brown sugar, and granulated sugar.', 'Add vanilla extract and mix until combined.', 'Add flour mixture and mix until combined.', 'Fold in chocolate chips.', 'Drop by rounded tablespoonfuls onto a baking sheet.', 'Bake for 8-10 minutes.'],
    ),
  ];

  constructor() {}

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // Return a copy of the recipes array
  }

  getRecipeById(id: number): Recipe | null {
    const recipe = this.recipes.find((r) => r.id === id);
    return recipe ? { ...recipe } : null; // Return a copy of the recipe object or null if not found
  }
}
