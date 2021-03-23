import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

export default async function (req: NextApiRequest, response: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name,
    });

    const checkout = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1IXuqxD6Uh4ypEg9qhBQAAtC", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRAPI_URL_SUCCESS,
      cancel_url: process.env.STRAPI_URL_FAIL,
    });

    return response.status(200).json({ sessionId: checkout.id });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
}
