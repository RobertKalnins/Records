// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import TwitchProvider from "next-auth/providers/twitch"

export default NextAuth({
providers: [
	GithubProvider({
		clientId: process.env.GITHUB_ID,
		clientSecret: process.env.GITHUB_SECRET,
		}),
	TwitchProvider({
		clientId: process.env.TWITCH_CLIENT_ID,
		clientSecret: process.env.TWITCH_CLIENT_SECRET
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, account }) {
			console.log('JWT token:', token);
		        return token;
		        },
	    	async session({ session, token }) {
			// Assign the Twitch ID to the session object
			session.user.id = token.sub;
			      return session;
			}
	}
})
