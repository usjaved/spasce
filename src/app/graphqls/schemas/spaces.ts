export interface CategoriesInterface {
  categories: Array<{
    _id:string
    name: string
    isSelected: string
  }> | null;
}
