import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateInvoice() {
  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-4 mb-8">
              <Badge variant="secondary">Draft</Badge>
              <Input placeholder="123" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex mt-2">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input className="rounded-l-none" placeholder="5" />
              </div>
            </div>
            <div>
              <Label className="mb-2">Currency</Label>
              <Select defaultValue="INR">
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United State Dollar -- USD
                  </SelectItem>
                  <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
