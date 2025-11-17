"use client";

import React, { FormEvent, useRef, useState } from "react";
import {
  SendHorizontal,
  User,
  Mail,
  MapPin,
  Building2,
  X,
  ScrollText
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { sendWhatsappMessage } from "@/services/whatsapp/whatsappService";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import { CountryCode } from "libphonenumber-js";
import { useRouter } from "next/navigation";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const endpoint = "/api/proxy-validate-email";

interface DemoFormPopupProps {
  onClose: () => void;
}

const DemoFormPopup: React.FC<DemoFormPopupProps> = ({ onClose }) => {
  const t = useTranslations("Contact");
  const t1 = useTranslations("Popup")
  const countryCode = (t("code") as CountryCode) || "IN";
  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.status !== 200) return t("Form.EmailError");

      const data = await response.json();
      if (data.success) {
        return data.isValid ? "" : t("Form.EmailError");
      } else {
        return `Failed: ${data.error}`;
      }
    } catch (err) {
      console.error("Email validation error:", err);
      return t("ValidationUnavailable");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formCurrent = form.current;
    if (!formCurrent) return;

    const emailValidationMessage = await validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError("");
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError(t("PhoneError"));
      return;
    } else {
      setPhoneError("");
    }

    const formData = {
      Full_Name: (formCurrent["Name"] as HTMLInputElement)?.value || "",
      Company_Name: formCurrent["company"]?.value || "",
      Business_Email: email,
      Mobile_Number: phone,
      Location: formCurrent["location"]?.value || "",
      Message: formCurrent["queries"]?.value || "",
      Product_Interested: formCurrent["product"]?.value || "",
      Originate_From: "Ace Project",
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);

      sessionStorage.setItem("form_submitted", "demo_popup_form");

      formCurrent.reset();
      setEmail("");
      setPhone("");
      router.push("/thank-you");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert(t("Failure"));
    } finally {
      setLoading(false);
    }

    try {
      await sendWhatsappMessage("enquiry_form", {
        originateFrom: formData.Originate_From,
        fullName: formData.Full_Name,
        companyName: formData.Company_Name,
        businessEmail: formData.Business_Email,
        mobileNumber: formData.Mobile_Number,
        location: formData.Location,
        productInterest: formData.Product_Interested,
        message: formData.Message,
      });

      await sendWhatsappMessage("customer_greetings", {
        fullName: formData.Full_Name,
        product: formData.Product_Interested,
        siteUrl: "https://acesoft.in",
        imageUrl:
          "https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg",
      });
    } catch (error) {
      console.error("WhatsApp sending error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[320] p-3 md:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded shadow-2xl max-w-xl w-full relative py-8 px-3 md:p-10 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-red-600 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-2">
          <div className="flex justify-center items-center gap-3 text-[#077A7D] font-bold text-xl md:text-2xl ">
            <ScrollText className="w-7 h-7" />
            <h2 className="tracking-tight text-gray-800">
              {t1("Book")} <span className="text-[#077A7D]">{t1("Live")}</span>
            </h2>
          </div>

          <p className="text-gray-700 text-sm px-5  mt-3 max-w-lg mx-auto leading-relaxed">
            {t1("Discover")}
          </p>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">{t("Form.Name")}:</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-600 w-4 h-4" />
                <input
                  type="text"
                  name="Name"
                  placeholder={t("Form.Name")}
                  required
                  className="w-full pl-10 py-2 text-sm border border-gray-700 rounded text-gray-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">{t("Form.Company")}:</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 text-gray-600 w-4 h-4" />
                <input
                  type="text"
                  name="company"
                  placeholder={t("Form.Company")}
                  required
                  className="w-full pl-10 py-2 text-sm border border-gray-700 rounded text-gray-800 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">{t("Form.Email")}:</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-600 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder={t("Form.Email")}
                  required
                  className={`w-full pl-10 py-2 text-sm border rounded text-gray-800 outline-none ${emailError ? "border-red-500" : "border-gray-700"
                    }`}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">{t("Form.Phone")}:</label>
              <PhoneInput
                international
                defaultCountry={countryCode}
                value={phone}
                onChange={setPhone}
                className="text-sm border border-gray-700 rounded p-2 bg-transparent focus:ring-2 focus:ring-green-500 outline-none  [&>input]:outline-none [&>input]:bg-transparent"
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">{t("Form.Location")}:</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-600 w-4 h-4" />
                <input
                  type="text"
                  name="location"
                  placeholder={t("Form.Location")}
                  required
                  className="w-full pl-10 py-2 text-sm border border-gray-700 rounded text-gray-800 outline-none"
                />
              </div>
            </div>

            <div className="">
              <label className="text-sm  font-medium">{t("Form.Product")}:</label>
              <input
                type="text"
                name="product"
                defaultValue="Ace Project"
                readOnly
                className="w-full px-2 py-2 text-sm font-semibold text-[#077A7D] border border-gray-700 rounded outline-none"
                aria-label='Product Interested'
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">{t("Form.Queries")}:</label>
            <textarea
              name="queries"
              required
              placeholder={t("Form.Queries")}
              className="w-full h-24 text-sm border border-gray-700 rounded p-2 text-gray-800 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#077A7D] hover:bg-green-700 text-white font-semibold py-2.5 rounded flex justify-center items-center gap-2 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t("Form.Submitting")}
              </>
            ) : (
              <>
                {t("Form.Submit")}
                <SendHorizontal className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemoFormPopup;
