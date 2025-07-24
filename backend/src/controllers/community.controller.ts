import { CommunityService } from "../services/community.service";
import { Context } from "hono";

export class CommunityController {
    constructor(private communityService: CommunityService) { }

    async getAllCommunities(c: Context): Promise<Response> {
        try {
            const communities = await this.communityService.getAllCommunities();
            return c.json({ success: true, data: communities });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async getCommunityById(c: Context): Promise<Response> {
        try {
            const id = Number(c.req.param('id'));
            const community = await this.communityService.getSitesById(id);
            if (!community) {
                return c.json({ success: false, error: 'Community not found' }, 404);
            }
            return c.json({ success: true, data: community });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async createCommunity(c: Context): Promise<Response> {
        try {
            const userFromToken = c.get('user');
            const { photoLink, latitude, longitude, title, description, tdurl, province_id, tags } = await c.req.json();
            const result = await this.communityService.createSites(photoLink, latitude, longitude, title, description, userFromToken.id, tdurl, province_id, tags);
            if (!result) {
                return c.json({ success: false, error: 'Failed to create community' }, 400);
            }
            return c.json({ success: true, message: 'Community created successfully' });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async getAllTags(c: Context): Promise<Response> {
        try {
            const tags = await this.communityService.getAllTags();
            return c.json({ success: true, data: tags });
        } catch (error: any) {
            console.error("Error fetching tags:", error);
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async getSitesByTag(c: Context): Promise<Response> {
        try {
            const tags = c.req.param('tags').split(',');
            const communities = await this.communityService.getSitesByTag(tags);
            return c.json({ success: true, data: communities });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }
}