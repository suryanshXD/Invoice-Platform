import { InvoiceList } from "@/app/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Plus, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Invoices() {
  return (
    <>
      <Card>
        <div>
          <div className="flex justify-between items-center px-4">
            <div>
              <CardTitle className="font-bold text-xl">Invoices</CardTitle>
              <CardDescription>Manage your Invoices here</CardDescription>
            </div>
            <Link
              href="/dashboard/invoices/create"
              className={buttonVariants()}
            >
              <PlusIcon />
              Create Invoice
            </Link>
          </div>
        </div>
        <CardContent>
          <InvoiceList />
        </CardContent>
      </Card>
    </>
  );
}
