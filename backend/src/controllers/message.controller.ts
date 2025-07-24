import { CommunityMessageService } from "../services/message.service";
import { Context } from "hono";
export class CommunityMessageController {
    constructor(private messageService: CommunityMessageService) {}

    async getMessagesByCommunityId(c: Context): Promise<Response> {
        try{
            const communityId = Number(c.req.param('community_id'));
            const messages = await this.messageService.getMessagesByCommunityId(communityId);
            return c.json({ success: true, data: messages });        
        } catch (error: any) {
            return c.json({ success: false, error: error.message });
        }
    }

    async getMessageById(c: Context): Promise<Response> {
        try {
            const id = Number(c.req.param('id'));
            const message = await this.messageService.getMessageById(id);
            if (!message) {
                return c.json({ success: false, error: 'Message not found' }, 404);
            }
            return c.json({ success: true, data: message });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async getRepliesToMessage(c: Context): Promise<Response> {
        try {
            const messageId = Number(c.req.param('message_id'));
            const replies = await this.messageService.getRepliesToMessage(messageId);
            return c.json({ success: true, data: replies });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async createMessage(c: Context): Promise<Response> {
        try {
            const userFromToken = c.get('user');
            const { community_id, content, replyTo } = await c.req.json();

            const result = await this.messageService.createMessage(community_id, userFromToken.id, content, replyTo);
            if (!result) {
                return c.json({ success: false, error: 'Failed to create message' }, 400);
            }
            return c.json({ success: true, message: 'Message created successfully' });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }
}