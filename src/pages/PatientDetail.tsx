import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  ChevronLeft, 
  Edit, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  AlertCircle,
  FileText,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateUtils';

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { patients, appointments, reminders } = useAppContext();
  
  const patient = patients.find(p => p.id === id);
  
  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Patient Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find a patient with the ID: {id}</p>
        <Link 
          to="/patients" 
          className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Patients
        </Link>
      </div>
    );
  }
  
  // Get patient's appointments
  const patientAppointments = appointments
    .filter(a => a.patientId === patient.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  // Get upcoming appointments
  const upcomingAppointments = patientAppointments
    .filter(a => new Date(a.date) >= new Date() && a.status === 'scheduled');
  
  // Get past appointments
  const pastAppointments = patientAppointments
    .filter(a => new Date(a.date) < new Date() || a.status !== 'scheduled')
    .slice(0, 5);
  
  // Get patient's reminders
  const patientReminders = reminders
    .filter(r => r.patientId === patient.id)
    .sort((a, b) => new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime());
  
  // Calculate age
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  const age = calculateAge(patient.dateOfBirth);
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          to="/patients" 
          className="flex items-center mr-4 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-1">Back</span>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800 flex-1">Patient Details</h1>
        <button className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors">
          <Edit className="w-5 h-5 mr-1" />
          Edit Patient
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-xl">
                  {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {patient.firstName} {patient.lastName}
                  </h2>
                  <p className="text-gray-600">
                    {age} years old • {patient.gender}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-600">{patient.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-600">{patient.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-sm text-gray-600">{patient.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Medical Record Number</p>
                    <p className="text-sm text-gray-600">{patient.medicalRecordNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Date of Birth</p>
                    <p className="text-sm text-gray-600">
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h3 className="text-md font-medium text-gray-800 mb-2">Communication Preferences</h3>
                <div className="flex items-center p-2 bg-blue-50 rounded-md">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {patient.preferredContactMethod === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                    {patient.preferredContactMethod === 'sms' && <Phone className="w-5 h-5 text-green-600" />}
                    {patient.preferredContactMethod === 'whatsapp' && <Phone className="w-5 h-5 text-teal-600" />}
                    {patient.preferredContactMethod === 'call' && <Phone className="w-5 h-5 text-indigo-600" />}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Preferred Contact Method</p>
                    <p className="text-sm text-gray-600 capitalize">{patient.preferredContactMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Patient Notes */}
          <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Notes</h3>
            </div>
            <div className="p-6">
              {patient.notes ? (
                <p className="text-gray-700">{patient.notes}</p>
              ) : (
                <div className="text-center text-gray-500">
                  No notes available for this patient
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button className="text-cyan-600 font-medium hover:text-cyan-700">
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointments and Reminders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Upcoming Appointments</h3>
              <button className="flex items-center text-sm text-cyan-600 font-medium hover:text-cyan-700">
                <Plus className="w-4 h-4 mr-1" />
                Schedule New
              </button>
            </div>
            <div>
              {upcomingAppointments.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 bg-cyan-100 rounded-full p-2">
                            <Calendar className="h-5 w-5 text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(appointment.date)} at {formatTime(appointment.time)}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {appointment.type} appointment ({appointment.duration} minutes)
                            </p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-xs rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                            Reschedule
                          </button>
                          <button className="px-3 py-1 text-xs rounded-md bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors">
                            Send Reminder
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No upcoming appointments scheduled
                </div>
              )}
            </div>
          </div>
          
          {/* Past Appointments */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Past Appointments</h3>
            </div>
            <div>
              {pastAppointments.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {pastAppointments.map(appointment => {
                    let statusIcon;
                    let statusClass;
                    
                    switch (appointment.status) {
                      case 'completed':
                        statusIcon = <CheckCircle className="h-4 w-4 text-green-500" />;
                        statusClass = 'bg-green-100 text-green-800';
                        break;
                      case 'cancelled':
                        statusIcon = <AlertCircle className="h-4 w-4 text-red-500" />;
                        statusClass = 'bg-red-100 text-red-800';
                        break;
                      case 'no-show':
                        statusIcon = <AlertCircle className="h-4 w-4 text-amber-500" />;
                        statusClass = 'bg-amber-100 text-amber-800';
                        break;
                      default:
                        statusIcon = <Clock className="h-4 w-4 text-gray-500" />;
                        statusClass = 'bg-gray-100 text-gray-800';
                    }
                    
                    return (
                      <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                              <Calendar className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {formatDate(appointment.date)} at {formatTime(appointment.time)}
                              </p>
                              <div className="flex items-center mt-1">
                                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass} mr-2`}>
                                  <span className="flex items-center">
                                    {statusIcon}
                                    <span className="ml-1 capitalize">{appointment.status}</span>
                                  </span>
                                </span>
                                <span className="text-xs text-gray-500 capitalize">
                                  {appointment.type} appointment
                                </span>
                              </div>
                              {appointment.notes && (
                                <p className="text-sm text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            {appointment.followUpNeeded && (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Follow-up required
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No past appointments found
                </div>
              )}
              {patientAppointments.length > 5 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700">
                    View all appointments →
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Reminders */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Reminders</h3>
            </div>
            <div>
              {patientReminders.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {patientReminders.slice(0, 3).map(reminder => {
                    const isSent = reminder.sent;
                    const isOverdue = !reminder.sent && new Date(reminder.scheduledFor) < new Date();
                    
                    return (
                      <div key={reminder.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 rounded-full p-2 ${
                              isSent ? 'bg-green-100' : isOverdue ? 'bg-red-100' : 'bg-cyan-100'
                            }`}>
                              <Bell className={`h-5 w-5 ${
                                isSent ? 'text-green-600' : isOverdue ? 'text-red-600' : 'text-cyan-600'
                              }`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {reminder.type === 'appointment' ? 'Appointment Reminder' : 'Follow-up Reminder'}
                              </p>
                              <p className="text-sm text-gray-500">
                                Scheduled for {formatDate(reminder.scheduledFor)}
                              </p>
                              <p className="text-sm text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                                {reminder.message}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {isSent ? (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Sent
                              </span>
                            ) : isOverdue ? (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Overdue
                              </span>
                            ) : (
                              <button className="px-3 py-1 text-xs rounded-md bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors">
                                Send Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No reminders for this patient
                </div>
              )}
              {patientReminders.length > 3 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700">
                    View all reminders →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;