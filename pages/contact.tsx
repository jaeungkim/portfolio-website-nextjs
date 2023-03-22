import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Layout from "../components/shared/layout";
import Toast from "../components/shared/toast";

interface IFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const [toastMessage, setToastMessage] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<"success" | "danger">("success"); // Default value is "success"

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/api/sendgrid", {
          name,
          email,
          message,
        });
        if (response.status === 200) {
          setApiStatus("success");
          setToastMessage("Contact successfully sent!!");
          setName("");
          setEmail("");
          setMessage("");
          setFormErrors({});
        }
      } catch (error) {
        console.error(error);
        setApiStatus("danger");
        setToastMessage("Failed to send message. Please try again later.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (): IFormErrors => {
    let errors: IFormErrors = {};
    if (!name) {
      errors.name = "Please enter your name";
    }
    if (!email) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    if (!message) {
      errors.message = "Please enter a message";
    }
    return errors;
  };

  return (
    <Layout>
      <Toast
        show={toastMessage !== ""}
        onClose={() => setToastMessage("")}
        status={apiStatus}
      >
        <div>
          <p>{toastMessage}</p>
        </div>
      </Toast>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={name}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              formErrors.name ? "border-red-500" : ""
            }`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              formErrors.email ? "border-red-500" : ""
            }`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium text-gray-700">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            rows={5}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              formErrors.message ? "border-red-500" : ""
            }`}
          ></textarea>
          {formErrors.message && (
            <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}
