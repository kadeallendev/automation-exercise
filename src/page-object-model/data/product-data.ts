export namespace ProductData {
  export enum ProductName {
    BlueTop = 'Blue Top',
    MenTshirt = 'Men Tshirt',
    SleevelessDress = 'Sleeveless Dress',
    StylishDress = 'Stylish Dress',
    WinterTop = 'Winter Top',
    SummerWhiteTop = 'Summer White Top'
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
    Madame = 'Madame',
    MastAndHarbour = 'Mast & Harbour'
  }
  export type Product = {
    id: number;
    name: ProductName;
    category: ProductCategory;
    price: number;
    availability: ProductAvailability;
    condition: ProductCondition;
    brand: ProductBrand;
    quantity: number;
  };
  export interface ProductData {
    product: Product;
    categoryDisplayText: string;
    availabilityDisplayText: string;
    conditionDisplayText: string;
    brandDisplayText: string;
    priceDisplayText: string;
    totalDisplayText: string;
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
    public get totalDisplayText(): string {
      const total = this.product.quantity * this.product.price;
      return `Rs. ${total}`;
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
      price: 500,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Polo,
      quantity: 1
    },
    {
      id: 2,
      name: ProductName.MenTshirt,
      category: ProductCategory.MenTshirts,
      price: 400,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.HAndM,
      quantity: 1
    },
    {
      id: 3,
      name: ProductName.SleevelessDress,
      category: ProductCategory.WomenDress,
      price: 1000,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Madame,
      quantity: 1
    },
    {
      id: 4,
      name: ProductName.StylishDress,
      category: ProductCategory.WomenDress,
      price: 1500,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.Madame,
      quantity: 1
    },
    {
      id: 5,
      name: ProductName.WinterTop,
      category: ProductCategory.WomanTop,
      price: 600,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.MastAndHarbour,
      quantity: 1
    },
    {
      id: 6,
      name: ProductName.SummerWhiteTop,
      category: ProductCategory.WomanTop,
      price: 400,
      availability: ProductAvailability.InStock,
      condition: ProductCondition.New,
      brand: ProductBrand.HAndM,
      quantity: 1
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
