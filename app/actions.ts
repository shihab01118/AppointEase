"user server";

import { OnboardingSchema } from "@/lib/zodSchemas";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";

export async function OnboardingAction(prevState: unknown,formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, { schema: OnboardingSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userNmae,
      name: submission.value.fullName,
    },
  });
}
