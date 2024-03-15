import { IncomingMessage, ServerResponse } from "http";
import { Pokemon, database } from "./model";
import { renderTemplate } from "./view";

export const getHome = async (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(
        await renderTemplate("src/page.hbs", {
          heading: "Beavers!",
          image: "images/beaver.png",
        })
      );
};

export const getAllPokemon = async (
    req: IncomingMessage,
    res: ServerResponse,
) => {
    const url = new URL(req.url!, `http://${req.headers.host}`); // Use URL parsing
    const queryParams = url.searchParams;
    const typeFilter = queryParams.get("type");
    const sortBy = queryParams.get("sortBy");
    let beavers: Pokemon[] = [];

    // Apply basic filtering if we have a `typeFilter`:
    if (typeFilter) {
        beavers = database.filter((beaver) => beaver.type === typeFilter);
    } else {
        beavers = database;
    }

    if (sortBy === "name") {
        beavers = [...beavers].sort((a, b) => a.name.localeCompare(b.name));
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(
        await renderTemplate("src/page.hbs", {
          heading: "All Beavers!",
          image: "images/beaverMany.jpg",
          beavers: beavers
        })
      );
};

export const getOnePokemon = async (
    req: IncomingMessage,
    res: ServerResponse,
) => {
    const id = Number(req.url?.split("/")[2]);
    const beaver = database.find((beaver) => beaver.id === id);

    if (!beaver) {
        res.statusCode = 404;
        return res.end(
            JSON.stringify({ message: "Beaver not found" }, null, 2),
        );
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(
        await renderTemplate("src/page.hbs", {
          heading: beaver.name + "!",
          image: beaver.imageSRC,
          beaver: beaver
        })
      );
};
