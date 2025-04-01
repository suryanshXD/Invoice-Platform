import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return data;
}

export async function RecentInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {data.map((e) => (
            <div
              className="flex items-center gap-4 mb-5 border-b-2 pb-5"
              key={e.id}
            >
              <Avatar>
                <AvatarFallback className="hidden sm:flex size-9">
                  {e.clientName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col ">
                <p className="text-sm font-medium leading-none">
                  {e.clientName}
                </p>
                <p className="text-sm text-muted-foreground">{e.clientEmail}</p>
              </div>
              <div className="ml-auto font-medium">
                +{formatCurrency(e.total, e.currency as any)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
