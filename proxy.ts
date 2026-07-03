import withAuthMiddleware from "next-auth/middleware";

export default withAuthMiddleware;

export const config = { matcher: ["/issues/new", "/issues/:id/edit"] };
