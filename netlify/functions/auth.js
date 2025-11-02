const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const provider = "github";
  const siteUrl = process.env.URL || "https://beautiful-gecko-00d95b.netlify.app";

  if (event.queryStringParameters && event.queryStringParameters.code) {
    return {
      statusCode: 302,
      headers: {
        Location: `${siteUrl}/admin/#/callback?code=${event.queryStringParameters.code}`,
      },
    };
  }

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${siteUrl}/.netlify/functions/auth`;

  return {
    statusCode: 302,
    headers: { Location: authUrl },
  };
};
