import { UserService } from "../services/users.service";
import { UserController } from "../controllers/users.controller";
import { CommunityService } from "../services/community.service";
import { CommunityController } from "../controllers/community.controller";
import { LocalProductsService } from "../services/local-production.service";
import { LocalProductsController } from "../controllers/local-production.controller";
import { CommunityMessageService } from "../services/message.service";
import { CommunityMessageController } from "../controllers/message.controller";

const userService = new UserService();
const userController = new UserController(userService);
const localProductsService = new LocalProductsService();
const localProductsController = new LocalProductsController(localProductsService);
const communityMessageService = new CommunityMessageService();
const communityMessageController = new CommunityMessageController(communityMessageService);
const communityService = new CommunityService(localProductsService);
const communityController = new CommunityController(communityService);

export {
    userController,
    communityController,
    localProductsController,
    communityMessageController,
}