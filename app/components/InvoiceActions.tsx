import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloudIcon,
  icons,
  MailIcon,
  MoreHorizontal,
  PencilIcon,
  Trash,
} from "lucide-react";
import Link from "next/link";

export function InvoiceAction() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="secondary">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="">
              <PencilIcon /> Edit Invoice
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="">
              <DownloadCloudIcon /> Download Invoice
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="">
              <MailIcon /> Reminder Email
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="">
              <Trash color="red" /> Delete
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="">
              <CheckCircle /> Mark as Paid
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
