import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';
import image1 from  "@/assets/AP2.jpg"
import image2 from  "@/assets/AP3.jpg"
import image3 from  "@/assets/img-3.jpg"
import logo from "@/assets/AceLogo.png"
import { BsMicrosoftTeams } from "react-icons/bs";
import { LuChartGantt } from "react-icons/lu";
import { PiFilesFill } from "react-icons/pi";

import DemoButton from './DemoButton';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const Hero = () => {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const width = {
    en: 'max-w-xl',
    de: 'max-w-4xl'
  }[locale] || 'text-2xl';
  return (
    <div className="relative min-h-fit overflow-hidden bg-[#] " id="top">

      <div className="relative min-h-fit container mx-auto">
        <div className="relative z-10 max-w- mx-auto px-4 sm:px-6 py-4">
          <nav aria-label="Main navigation">
            <Navbar />
          </nav>

          <div className="md:hidden flex gap-1 mx-auto justify-center w-fit py-4 px-6 md:mt-10  -mt-16 ">
            <Image src={logo} alt="logo" className="w-8 h-8 " width={32} height={32} />
            <span className="text-lg font-bold text-[#2b2d42] tracking-wide mt-1">AceProject</span>
          </div>

          <section className="flex flex-col lg:flex-row items-center mx-auto justify-evenly  min-h-fit 2xl:pb-10  md:gap-12 lg:gap-8">
            <div className="relative w-full  order-1 lg:order-2">
              <div className="relative  mx-auto lg:mx-0">
                <div className="absolute -inset-8  rounded-3xl blur-2xl" />
                <div className="flex flex-col gap-6">
                  <div className="md:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 ">

                    <div className="lg:col-span-1 hidden  md:block">
                      <div className="relative h-full bg-white/10 rounded md:rounded-xl border border-white/20 p-2 md:p-4 shadow-2xl backdrop-blur-sm">
                        <Image
                          src={image1}
                          alt="AceProject"
                          className="w-full h-full object-cover rounded-xl shadow-lg"
                          width={484}
                          height={588}
                          priority
                        />
                      </div>
                    </div>


                    <div className="lg:col-span-2 md:grid grid-rows-2 gap-2">

                      <div className="relative bg-white/10 rounded md:rounded-2xl border border-white/20 p-2 md:p-4 shadow-2xl backdrop-blur-sm">
                        <Image
                          src={image2}
                          alt="AceProject"
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                          width={484}
                          height={294}
                        />
                      </div>


                      <div className="md:grid  gap-1 md:gap-4 hidden">
                        <div className="relative bg-white/10 rounded md:rounded-2xl border border-white/20 p-2 md:p-4 shadow-2xl backdrop-blur-sm">
                          <Image
                            src={image3}
                            alt="AceProject"
                            className="w-full h-80 object-center rounded-lg shadow-lg"
                            width={542}
                            height={294}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full text-center lg:text-left order-2 lg:order-1 mt-10 md:mt-0 ">
              <div className=" md:max-w-2xl mx-auto lg:mx-0 space-y-6 md:space-y-8  ">
                <div className="space-y-4">
                  <h1 className=" text-xl md:text-5xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-black text-[#2b2d42] md:leading-tight">
                    {t('Title')}
                  </h1>
                </div>

                <p className=" text-sm md:text-xl text-[#31363F] leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                  {t('Description')}
                </p>


                <div className={`grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 ${width} mx-auto lg:mx-0`}>
                  <div className=" flex text-center lg:text-left p-2 md:p-4 items-center bg-white rounded-xl border border-dashed  ">
                    <div><PiFilesFill className='hidden md:flex lg:hidden  xl:block text-2xl' />  </div>
                    <div className="text-sm text-[#2b2d42] text-center">{t('Features.ProjectTask')} </div>
                  </div>
                  <div className="flex text-center lg:text-left p-2 md:p-4 items-center bg-white rounded-xl border border-dashed">
                    <div><BsMicrosoftTeams className='hidden md:flex lg:hidden  xl:block text-2xl' />  </div>
                    <div className="text-sm text-[#2b2d42] text-center">{t('Features.TeamMember')}</div>
                  </div>
                  <div className="flex items-center text-center lg:text-left p-2 md:p-4 bg-white rounded-xl border  border-dashed">
                    <div><LuChartGantt className='hidden md:flex lg:hidden xl:flex text-2xl' /> </div>
                    <div className="text-sm text-[#2b2d42] text-center">{t('Features.GanttChart')}</div>
                  </div>
                </div>

                <div className="pt-4 flex gap-5 mx-auto justify-evenly md:justify-center lg:justify-start">
                  <div>
                    <Link href="/#contact" className="group inline-flex items-center gap-3 px-4 py-2  md:px-8 md:py-2 lg:px-6 2xl:py-3 bg-gray-800  text-white md:text-lg font-bold rounded  hover:shadow-2xl">
                      <span>{t('Buttons.Contact')}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                  <div className=''>
                    <DemoButton />
                  </div>

                </div>


              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;