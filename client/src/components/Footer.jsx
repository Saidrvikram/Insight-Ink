import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'; // Icons for Facebook, GitHub, Instagram, and X

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section: Logo and About Us */}
          <div>
            <Link to="/" className="font-bold text-3xl">
              <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Insight's
              </span>{' '}
              Ink
            </Link>
            <p className="mt-4 text-sm">
              About Us: Insight's Ink is a creative platform where we explore and share the world of design, innovation, and creativity. Join us on this journey!
            </p>
          </div>

          {/* Center Section: Social Links and Year of Establishment */}
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2">Established in 2024</p>
            <div className="flex space-x-4">
              {/* Facebook Link */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaFacebookF size={24} />
              </a>
              {/* Instagram Link */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                <FaInstagram size={24} />
              </a>
              {/* X (Twitter) Link */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                <FaTwitter size={24} />
              </a>
              {/* GitHub Link */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Right Section: Legal Links */}
          <div className="flex flex-col text-sm space-y-2">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center mt-10 text-xs">
          <p>&copy; {currentYear} Insight's Ink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
