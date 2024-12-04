/* eslint-disable @next/next/no-img-element */
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
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { SettingsSchema } from "../lib/zodSchemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface ISettingsFormProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({
  email,
  fullName,
  profileImage,
}: ISettingsFormProps) {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: SettingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent className="grid gap-y-4">
          <div className="grid gap-y-2">
            <Label>Full Name</Label>
            <Input
              key={fields.fullName.key}
              name={fields.fullName.name}
              defaultValue={fullName}
              placeholder="John Doe"
            />
            <p className="text-sm text-red-500">{fields.fullName.errors}</p>
          </div>
          <div className="grid gap-y-2">
            <Label>Email</Label>
            <Input
              key={fields.profileImage.key}
              name={fields.profileImage.name}
              defaultValue={email}
              placeholder="johndoe@example.com"
              disabled
            />
          </div>
          <div className="grid gap-y-4">
            <Label>Profile Image</Label>
            <Input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="relative size-20">
                <img
                  src={currentProfileImage}
                  alt="Profile Image"
                  width={20}
                  height={20}
                  className="w-full h-full rounded-lg"
                />
                <Button
                  onClick={handleDeleteImage}
                  variant="destructive"
                  type="button"
                  className="absolute -top-2.5 -right-2.5 h-[20px] rounded-full px-[2px]"
                >
                  <X className="size-3" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success("Profile image has been uploaded.");
                }}
                onUploadError={(error) => {
                  console.log("Error uploading image: ", error);
                  toast.error(error.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-sm text-red-500">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
