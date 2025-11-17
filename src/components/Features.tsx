
import Image from 'next/image';
import { useTranslations } from 'next-intl'
import icon1 from '../assets/icon.png'
import icon2 from '../assets/icon-2.png'
import icon3 from '../assets/icon-3.png'
import icon4 from '../assets/icon-4.png'
import icon5 from '../assets/icon-5.png'
import icon6 from '../assets/icon-6.png'
import icon7 from '../assets/icon-7.png'
import icon8 from '../assets/icon-8.png'
import icon9 from '../assets/icon-9.png'


const featureIcons = [icon1, icon2, icon4, icon3, icon5, icon6, icon7, icon8, icon9];

type Feature = {
  Title: string;
  Description: string;
};


const Features = () => {
  const t = useTranslations('Features');
  const features: Feature[] = t.raw('List');

  return (
    <div className="py-10 md:py-16   md:mt-10" id="features">
      <div className=" px-4 sm:px-6 lg:px-8 container mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 ">
            {t('Heading')}
          </h2>
          <p className="md:text-lg text-slate-700 max-w-5xl mx-auto text-justify md:text-center">
            {t('Description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:translate-y-1 border border-blue-100"
            >
              <div className="flex items-start">
                <div className="w-24 md:w-28 mr-4">
                  <Image src={featureIcons[index]} alt={feature.Title} width={100} height={100} />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-semibold text-slate-800 mb-3">{feature.Title}</h3>
                  <p className="text-slate-600 text-sm md:text-base">{feature.Description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
