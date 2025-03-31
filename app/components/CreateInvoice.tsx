"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { createInvoice } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zod";
import { formatCurrency } from "../utils/formatCurrency";

export function CreateInvoice() {
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const calculateAmount = (Number(rate) || 0) * (Number(quantity) || 0);

  // function formatCurrency(amount: number, currency: "USD" | "EUR" | "INR") {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: currency,
  //   }).format(amount);
  // }

  const [currency, setCurrency] = useState("USD");

  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [selectDate, setSelectDate] = useState(new Date());
  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="pl-6 pr-6 pt-6">
          <form
            id={form.id}
            action={action}
            onSubmit={form.onSubmit}
            noValidate
          >
            <input
              type="hidden"
              name={fields.date.name}
              key={fields.date.key}
              value={selectDate.toISOString()}
            />

            <input
              type="hidden"
              name={fields.total.name}
              value={calculateAmount}
            />

            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">Draft</Badge>
                <Input
                  placeholder="123"
                  name={fields.invoiceName.name}
                  key={fields.invoiceName.key}
                  defaultValue={fields.invoiceName.initialValue}
                />
              </div>
              <p className="text-sm text-red-500">
                {fields.invoiceName.errors}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8 mt-8">
              <div>
                <Label>Invoice No.</Label>
                <div className="flex mt-2">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    #
                  </span>
                  <Input
                    className="rounded-l-none"
                    placeholder="5"
                    name={fields.invoiceNumber.name}
                    key={fields.invoiceNumber.key}
                    defaultValue={fields.invoiceNumber.initialValue}
                  />
                </div>
                <p className="text-sm text-red-500">
                  {fields.invoiceNumber.errors}
                </p>
              </div>
              <div>
                <Label className="mb-2">Currency</Label>
                <Select
                  defaultValue="INR"
                  name={fields.currency.name}
                  key={fields.currency.key}
                  onValueChange={(e) => setCurrency(e)}
                >
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
                <p className="text-sm text-red-500">{fields.currency.errors}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label>From</Label>
                <div className="space-y-2 mt-1.5">
                  <Input
                    placeholder="Your Name"
                    name={fields.fromName.name}
                    key={fields.fromName.key}
                  />
                  <p className="text-sm text-red-500">
                    {fields.fromName.errors}
                  </p>
                  <Input
                    placeholder="Your Email"
                    name={fields.fromEmail.name}
                    key={fields.fromEmail.key}
                  />
                  <p className="text-sm text-red-500">
                    {fields.fromEmail.errors}
                  </p>
                  <Input
                    placeholder="Your Address"
                    name={fields.fromAddress.name}
                  />
                  <p className="text-sm text-red-500">
                    {fields.fromAddress.errors}
                  </p>
                </div>
              </div>
              <div>
                <Label>To</Label>
                <div className="space-y-2 mt-1.5">
                  <Input
                    placeholder="Client Name"
                    name={fields.clientName.name}
                    key={fields.clientName.key}
                    defaultValue={fields.clientName.initialValue}
                  />
                  <p className="text-sm text-red-500">
                    {fields.clientName.errors}
                  </p>
                  <Input
                    placeholder="Client Email"
                    name={fields.clientEmail.name}
                    key={fields.clientEmail.key}
                    defaultValue={fields.clientEmail.initialValue}
                  />
                  <p className="text-sm text-red-500">
                    {fields.clientEmail.errors}
                  </p>
                  <Input
                    placeholder="Client Address"
                    name={fields.clientAddress.name}
                    key={fields.clientAddress.key}
                    defaultValue={fields.clientAddress.initialValue}
                  />
                  <p className="text-sm text-red-500">
                    {fields.clientAddress.errors}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div>
                  <Label className="mb-1">Date</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[280px] text-left justify-start"
                    >
                      <CalendarIcon />

                      {selectDate ? (
                        new Intl.DateTimeFormat("en-US", {
                          dateStyle: "long",
                        }).format(selectDate)
                      ) : (
                        <span>Pick a Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={selectDate}
                      onSelect={(date) => setSelectDate(date || new Date())}
                      mode="single"
                      fromDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-red-500 text-sm">{fields.date.errors}</p>
              </div>

              <div>
                <Label className="mb-1">Invoice Due</Label>
                <Select
                  name={fields.dueDate.name}
                  key={fields.dueDate.key}
                  defaultValue={fields.dueDate.initialValue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select due date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Due on Reciept</SelectItem>
                    <SelectItem value="15">Net 15</SelectItem>
                    <SelectItem value="30">Net 30</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                <p className="col-span-6">Description</p>
                <p className="col-span-2">Quantity</p>
                <p className="col-span-2">Rate</p>
                <p className="col-span-2">Amount</p>
              </div>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-6">
                  <Textarea
                    placeholder="item name and description"
                    name={fields.invoiceItemDescription.name}
                    key={fields.invoiceItemDescription.key}
                    defaultValue={fields.invoiceItemDescription.initialValue}
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemDescription.errors}
                  </p>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="0"
                    name={fields.invoiceItemQuantity.name}
                    key={fields.invoiceItemQuantity.key}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemQuantity.errors}
                  </p>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="0"
                    name={fields.invoiceItemRate.name}
                    key={fields.invoiceItemRate.key}
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemRate.errors}
                  </p>
                </div>
                <div className="col-span-2">
                  <Input
                    disabled
                    value={formatCurrency(calculateAmount, currency as any)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="w-1/3">
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span>
                    {formatCurrency(calculateAmount, currency as any)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span>Total ({currency})</span>
                  <span className="font-medium underline underline-offset-2">
                    {formatCurrency(calculateAmount, currency as any)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Label>Note</Label>
              <Textarea
                placeholder="Add your notes here..."
                name={fields.note.name}
                key={fields.note.key}
                defaultValue={fields.note.initialValue}
              />
              <p className="text-sm text-red-500">{fields.note.errors}</p>
            </div>

            <div className="flex items-center justify-end mt-8 ">
              <div>
                {" "}
                <SubmitButton name="Send Invoice to Client" />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
