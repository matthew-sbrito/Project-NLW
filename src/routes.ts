import { Router } from "express"

import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"

import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListTagController } from "./controllers/ListTagController"
import { ListUserController } from "./controllers/ListUserController"

const router = Router()

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();


router.post("/users", 
  createUserController.handle)

router.get("/users",
  ensureAuthenticated, 
  ensureAdmin,
  listUserController.handle
)

router.post("/tags", 
  ensureAuthenticated, 
  ensureAdmin, 
  createTagController.handle)

router.get("/tags",   
  ensureAuthenticated, 
  listTagController.handle)

router.post("/login", 
  authenticateUserController.handle)
  
router.post("/compliments", 
  ensureAuthenticated, 
  createComplimentController.handle)

router.get("/users/compliments/send", 
  ensureAuthenticated, 
  listUserSendComplimentsController.handle )

router.get("/users/compliments/receive", 
  ensureAuthenticated, 
  listUserReceiveComplimentsController.handle )

export { router }