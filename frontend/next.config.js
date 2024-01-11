/** @type {import('next').NextConfig} */

const dotenv = require("dotenv");
const env = dotenv.config({path: "../.env"}).parsed;

const nextConfig = {env};

module.exports = nextConfig;
