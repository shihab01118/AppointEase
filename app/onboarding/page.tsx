"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingAction } from "../actions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { OnboardingSchema } from "@/lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingRoute() {
  const [lastResult, action] = useFormState(OnboardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: OnboardingSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to Appoint<span className="text-primary">Ease</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your account!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="John Doe"
              />
              <p className="text-sm text-red-500">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  AppointEase.com/
                </span>
                <Input
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-sm text-red-500">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton className="w-full" text="Submit" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
