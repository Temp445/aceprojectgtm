'use client'

import Navbar from "@/components/Navbar";
import { eventTracking } from "@/lib/gtm";
import React from "react";
import { InlineWidget } from "react-calendly";
import { useTranslations } from "next-intl";
import Navbar1 from "@/components/Navbar1";

const LI_DEMO_CONVERSION_LABEL = process.env.NEXT_PUBLIC_LI_DEMO_CONVERSION_ID!;
if (!LI_DEMO_CONVERSION_LABEL) {
  console.error('❌ LinkedIn Conversion Label missing. Set NEXT_PUBLIC_LI_DEMO_CONVERSION_ID in .env.');
}

const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL!;
if (!CONVERSION_LABEL) {
  console.error('❌ Google Conversion Label missing. Set NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL in .env.');
}

const CalendlyEmbed = () => {
  const t = useTranslations('Notification')
  const url = "https://calendly.com/acesoft-sales/ace-project-demo";

  // Trigger LinkedIn Conversion
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: LI_DEMO_CONVERSION_LABEL });
  }

  // Trigger Google Conversion
  eventTracking({
    eventName: 'AceProject_bookdemo_view',
    formId: 'engagement',
    formName: 'AceProject BookDemo Visit',
    leadType: 'demo'
  })

  return (
    <div>
        <Navbar1/>
      <div className="container mx-auto px-4" >
        <Navbar/>
      </div>
     <div className="bg-gray-800 -mt-6">
       <h1 className="text-xl md:text-2xl font-bold md:font-extrabold  text-center text-white pt-10">{t('button')}</h1>
      <div className="">
        <InlineWidget url={url} 
        styles={{ height: '700px' }}/>
      </div>
     </div>
    </div>
  );
};

export default CalendlyEmbed;