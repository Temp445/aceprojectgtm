import Link from "next/link";
import { useTranslations } from "next-intl";
const BookADemo = () => {
    
  const t = useTranslations('Banner')
  
  return (
     <div className="text-center mt-16">
          <div className="inline-block bg-[#077A7D]  p-4 shadow-lg border border-gray-200 w-full py-10 md:py-20">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {t('Title')}
            </h3>
            <p className="text-gray-200 mb-10 ">
              {t('Description')}
            </p>
            <Link href='/#contact' className="border text-white px-8 py-3 hover:bg-white hover:text-gray-800 hover:border-white  rounded font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              {t('bookDemo')}
            </Link>
          </div>
        </div>
  );
};

export default BookADemo;
