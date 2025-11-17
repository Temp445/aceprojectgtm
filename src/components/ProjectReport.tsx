'use client'

import React, { useEffect, useRef, ReactNode } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from 'next/image';

import image2 from "@/assets/Project-1.jpg";
import image3 from "@/assets/Project-2.jpg";

import report1 from "@/assets/Report-1.jpg";
import report2 from "@/assets/Report-2.jpg";
import report3 from "@/assets/Report-3.jpg";

import team1 from "@/assets/Team1.jpg";
import team2 from "@/assets/Team2.jpg";


import task1 from "@/assets/Task1.jpg";
import task2 from "@/assets/Task2.jpg";
import task3 from "@/assets/Task3.jpg";
import task4 from "@/assets/Task4.jpg";


import calendar1 from "@/assets/Calendar-0.jpg";
import calendar2 from "@/assets/Calendar-1.jpg";
import calendar3 from "@/assets/Calendar-2.jpg";


const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

interface ScrollSectionProps {
  children: ReactNode;
  id: string;
}

const ScrollSection = ({ children, id }: ScrollSectionProps) => {
  const controls = useAnimation();
 const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

   useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      id={id}
      className="scroll-section"
    >
      {children}
    </motion.section>
  );
};

const AutoPlayVideo = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.currentTime = 0;
      video.play().catch((err) => console.warn('Failed to play video:', err));
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className={className}
      />
    </div>
  );
};


const ProjectReport = () => {
  
  return (
        <div>
             <div className="text-center mt-8 ">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 ">
           Project & Reporting Features
          </h2>
          <p className="md:text-lg text-slate-700 max-w-7xl mx-auto text-justify md:text-center">
          Project reporting is the process of collecting, analyzing, and sharing key information about a project’s status, progress, performance, and outcomes with stakeholders. It helps ensure transparency, informed decision-making, and accountability throughout the project lifecycle.
          </p>
        </div>
              <div className=" p-3 xl:p-6 container mx-auto relative xl:pt-52 pb-14 bg-white">
      {/* Section 1 */}
      <ScrollSection id="project">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 xl:gap-6 mb-12 md:mb-20 lg:mb-32 xl:mb-80 relative">
          <div className="relative md:w-1/2 w-full order-2 md:order-1">
            <motion.div
              variants={fadeInUp}
              className="p-1 shadow-2xl bg-white rounded border-white absolute -right-5 w-60 -top-36 border z-10 hidden xl:block"
            >
              <Image src={image2} alt="Star Player" className="w-fit" />
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="p-0.5 shadow-2xl bg-white rounded border-gray-500 absolute -bottom-40 -left-3 w-xs  border z-10 hidden xl:block"
            >
              <Image src={image3} alt="Project Gantt Chart" className="w-fit rounded" />
            </motion.div>

            <motion.div 
              variants={slideInLeft}
            >
              <AutoPlayVideo
                src="/videos/Project.mp4"
                className="w-full rounded shadow-md"
              />
            </motion.div>
          </div>

          <motion.div 
            className=" md:w-1/2 w-full flex flex-col gap-2  xl:gap-14 xl:ml-5 order-1"
            variants={slideInRight}
          >
            <h2 className=" text-2xl md:text-3xl xl:text-5xl font-bold ">Smart Gantt Chart for Visual Project Progress</h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
             Manage projects smarter with real-time tracking, star performer highlights, and an interactive Gantt chart—all within a unified project view.
            </p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Section 2 */}
      <ScrollSection id="report">
        <div className="flex flex-col md:flex-row gap-2 xl:gap-6 relative mb-12 md:mb-20 xl:mb-80">
          <motion.div 
            className="md:w-1/2 w-full flex flex-col gap-2 xl:gap-14"
            variants={slideInRight}
          >
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">Insight-Driven Project Analytics & Reports</h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
             The Project Report summarizes ongoing and completed projects, showing completion rates, resource use, and real-time status to help teams track progress, identify bottlenecks, and decide efficiently.
            </p>
          </motion.div>

          <div className="relative md:w-1/2 w-full">
            <motion.div
              variants={fadeIn}
              className="p-1 shadow-2xl bg-white rounded border-blue-400 absolute -left-2 w-52 -top-32 border z-10 hidden xl:block"
            >
              <Image src={report1} alt="Project Completion Rates" className="w-fit" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-1 shadow-2xl bg-white rounded border-amber-400 absolute -right-5 w-2xs -top-48 border z-10 hidden xl:block"
            >
              <Image src={report2} alt="Resource Allocation" className="w-fit" />
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="p-0.5 shadow-2xl bg-white rounded border-white absolute -bottom-44 -left-5 w-sm  border z-10 hidden xl:block"
            >
              <Image src={report3} alt="Project Status Overview" className="w-fit rounded" />
            </motion.div>

            <motion.div 
              variants={slideInLeft}
            >
              <AutoPlayVideo
                src="/videos/Report.mp4"
                className="w-full rounded shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </ScrollSection>

{/* section 3 */}
   <ScrollSection id="team">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 xl:gap-6 mb-12 md:mb-20 xl:mb-80 relative">
          <div className="relative md:w-1/2 w-full order-2 md:order-1">
            <motion.div
              variants={fadeInUp}
              className="p-1 shadow-2xl bg-white rounded border-green-200 absolute -left-2 w-2xs -top-40 border z-10 hidden xl:block"
            >
              <Image src={team1} alt="Team Workload Distribution" className="w-fit" />
              
            </motion.div>

              <motion.div
              variants={fadeIn}
              className="p-0.5 shadow-2xl bg-white rounded border-violet-300 absolute -bottom-40 -right-4  w-72  border z-10 hidden xl:block"
            >
              <Image src={team2} alt="Team Performance" className="w-fit rounded" />
            </motion.div>

            <motion.div 
              variants={slideInLeft}
            >
              <AutoPlayVideo
                src="/videos/Team.mp4"
                className="w-full rounded shadow-md"
              />
            </motion.div>
          </div>

          <motion.div 
            className="md:w-1/2 w-full flex flex-col gap-2 md:gap-4 xl:gap-14  xl:ml-5 order-1 xl:order-2"
            variants={slideInRight}
          >
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">Smart Team Analytics & Performance Report</h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
              Track team performance, analyze workload distribution, and measure individual contributions with clear, actionable insights to boost productivity.
            </p>
          </motion.div>
        </div>
      </ScrollSection>

      
      {/* Section 4 */}
      <ScrollSection id="task">
        <div className="flex flex-col md:flex-row gap-2 xl:gap-6 relative mb-12 md:mb-20 xl:mb-80">
          <motion.div 
            className="md:w-1/2 w-full flex flex-col gap-2 xl:gap-14"
            variants={slideInRight}
          >
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">Task Performance & Trend Report</h2>
            <p className="text-gray-700  text-sm md:text-base lg:text-lg">
             Get a clear view of task status, priority levels, completion rates, and performance trends to stay on top of team productivity and deadlines.
            </p>
          </motion.div>

          <div className="relative md:w-1/2 w-full">
            <motion.div
              variants={fadeIn}
              className="p-1 shadow-2xl bg-white rounded border-yellow-400 absolute -left-2 w-40 -top-24 border z-10 hidden xl:block"
            >
              <Image src={task1} alt="Task Status Distribution" className="w-fit" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-1 shadow-2xl bg-white rounded border-teal-300 absolute -right-5 w-40 -top-32 border z-10 hidden xl:block"
            >
              <Image src={task2} alt="Task Priority Distribution" className="w-fit" />
            </motion.div>

            
            <motion.div
              variants={fadeInUp}
              className="p-1 shadow-2xl bg-white rounded absolute right-36 w-32 -top-24  z-10 hidden xl:block"
            >
              <Image src={task3} alt="Task Completion Overview" className="w-fit" />
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="p-0.5 shadow-2xl bg-white rounded border-gray-400 absolute -bottom-44 -left-5 w-72  border z-10 hidden xl:block"
            >
              <Image src={task4} alt="Task Completion Trends" className="w-fit rounded" />
            </motion.div>

            <motion.div 
              variants={slideInLeft}
            >
              <AutoPlayVideo
                src="/videos/Tasks.mp4"
                className="w-full rounded shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </ScrollSection>
     
     {/* Section 5 */}
   <ScrollSection id="Calendar">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 xl:gap-6 mb-10 xl:mb-60 relative">
          <div className="relative md:w-1/2 w-full order-2 md:order-1">
            <motion.div
              variants={fadeInUp}
              className="p-1 shadow-2xl bg-white rounded border-violet-200 absolute -left-2 w-52 -bottom-32 border z-10 hidden xl:block"
            >
              <Image src={calendar1} alt="Deadline Distribution" className="w-fit" />
              
            </motion.div>

              <motion.div
              variants={fadeIn}
              className="p-0.5 shadow-2xl bg-white rounded border-slate-400 absolute -bottom-44 -right-10  w-72  border z-10 hidden xl:block"
            >
              <Image src={calendar2} alt="Resource Availability" className="w-fit rounded" />
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="p-0.5 shadow-2xl bg-white rounded  absolute -top-32  w-sm  z-10 hidden xl:block"
            >
              <Image src={calendar3} alt="Activity Heatmap" className="w-fit rounded" />
            </motion.div>

            <motion.div 
              variants={slideInLeft}
            >
              <AutoPlayVideo
                src="/videos/Calendar.mp4"
                className="w-full rounded shadow-md"
              />
            </motion.div>
          </div>

          <motion.div 
            className="md:w-1/2 w-full flex flex-col gap-2 xl:gap-14 xl:ml-5 order-1 md:order-2"
            variants={slideInRight}
          >
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">Activity Heatmap & Deadline Calendar Report</h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg">
            Visualize team activity, track deadline patterns by day, and monitor resource availability—all in one smart calendar report designed to optimize scheduling and productivity.
            </p>
          </motion.div>
        </div>
      </ScrollSection>

    </div>
        </div>
  );
};

export default ProjectReport;
