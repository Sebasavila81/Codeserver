import Service from "./service.js";
import productsManager from "./../dao/mongo/managers/ProductsManager.mongo.js";

const productsService = new Service(productsManager)
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  paginateService
} = productsService;
