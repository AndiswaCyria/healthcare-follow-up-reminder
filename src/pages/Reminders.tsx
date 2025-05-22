import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Search, 
  Plus, 
  Filter, 
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const Reminders: React.FC = () => {
  const { reminders, patients, appointments } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('pending'); // 'pending', 'sent', 'all'
  
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };
  
  const getAppointmentDetails = (appointmentId: string) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (!appointment) return 'Unknown Appointment';
    
    return `${formatDate(appointment.date)} at ${appointment.time}`;
  };
  
  const getReminderStatus = (reminder: any) => {
    const now = new Date();
    const scheduledDate = new Date(reminder.scheduledFor);
    
    if (reminder.sent) {
      return {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        label: 'Sent',
        className: 'bg-green-100 text-green-800'
      };
    }
    
    if (scheduledDate < now) {
      return {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        label: 'Overdue',
        className: 'bg-red-100 text-red-800'
      };
    }
    
    const diffTime = scheduledDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      return {
        icon: <Clock className="w-5 h-5 text-amber-500" />,
        label: 'Due soon',
        className: 'bg-amber-100 text-amber-800'
      };
    }
    
    return {
      icon: <Calendar className="w-5 h-5 text-cyan-500" />,
      label: 'Scheduled',
      className: 'bg-cyan-100 text-cyan-800'
    };
  };
  
  // Filter and sort reminders
  const filteredReminders = reminders
    .filter(reminder => {
      // Filter by search term
      const patientName = getPatientName(reminder.patientId).toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const typeMatch = reminder.type.toLowerCase().includes(searchLower);
      const methodMatch = reminder.method.toLowerCase().includes(searchLower);
      const nameMatch = patientName.includes(searchLower);
      
      const matchesSearch = !searchTerm || nameMatch || typeMatch || methodMatch;
      
      // Filter by status
      if (filter === 'pending') return matchesSearch && !reminder.sent;
      if (filter === 'sent') return matchesSearch && reminder.sent;
      return matchesSearch; // 'all' filter
    })
    .sort((a, b) => {
      // Sort by scheduled date
      return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime();
    });
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Reminders</h1>
        <button className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors">
          <Plus className="w-5 h-5 mr-1" />
          New Reminder
        </button>
      </div>
      
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative w-full md:w-96 mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Search reminders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            className={`flex items-center px-3 py-2 border rounded-md text-sm ${
              filter === 'pending' 
                ? 'bg-cyan-50 text-cyan-700 border-cyan-200' 
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
            onClick={() => setFilter('pending')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Pending
          </button>
          <button 
            className={`flex items-center px-3 py-2 border rounded-md text-sm ${
              filter === 'sent' 
                ? 'bg-cyan-50 text-cyan-700 border-cyan-200' 
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
            onClick={() => setFilter('sent')}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Sent
          </button>
          <button 
            className={`flex items-center px-3 py-2 border rounded-md text-sm ${
              filter === 'all' 
                ? 'bg-cyan-50 text-cyan-700 border-cyan-200' 
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
            onClick={() => setFilter('all')}
          >
            <Filter className="h-4 w-4 mr-2" />
            All
          </button>
        </div>
      </div>
      
      {/* Reminders list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled For
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReminders.map((reminder) => {
                const patient = patients.find(p => p.id === reminder.patientId);
                const status = getReminderStatus(reminder);
                
                return (
                  <tr key={reminder.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-xs">
                          {patient ? patient.firstName.charAt(0) + patient.lastName.charAt(0) : 'UN'}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {getPatientName(reminder.patientId)}
                          </div>
                          {patient && (
                            <div className="text-xs text-gray-500">
                              {patient.preferredContactMethod}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {reminder.type === 'appointment' ? 'Appointment' : 'Follow-up'}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        via {reminder.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(reminder.scheduledFor)}
                      </div>
                      {reminder.appointmentId && (
                        <div className="text-xs text-gray-500">
                          For: {getAppointmentDetails(reminder.appointmentId)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}>
                        <span className="flex items-center">
                          {status.icon}
                          <span className="ml-1">{status.label}</span>
                        </span>
                      </span>
                      {reminder.sent && reminder.sentAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          Sent on {formatDate(reminder.sentAt)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {reminder.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {!reminder.sent && (
                          <button className="text-cyan-600 hover:text-cyan-900 p-1 rounded-full hover:bg-gray-100">
                            <Bell className="w-5 h-5" />
                          </button>
                        )}
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100">
                          <Calendar className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100">
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredReminders.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-500 mb-2">No reminders found</div>
            <p className="text-gray-400 text-sm">
              {filter === 'pending' 
                ? 'No pending reminders'
                : filter === 'sent'
                  ? 'No sent reminders'
                  : 'Try a different search term or create a new reminder'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;