import { UserService } from "../services/users.service";
import { Context } from "hono";

export class UserController {
    constructor(private usersService: UserService) { }

    async getAllUsers(c: Context): Promise<Response> {
        try {
            const users = await this.usersService.getAllUsers();
            const result = users.map(user => ({
                id: user.id,
                username: user.username,
            }));
            return c.json({ success: true, data: result });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async getUserDataById(c:Context): Promise<Response> {
        try {
            const userId = parseInt(c.req.param('id'));
            if (isNaN(userId)) {
                return c.json({ success: false, error: 'Invalid user ID' }, 400);
            }
            const user = await this.usersService.getUserById(userId);
            if (!user) {
                return c.json({ success: false, error: 'User not found' }, 404);
            }
            return c.json({ success: true, data: user });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async getUserProfile(c: Context): Promise<Response> {
        try {
            const userFromToken = c.get('user');
            const result = await this.usersService.getUserProfile(userFromToken.username);
            if (!result) {
                return c.json({ success: false, error: 'User not found' }, 404);
            }
            return c.json({ success: true, data: result });
        }
        catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async loginUser(c: Context): Promise<Response> {
        try {
            const { username, password } = await c.req.json();
            const result = await this.usersService.loginUser(username, password);
            if (!result) {
                return c.json({ success: false, error: 'Invalid username or password' }, 401);
            }
            return c.json({ success: true, data: { token: result.token } });
        }
        catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }


    async createUser(c: Context): Promise<Response> {
        try {
            const {username, password} = await c.req.json();
            const result = await this.usersService.createUser(username, password);
            if (!result) {
                return c.json({ success: false, error: 'Failed to create user' }, 400);
            }
            return c.json({ success: true, message: 'User created successfully' });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async addProvince(c: Context): Promise<Response> {
        try {
            const { name } = await c.req.json();
            if (!name) {
                return c.json({ success: false, error: 'Province name is required' }, 400);
            }
            // Assuming there's a method in UserService to add a province
            const result = await this.usersService.addProvince(name);
            if (!result) {
                return c.json({ success: false, error: 'Failed to add province' }, 400);
            }
            return c.json({ success: true, message: 'Province added successfully' });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

}