import { CloudRain } from "lucide-react";

const features = [
  {
    name: "Sign up for free",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum nisi iure nesciunt voluptates quasi similique magni neque quis.",
    icon: CloudRain,
  },
  {
    name: "Blazing fast",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum nisi iure nesciunt voluptates quasi similique magni neque quis.",
    icon: CloudRain,
  },
  {
    name: "Super secure with nylas",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum nisi iure nesciunt voluptates quasi similique magni neque quis.",
    icon: CloudRain,
  },
  {
    name: "Easy to use",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum nisi iure nesciunt voluptates quasi similique magni neque quis.",
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24 ">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule faster</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Schedule meetings in minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With AppointEase you can schedule meetings in minutes. We make it easy
          for you to schedule meetings in minutes. The meetings are very fast
          and easy to schedule.
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
