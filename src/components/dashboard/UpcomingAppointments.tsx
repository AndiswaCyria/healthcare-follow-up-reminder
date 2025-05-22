import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Calendar, Clock, User } from 'lucide-react';
import { formatDate, formatTime, isToday, isTomorrow } from '../../utils/dateUtils';

const UpcomingAppointments: React.FC = () => {
  const { appointments, patients } = useAppContext();
  
  // Get appointments scheduled for today and the future, sorted by date
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date() && apt.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);
  
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };
  
  const getAppointmentDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return formatDate(date);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Upcoming Appointments</h2>
      </div>
      {upcomingAppointments.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No upcoming appointments scheduled
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-cyan-100 rounded-full p-2">
                    <User className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {getPatientName(appointment.patientId)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)} appointment
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{getAppointmentDateLabel(appointment.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{formatTime(appointment.time)}</span>
                  </div>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                  {appointment.notes}
                </div>
              )}
              
              <div className="mt-2 flex justify-end space-x-2">
                <button className="px-3 py-1 text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                  Reschedule
                </button>
                <button className="px-3 py-1 text-xs rounded-md bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors">
                  Send Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <a 
          href="/appointments" 
          className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
        >
          View all appointments →
        </a>
      </div>
    </div>
  );
};

export default UpcomingAppointments;