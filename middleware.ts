import { authMiddleware } from '@descope/nextjs-sdk/server'

const descopeProjectId = process.env.NEXT_PUBLIC_DISCOPE_PROJECT_ID!;

export default authMiddleware({
	// The Descope project ID to use for authentication
	// Defaults to process.env.DESCOPE_PROJECT_ID
	projectId: descopeProjectId,

	// The URL to redirect to if the user is not authenticated
	// Defaults to process.env.SIGN_IN_ROUTE or '/sign-in' if not provided

	//redirectUrl?: string,

	// An array of public routes that do not require authentication
	// In addition to the default public routes:
	// - process.env.SIGN_IN_ROUTE or /sign-in if not provided
	// - process.env.SIGN_UP_ROUTE or /sign-up if not provided
	// NOTE: In case it contains query parameters that exist in the original URL,
	// they will override the original query parameters. e.g. if the original URL is /page?param1=1&param2=2 and the redirect URL is /sign-in?param1=3,
	// the final redirect URL will be /sign-in?param1=3&param2=2
	publicRoutes: ["/", "/about"],

})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}