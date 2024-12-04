"use server";

import {
  onboardingSchemaValidation,
  SettingsSchema,
} from "@/app/lib/zodSchemas";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function OnboardingAction(prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });

        return !existingUsername;
      },
    }),

    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Tuesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Wednesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Thursday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Friday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Saturday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Sunday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
          ],
        },
      },
    },
  });

  return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: SettingsSchema,
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });

  return redirect("/dashboard");
}
