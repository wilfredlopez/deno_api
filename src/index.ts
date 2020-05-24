import {
  Application,
} from "https://deno.land/x/oak/mod.ts";
import { logger } from "./middleware/logger.ts";
import { responseTime } from "./middleware/responseTime.ts";
import notFoundPage from "./middleware/notFoundPage.ts";
import { LogSuccess, LogFailure } from "./utils/log.ts";
import router from "./router.ts";

const app = new Application();

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  // console.log(evt.error);
  LogFailure("@Error Listener", evt.error);
});

// Logger
app.use(logger);
// Response Time
app.use(responseTime);

app.use(router.routes());
app.use(router.allowedMethods());

// //static folder
// // --allow-read is needeed for this to work
// app.use(async (context) => {
//   try {
//     await send(context, context.request.url.pathname, {
//       root: `${Deno.cwd()}/public/`,
//       index: `index.html`,
//     });
//   } catch (error) {
//     LogFailure("@static content", error);
//     return notFound(context);
//   }
// });

// A basic 404 page
app.use(notFoundPage);

const PORT = Deno.env.get("PORT") || "5600";

LogSuccess("@Server", `Listening on http://localhost:${PORT}/`);
await app.listen({ port: +PORT });
