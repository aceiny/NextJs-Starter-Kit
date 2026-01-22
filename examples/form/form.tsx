"use client";

/**
 * Comprehensive Example of React Hook Form Component System
 * Improved layout with side-by-side form and live preview
 */

import { useForm } from "react-hook-form";
import { Form, Field } from "@/components/form";
import { InboxLine } from "@solar-icons/react-perf/BoldDuotone";
import { Button } from "@heroui/react";
import { Crown, Flag, Shield, Star, User } from "lucide-react";

// Define your form data type
interface ExampleFormData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  website: string;
  age: number;
  birthDate: string;

  // Search & Verification
  searchQuery: string;
  verificationCode: string;

  // Text Areas
  bio: string;
  description: string;

  // Selections
  country: string;
  countryMulti: string[];
  assignedUser: string;
  plan: string;
  skills: string[];

  // Checkboxes
  acceptTerms: boolean;
  newsletter: boolean;
  preferences: string[];
  languages: string[];

  // Radio Groups
  gender: string;
  paymentMethod: string;

  // File Uploads
  avatar: FileList | null;
  documents: FileList | null;
}

export default function ComprehensiveFormExample() {
  const form = useForm<ExampleFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      website: "",
      age: 18,
      birthDate: "",
      searchQuery: "",
      verificationCode: "",
      bio: "",
      description: "",
      country: "",
      countryMulti: [],
      assignedUser: "",
      plan: "",
      skills: [],
      acceptTerms: false,
      newsletter: false,
      preferences: [],
      languages: [],
      gender: "",
      paymentMethod: "",
      avatar: null,
      documents: null,
    },
  });

  const onSubmit = (data: ExampleFormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check the live preview panel.");
  };

  return (
    <div className="min-h-screen  dark:from-gray-950 dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            React Hook Form Components
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive example showcasing all form components with live
            preview
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex items-start justify-between w-full gap-6 ">
          {/* Left Column - Form (2/3 width) */}
          <div className="lg:col-span-2 space-y-6 w-full">
            <Form form={form} onSubmit={onSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field.Input
                      name="firstName"
                      type="text"
                      placeholder="John"
                      label="First Name"
                      isRequired
                      variant="bordered"
                    />

                    <Field.Input
                      name="lastName"
                      type="text"
                      label="Last Name"
                      placeholder="Doe"
                      isRequired
                      variant="bordered"
                    />
                  </div>

                  <Field.Input
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="john.doe@example.com"
                    isRequired
                    variant="bordered"
                    description="We'll never share your email"
                    endContent={
                      <Button
                        variant="light"
                        isIconOnly
                        size="sm"
                        radius="full"
                      >
                        <InboxLine size={20} className="text-gray-400" />
                      </Button>
                    }
                  />

                  <Field.Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    showPasswordToggle
                    isRequired
                    variant="bordered"
                    description="Must be at least 8 characters"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field.Input
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      variant="bordered"
                    />

                    <Field.Input
                      name="age"
                      type="number"
                      label="Age"
                      isRequired
                      variant="bordered"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field.Input
                      name="website"
                      type="url"
                      label="Website URL"
                      placeholder="example.com"
                      variant="bordered"
                      startContent={
                        <span className="text-default-400 text-small">
                          https://
                        </span>
                      }
                    />

                    <Field.DatePicker
                      name="birthDate"
                      label="Birth Date"
                      showMonthAndYearPickers
                      isRequired
                      variant="bordered"
                    />
                  </div>
                </div>
              </div>

              {/* Verification & Text Areas */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  Verification & Description
                </h2>

                <div className="space-y-4">
                  <Field.Otp
                    name="verificationCode"
                    label="Verification Code"
                    length={6}
                    description="Enter the 6-digit code"
                    variant="bordered"
                  />

                  <Field.Textarea
                    name="bio"
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    description="Maximum 500 characters"
                    variant="bordered"
                  />
                </div>
              </div>

              {/* Select Dropdowns */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                    3
                  </span>
                  Selections
                </h2>

                <div className="space-y-4">
                  <Field.Select
                    name="country"
                    label="Country (Single)"
                    placeholder="Select your country"
                    options={[
                      { key: "us", label: "United States" },
                      { key: "ca", label: "Canada" },
                      { key: "mx", label: "Mexico" },
                      { key: "uk", label: "United Kingdom" },
                      { key: "fr", label: "France" },
                      { key: "de", label: "Germany" },
                    ]}
                    disabledKeys={["mx", "fr"]}
                    variant="bordered"
                    isRequired
                  />

                  <Field.Select
                    name="countryMulti"
                    label="Countries (Multiple with Icons)"
                    placeholder="Select countries"
                    options={[
                      {
                        key: "us",
                        label: "United States",
                        description: "North America",
                        startContent: <span className="text-2xl">🇺🇸</span>,
                      },
                      {
                        key: "uk",
                        label: "United Kingdom",
                        description: "Europe",
                        startContent: <span className="text-2xl">🇬🇧</span>,
                      },
                      {
                        key: "ca",
                        label: "Canada",
                        description: "North America",
                        startContent: <span className="text-2xl">🇨🇦</span>,
                      },
                      {
                        key: "jp",
                        label: "Japan",
                        description: "Asia",
                        startContent: <span className="text-2xl">🇯🇵</span>,
                      },
                    ]}
                    variant="bordered"
                    selectionMode="multiple"
                  />

                  <Field.Select
                    name="assignedUser"
                    label="Assign User (Custom JSX)"
                    placeholder="Select a user"
                    options={[
                      {
                        key: "1",
                        label: "Tony Reichert",
                        textValue: "Tony Reichert",
                        children: (
                          <div className="flex gap-2 items-center">
                            <User className="shrink-0" size={18} />
                            <div className="flex flex-col">
                              <span className="text-small">Tony Reichert</span>
                              <span className="text-tiny text-default-400">
                                tony@example.com
                              </span>
                            </div>
                          </div>
                        ),
                      },
                      {
                        key: "2",
                        label: "Zoey Lang",
                        textValue: "Zoey Lang",
                        children: (
                          <div className="flex gap-2 items-center">
                            <User className="shrink-0" size={18} />
                            <div className="flex flex-col">
                              <span className="text-small">Zoey Lang</span>
                              <span className="text-tiny text-default-400">
                                zoey@example.com
                              </span>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                    variant="bordered"
                  />

                  <Field.Select
                    name="plan"
                    label="Subscription Plan"
                    placeholder="Choose your plan"
                    options={[
                      {
                        key: "free",
                        label: "Free Plan",
                        description: "Perfect for getting started",
                        startContent: (
                          <Star className="w-5 h-5 text-gray-400" />
                        ),
                        endContent: (
                          <div className="text-right">
                            <div className="font-bold text-lg">$0</div>
                            <div className="text-xs text-gray-500">
                              per month
                            </div>
                          </div>
                        ),
                      },
                      {
                        key: "pro",
                        label: "Pro Plan",
                        description: "Most popular",
                        startContent: (
                          <Shield className="w-5 h-5 text-blue-500" />
                        ),
                        endContent: (
                          <div className="text-right">
                            <div className="font-bold text-lg text-blue-600">
                              $29
                            </div>
                            <div className="text-xs text-gray-500">
                              per month
                            </div>
                          </div>
                        ),
                      },
                      {
                        key: "enterprise",
                        label: "Enterprise",
                        description: "For large orgs",
                        startContent: (
                          <Crown className="w-5 h-5 text-yellow-500" />
                        ),
                        endContent: (
                          <div className="text-right">
                            <div className="font-bold text-lg text-yellow-600">
                              $99
                            </div>
                            <div className="text-xs text-gray-500">
                              per month
                            </div>
                          </div>
                        ),
                      },
                    ]}
                    variant="bordered"
                    size="lg"
                    isMultiline
                  />
                </div>
              </div>

              {/* Checkboxes & Radio */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                    4
                  </span>
                  Preferences & Choices
                </h2>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Field.Checkbox
                      name="acceptTerms"
                      label="I accept the terms and conditions"
                      required
                    />

                    <Field.Checkbox
                      name="newsletter"
                      label="Subscribe to newsletter"
                      helperText="Get updates about new features"
                    />
                  </div>

                  <Field.CheckboxGroup
                    name="preferences"
                    label="Email Preferences"
                    options={[
                      { label: "Newsletter", value: "newsletter" },
                      { label: "Product Updates", value: "updates" },
                      { label: "Marketing", value: "marketing" },
                    ]}
                  />

                  <Field.RadioGroup
                    name="gender"
                    label="Gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                    horizontal
                    required
                  />

                  <Field.RadioGroup
                    name="paymentMethod"
                    label="Payment Method"
                    options={[
                      {
                        label: "Credit Card",
                        value: "credit_card",
                        description: "Pay with card",
                      },
                      {
                        label: "PayPal",
                        value: "paypal",
                        description: "Pay with PayPal",
                      },
                    ]}
                    required
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">
                    5
                  </span>
                  File Uploads
                </h2>

                <div className="space-y-4">
                  <Field.Upload
                    uploadStyle="avatar"
                    name="avatar"
                    label="Profile Picture"
                    accept="image/*"
                    maxSize={5 * 1024 * 1024}
                    helperText="Max 5MB"
                    showPreview
                  />

                  <Field.Upload
                    name="documents"
                    label="Documents"
                    multiple
                    maxFiles={3}
                    maxSize={10 * 1024 * 1024}
                    accept=".pdf,.doc,.docx"
                    helperText="Up to 3 files (10MB each)"
                    showPreview
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium shadow-lg"
                >
                  Submit Form
                </Button>

                <Button
                  type="button"
                  onClick={() => form.reset()}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>

          {/* Right Column - Live Preview (1/3 width, Sticky) */}
          <div className="lg:col-span-1 w-full">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live Preview
                </h3>

                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  {Object.entries(form.watch()).map(([key, value]) => {
                    // Skip null, undefined, empty strings, empty arrays
                    if (
                      value === null ||
                      value === undefined ||
                      value === "" ||
                      (Array.isArray(value) && value.length === 0)
                    ) {
                      return null;
                    }

                    return (
                      <div
                        key={key}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 break-words">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : typeof value === "boolean"
                              ? value
                                ? "✓ Yes"
                                : "✗ No"
                              : typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                        </div>
                      </div>
                    );
                  })}

                  {Object.values(form.watch()).every(
                    (v) =>
                      v === null ||
                      v === undefined ||
                      v === "" ||
                      (Array.isArray(v) && v.length === 0),
                  ) && (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">Start filling the form</p>
                      <p className="text-xs mt-1">Values will appear here</p>
                    </div>
                  )}
                </div>

                {/* JSON View Toggle */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                    View JSON
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto p-3 bg-gray-100 dark:bg-gray-800 rounded-lg max-h-60">
                    {JSON.stringify(form.watch(), null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
