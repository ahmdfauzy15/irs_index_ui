// src/components/HeroSection.jsx
import React from 'react';
import { Shield, Lock, Cpu } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center mb-12 px-4">
      {/* Modern Logo */}
      <div className="inline-flex items-center justify-center space-x-4 mb-8 animate-slide-in">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
            IRS
          </h1>
          <p className="text-gray-600 mt-2">Integrated Reporting System</p>
        </div>
      </div>

      {/* Clean Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight">
        Portal Terpadu
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700 mt-2">
          Monitoring Pengawasan & Pelaporan
        </span>
      </h2>

      {/* Minimal Description */}
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
        Sistem terintegrasi Otoritas Jasa Keuangan untuk monitoring pelaporan
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mb-12">
        {[
          { icon: Lock, text: 'Sistem SSO', color: 'bg-green-100 text-green-800' },
          { icon: Shield, text: 'Informasi Lengkap', color: 'bg-red-100 text-red-800' },
        ].map((feature, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${feature.color} animate-slide-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <feature.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="max-w-md mx-auto mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="text-center -mt-3">
          <span className="inline-block px-4 py-1 bg-white text-sm text-gray-500">
            PILIH AKSES SESUAI PERAN
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;