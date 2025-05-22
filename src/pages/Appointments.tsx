import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Search, 
  Plus, 
  Filter, 
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronDown
} from 'lucide-react';
import { formatDate, formatTime, isToday, isTomorrow } from '../utils/dateUtils';

const Appointments: React.FC = () => {
  const { appointments, patients } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('upcoming'); // 'upcoming', 'past', 'all'
  
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'no-show':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default:
        return <Clock className="w-5 h-5 text-cyan-500" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-cyan-100 text-cyan-800';
    }
  };
  
  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter(appointment => {
      // Filter by search term
      const patientName = getPatientName(appointment.patientId).toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const dateMatch = formatDate(appointment.date).toLowerCase().includes(searchLower);
      const typeMatch = appointment.type.toLowerCase().includes(searchLower);
      const nameMatch = patientName.includes(searchLower);
      
      const matchesSearch = !searchTerm || nameMatch || dateMatch || typeMatch;
      
      // Filter by status
      const now = new Date();
      const isUpcoming = new Date(appointment.date) >= now && appointment.status === 'scheduled';
      const isPast = new Date(appointment.date) < now || appointment.status !== 'scheduled';
      
      if (filter === 'upcoming') return matchesSearch && isUpcoming;
      if (filter === 'past') return matchesSearch && isPast;
      return matchesSearch; // 'all' filter
    })
    .sort((a, b) => {
      // Sort by date, with upcoming appointments first
      return a.date.getTime() - b.date.getTime();
    });
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        <button className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors">
          <Plus className="w-5 h-5 mr-1" />
          New Appointment
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
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            className={`flex items-center px-3 py-2 border rounded-md text-sm ${
              filter === 'upcoming' 
                ? 'bg-cyan-50 text-cyan-700 border-cyan-200' 
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
            onClick={() => setFilter('upcoming')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Upcoming
          </button>
          <button 
            className={`flex items-center px-3 py-2 border rounded-md text-sm ${
              filter === 'past' 
                ? 'bg-cyan-50 text-cyan-700 border-cyan-200' 
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
            onClick={() => setFilter('past')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Past
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
      
      {/* Appointments list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Follow-up
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patientId);
                const dateLabel = isToday(appointment.date) 
                  ? 'Today' 
                  : isTomorrow(appointment.date) 
                    ? 'Tomorrow' 
                    : formatDate(appointment.date);
                
                return (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          isToday(appointment.date) ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{dateLabel}</div>
                          <div className="text-sm text-gray-500">{formatTime(appointment.time)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-xs">
                          {patient ? patient.firstName.charAt(0) + patient.lastName.charAt(0) : 'UN'}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {getPatientName(appointment.patientId)}
                          </div>
                          {patient && (
                            <div className="text-xs text-gray-500">
                              {patient.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{appointment.type}</div>
                      <div className="text-xs text-gray-500">{appointment.duration} minutes</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(appointment.status)}`}>
                        <span className="flex items-center">
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.followUpNeeded ? (
                        <div className="text-sm">
                          <span className="text-amber-600 font-medium">Required</span>
                          {appointment.followUpTimeframe && (
                            <span className="text-gray-500 ml-1">
                              (in {appointment.followUpTimeframe} days)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not required</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100">
                          <Calendar className="w-5 h-5" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100">
                          <User className="w-5 h-5" />
                        </button>
                        <button className="text-cyan-600 hover:text-cyan-900 p-1 rounded-full hover:bg-gray-100">
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
        
        {filteredAppointments.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-500 mb-2">No appointments found</div>
            <p className="text-gray-400 text-sm">
              {filter === 'upcoming' 
                ? 'No upcoming appointments scheduled'
                : filter === 'past'
                  ? 'No past appointments found'
                  : 'Try a different search term or create a new appointment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;