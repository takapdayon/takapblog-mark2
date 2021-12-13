module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "takapblog",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "",
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
