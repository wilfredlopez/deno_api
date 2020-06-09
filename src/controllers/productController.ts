import {
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";
import { Mapper } from "../utils/Mapper.ts";

interface Product {
  readonly id: string;
  name: string;
  price: number;
  description: string;
}
const ProductsMap = new Mapper<Product>();

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    description: "Good P",
    name: "Lakers Cap",
    price: 22.99,
  },
  {
    id: "2",
    description: "Not Good For You.",
    name: "Yankees Cap",
    price: 50.02,
  },
];

for (const prod of SAMPLE_PRODUCTS) {
  ProductsMap.set(prod.id, prod);
}

interface ResponseConvention<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
}

export class ProductController {
  static isValidRawProduct(rawProduct: Omit<Product, "id">) {
    if (
      !rawProduct.description || !rawProduct.name || !rawProduct.price
    ) {
      return false;
    }
    if (rawProduct.description.trim() === "") return false;
    if (rawProduct.name.trim() === "") return false;
    if (rawProduct.price <= 0) return false;
    return true;
  }
  getAll({ request, response }: RouterContext) {
    response.status = 200;
    const RES: ResponseConvention<Product[]> = {
      ok: true,
      data: ProductsMap.toArray(),
      error: null,
    };
    response.body = RES;
  }
  getOne({ request, response, params }: RouterContext<{ id: string }>) {
    const id = params.id;
    const product = ProductsMap.get(id);

    if (product) {
      response.status = 200;
      response.body = {
        ok: true,
        data: product,
        error: null,
      };
      return;
    } else {
      response.status = 404;
      response.body = {
        ok: false,
        data: null,
        error: `Product with id ${id} not found.`,
      };
    }
  }
  async post({ request, response }: RouterContext) {
    const body = await request.body();
    const { description, name, price } = body.value as Omit<Product, "id">;

    const newProduct = {
      description,
      id: ProductsMap.size + 1 + "",
      name,
      price,
    };
    if (ProductController.isValidRawProduct(newProduct)) {
      ProductsMap.set(newProduct.id, newProduct);
      response.status = 201;
      response.body = {
        ok: true,
        data: newProduct,
        error: null,
      };
    } else {
      response.status = 400;
      response.body = {
        ok: false,
        error: "validation failed",
        data: null,
      };
    }
  }
  async update({ request, response, params }: RouterContext<{ id: string }>) {
    const id = params.id;
    const exist = ProductsMap.has(id);
    if (!exist) {
      response.status = 404;
      response.body = {
        ok: false,
        error: "Not Found",
        data: null,
      };
      return;
    }

    const body = await request.body();
    const updated = body.value as Omit<Product, "id">;
    const keys = Object.keys(updated);
    const prod = ProductsMap.get(id)!;
    keys.forEach((key) => {
      const i = key as keyof Product;
      if (prod[i]) {
        if (i !== "id") {
          if (i === "price") {
            prod[i] = updated[i];
          } else {
            prod[i] = updated[i];
          }
        }
      }
    });
    response.status = 202;
    response.body = {
      data: prod,
      error: null,
      ok: true,
    };
  }
  delete({ request, response, params }: RouterContext<{ id: string }>) {
    const id = params.id;
    const has = ProductsMap.has(id);
    if (!has) {
      response.status = 400;
      response.body = {
        ok: false,
        error: "not found",
        data: null,
      };
    } else {
      const prod = ProductsMap.delete(id)!;
      response.body = {
        ok: true,
        data: prod,
        error: null,
      };
    }
  }
}

const productController = new ProductController();

export default productController;
