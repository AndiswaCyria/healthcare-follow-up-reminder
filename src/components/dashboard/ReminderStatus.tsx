import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

const ReminderStatus: React.FC = () => {
  const { reminders, patients } = useAppContext();
  
  // Get pending reminders, sorted by scheduled date
  const pendingReminders = reminders
    .filter(rem => !rem.sent)
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    .slice(0, 5);
  
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };
  
  const getReminderStatusClass = (scheduledFor: Date) => {
    const now = new Date();
    const reminderDate = new Date(scheduledFor);
    
    if (reminderDate < now) {
      return {
        icon: <AlertCircle className="h-5 w-5 text-red-600" />,
        bg: 'bg-red-100',
        text: 'Overdue'
      };
    }
    
    const daysDiff = Math.ceil((reminderDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      return {
        icon: <Clock className="h-5 w-5 text-amber-600" />,
        bg: 'bg-amber-100',
        text: 'Due Today'
      };
    }
    
    return {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      bg: 'bg-green-100',
      text: `In ${daysDiff} days`
    };
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Pending Reminders</h2>
      </div>
      {pendingReminders.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No pending reminders
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {pendingReminders.map(reminder => {
            const status = getReminderStatusClass(reminder.scheduledFor);
            
            return (
              <div key={reminder.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 rounded-full p-2 ${status.bg}`}>
                      <Bell className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getPatientName(reminder.patientId)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {reminder.type === 'appointment' ? 'Appointment Reminder' : 'Follow-up Reminder'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Scheduled for {formatDate(reminder.scheduledFor)}</span>
                    </div>
                    <div className="flex items-center justify-end text-sm mt-1">
                      {status.icon}
                      <span className="ml-1">{status.text}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                  {reminder.message}
                </div>
                
                <div className="mt-2 flex justify-end space-x-2">
                  <button className="px-3 py-1 text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs rounded-md bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors">
                    Send Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <a 
          href="/reminders" 
          className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
        >
          View all reminders →
        </a>
      </div>
    </div>
  );
};

export default ReminderStatus;