import { Router } from "express";
//import productsManager from "../../dao/mongo/managers/ProductsManager.mongo.js";
//import productsManager from "../../dao/fs/ProductsManager.fs.js";
import CustomRouter from "../CustomRouter.js";
import dao from "../../dao/dao.factory.js"
import productsRepository from "../../repositories/products.rep.js";
const { products } = dao;
class ProductsRouter extends CustomRouter{
  init(){
    this.read("/", ["PUBLIC"],read_prod );
    
  }
}
async function read_prod (req, res, next) {
  try {
    const readProducts = await productsRepository.readRepository();
    return res.render("products", {  readProducts });
  } catch (error) {
    return next(error);
  }
};

const productsRouter = new ProductsRouter
export default productsRouter.getRouter();


//const productsRouter = Router();

/* productsRouter.get("/", async (req, res, next) => {
  try {
    const readProducts = await products.read();
    return res.render("products", {  readProducts });
  } catch (error) {
    return next(error);
  }
}); */




/* productsRouter.get("/", async (req, res, next) => {
  try {
    let user_id = null
    if (req.cookies.token){
    const userOnline = await fetch('http://localhost:8080/api/sessions/online',
    {
      method: 'GET', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${req.cookies.token}`
            }}
    )
    const fetchedUser = await userOnline.json()
    user_id = fetchedUser.response._id
   
  }
    const readProducts = await products.read();
     //console.log(user_id);//console.log(req.cookies.token);
    if (user_id) {
      return res.render("products", { readProducts, user_id });
    } else {
      return res.render("products", { readProducts, user_id: user_id });
    }
  } catch (error) {
    return next(error);
  }
}); */


productsRouter.get("/paginate", async (req, res, next) => {
  try {
    let user_id = null
    if (req.cookies.token){
    const userOnline = await fetch('http://localhost:8080/api/sessions/online',
    {
      method: 'GET', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${req.cookies.token}`
            }}
    )
    const fetchedUser = await userOnline.json()
    user_id = fetchedUser.response._id
  }
    const { page, limit } = req.query;
    const response = await fetch(
      `http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();
    
    if (user_id) {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: user_id,
      });
    } else {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: user_id,
      }); 
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    let user_id = null
    if (req.cookies.token){
    const userOnline = await fetch('http://localhost:8080/api/sessions/online',
    {
      method: 'GET', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${req.cookies.token}`
            }}
    )
    const fetchedUser = await userOnline.json()
    user_id = fetchedUser.response._id
  }
    const { pid } = req.params;
    const one = await products.readOne(pid);
    //return res.render("productDetail", { product: one });
    if (user_id) {
      return res.render("productDetail", {
        product: one,
        user_id: user_id,
      });
     } else {
      return res.render("productDetail", {
        product: one,
        user_id: user_id,
      });
    } 
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/category/:category", async (req, res, next) => {
  try {
    let user_id = null
    if (req.cookies.token){
    const userOnline = await fetch('http://localhost:8080/api/sessions/online',
    {
      method: 'GET', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${req.cookies.token}`
            }}
    )
    const fetchedUser = await userOnline.json()
    user_id = fetchedUser.response._id
  }
    const { category } = req.params;
    const response = await fetch(
      `http://localhost:8080/api/products/paginate?category=${category}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();
    if (user_id) {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: user_id,
      });
     } else {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
      }); 
    }
  } catch (error) {
    return next(error);
  }
});

//export default productsRouter;
