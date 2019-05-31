export class Product {
  category: string;
  color: string;
  date: Date;
  description: string;
  images: string;
  maker: string;
  price: number;
  size: number;
  title: string;

  constructor(obj) {
    this.category = obj.category;
    this.color = obj.color;
    this.date = obj.date;
    this.description = obj.description;
    this.images = obj.images;
    this.maker = obj.maker;
    this.price = obj.price;
    this.size = obj.size;
    this.title = obj.title;
  }
}
