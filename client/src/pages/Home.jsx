import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiArrowRight } from 'react-icons/hi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-5xl font-bold mb-5">Welcome to Insight's Ink</h1>
        <p className="text-lg mb-8 max-w-lg mx-auto">
          Explore our latest projects, innovative designs, and unique approaches to digital creativity.
        </p>
        <Link to="/projects">
          <Button gradientDuoTone="purpleToBlue" size="lg">
            See Our Projects <HiArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>

      {/* Services Section */}
      <section className="py-20 px-10 md:px-20 lg:px-40">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Design & Branding</h3>
            <p className="text-gray-400">
              We help bring your brand to life with compelling design that resonates with your audience.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Web Development</h3>
            <p className="text-gray-400">
              Our team builds modern, scalable, and responsive websites tailored to your needs.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Digital Marketing</h3>
            <p className="text-gray-400">
              We craft effective marketing strategies to boost your online presence and reach your audience.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-800 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-8">About Us</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-400">
          Insight's Ink is a creative agency that specializes in crafting beautiful, user-friendly digital experiences. We believe in blending design with strategy to build brands that last.
        </p>
      </section>

      
    </div>
  );
}
