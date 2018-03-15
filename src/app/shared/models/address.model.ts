export class AddressModel {
  constructor(
    public additional_direction: string,
    public address_name: string,
    public address_type_id: number,
    public apartment_number: string,
    public building_name: string,
    public created_at: string,
    public default_address: boolean,
    public floor: string,
    public house_number: string,
    public id: number,
    public is_covered: boolean,
    public latitude: number,
    public location_address: string,
    public location_name: string,
    public longitude: number,
    public street: string
  ){}
}
