import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Test Recipe', 
    //     'This is a test', 
    //     'https://www.seriouseats.com/thmb/u2sTUHrhXPhD8XL_NZZ960cnhRg=/405x270/filters:max_bytes(150000):strip_icc():format(webp)/20220817-gefiltefish-Amanda-Suarez-hero-de880ab4fbc74d02871cd39446015ef8.JPG',
    //     [
    //         new Ingredient('carrot',5),
    //         new Ingredient('bread',1)

    //     ]),
    //     new Recipe('Another Test Recipe', 
    //     'This is alos a test', 
    //     'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?resize=960,872?quality=90&webp=true&resize=300,272',
    //     [
    //         new Ingredient('noodles',2),
    //         new Ingredient('meat',1)
    //     ])
    //   ];
    private recipes: Recipe[] = [];

    
    constructor(private slService:ShoppingListService){}

    getRecipeIndex(index:number){
        return this.recipes[index]
    }

    getRecipe(){
        return this.recipes.slice()
    }

    setRecipe(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }

}