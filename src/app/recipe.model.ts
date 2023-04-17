export class Recipe {
    constructor(
      public id: number,
      public name: string,
      public image: string,
      public ingredients: string[],
      public steps: string[]
    ) {}
  }