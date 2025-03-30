import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <Card className="w-[380px] px-5">
          <CardHeader className="text-center">
            <div className="mb-4 mx-auto flex size-20 justify-center items-center rounded-lg bg-blue-100">
              <Mail className="size-12 text-blue-500" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Check your Email
            </CardTitle>
            <CardDescription>
              We have send a verification link to your Email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 rounded-md bg-blue-100 p-4">
              <div className="flex items-center text-center">
                <AlertCircle className="size-7 text-blue-400" />
                <p className="text-sm text-blue-500">
                  Check your Spam folder in case you didn't recived the mail
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/"
              className={buttonVariants({
                className: "w-full",
              })}
            >
              <ArrowLeft className="size-4 mr-2" /> Back to HomePage
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
