import { headers } from "next/headers";
import crypto from "crypto";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const signature = headers().get("x-paystack-signature") as string;
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_API_KEY!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  // if (hash === signature) {
  //   const event = req.body.;
  //   if (event && event.event === "charge.success") {
  //     const phone = event.data?.customer?.phone;
  //     const address = event.data?.metadata?.address;

  //     const order = await prismadb.order.update({
  //       where: {
  //         id: event.data?.reference,
  //       },
  //       data: {
  //         isPaid: true,
  //         address,
  //         phone,
  //       },
  //       include: {
  //         orderItems: true,
  //       },
  //     });

  //     const productIds = order.orderItems.map(
  //       (orderItem) => orderItem.productId
  //     );

  //     await prismadb.product.updateMany({
  //       where: {
  //         id: {
  //           in: [...productIds],
  //         },
  //       },
  //       data: {
  //         isArchived: true,
  //       },
  //     });
  //   }
  // }

  return new NextResponse(null, { status: 200 });
};
