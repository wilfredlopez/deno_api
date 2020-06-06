import {
  Application,
} from "https://deno.land/x/oak/mod.ts";
import { LogFailure } from "../utils/log.ts";

export default (app: Application) => {
  app.addEventListener("error", (evt) => {
    // Will log the thrown error to the console.
    // console.log(evt.error);
    LogFailure("@Error Listener", evt.error);
  });
};
