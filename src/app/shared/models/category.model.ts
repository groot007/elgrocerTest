export class CategoryModel {
  constructor(
    public description: string,
    public id: number,
    public image_url: string,
    public is_show_brand: boolean,
    public logo1_url: string,
    public name: string
  ){}
}
