import { searchController } from "../config/ioc.config";
import { Hono } from "hono";


const searchRoute = new Hono();

searchRoute.get('/', (c) => searchController.search(c));

export { searchRoute };
