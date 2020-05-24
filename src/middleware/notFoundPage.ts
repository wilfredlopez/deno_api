import {
  Context,
  Status,
} from "https://deno.land/x/oak/mod.ts";

function notFoundPage(context: Context) {
  context.response.status = Status.NotFound;
  context.response.body =
    `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}

export default notFoundPage;
