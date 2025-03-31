import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const session = await requireUser();

  const { invoiceId } = await params;

  const invoiceData = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: session.user?.id,
    },
  });

  if (!invoiceData) {
    return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
  }

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Suryansh Vaish",
  };

  emailClient.send({
    from: sender,
    to: [{ email: "suryanshvaish6@gmail.com" }],
    subject: "Reminder Invoice Payment",
    text: "Hey you forget to pay the invoice",
  });

  return NextResponse.json({ success: true });
}
