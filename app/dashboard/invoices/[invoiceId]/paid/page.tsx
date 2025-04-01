import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import paidGif from "@/public/paid-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButton";
import { markAsPaid } from "@/app/action";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { redirect } from "next/navigation";

type params = Promise<{ invoiceId: string }>;

async function authorized(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });
  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

export default async function InvoivePaid({ params }: { params: params }) {
  const { invoiceId } = await params;
  const session = await requireUser();
  authorized(invoiceId, session.user?.id as string);

  return (
    <>
      <div className="flex flex-1 justify-center items-center">
        <Card className="max-w-[500px]">
          <div className="ml-6 flex flex-col gap-2">
            <CardTitle>Mark as Paid?</CardTitle>
            <CardDescription>
              Are you sure you want to mark as paid
            </CardDescription>
          </div>
          <CardContent>
            <Image className="rounded-lg" src={paidGif} alt="Paid Gif" />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Link
              href={"/dashboard/invoices"}
              className={buttonVariants({ variant: "outline" })}
            >
              cancel
            </Link>
            <form
              action={async () => {
                "use server";
                await markAsPaid(invoiceId);
              }}
            >
              <div className="">
                <SubmitButton name="Mark as Paid!" />
              </div>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
