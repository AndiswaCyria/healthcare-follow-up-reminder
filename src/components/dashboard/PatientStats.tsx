import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Users, UserPlus, PhoneCall, Mail, MessageSquare } from 'lucide-react';

const PatientStats: React.FC = () => {
  const { patients } = useAppContext();
  
  // Calculate contact method preferences
  const contactMethods = {
    email: patients.filter(p => p.preferredContactMethod === 'email').length,
    sms: patients.filter(p => p.preferredContactMethod === 'sms').length,
    whatsapp: patients.filter(p => p.preferredContactMethod === 'whatsapp').length,
    call: patients.filter(p => p.preferredContactMethod === 'call').length
  };
  
  // Calculate patient acquisition over time (last 6 months)
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const patientsByMonth = Array(6).fill(0).map((_, i) => {
    const month = new Date();
    month.setMonth(now.getMonth() - i);
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
    const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    
    const count = patients.filter(p => 
      new Date(p.createdAt) >= monthStart && 
      new Date(p.createdAt) <= monthEnd
    ).length;
    
    return {
      month: month.toLocaleDateString('en-US', { month: 'short' }),
      count
    };
  }).reverse();
  
  // Find the highest value for scaling
  const maxPatients = Math.max(...patientsByMonth.map(m => m.count));

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Patient Statistics</h2>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Preferred Contact Methods</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-blue-50 p-3 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-700">Email</div>
                <div className="text-lg font-semibold text-gray-900">{contactMethods.email}</div>
              </div>
            </div>
            
            <div className="flex items-center bg-green-50 p-3 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-700">SMS</div>
                <div className="text-lg font-semibold text-gray-900">{contactMethods.sms}</div>
              </div>
            </div>
            
            <div className="flex items-center bg-teal-50 p-3 rounded-lg">
              <div className="p-2 bg-teal-100 rounded-full">
                <MessageSquare className="w-5 h-5 text-teal-600" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-700">WhatsApp</div>
                <div className="text-lg font-semibold text-gray-900">{contactMethods.whatsapp}</div>
              </div>
            </div>
            
            <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
              <div className="p-2 bg-indigo-100 rounded-full">
                <PhoneCall className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-700">Phone</div>
                <div className="text-lg font-semibold text-gray-900">{contactMethods.call}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">New Patients (Last 6 Months)</h3>
          
          <div className="flex items-end h-40 space-x-2">
            {patientsByMonth.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-1">{item.count}</div>
                <div 
                  className="w-full bg-cyan-500 rounded-t-sm transition-all duration-300 ease-in-out"
                  style={{ 
                    height: maxPatients > 0 ? `${(item.count / maxPatients) * 100}%` : '0%',
                    minHeight: item.count > 0 ? '4px' : '0'
                  }}
                ></div>
                <div className="text-xs text-gray-500 mt-1">{item.month}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <UserPlus className="w-4 h-4 mr-1" />
              <span>Growth rate: <span className="font-medium text-cyan-600">+12.5%</span></span>
            </div>
            <button className="text-sm text-cyan-600 font-medium hover:text-cyan-700">
              View report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStats;