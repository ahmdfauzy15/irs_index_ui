// src/App.jsx
import React from 'react';
import { Shield, Clock } from 'lucide-react';
import HeroSection from './components/HeroSection';
import LoginButtons from './components/LoginButtons';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white relative overflow-hidden">
      <BackgroundAnimation />
      
      {/* Minimal Header */}
      <header className="relative z-10 pt-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">IRS</h1>
                <p className="text-xs text-gray-600">Gerbang Tunggal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-900">
                {new Date().toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <HeroSection />
          <LoginButtons />
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 mt-16">
        <div className="border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} Otoritas Jasa Keuangan • Sistem IRS
              </div>
              
              <div className="flex items-center space-x-4">
                <a 
                  href="https://www.ojk.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-red-600 hover:text-red-700 hover:underline"
                >
                  Situs OJK
                </a>
                <span className="text-xs text-gray-400">•</span>
                <a 
                  href="mailto:bantuan@ojk-irs.go.id" 
                  className="text-xs text-red-600 hover:text-red-700 hover:underline"
                >
                  Kontak Bantuan
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;