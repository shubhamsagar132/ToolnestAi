import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        let userId, has;
        // Support both req.auth() as a function and req.auth as an object
        if (typeof req.auth === 'function') {
            const authResult = await req.auth();
            if (!authResult || !authResult.userId) {
                return res.status(401).json({ success: false, message: 'User ID not found. Please provide a valid authentication token.' });
            }
            userId = authResult.userId;
            has = authResult.has;
        } else if (req.auth && typeof req.auth === 'object' && req.auth.userId) {
            userId = req.auth.userId;
            has = req.auth.has;
        } else {
            return res.status(401).json({ success: false, message: 'Authentication information not found on request.' });
        }

        const hasPremiumPlan = await (typeof has === 'function' ? has({ plan: "premium" }) : false);
        const user = await clerkClient.users.getUser(userId);
        if (!hasPremiumPlan && user.privateMetadata.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        } else {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            });
            req.free_usage = 0;
        }
        req.plan = hasPremiumPlan ? "premium" : "free";
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}