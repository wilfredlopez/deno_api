import {
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    description: "Good P",
    name: "Lakers Cap",
    price: 22.99,
  },
  {
    id: 2,
    description: "Not Good For You.",
    name: "Yankees Cap",
    price: 50.02,
  },
];

interface ResponseConvention<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
}

export class ProductController {
  getAll({ request, response }: RouterContext) {
    response.status = 200;
    const RES: ResponseConvention<Product[]> = {
      ok: true,
      data: SAMPLE_PRODUCTS,
      error: null,
    };
    response.body = RES;
  }
  getOne({ request, response, params }: RouterContext<{ id: string }>) {
    const id = params.id;
    const product = SAMPLE_PRODUCTS.find((p) => p.id === +id);

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
    const { description, name, price } = body.value() as Omit<Product, "id">;
    console.log(description, name, price);
    const newProduct = {
      description,
      id: SAMPLE_PRODUCTS.length,
      name,
      price,
    };
    SAMPLE_PRODUCTS.push(newProduct);
    response.body = {
      ok: true,
      data: newProduct,
      error: null,
    };
  }
  async update({ request, response, params }: RouterContext<{ id: string }>) {
    const id = params.id;
    response.body = "Product Controller update" + id;
  }
  delete({ request, response, params }: RouterContext<{ id: string }>) {
    const id = params.id;
    const index = SAMPLE_PRODUCTS.findIndex((p) => p.id === +id);
    if (index === -1) {
      response.status = 400;
      response.body = {
        ok: false,
        error: "not found",
        data: null,
      };
    } else {
      const prod = SAMPLE_PRODUCTS.splice(index, 1);
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