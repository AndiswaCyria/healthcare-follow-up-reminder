import React from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Calendar, 
  Users, 
  AlertCircle, 
  Check, 
  Clock, 
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import UpcomingAppointments from '../components/dashboard/UpcomingAppointments';
import ReminderStatus from '../components/dashboard/ReminderStatus';
import FollowUpCompliance from '../components/dashboard/FollowUpCompliance';
import PatientStats from '../components/dashboard/PatientStats';

const Dashboard: React.FC = () => {
  const { patients, appointments, reminders } = useAppContext();
  
  // Calculate stats
  const todayAppointments = appointments.filter(
    app => formatDate(app.date) === formatDate(new Date())
  );
  
  const pendingReminders = reminders.filter(
    rem => !rem.sent && new Date(rem.scheduledFor) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  
  const missedAppointments = appointments.filter(
    app => app.status === 'no-show'
  );

  const recentPatients = [...patients]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div 
      className="space-y-6"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="backdrop-blur-sm bg-white/30 min-h-screen p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="text-sm text-gray-500 bg-white/80 px-4 py-2 rounded-lg">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-5 border-l-4 border-cyan-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-semibold text-gray-800">{todayAppointments.length}</p>
              </div>
              <div className="bg-cyan-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-5 border-l-4 border-indigo-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-2xl font-semibold text-gray-800">{patients.length}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-5 border-l-4 border-amber-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Reminders</p>
                <p className="text-2xl font-semibold text-gray-800">{pendingReminders.length}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-5 border-l-4 border-red-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Missed Appointments</p>
                <p className="text-2xl font-semibold text-gray-800">{missedAppointments.length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow">
            <UpcomingAppointments />
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow">
            <ReminderStatus />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow">
            <FollowUpCompliance />
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow">
            <PatientStats />
          </div>
        </div>

        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Recent Patients</h2>
            <a href="/patients" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Appointment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Follow-up Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPatients.map((patient) => {
                  const patientAppointments = appointments.filter(a => a.patientId === patient.id);
                  const lastAppointment = patientAppointments.length > 0 
                    ? patientAppointments.sort((a, b) => b.date.getTime() - a.date.getTime())[0]
                    : null;
                  
                  const needsFollowUp = lastAppointment && lastAppointment.followUpNeeded;
                  
                  return (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                            {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.firstName} {patient.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              MRN: {patient.medicalRecordNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.phone}</div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lastAppointment ? (
                          <div>
                            <div className="text-sm text-gray-900">
                              {formatDate(lastAppointment.date)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {lastAppointment.status}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No appointments</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {needsFollowUp ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Follow-up needed
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            No follow-up needed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;