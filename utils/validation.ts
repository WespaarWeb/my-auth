import { z } from "zod";

export const authSchema = z.object({
  phone: z
    .string()
    .min(1, "شماره همراه الزامی است")
    .regex(/^09\d{9}$/, {
      message: "شماره همراه باید 11 رقم باشد و با 09 شروع شود",
    }),
});

export type AuthForm = z.infer<typeof authSchema>;
