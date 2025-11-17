'use client';

import React, { FormEvent, useRef, useState } from "react";
import { SendHorizontal, Mails, PhoneCall, MapPinned } from "lucide-react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { sendWhatsappMessage } from "../services/whatsapp/whatsappService";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import icon from "@/assets/CF.jpg";
import { useTranslations } from "next-intl";
import { CountryCode } from 'libphonenumber-js';
import { useRouter } from "next/navigation";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;


const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL!;
if (!CONVERSION_LABEL) {
  console.error('❌ Google Conversion Label missing. Set NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL in .env.');
}

const LI_ENQ_CONVERSION_LABEL = process.env.NEXT_PUBLIC_LI_ENQ_CONVERSION_ID!;
if (!LI_ENQ_CONVERSION_LABEL) {
  console.error('❌ LinkedIn Conversion Label missing. Set NEXT_PUBLIC_LI_ENQ_CONVERSION_ID in .env.');
}

const endpoint = '/api/proxy-validate-email';

const Form: React.FC = () => {
  const t = useTranslations('Contact');
  const countryCode = t('code') as CountryCode || 'IN';

  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState('');
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


      if (response.status !== 200) return t('Form.EmailError');

      const data = await response.json();
      if (data.success) {
        return data.isValid ? '' : t('Form.EmailError');
      } else {
        return (` Failed: ${data.error}`);
      }
    } catch (err) {
      console.error('Email validation error:', err);
      return t('Messages.ValidationUnavailable');
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
      setEmailError('');
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError(t('Form.PhoneError'));
      return;
    } else {
      setPhoneError('');
    }

    // Trigger LinkedIn Conversion
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', { conversion_id: LI_ENQ_CONVERSION_LABEL });
    }


    const phoneWithoutPlus = phone.replace(/[\s+]/g, '');

    const formData = {
      Full_Name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      Company_Name: formCurrent['company']?.value || '',
      Business_Email: email,
      Mobile_Number: phoneWithoutPlus,
      Location: formCurrent['location']?.value || '',
      Message: formCurrent['queries']?.value || '',
      Product_Interested: formCurrent['product']?.value || '',
      Originate_From: 'AceProject',
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);

      sessionStorage.setItem("form_submitted", "contact_form");

      formCurrent.reset();
      setEmail('');
      setPhone('');
      router.push('/thank-you');

    } catch (error) {
      console.error('Email sending failed:', error);
      alert(t('Messages.Failure'));
    } finally {
      setLoading(false);
    }

    try {
      await sendWhatsappMessage(
        "enquiry_form",
        {
          originateFrom: formData.Originate_From,
          fullName: formData.Full_Name,
          companyName: formData.Company_Name,
          businessEmail: formData.Business_Email,
          mobileNumber: formData.Mobile_Number,
          location: formData.Location,
          productInterest: formData.Product_Interested,
          message: formData.Message,
        },
      );

      await sendWhatsappMessage(
        'customer_greetings',
        {
          fullName: formData.Full_Name,
          product: formData.Product_Interested,
          siteUrl: 'https://acesoft.in',
          imageUrl:
            'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
        },
        phoneWithoutPlus,
      );
    } catch (error) {
      console.error('WhatsApp sending error:', error);
    }
  };

  return (
    <div id="contact" className="mt-5 md:px-2">
      <div className="flex flex-col md:flex-row p-4 py-10 rounded-lg md:py-10 max-w-6xl mx-auto sm:mt-20 mb-20 justify-center">

        <div className="md:w-7/12 border p-5 md:p-10 rounded md:rounded-none md:border-[#2b2d42]">
          <h2 className="text-xl md:text-3xl font-semibold text-[#2b2d42] mb-6">
            {t('Title')}   <strong className="text-[#077A7D]">{t('highlight')}</strong>
          </h2>
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Name')} :</label>
                <input type="text" name="Name" required placeholder={`${t('Form.Name')} *`} className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
              </div>
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Company')}  :</label>
                <input type="text" name="company" required placeholder={`${t('Form.Company')} *`} className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Email')} :</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  placeholder={`${t('Form.Email')} *`}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Phone')} :</label>
                <PhoneInput
                  international
                  defaultCountry={countryCode}
                  value={phone}
                  onChange={setPhone}
                  className=" !shadow-none rounded !bg-transparent border mt-1 p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="lg:text-lg font-medium">{t('Form.Location')} :</label>
              <input type="text" name="location" required placeholder={`${t('Form.Location')} *`} className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
            </div>

            <div className="flex gap-2">
              <label className="lg:text-lg font-medium">{t('Form.Product')} :</label>
              <input type="text" name="product" defaultValue="AceProject" readOnly className="lg:text-lg font-semibold" aria-label="Product Name" />
            </div>

            <div className="flex flex-col">
              <label className="lg:text-lg font-medium">{t('Form.Queries')} :</label>
              <textarea name="queries" required placeholder={`${t('Form.Queries')} *`} className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full h-24" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-[#006A67] flex items-center gap-2 md:text-lg"
            >
              {loading ? t('Form.Submitting') : t('Form.Submit')}
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-20 md:mt-0 md:w-5/12 bg-[#077A7D] border border-e-[#2b2d42] border-y-[#2b2d42] border-l-[#2b2d42] md:border-l-0 text-white rounded md:rounded-r-sm md:rounded-l-none">
          <div className="h-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-50 bg-opacity-20 flex flex-col items-center justify-center">
              <Image fill src={icon} alt="bg" className="object-cover object-center opacity-50" />
              <div className="z-40 text-center">
                <h2 className="text-[#2b2d42] font-bold">AceProject</h2>
                <h3 className="text-2xl font-bold text-[#2b2d42]">{t('ContactInfo.Title')}</h3>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8 space-y-8 md:mt-3">
            <div className="flex items-start space-x-4">
              <div className="bg-red-400 rounded-full p-3">
                <Mails className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{t('ContactInfo.EmailUs')}</h4>
                <p className="mt-1 text-sm">sales@acesoft.in</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 rounded-full p-3">
                <PhoneCall className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{t('ContactInfo.CallUs')}</h4>
                <p className="mt-1 text-sm">+91 9840137210</p>
                <p className="opacity-90 text-sm">{t('ContactInfo.Hours')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-violet-400 rounded-full p-3">
                <MapPinned className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{t('ContactInfo.VisitUs')}</h4>
                <p className="mt-1 text-sm">
                  {t('ContactInfo.Address')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
