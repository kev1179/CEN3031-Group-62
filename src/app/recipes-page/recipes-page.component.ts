import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent {
  selectedRecipe: Recipe | null = null;

  constructor(private recipeService: RecipeService) {}

  onRecipeSelected(id: number): void {
    this.selectedRecipe = this.recipeService.getRecipeById(id);
  }

  clearSelectedRecipe(): void {
    this.selectedRecipe = null;
  }
}
