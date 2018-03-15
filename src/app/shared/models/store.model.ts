import {CategoryModel} from './category.model';

export class StoreModel {
  constructor(
    public _info: boolean,
    public id: number,
    public is_opened: boolean,
    public is_schedule: boolean,
    public min_basket_value: number,
    public photo_url: string,
    public photo1_url: string,
    public company_name: string,
    public opening_time: string,
    public top_searches: Array<string>,
    public _paymentNames:  Array<string>,
    public categories: Array<CategoryModel>,
    public available_payment_types: [{id: number, name: string}],
  ) {}
}
