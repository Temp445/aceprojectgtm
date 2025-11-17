
import BackToTop from '@/components/BackToTop'
import Clients from '@/components/Clients'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Form from '@/components/Form'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import PricingTable from '@/components/PricingTable'
import Testimonial from '@/components/testimonial'
import Why_Choose from '@/components/Why_Choose'
import Advantages from '@/components/Advantages'
import BookADemo from '@/components/BookADemo'
import { Metadata } from 'next';
import NotificationButton from '@/components/NotificationButton'
import Navbar1 from '@/components/Navbar1'
import Popup from '@/components/Popup'

const canonicalUrl = 'https://acesoft.in/products/ace-project-management-software'
export const metadata: Metadata = {
  title: "AceProject",
  description: "AceProject is an all-in-one project management solution for organizations to plan, track, and manage projects with task management, team collaboration, Gantt charts, and real-time dashboards.",
  keywords: " Ace, AceProject, project management, project management software, enterprise project management, task management, team collaboration, Gantt charts, performance tracking, project dashboards, project tracking software, organizational workflow, project planning tools, real-time project monitoring, team management software, enterprise collaboration tools, project reporting, project portfolio management, resource management, project scheduling, milestone tracking, deadline management, workflow automation, team productivity tools, project status tracking, project timeline software, collaboration platform, project analytics, task assignment, project management dashboard, team performance metrics, enterprise workflow solutions, project risk management, multi-project management, agile project management tools, project communication software, project management for businesses",
  alternates: {
    canonical: canonicalUrl,
  },
  robots: 'noindex,follow',
};
const HomePage = () => {
  return (
    <div>
      <div className='container mx-auto'><Navbar1 /> </div>
      <div className='container mx-auto absolute md:hidden'><Navbar /></div>
      <Hero />
      <Why_Choose />
      <Advantages />
      <Clients />
      <Features />
      <BookADemo />
      <PricingTable />
      <Testimonial />
      <Form />
      <Footer />
      <BackToTop />
      <NotificationButton />
      <Popup />
    </div>
  )
}

export default HomePage