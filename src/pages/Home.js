import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ServicesProvided from '../components/ProfessionalFeatures';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <ServicesProvided />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
};

export default Home;
