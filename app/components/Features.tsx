import { UserPlus, Zap, Lock, Smile } from "lucide-react";

const features = [
  {
    name: "Sign up for free",
    description:
      "Start using AppointEase without any cost. Sign up quickly and begin streamlining your appointment scheduling with ease today.",
    icon: UserPlus,
  },
  {
    name: "Blazing fast",
    description:
      "Enjoy ultra-fast scheduling. AppointEase is optimized for speed, making managing and organizing your appointments a true breeze.",
    icon: Zap,
  },
  {
    name: "Super secure with Nylas",
    description:
      "Security you can trust. AppointEase integrates with Nylas to protect your data and ensure reliable, safe scheduling every time.",
    icon: Lock,
  },
  {
    name: "Easy to use",
    description:
      "Designed for simplicity. AppointEase offers an intuitive interface, making scheduling accessible and effortless for everyone involved.",
    icon: Smile,
  },
];

export function Features() {
  return (
    <div className="py-24 ">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule meetings in minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With AppointEase, scheduling meetings is fast and easy. Book
          appointments in minutes, streamlining your process and saving you
          valuable time.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                <span className="capitalize">{feature.name}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
