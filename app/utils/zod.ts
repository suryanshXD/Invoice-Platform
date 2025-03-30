import { string, z } from "zod";

export const onBoardingSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  address: z.string().min(2, "Address is required"),
});
