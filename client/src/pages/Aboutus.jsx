import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { Button } from 'flowbite-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20 text-center">
        <h1 className="text-5xl font-bold">About Insight's Ink</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          We are a passionate team dedicated to creating unique and impactful digital experiences.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-10 md:px-20 lg:px-40">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Mission</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto text-center">
          At Insight's Ink, our mission is to empower businesses and individuals by crafting stunning designs,
          developing user-friendly websites, and executing effective digital strategies. We believe in blending creativity 
          with innovation to build long-lasting relationships with our clients.
        </p>
      </section>

      {/* Our Team Section */}
      <section className="bg-gray-800 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 md:px-20 lg:px-40">
          {/* Team Member 1 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Vikram</h3>
            <p className="text-gray-400">Lead Designer</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Praveen</h3>
            <p className="text-gray-400">Frontend Developer</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Madhu</h3>
            <p className="text-gray-400">Digital Strategist</p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-10 md:px-20 lg:px-40">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Value 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Creativity</h3>
            <p className="text-gray-400">
              We believe in pushing boundaries and coming up with unique solutions for every challenge.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Innovation</h3>
            <p className="text-gray-400">
              Embracing the latest technology and trends to stay ahead in the digital landscape.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Client-Centric</h3>
            <p className="text-gray-400">
              Our clients are at the heart of everything we do. We strive to exceed their expectations in every project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20 text-center">
        <h2 className="text-3xl font-semibold text-white mb-8">Let's Work Together</h2>
        <p className="text-lg max-w-lg mx-auto text-white">
          Ready to bring your vision to life? Get in touch with us today and let's start creating something amazing.
        </p>
        <Link to="/contact">
          <Button gradientDuoTone="purpleToBlue" size="lg" className="mt-6">
            <HiOutlineMail className="mr-2" />
            Contact Us
          </Button>
        </Link>
      </section>

    </div>
  );
}
