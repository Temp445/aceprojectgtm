'use client';

import React, { useState } from 'react';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

interface Feature {
  name: string;
  Standard?: boolean;
  StandardNote?: string;
  Premium?: boolean;
  PremiumNote?: string;
  Enterprise: boolean;
  EnterpriseNote?: string;
}

interface Plan {
  name: string;
  displayname: string;
  desc: string;
  buttonText: string;
  buttonlink: string;
  buttonClass: string;
  highlighted: boolean;
  tag: string;
}

interface FeatureIconProps {
  available: boolean;
}

const PricingTable: React.FC = () => {
  const t = useTranslations('Pricing');

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedPlans, setExpandedPlans] = useState<{ [key: string]: boolean }>({});

  const prices: Record<string, number> = {
    Standard: 249,
    Premium: 499,
    Enterprise: 0,
  };

  const getPrice = (plan: string) => {
    const base = prices[plan];
    if (plan === 'Enterprise') return t('ContactUs');

    const price = billingCycle === 'yearly'
      ? Math.round(base * 12 * 0.8).toLocaleString()
      : base.toLocaleString();

    const plans = billingCycle === 'yearly' ? ` /${t('user')}/${t('Yearly')}` : ` /${t('user')}/${t('Monthly')}`;

    return `₹${price}${plans}`;
  };

  const features: Feature[] = [
    { name: t('Featureslist.Projects'), Standard: true, StandardNote: t('Featureslist.Unlimited'), Premium: true, PremiumNote: t('Featureslist.Unlimited'), Enterprise: true },
    { name: t('Featureslist.Storage'), Standard: true, StandardNote: '1 GB', Premium: true, PremiumNote: '10 GB', Enterprise: true },
    { name: t('Featureslist.Task'), Standard: true, Premium: true, Enterprise: true },
    { name: t('Featureslist.Time'), Standard: true, Premium: true, Enterprise: true },
    { name: t('Featureslist.Gantt'), Standard: true, Premium: true, Enterprise: true },
    { name: t('Featureslist.Custom'), Standard: false, Premium: true, Enterprise: true },
    { name: t('Featureslist.Reporting'), Standard: true, StandardNote: t('Featureslist.Notification'), Premium: true, PremiumNote: t('Featureslist.Notification'), Enterprise: true },
    { name: t('Featureslist.Integrations'), Standard: false, Premium: false, Enterprise: true },
    { name: t('Featureslist.collaboration'), Standard: true, StandardNote: t('Featureslist.fileSharing'), Premium: true, PremiumNote: t('Featureslist.DocSharing'), Enterprise: true },
    { name: t('Featureslist.File'), Standard: true, Premium: true, Enterprise: true },
    { name: t('Featureslist.App'), Standard: true, Premium: true, Enterprise: true },
    { name: t('Featureslist.Support'), Standard: true, StandardNote: t('Featureslist.Chat'), Premium: true, PremiumNote: t('Featureslist.Priority'), Enterprise: true },
  ];

  const plans: Plan[] = [
    {
      name: 'Standard',
      displayname: t('Plans.name1'),
      desc: t('Plans.desc1'),
      buttonText: t('Plans.button1'),
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#077A7D] hover:text-white',
      highlighted: false,
      tag: '',
    },
    {
      name: 'Premium',
      displayname: t('Plans.name2'),
      desc: t('Plans.desc2'),
      buttonText: t('Plans.button1'),
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#077A7D] hover:text-white',
      highlighted: true,
      tag: t('Plans.tag2'),
    },
    {
      name: 'Enterprise',
      displayname: t('Plans.name3'),
      desc: t('Plans.desc3'),
      buttonText: t('Plans.button3'),
      buttonlink: '#contact',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#077A7D] hover:text-white',
      highlighted: false,
      tag: t('Plans.tag3'),
    },
  ];

  const togglePlanFeatures = (name: string) => {
    setExpandedPlans((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const FeatureIcon: React.FC<FeatureIconProps> = ({ available }) => (
    <span className={`font-medium ${available ? 'text-green-500' : 'text-red-500'}`}>
      {available ? '✓' : '✗'}
    </span>
  );

  const renderFeatureList = (features: Feature[], key: string, planName: string) =>
    features.map((feature, i) => {
      const isAvailable = feature[key as keyof Feature];
      if (isAvailable === undefined) return null;
      const note = feature[`${key}Note` as keyof Feature] as string | undefined;
      return (
        <div key={`${planName}-${i}`} className="flex items-start">
          <div className="mt-0.5 mr-3">
            <FeatureIcon available={isAvailable as boolean} />
          </div>
          <span className={isAvailable ? 'text-gray-800' : 'text-gray-500'}>
            {feature.name}
            {note && <span className="text-[#077A7D] font-semibold ml-1">- {note}</span>}
          </span>
        </div>
      );
    });

  return (
    <div className="w-full max-w-7xl container mx-auto px-5 sm:px-6 md:px-4 lg:px-2 xl:px-4 py-16" id="pricing">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-[#102E50] mb-2">{t('Title')}</h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-6">{t('Subtitle')}</p>

        <div className="flex justify-center mt-4">
          <div className="bg-gray-100 rounded p-1 flex border border-gray-200 shadow-sm">
            <button
              className={`px-6 py-2 text-sm font-medium rounded transition-all ${
                billingCycle === 'monthly' ? 'bg-[#077A7D] text-white shadow' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              {t('Monthly')}
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded transition-all flex items-center ${
                billingCycle === 'yearly' ? 'bg-[#077A7D] text-white shadow' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              {t('Yearly')}
              <span className="ml-2 bg-white text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                20% OFF
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-2 xl:gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded border ${
              plan.highlighted ? 'border-black shadow-lg' : 'border-gray-200 shadow'
            } hover:shadow-xl transition-shadow duration-300`}
          >
            {plan.tag && (
              <div className="absolute top-5 right-0">
                <span className="bg-gray-500 text-white px-3 py-1 rounded-l-full text-sm font-semibold shadow-sm select-none">
                  {plan.tag}
                </span>
              </div>
            )}

            <div className="p-6 lg:p-4 xl:p-8 flex flex-col h-full">
              <h2 className="text-xl md:text-2xl font-bold text-[#077A7D] mb-2">{plan.displayname}</h2>
              <p className="text-gray-600 mb-4">{plan.desc}</p>

              <div className="mb-6 text-gray-800 font-extrabold text-2xl md:text-2xl">
                {getPrice(plan.name)}
              </div>

              <a
                href={plan.buttonlink}
                className={`${plan.buttonClass} w-full py-2 md:py-3 rounded md:rounded-lg font-semibold shadow-sm hover:shadow text-center transition-colors duration-200`}
              >
                {plan.buttonText}
              </a>

              {plan.name === 'Enterprise' && (
                <div className="mb-6 mt-6 hidden md:block">
                  <h3 className="font-semibold text-gray-900 mb-4">{t('FeaturesTitle')}</h3>
                  <ul className="space-y-1 text-gray-700">
                    {t.raw('Plans.Enterprisefeatures').map((feature: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-green-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className="w-full md:hidden bg-[#077A7D] text-white py-2 rounded mt-6 font-semibold flex items-center justify-center"
                onClick={() => togglePlanFeatures(plan.name)}
              >
                {t('Toggle.ShowFeatures')} <LuSquareArrowOutUpRight className="ml-2 text-lg" />
              </button>

              <div
                className={`mt-6 transition-all duration-300 ${
                  expandedPlans[plan.name] ? 'block' : 'hidden'
                } md:block`}
              >
                {plan.name !== 'Enterprise' ? (
                  <>
                    <h3 className="font-semibold text-gray-900 mb-4">{t('FeaturesTitle')}</h3>
                    <div className="space-y-2 text-gray-700">
                      {renderFeatureList(features, plan.name, plan.name)}
                    </div>
                  </>
                ) : (
                  <div className="mb-6 mt-6 md:hidden">
                    <h3 className="font-semibold text-gray-900 mb-4">{t('FeaturesTitle')}:</h3>
                    <ul className="space-y-1 text-gray-700">
                      {t.raw('Plans.Enterprisefeatures').map((feature: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-green-600">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
