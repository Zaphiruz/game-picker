export default () => ({
    google: {
        clientId: process.env.GOOGLE__CLIENT_ID,
        clientSecret: process.env.GOOGLE__CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE__CALLBACK_URL,
        scopes: process.env.GOOGLE__SCOPES?.split(',') ?? [],
    },
    jwt: {
        secret: process.env.JWT__SECRET,
    },
});
