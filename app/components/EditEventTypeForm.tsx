"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { SubmitButton } from "./SubmitButtons";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { EventTypeSchema } from "../lib/zodSchemas";
import { EditEventTypeAction } from "../actions";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

interface IEditEventFormProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

export function EditEventForm({
  id,
  title,
  url,
  description,
  duration,
  callProvider,
}: IEditEventFormProps) {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(
    callProvider as VideoCallProvider
  );
  const [lastResult, action] = useFormState(EditEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: EventTypeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit Appointment Type</CardTitle>
          <CardDescription>
            Edit appointment type that allows people to book you!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-y-5">
            <div className="grid gap-y-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={title}
                placeholder="30 Minute Meeting"
              />
              <p className="text-sm text-red-500">{fields.title.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  AppointEase.com/
                </span>
                <Input
                  key={fields.url.key}
                  name={fields.url.name}
                  defaultValue={url}
                  placeholder="example-url-1"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-sm text-red-500">{fields.url.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={description}
                placeholder="Meet me in this meeting to meet me!"
              />
              <p className="text-sm text-red-500">
                {fields.description.errors}
              </p>
            </div>

            <div className="grid gap-y-2">
              <Label>Meeting Duration</Label>
              <Select
                key={fields.duration.key}
                name={fields.duration.name}
                defaultValue={String(duration)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="45">45 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <Input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <ButtonGroup>
                <Button
                  type="button"
                  onClick={() => setActivePlatform("Zoom Meeting")}
                  className="w-full"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                >
                  Zoom
                </Button>
                <Button
                  type="button"
                  onClick={() => setActivePlatform("Google Meet")}
                  className="w-full"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  onClick={() => setActivePlatform("Microsoft Teams")}
                  className="w-full"
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              <p className="text-sm text-red-500">
                {fields.videoCallSoftware.errors}
              </p>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Edit Event" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
