import * as dotEnv from "https://deno.land/x/dotenv/mod.ts";

//Loads ENV Data to Deno.env
import "https://deno.land/x/dotenv/load.ts";

import {
  Application,
} from "https://deno.land/x/oak/mod.ts";
import { logger } from "./middleware/logger.ts";
import { responseTime } from "./middleware/responseTime.ts";
import notFoundPage from "./middleware/notFoundPage.ts";
import { LogSuccess } from "./utils/log.ts";
import router from "./router.ts";
import errorListener from "./middleware/errorListener.ts";
//Import env file.
dotEnv.config();

const app = new Application();

//Error Listener middleware
errorListener(app);
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
