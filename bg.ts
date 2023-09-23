import { writeFileSync } from "node:fs";
import minimist from "npm:minimist@latest";
import { setWallpaper } from "npm:wallpaper@latest";

const sleep = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export function parseArguments(argv: string[]) {
  const args = minimist(argv);

  const page = "p" in args ? `page=${args["p"]}` : "page" in args ? `page=${args["page"]}` : "";
  const limit = "l" in args ? `limit=${args["l"]}` : "limit" in args ? `limit=${args["limit"]}` : "limit=1";
  const tags = "t" in args ? `tags=${args["t"]}` : "tags" in args ? `tags=${args["tags"]}` : "tags=";
  const size = "s" in args ? `%20size:${args["s"]}` : "size" in args ? `%20size:${args["size"]}` : "";
  const order = "o" in args ? `%20order:${args["o"]}` : "order" in args ? `%20order:${args["order"]}` : "";
  const rating = "r" in args ? `%20rating:${args["r"]}` : "rating" in args ? `%20rating:${args["rating"]}` : "";

  return {
    baseURL: `https://konachan.com/post.json?${limit}&${tags}${size}${order}${rating}&${page}`,
    isJPEG: "j" in args ? true : "jpeg" in args ? true : false,
    interval: "i" in args ? Number(args["i"]) : "interval" in args ? Number(args["interval"]) : 60,
    changeWallpaper: "change" in args ? true : false
  };
}

export default async function fetchImage(argv: string[]) {
  const params = parseArguments(argv);
  console.log(params.baseURL);

  const response = await (await fetch(new URL(params.baseURL))).json();
  for (const index in response) {
    const imageInfo = response[index];

    const image = {
      id: imageInfo["id"],
      source: imageInfo["source"],
      url: imageInfo["file_url"],
      jpeg: imageInfo["jpeg_url"],
    };
    console.log(image);

    const url = params.isJPEG ? image.jpeg : image.url;
    const path = `./images/${decodeURI(url).split("/").pop()}`

    writeFileSync(path, new Uint8Array(await (await fetch(url)).arrayBuffer()));
    if (params.changeWallpaper === true) { await setWallpaper(path); }
    
    await sleep(params.interval);
  }
}

fetchImage(Deno.args);
