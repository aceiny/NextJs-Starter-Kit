"use client";

/**
 * Comprehensive Example of React Hook Form Component System
 * 
 * This file demonstrates all form components with various configurations
 * Copy and modify as needed for your application
 */

import { useForm } from "react-hook-form";
import { Form, Field } from "@/components/form";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SonnerTypes } from "@/examples/toast";

// Define your form data type
interface ExampleFormData {
  // Text inputs
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  website: string;
  age: number;
  birthDate: string;
  
  // OTP and textarea
  verificationCode: string;
  bio: string;
  description: string;
  
  // Select
  country: string;
  skills: string[];
  
  // Checkbox
  acceptTerms: boolean;
  newsletter: boolean;
  
  // Checkbox group
  preferences: string[];
  languages: string[];
  
  // Radio
  gender: string;
  paymentMethod: string;
  
  // Upload
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
      verificationCode: "",
      bio: "",
      description: "",
      country: "",
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
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <ThemeToggle />
      
      <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col gap-2 mb-4 p-4 bg-white dark:bg-gray-950 rounded-2xl shadow-2xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-800 items-center justify-center transition-colors duration-300">
        <h1 className="text-gray-900 dark:text-gray-100">Toast Notifications</h1>
        <SonnerTypes />
      </div>
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            React Hook Form - Comprehensive Example
          </h1>

        <Form form={form} onSubmit={onSubmit} className="space-y-8">
        {/* Section 1: Text Inputs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">Text Inputs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field.Input
              name="firstName"
              type="text"
              label="First Name"
              required
            />

            <Field.Input
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Doe"
              required
            />
          </div>

          <Field.Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="john.doe@example.com"
            required
            helperText="We'll never share your email with anyone else"
          />

          <Field.Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter a strong password"
            required
            helperText="Must be at least 8 characters (with show/hide toggle)"
            showPasswordToggle={true} // Default is true, set to false to hide toggle
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field.Input
              name="phone"
              type="phone"
              labelMode="floating"
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
            />

            <Field.Input
              name="website"
              type="url"
              label="Website"
              labelMode="floating"
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field.Input
              name="age"
              type="number"
              label="Age"
              min={18}
              max={120}
              required
            />

            <Field.Input
              name="birthDate"
              type="date"
              label="Birth Date"
              required
            />
                  <Field.Input
              name="birthDate"
              type="datetime-local"
              label="Birth Date with Time"
              required
            />
          </div>
        </section>

        {/* Section 2: OTP & Textarea */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            OTP & Text Areas
          </h2>

          <Field.Input
            name="verificationCode"
            type="otp"
            label="Verification Code"
            otpLength={6}
            pattern="[0-9]*"
            helperText="Enter the 6-digit code sent to your email"
          />

          <Field.Input
            name="bio"
            type="textarea"
            label="Bio"
            rows={3}
            placeholder="Tell us about yourself..."
            helperText="Maximum 500 characters"
          />

          <Field.Input
            name="description"
            type="editor"
            label="Detailed Description"
            placeholder="Tell us about yourself in more details"
            helperText="Use the rich text editor to format your content"
          />
        </section>

        {/* Section 3: Select Dropdowns */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            Select Dropdowns
          </h2>

          <Field.Select
            name="country"
            label="Country"
            options={[
              { label: "United States", value: "us" },
              { label: "United Kingdom", value: "uk" },
              { label: "Canada", value: "ca" },
              { label: "Australia", value: "au" },
              { label: "Germany", value: "de" },
            ]}
            placeholder="Select your country"
            required
            helperText="Select the country where you reside"
          />

          <Field.Select
            name="skills"
            label="Technical Skills"
            options={[
              { label: "React", value: "react" },
              { label: "TypeScript", value: "typescript" },
              { label: "Node.js", value: "nodejs" },
              { label: "Python", value: "python" },
              { label: "Go", value: "go" },
              { label: "Rust", value: "rust" },
            ]}
            isMulti
            maxSelect={4}
            helperText="Select up to 4 skills"
          />
        </section>

        {/* Section 4: Checkboxes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">Checkboxes</h2>

          <Field.Checkbox
            name="acceptTerms"
            label="I accept the terms and conditions"
            required
          />

          <Field.Checkbox
            name="newsletter"
            label="Subscribe to our newsletter"
            helperText="Receive updates about new features and products"
          />

          <Field.CheckboxGroup
            name="preferences"
            label="Email Preferences"
            options={[
              { label: "Newsletter", value: "newsletter" },
              { label: "Product Updates", value: "updates" },
              { label: "Marketing Emails", value: "marketing" },
              { label: "Event Notifications", value: "events" },
            ]}
            helperText="Choose the types of emails you'd like to receive"
          />

          <Field.SearchableCheckboxGroup
            name="languages"
            label="Programming Languages"
            options={[
              { label: "JavaScript", value: "javascript" },
              { label: "TypeScript", value: "typescript" },
              { label: "Python", value: "python" },
              { label: "Java", value: "java" },
              { label: "C++", value: "cpp" },
              { label: "C#", value: "csharp" },
              { label: "Go", value: "go" },
              { label: "Rust", value: "rust" },
              { label: "Swift", value: "swift" },
              { label: "Kotlin", value: "kotlin" },
            ]}
            placeholder="Search languages..."
            maxHeight="300px"
            helperText="Search and select programming languages you know"
          />
        </section>

        {/* Section 5: Radio Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            Radio Buttons
          </h2>

          <Field.RadioGroup
            name="gender"
            label="Gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
              { label: "Prefer not to say", value: "not_specified" },
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
                description: "Pay with your credit or debit card",
              },
              {
                label: "PayPal",
                value: "paypal",
                description: "Pay with your PayPal account",
              },
              {
                label: "Bank Transfer",
                value: "bank_transfer",
                description: "Direct bank transfer",
              },
            ]}
            required
          />
        </section>

        {/* Section 6: File Uploads */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            File Uploads
          </h2>

          <Field.Upload
            name="avatar"
            label="Profile Picture"
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
            helperText="Upload a profile picture (max 5MB)"
            showPreview
            onChangeSideEffect={(files) => {
              if (files && files.length > 0) {
                console.log("Avatar selected:", files[0].name);
              }
            }}
          />
                      <Field.Upload
            uploadStyle="avatar"
            name="avatar"
            label="Profile Picture"
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
            helperText="Upload a profile picture (max 5MB)"
            showPreview
            onChangeSideEffect={(files) => {
              if (files && files.length > 0) {
                console.log("Avatar selected:", files[0].name);
              }
            }}
          />
            <Field.Upload
            uploadStyle="button"
            name="avatar"
            label="Profile Picture"
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
            helperText="Upload a profile picture (max 5MB)"
            showPreview
            onChangeSideEffect={(files) => {
              if (files && files.length > 0) {
                console.log("Avatar selected:", files[0].name);
              }
            }}
          />

          <Field.Upload
            name="documents"
            showPreview
            label="Supporting Documents"
            multiple
            maxFiles={3}
            maxSize={10 * 1024 * 1024} // 10MB per file
            accept=".pdf,.doc,.docx"
            helperText="Upload up to 3 documents (PDF, DOC, or DOCX)"
            onChangeSideEffect={(files) => {
              if (files) {
                console.log(`${files.length} document(s) selected`);
              }
            }}
          />
        </section>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
          >
            Submit Form
          </button>

          <button
            type="button"
            onClick={() => form.reset()}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Reset Form
          </button>
        </div>

        {/* Debug: Show form values */}
        <details className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg transition-colors duration-300">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
            Debug: Current Form Values
          </summary>
          <pre className="mt-4 text-xs overflow-auto text-gray-900 dark:text-gray-100">
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </details>
        </Form>
        </div>
      </div>
    </div>
  );
}
