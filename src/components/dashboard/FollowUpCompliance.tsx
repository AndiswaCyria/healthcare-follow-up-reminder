import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { BarChart, PieChart, CheckCircle, XCircle } from 'lucide-react';

const FollowUpCompliance: React.FC = () => {
  const { appointments } = useAppContext();
  
  // Calculate follow-up compliance rates
  const completedAppointments = appointments.filter(a => a.status === 'completed');
  
  const followUpNeeded = completedAppointments.filter(a => a.followUpNeeded);
  const followUpScheduled = followUpNeeded.filter(a => {
    // Check if there's a follow-up appointment scheduled
    return appointments.some(fa => 
      fa.patientId === a.patientId && 
      fa.type === 'follow-up' && 
      new Date(fa.date) > new Date(a.date)
    );
  });
  
  const complianceRate = followUpNeeded.length > 0 
    ? Math.round((followUpScheduled.length / followUpNeeded.length) * 100) 
    : 0;
  
  // Calculate compliance by appointment type
  const appointmentTypes = ['initial', 'follow-up', 'routine', 'emergency'];
  const complianceByType = appointmentTypes.map(type => {
    const typeAppointments = completedAppointments.filter(a => a.type === type && a.followUpNeeded);
    const typeScheduled = typeAppointments.filter(a => {
      return appointments.some(fa => 
        fa.patientId === a.patientId && 
        fa.type === 'follow-up' && 
        new Date(fa.date) > new Date(a.date)
      );
    });
    
    const rate = typeAppointments.length > 0 
      ? Math.round((typeScheduled.length / typeAppointments.length) * 100) 
      : 0;
      
    return { type, rate };
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Follow-up Compliance</h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="relative w-40 h-40 mb-4 md:mb-0">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-cyan-600">{complianceRate}%</span>
              <span className="text-sm text-gray-500">Compliance</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#0891B2"
                strokeWidth="3"
                strokeDasharray={`${complianceRate}, 100`}
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <div className="flex-1 pl-0 md:pl-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Scheduled</span>
                </div>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {followUpScheduled.length}
                </div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Missed</span>
                </div>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {followUpNeeded.length - followUpScheduled.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Compliance by Appointment Type</h3>
          
          <div className="space-y-3">
            {complianceByType.map(item => (
              <div key={item.type} className="flex items-center">
                <div className="w-24 text-sm text-gray-600 capitalize">
                  {item.type}
                </div>
                <div className="flex-1 ml-2">
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${item.rate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">
                  {item.rate}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpCompliance;