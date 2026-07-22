import React, { useState, useEffect } from 'react';
import { Factory, Settings, AlertTriangle, MonitorPlay, Power, PowerOff } from 'lucide-react';

export function DigitalFactoryView() {
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [stopPressed, setStopPressed] = useState(false);

  useEffect(() => {
    if (startPressed && !stopPressed) {
      setIsMotorRunning(true);
    } else if (stopPressed) {
      setIsMotorRunning(false);
    }
  }, [startPressed, stopPressed]);

  const projects = [
    {
      id: 1,
      title: 'کنترل پمپ آب',
      desc: 'کنترل اتوماتیک سطح آب، حفاظت خشک‌کار، مانیتورینگ',
      type: 'PLC + HMI',
      status: 'active'
    },
    {
      id: 2,
      title: 'خط نوار نقاله (Conveyor)',
      desc: 'سنسورهای القایی، توقف اضطراری، کنترل موتور سه‌فاز',
      type: 'مدار فرمان و قدرت',
      status: 'active'
    },
    {
      id: 3,
      title: 'آسانسور صنعتی',
      desc: 'منطق ترتیبی، ایمنی، طبقه بندی',
      type: 'PLC Advanced',
      status: 'locked'
    },
    {
      id: 4,
      title: 'خط تولید آب معدنی',
      desc: 'پرکردن، شستشو، انتقال، سنسورهای مختلف',
      type: 'Full Factory',
      status: 'locked'
    }
  ];

  return (
    <div className="p-8 space-y-8 rtl h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">کارخانه دیجیتال (Digital Twin)</h2>
        <p className="text-slate-500 mt-1">شبیه‌سازی سناریوهای واقعی صنعت و اجرای پروژه‌های عملی</p>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 flex-1 text-slate-200 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="col-span-2 flex flex-col">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 flex-1 flex flex-col border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-300">شبیه‌ساز مدار فرمان پایه</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${isMotorRunning ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${isMotorRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                  {isMotorRunning ? 'موتور روشن' : 'موتور خاموش'}
                </div>
              </div>

              <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-700 p-8 flex flex-col items-center justify-center gap-12 relative overflow-hidden">
                {/* Power Lines */}
                <div className="absolute top-8 left-8 right-8 h-1 bg-red-500/50" />
                <div className="absolute bottom-8 left-8 right-8 h-1 bg-blue-500/50" />
                <span className="absolute top-2 left-8 text-red-400 font-bold text-sm">L1 (24V)</span>
                <span className="absolute bottom-2 left-8 text-blue-400 font-bold text-sm">N (0V)</span>

                {/* Circuit Components */}
                <div className="flex items-center justify-center gap-12 sm:gap-20 w-full relative z-10">
                  {/* Stop Button (NC) */}
                  <div className="flex flex-col items-center gap-4 relative">
                    <button 
                      onMouseDown={() => setStopPressed(true)}
                      onMouseUp={() => setStopPressed(false)}
                      onMouseLeave={() => setStopPressed(false)}
                      onTouchStart={() => setStopPressed(true)}
                      onTouchEnd={() => setStopPressed(false)}
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg transition-all z-10 ${stopPressed ? 'bg-red-600 border-red-700 scale-95' : 'bg-red-500 border-red-600 hover:bg-red-400'}`}
                    >
                      <PowerOff size={24} className="text-white" />
                    </button>
                    <span className="text-slate-400 text-sm font-medium">استپ (NC)</span>
                  </div>

                  {/* Start Button (NO) */}
                  <div className="flex flex-col items-center gap-4 relative">
                    <button 
                      onMouseDown={() => setStartPressed(true)}
                      onMouseUp={() => setStartPressed(false)}
                      onMouseLeave={() => setStartPressed(false)}
                      onTouchStart={() => setStartPressed(true)}
                      onTouchEnd={() => setStartPressed(false)}
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg transition-all z-10 ${startPressed ? 'bg-green-600 border-green-700 scale-95' : 'bg-green-500 border-green-600 hover:bg-green-400'}`}
                    >
                      <Power size={24} className="text-white" />
                    </button>
                    <span className="text-slate-400 text-sm font-medium">استارت (NO)</span>
                  </div>

                  {/* Motor / Contactor Coil */}
                  <div className="flex flex-col items-center gap-4 relative">
                    <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] z-10 ${
                      isMotorRunning 
                        ? 'bg-slate-700 border-green-400 shadow-green-500/50' 
                        : 'bg-slate-800 border-slate-600'
                    }`}>
                      <Factory size={32} className={`transition-all duration-500 ${isMotorRunning ? 'text-green-400' : 'text-slate-500'}`} />
                      
                      <div className={`absolute inset-2 border-4 border-dashed rounded-full transition-all duration-1000 ${
                        isMotorRunning ? 'border-green-500/50 animate-spin' : 'border-slate-600'
                      }`} />
                    </div>
                    <span className="text-slate-400 text-sm font-medium">موتور (M1)</span>
                  </div>
                </div>

                {/* Wire lines connecting them */}
                <div className="absolute top-1/2 left-24 right-24 h-1 bg-slate-600 -translate-y-1/2 -z-10 rounded-full" />
                <div className={`absolute top-1/2 right-24 h-1 -translate-y-1/2 -z-10 transition-all duration-300 rounded-full ${isMotorRunning || startPressed ? 'bg-red-400' : 'bg-transparent'}`} style={{ width: 'calc(100% - 12rem)' }} />
              </div>
              
              <div className="mt-6 flex justify-between items-center bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                 <div className="flex items-center gap-4 text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500" />
                     <span className="text-slate-300">مسیر برق‌دار</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-slate-600" />
                     <span className="text-slate-300">مسیر بی‌برق</span>
                   </div>
                 </div>
                 <button 
                  onClick={() => { setIsMotorRunning(false); setStartPressed(false); setStopPressed(false); }}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-500" />
                  ریست مدار
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto pr-4 custom-scrollbar">
            <h3 className="font-bold text-lg mb-4">ایستگاه‌های کاری</h3>
            {projects.map((project) => (
              <div 
                key={project.id}
                className={`p-5 rounded-2xl border transition-all ${
                  project.status === 'active' 
                    ? 'bg-slate-800/80 border-slate-600 hover:border-blue-500 cursor-pointer' 
                    : 'bg-slate-800/40 border-slate-800 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{project.title}</h4>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">
                    {project.type}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{project.desc}</p>
                {project.status === 'active' ? (
                  <button className="text-blue-400 text-sm font-medium hover:text-blue-300">
                    ورود به ایستگاه
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <AlertTriangle size={16} />
                    نیاز به پیش‌نیاز
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
