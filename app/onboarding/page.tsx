"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";
import { onBoardUser } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "../utils/zod";

export default function Onboarding() {
  const [lastResult, action] = useActionState(onBoardUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onBoardingSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <>
      <div>
        <div className="flex justify-center items-center min-h-screen w-full">
          <Card className=" px-4 mx-auto">
            <CardTitle className="text-xl pl-5 pb-2">
              You are almost finished
              <p className="text-sm font-light mt-1">
                Enter your information to create an account
              </p>
            </CardTitle>

            <CardContent>
              <form
                action={action}
                id={form.id}
                onSubmit={form.onSubmit}
                noValidate
              >
                <div className="flex flex-row gap-10">
                  <div className="flex flex-col gap-2">
                    <Label>First Name</Label>
                    <Input
                      name={fields.firstName.name}
                      key={fields.firstName.key}
                      defaultValue={fields.firstName.initialValue}
                      placeholder="first name"
                    />
                    <p className="text-red-500 text-sm">
                      {fields.firstName.errors}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Last Name</Label>
                    <Input
                      name={fields.lastName.name}
                      key={fields.lastName.key}
                      defaultValue={fields.lastName.initialValue}
                      placeholder="last name"
                    />
                    <p className="text-red-500 text-sm">
                      {fields.lastName.errors}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-5 mb-6">
                  <Label>Address</Label>
                  <Input
                    name={fields.address.name}
                    key={fields.address.key}
                    defaultValue={fields.address.initialValue}
                    className="w-md"
                    placeholder="address"
                  />
                  <p className="text-red-500 text-sm">
                    {fields.address.errors}
                  </p>
                </div>
                <SubmitButton name="Finish onBoarding" />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
