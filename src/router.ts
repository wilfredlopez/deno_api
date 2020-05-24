import {
  Router,
} from "https://deno.land/x/oak/mod.ts";
import notFoundPage from "./middleware/notFoundPage.ts";

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

export default router;
