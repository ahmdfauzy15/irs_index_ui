// src/components/LoginButtons.jsx
import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  ArrowRight,
  Lock,
  Building,
  CheckCircle,
  Users,
  BarChart3,
  Eye,
  Key,
  ExternalLink
} from 'lucide-react';

const LoginButtons = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const loginOptions = [
    {
      id: 'pengawas',
      title: 'IRS PENGAWAS',
      subtitle: 'Sistem Monitoring Pengawasan LJK',
      icon: Shield,
      description: 'Monitoring System',
      color: 'from-red-600 to-red-700',
      buttonText: 'MASUK SEBAGAI PENGAWAS',
      link: 'https://irs-ui-pengawas.vercel.app/',
      accessLevel: 'Akses',
      features: [
        { icon: Eye, text: 'Dashboard Monitoring Real-time' },
        { icon: BarChart3, text: 'Analisis Kepatuhan LJK' },
        { icon: Shield, text: 'View Data' },
        { icon: Users, text: 'Korespondensi' }
      ],
      credentials: 'Kredensial Internal OJK'
    },
    {
      id: 'pelapor',
      title: 'IRS PELAPOR',
      subtitle: 'Sistem Monitoring',
      icon: FileText,
      description: 'Monitoring System',
      color: 'from-red-500 to-red-600',
      buttonText: 'MASUK SEBAGAI PELAPOR',
      link: 'https://irs-ui.vercel.app/',
      accessLevel: 'Akses',
      features: [
        { icon: FileText, text: 'Monitoring Laporan Digital' },
        { icon: CheckCircle, text: 'Status & Notifikasi Otomatis' },
        { icon: Building, text: 'Knowledge Base' },
        { icon: Users, text: 'Update Recent' }
      ],
      credentials: 'Akun LJK Terdaftar'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
      {loginOptions.map((option) => (
        <div
          key={option.id}
          className="relative group"
          onMouseEnter={() => setHoveredCard(option.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Modern Card Container */}
          <div className={`
            relative overflow-hidden rounded-2xl
            bg-white border border-gray-200
            shadow-lg hover:shadow-2xl
            transition-all duration-300
            transform hover:-translate-y-1
            h-full
            ${hoveredCard === option.id ? 'border-red-300 shadow-xl' : ''}
          `}>
            
            {/* Red Top Border */}
            <div className={`h-2 w-full bg-gradient-to-r ${option.color}`}></div>
            
            {/* Card Content */}
            <div className="p-8">
              
              {/* Card Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-3 rounded-xl bg-gradient-to-br ${option.color}
                    shadow-lg transform transition-transform duration-300
                    ${hoveredCard === option.id ? 'scale-110' : ''}
                  `}>
                    <option.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {option.title}
                      </h3>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        bg-red-100 text-red-700 border border-red-200
                      `}>
                        {option.accessLevel}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{option.subtitle}</p>
                  </div>
                </div>
                
                {/* Arrow Indicator */}
                <ArrowRight className={`
                  w-5 h-5 text-gray-400 group-hover:text-red-600
                  transition-all duration-300 transform
                  ${hoveredCard === option.id ? 'translate-x-2' : ''}
                `} />
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8 text-lg font-medium">
                {option.description}
              </p>

              {/* Features List */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Fitur Utama:
                  </h4>
                </div>
                <div className="space-y-3">
                  {option.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    >
                      <div className="p-2 rounded-lg bg-red-100">
                        <feature.icon className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credentials Info */}
              {option.credentials && (
                <div className="mb-8 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-semibold text-gray-900">Kredensial:</span>
                    <span className="text-sm text-gray-700">{option.credentials}</span>
                  </div>
                </div>
              )}

              {/* ⭐ MERAH PUTIH BUTTON - Sangat Jelas */}
              <div className="space-y-6">
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    block w-full py-4 rounded-xl font-bold text-lg
                    bg-white border-2 border-red-600 
                    hover:bg-red-600 hover:text-white
                    text-red-600 text-center
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                    transform hover:scale-[1.02]
                    relative overflow-hidden group/btn
                  `}
                >
                  {/* Button Hover Effect */}
                  <div className={`absolute inset-0 bg-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center space-x-3">
                    <Lock className="w-5 h-5 group-hover/btn:text-white text-red-600" />
                    <span className="group-hover/btn:text-white">{option.buttonText}</span>
                    <ExternalLink className="w-5 h-5 group-hover/btn:text-white text-red-600" />
                  </div>
                </a>
                
                {/* Link Information Box */}
                <div className={`
                  p-4 rounded-xl border transition-all duration-300
                  ${hoveredCard === option.id 
                    ? 'bg-red-50 border-red-200 shadow-md' 
                    : 'bg-gray-50 border-gray-200'
                  }
                `}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${hoveredCard === option.id ? 'bg-red-100' : 'bg-white'}`}>
                      {option.id === 'pengawas' ? (
                        <Shield className="w-4 h-4 text-red-600" />
                      ) : (
                        <Building className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <p className="text-sm font-bold text-gray-900">
                          Link Akses Langsung:
                        </p>
                      </div>
                      
                      {/* Link Display */}
                      <div className="p-3 bg-white rounded-lg border border-gray-200 mb-3">
                        <div className="flex items-center justify-between">
                          <code className="text-sm text-red-600 break-all font-mono">
                            {option.link}
                          </code>
                          <button
                            onClick={() => navigator.clipboard.writeText(option.link)}
                            className="ml-2 p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            title="Salin link"
                          >
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Access Info */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${option.id === 'pengawas' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        <p className="text-xs text-gray-600">
                          {option.id === 'pengawas' 
                            ? 'Akses '
                            : 'Akses '
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Corner Accents */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/5 to-transparent rounded-bl-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-600/5 to-transparent rounded-tr-3xl"></div>
          </div>

          {/* Floating Red Dots Effect */}
          {hoveredCard === option.id && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping"
                  style={{
                    top: `${15 + i * 20}%`,
                    left: '-8px',
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LoginButtons;