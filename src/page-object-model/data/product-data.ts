export namespace ProductData {
  export enum ProductName {
    BlueTop = 'Blue Top',
    MenTshirt = 'Men Tshirt',
    SleevelessDress = 'Sleeveless Dress'
  }
  export enum ProductCategory {
    WomanTop = 'Women > Tops',
    MenTshirts = 'Men > Tshirts',
    WomenDress = 'Women > Dress'
  }
  export enum ProductAvailability {
    InStock = 'In Stock'
  }
  export enum ProductCondition {
    New = 'New'
  }
  export enum ProductBrand {
    Polo = 'Polo',
    HAndM = 'H&M',
    Madame = 'Madame'
  }
  export type Product = {
    id: number;
    name: ProductName;
    category: ProductCategory;
    price: string;
    availability: ProductAvailability;
    condition: ProductCondition;
    brand: ProductBrand;
  };
  export interface ProductData {
    product: Product;
    categoryDisplayText: string;
    availabilityDisplayText: string;
    conditionDisplayText: string;
    brandDisplayText: string;
    priceDisplayText: string;
  }
  export class ProductContext implements ProductData {
    public product: Product;

    public get categoryDisplayText(): string {
      return `Category: ${this.product.category}`;
    }
    public get availabilityDisplayText(): string {
      return `Availability: ${this.product.availability}`;
    }
    public get conditionDisplayText(): string {
      return `Condition: ${this.product.condition}`;
    }
    public get brandDisplayText(): string {
      return `Brand: ${this.product.brand}`;
    }
    public get priceDisplayText(): string {
      return `Rs. ${this.product.price}`;
    }

    constructor(product: Product) {
      this.product = product;
    }
  }

  // Table of products
  export const products: Product[] = [
    {
      id: 1,
      name: ProductName.BlueTop,
      category: ProductCategory.WomanTop,
      price: '500',
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Polo
    },
    {
      id: 2,
      name: ProductName.MenTshirt,
      category: ProductCategory.MenTshirts,
      price: '400',
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.HAndM
    },
    {
      id: 3,
      name: ProductName.SleevelessDress,
      category: ProductCategory.WomenDress,
      price: '1000',
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Madame
    }
  ];
  // Function to get a product by name
  export function getProductByName(name: ProductName): Product {
    const product = products.find((product) => product.name === name);
    if (!product) {
      throw new Error(`Product with name ${name} not found`);
    }
    return product;
  }
}
export default { ProductData };
