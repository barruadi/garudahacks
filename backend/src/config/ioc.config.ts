import { UserService } from "../services/users.service";
import { UserController } from "../controllers/users.controller";
import { CommunityService } from "../services/community.service";
import { CommunityController } from "../controllers/community.controller";

const userService = new UserService();
const userController = new UserController(userService);
const communityService = new CommunityService();
const communityController = new CommunityController(communityService);

export {
    userController,
    communityController
}