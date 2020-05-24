import { bold, green, red, blue } from "https://deno.land/std/fmt/colors.ts";
// import { red, blue } from "https://deno.land/std@0.51.0/fmt/colors.ts";

export function LogSuccess(from: string, message: string) {
  console.log(green(bold(from)), "[", bold(message), "]");
}
export function LogFailure(from: string, message: string) {
  console.log(red(bold(from)), "", message, "");
}
export function LogRoute(method: string, message: string) {
  console.log(blue(bold(method)), "", message, "");
}
