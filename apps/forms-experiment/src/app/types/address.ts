export class Address {
  public street = '';
  public number = '';
  public city = '';
  public zipcode = '';
  public country = '';

  constructor(address?: Partial<Address>) {
    if (address) {
      Object.assign(this, { ...address });
    }
  }
}
