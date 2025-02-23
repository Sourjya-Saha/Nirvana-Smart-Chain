"use client";
import CheckIcon from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface PricingTier {
  title: string;
  monthlyPrice: number;
  buttonText: string;
  popular: boolean;
  inverse: boolean;
  features: string[];
}

const pricingTiers: PricingTier[] = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={`${tier.title}-${index}`}
              className={`relative rounded-2xl p-8 ${
                tier.inverse
                  ? "bg-gray-900 text-white"
                  : "ring-1 ring-gray-200 bg-white"
              }`}
            >
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold">{tier.title}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${tier.monthlyPrice}
                    </span>
                    <span className="text-base font-semibold text-gray-500">
                      /month
                    </span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={`${tier.title}-feature-${featureIndex}`}
                      className="flex items-center gap-3"
                    >
                      <svg
                        className={`h-5 w-5 ${
                          tier.inverse ? "text-white" : "text-blue-600"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-lg px-4 py-2 text-center text-sm font-semibold ${
                    tier.inverse
                      ? "bg-white text-gray-900 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } transition-colors duration-200`}
                >
                  {tier.buttonText}
                </button>
              </div>
              {tier.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-blue-600 px-3 py-1 text-center text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
