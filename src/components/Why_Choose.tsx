
import { CheckCircle, MoveRight } from 'lucide-react'
import Image from 'next/image'
import image1 from "@/assets/Dashboard.png"
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Why_Choose = () => {
  const t = useTranslations('WhyChoose')

  return (
    <section className="pt-1 container mx-auto mt-5 ">

      <div className="min-h-fit bg-gradient-to-tl from-gray-800 to-gray-800 flex items-center justify-center p-2 md:p-6 container mx-auto">
        <div className="bg-white md:shadow-2xl  rounded md:rounded-2xl p-2 md:p-8  w-full md:border md:border-gray-200">
          <h2 className="text-xl md:text-3xl font-bold text-[#2b2d42] mb-4">
            {t('Title')} <span className="text-[#077A7D]">Project Management</span> ?
          </h2>
          <p className="text-[#31363F] md:text-lg leading-relaxed">
            {t('Desc')}
          </p>
        </div>
        <div>
        </div>
      </div>

      <div className=" mx-auto px-2 md:px-4 mt-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 xl:gap-5 container">
          <div className="w-full md:w-8/12 lg:w-10/12   relative">
            <div className="relative z-[5]  xl:bg-none lg:shadow-none p-1 rounded-lg shadow-lg transform  transition-transform duration-300">
              <div className='p-8 '>

                <div className="mx-auto  relative mt-5 p-3 rounded bg-white shadow-xl border border-gray-200">
                  <Image
                    src={image1}
                    alt="Dashboard"
                    className="object-contain w-full h-full rounded border border-blue-300"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-10 left-5  w-24 h-24 bg-lime-600 rounded opacity-70 z-0"></div>
            <div className="absolute bottom-5  right-5 w-24 h-24 bg-indigo-500 rounded opacity-70 z-0"></div>
          </div>


          <div className="w-full xl:w-7/12 space-y-6  pt-5 pb-10 px-2 lg:px-12 xl:px-2 rounded">
            <div className="inline-block  text-[#2b2d42] border px-4 py-1 rounded-full font-medium">
              {t('Tagline')} AceProject ?
            </div>

            <h2 className="text-xl  xl:text-2xl  2xl:text-4xl font-bold text-[#2b2d42] leading-tight">
              {t('MainHeading')}
            </h2>

            <p className="text-sm lg:text-lg text-[#31363F]">
              {t('Subheading')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                t('P0'),
                t('P1'),
                t('P2'),
                t('P3'),
                t('P4'),
                t('P5'),
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-blue-100 border border-gray-100"
                >
                  <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                  <span className="font-medium text-sm text-[#31363F]">{item}</span>
                </div>
              ))}
            </div>

            <div className='w-[130px] md:w-36'>
              <Link href="/#features" className=" text-sm  mt-6 bg-[#077A7D] text-white font-medium py-2 px-2 gap-3 md:py-2 md:px-3 rounded shadow-md transition-colors duration-300  flex items-center md:gap-5">
                {t('LearnMore')}
                <MoveRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why_Choose