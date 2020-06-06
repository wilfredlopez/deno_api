import {
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

interface Book {
  id: string;
  title: string;
  author: string;
}
const books = new Map<string, Book>();

books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author",
});
books.set("2", {
  id: "2",
  title: "Game Of Thrones",
  author: "George R. Martin",
});

interface ResponseConvention<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
}

export class BooksController {
  getAll({ response }: RouterContext) {
    response.status = 200;
    const RES: ResponseConvention<Book[]> = {
      ok: true,
      data: Array.from(books.values()),
      error: null,
    };
    response.body = RES;
  }
  getOne({ response, params }: RouterContext<{ id: string }>) {
    if (params && params.id && books.has(params.id)) {
      response.body = books.get(params.id);
    } else {
      response.body = {
        ok: false,
        data: null,
        error: "Not Found.",
      };
    }
  }
}

const booksController = new BooksController();

export default booksController;
