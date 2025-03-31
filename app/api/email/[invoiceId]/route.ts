import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";
import { date } from "zod";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Suryansh Vaish",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "suryanshvaish6@gmail.com" }],
      template_uuid: "782c8a66-8f5f-49dc-8b46-40c7e03c63c9",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Invoice Mailer",
        company_info_address: "21 Park Street",
        company_info_city: "Lucknow",
        company_info_zip_code: "000111",
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email reminder" },
      { status: 500 }
    );
  }
}
