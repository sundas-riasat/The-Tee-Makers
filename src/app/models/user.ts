export class User {
  name: string;
  email: string;
  phone: number;
  dp: string;
  address: string;
  zip: number;
  card: {
    cardno: number;
    ccv: number;
    expiry: string;
  };

  pass: string;

  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.phone = obj.phone;
    this.dp = obj.dp;
    this.address = obj.address;
    this.zip = obj.zip;
    this.card.cardno = obj.card.card;
    this.card.ccv = obj.card.ccv;
    this.card.expiry = obj.card.expiry;
    this.pass = obj.pass;
  }
}
