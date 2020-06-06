import {
  Router,
} from "https://deno.land/x/oak/mod.ts";
import productController from "./controllers/productController.ts";
import booksController from "./controllers/booksControllert.ts";
const router = new Router();

const BASE_URL = "/api/v1";
const AVAILABLE_ROUTES = [
  {
    GET: "/",
  },
  { GET: `${BASE_URL}/book` },
  { GET: `${BASE_URL}/book/:id` },
  { GET: `${BASE_URL}/products` },
  { GET: `${BASE_URL}/products/:id` },
  { DELETE: `${BASE_URL}/products/:id` },
  { POST: `${BASE_URL}/products` },
  { PUT: `${BASE_URL}/products/:id` },
  {
    INFO: [
      {
        productShape: {
          id: "number",
          description: "string",
          name: "string",
          price: "number",
        },
      },
      {
        bookShape: {
          id: "string",
          title: "string",
          author: "string",
        },
      },
    ],
  },
];

router
  .get("/", (context) => {
    context.response.status = 200;
    context.response.body = AVAILABLE_ROUTES;
  })
  .get(`${BASE_URL}/book`, booksController.getAll)
  .get(`${BASE_URL}/book/:id`, booksController.getOne);

router
  .get(`${BASE_URL}/products`, productController.getAll)
  .get(`${BASE_URL}/products/:id`, productController.getOne)
  .post(`${BASE_URL}/products`, productController.post)
  .put(`${BASE_URL}/products/:id`, productController.update)
  .delete(`${BASE_URL}/products/:id`, productController.delete);

export default router;
