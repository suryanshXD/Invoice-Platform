import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";
import warningGif from "@/public/warning-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButton";
import { deleteInvoice } from "@/app/action";

async function Authorize(invoiceId: string, userId: string) {
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

type Params = Promise<{ invoiceId: string }>;

export default async function Delete({ params }: { params: Params }) {
  const session = await requireUser();
  const { invoiceId } = await params;
  await Authorize(invoiceId, session.user?.id as string);
  return (
    <>
      <div className="flex flex-1 justify-center items-center">
        <Card className="max-w-[500px] px-6 mx-auto">
          <div className="ml-6">
            <CardTitle>Delete Invoice</CardTitle>
            <CardDescription>
              Are you sure that you want to delete this Invoice?
            </CardDescription>
          </div>
          <CardContent>
            <Image src={warningGif} alt="warning Gif" className="rounded-lg" />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Link href={"/dashboard/invoices"} className={buttonVariants()}>
              cancel
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteInvoice(invoiceId);
              }}
            >
              <div className="">
                <SubmitButton name="Delete Invoice" />
              </div>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
