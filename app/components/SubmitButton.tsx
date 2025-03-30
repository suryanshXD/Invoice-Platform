"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {name}
        </Button>
      )}
    </>
  );
}
