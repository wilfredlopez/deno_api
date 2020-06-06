import {
  Router,
} from "https://deno.land/x/oak/mod.ts";
import notFoundPage from "./middleware/notFoundPage.ts";
import productController from "./controllers/productController.ts";
const router = new Router();
const books = new Map<string, any>();

books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author",
});

const AVAILABLE_ROUTES = [
  {
    GET: "/api",
  },
  { GET: "/api/book" },
  { GET: "/api/book/:id" },
  { GET: "/api/v1/products" },
  { GET: "/api/v1/products/:id" },
  { DELETE: "/api/v1/products/:id" },
  { POST: "/api/v1/products" },
  { PUT: "/api/v1/products/:id" },
];

router
  .get("/", (contect) => {
    contect.response.body = AVAILABLE_ROUTES;
  })
  .get("/api", (context) => {
    context.response.body = "Hello API!";
  })
  .get("/api/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/api/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    } else {
      return notFoundPage(context);
    }
  });

const BASE_URL = "/api/v1";
router
  .get(`${BASE_URL}/products`, productController.getAll)
  .get(`${BASE_URL}/products/:id`, productController.getOne)
  .post(`${BASE_URL}/products`, productController.post)
  .put(`${BASE_URL}/products/:id`, productController.update)
  .delete(`${BASE_URL}/products/:id`, productController.delete);

export default router;
