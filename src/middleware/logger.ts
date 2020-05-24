import {
  Context,
} from "https://deno.land/x/oak/mod.ts";
import { LogRoute } from "../utils/log.ts";

export const logger = async (
  ctx: Context<Record<string, any>>,
  next: () => Promise<void>,
) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  // console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  LogRoute(ctx.request.method, `${ctx.request.url} - ${rt}`);
};
