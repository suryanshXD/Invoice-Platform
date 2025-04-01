import { DashBoardBlocks } from "../components/DashboardBlocks";
import { EmptyState } from "../components/EmptyState";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  return data;
}

export default async function DashBoard() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <div>
          <DashBoardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8 ">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </div>
      )}
    </>
  );
}
