import { UserService } from "../services/users.service";
import { UserController } from "../controllers/users.controller";

const userService = new UserService();
const userController = new UserController(userService);

export {
    userController
}