import { CommunityService } from "../services/community.service";
import { LocalProductsService } from "../services/local-production.service";
import { Context } from "hono";

export class SearchController {
    constructor(
        private communityService: CommunityService,
        private localProductsService: LocalProductsService
    ) { }

    async search(c: Context): Promise<Response> {
        try {
            const query = c.req.query('q');
            if (!query) {
                return c.json({ success: false, error: 'Query parameter "q" is required' }, 400);
            }

            const communities = await this.communityService.getAllCommunities();
            const products = await this.localProductsService.getAllLocalProducts();

            const filteredCommunities = communities.filter(community =>
                community.title.toLowerCase().includes(query.toLowerCase()) ||
                community.description.toLowerCase().includes(query.toLowerCase())
            );

            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );

            return c.json({
                success: true,
                data: {
                    communities: filteredCommunities,
                    products: filteredProducts
                }
            });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }
}