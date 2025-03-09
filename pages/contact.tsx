import axios from "axios";
import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import Layout from "../components/shared/layout";
import Toast from "../components/shared/toast";

interface IFormData {
  name: string;
  email: string;
  message: string;
}

const initialFormData: IFormData = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<IFormData>>({});
  const [toast, setToast] = useState<{
    message: string;
    status: "success" | "danger";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const validateForm = (): Partial<IFormData> => {
    const errors: Partial<IFormData> = {};
    if (!formData.name.trim()) errors.name = "Please enter your name";
    if (!formData.email.trim()) errors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Please enter a valid email";
    if (!formData.message.trim()) errors.message = "Please enter a message";
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length) return setFormErrors(errors);

    setLoading(true);
    try {
      const { status } = await axios.post("/api/sendgrid", formData);
      if (status === 200) {
        setToast({ message: "Contact successfully sent!", status: "success" });
        setFormData(initialFormData);
        setFormErrors({});
      }
    } catch {
      setToast({
        message: "Failed to send message. Please try again later.",
        status: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Contact
      </h1>
      <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
        Whether you have a question, a project in mind, or just want to say
        hello, I'd love to hear from you.
      </p>

      {toast && (
        <Toast show onClose={() => setToast(null)} status={toast.status}>
          {toast.message}
        </Toast>
      )}

      <form onSubmit={handleSubmit} className="mx-auto">
        {(["name", "email", "message"] as const).map((field) => (
          <FormInput
            key={field}
            field={field}
            value={formData[field]}
            error={formErrors[field]}
            onChange={handleChange}
          />
        ))}

        <div className="text-left">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                      ${
                        loading
                          ? "bg-gray-400 cursor-wait"
                          : "bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      }
                      `}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </Layout>
  );
}

// **Reusable Input Component**
interface FormInputProps {
  field: "name" | "email" | "message";
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInput = ({ field, value, error, onChange }: FormInputProps) => {
  const isTextArea = field === "message";
  return (
    <div className="mb-4">
      <label
        htmlFor={field}
        className="block font-medium text-gray-700 dark:text-zinc-200"
      >
        {field.charAt(0).toUpperCase() + field.slice(1)}:
      </label>
      {isTextArea ? (
        <textarea
          id={field}
          name={field}
          rows={5}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-4 py-2 rounded-md bg-white/90 text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur 
                      dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 focus:border-cyan-500 focus:ring-cyan-500 
                      ${error ? "border-red-500" : ""}`}
        />
      ) : (
        <input
          type={field === "email" ? "email" : "text"}
          id={field}
          name={field}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-4 py-2 rounded-md bg-white/90 text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur 
                      dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 focus:border-cyan-500 focus:ring-cyan-500 
                      ${error ? "border-red-500" : ""}`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
