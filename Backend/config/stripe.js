const Stripe = require("stripe")

const stripe = new Stripe(process.env.STRIPE_SECRET, { appInfo: { name: 'ShopSmart' } })
module.exports = stripe