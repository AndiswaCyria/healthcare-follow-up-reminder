import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Phone, 
  Shield, 
  Clock, 
  AlertCircle,
  Save
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'templates', label: 'Message Templates', icon: MessageSquare },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-6 py-4 text-sm font-medium focus:outline-none ${
                  activeTab === tab.id
                    ? 'border-b-2 border-cyan-500 text-cyan-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center">
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </div>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter clinic name"
                    defaultValue="HealthCare Clinic"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter clinic address"
                    defaultValue="123 Medical Ave, Healthcare City"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter clinic phone"
                    defaultValue="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter clinic email"
                    defaultValue="info@healthcareclinic.com"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-md font-medium text-gray-800 mb-4">Appointment Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Appointment Duration
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500">
                      <option value="15">15 minutes</option>
                      <option value="30" selected>30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Hours Start
                    </label>
                    <input
                      type="time"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      defaultValue="09:00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Hours End
                    </label>
                    <input
                      type="time"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      defaultValue="17:00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lunch Break
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        defaultValue="12:00"
                      />
                      <span className="flex items-center">to</span>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        defaultValue="13:00"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">
                  <div className="flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </div>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Notification Settings</h2>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-700">Reminder Timing</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Send appointment reminders</span>
                      <select className="p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500">
                        <option value="1" selected>1 day before</option>
                        <option value="2">2 days before</option>
                        <option value="3">3 days before</option>
                        <option value="7">1 week before</option>
                      </select>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Send follow-up reminders</span>
                      <select className="p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500">
                        <option value="3">3 days before due</option>
                        <option value="5">5 days before due</option>
                        <option value="7" selected>1 week before due</option>
                        <option value="14">2 weeks before due</option>
                      </select>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Send missed appointment notifications</span>
                      <select className="p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500">
                        <option value="0" selected>Immediately</option>
                        <option value="1">1 day after</option>
                        <option value="2">2 days after</option>
                        <option value="3">3 days after</option>
                      </select>
                    </label>
                  </div>
                </div>
                
                <h3 className="text-md font-medium text-gray-700 mt-6">Communication Channels</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" checked />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                      <Mail className="w-4 h-4 text-blue-500 ml-1" />
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Send reminders and notifications via email
                    </p>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" checked />
                      <span className="text-sm font-medium text-gray-700">SMS</span>
                      <MessageSquare className="w-4 h-4 text-green-500 ml-1" />
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Send reminders and notifications via SMS
                    </p>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" />
                      <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                      <MessageSquare className="w-4 h-4 text-teal-500 ml-1" />
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Send reminders and notifications via WhatsApp
                    </p>
                    <div className="ml-6 mt-2 p-2 bg-amber-50 text-amber-800 text-xs rounded border border-amber-200 flex items-start">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                      <span>WhatsApp integration requires business account setup. <a href="#" className="underline font-medium">Configure integration</a></span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" />
                      <span className="text-sm font-medium text-gray-700">Phone Call</span>
                      <Phone className="w-4 h-4 text-indigo-500 ml-1" />
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Send automated voice reminders
                    </p>
                    <div className="ml-6 mt-2 p-2 bg-amber-50 text-amber-800 text-xs rounded border border-amber-200 flex items-start">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                      <span>Voice call integration requires additional setup. <a href="#" className="underline font-medium">Configure integration</a></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">
                  <div className="flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Notification Settings
                  </div>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Message Templates</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">Appointment Reminder Templates</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Template
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 h-32"
                      defaultValue={`Dear {patientName},

This is a reminder that you have an appointment with Dr. {doctorName} at {appointmentTime} on {appointmentDate}.

Please arrive 15 minutes early to complete any necessary paperwork.

If you need to reschedule, please call us at (555) 123-4567.

Best regards,
HealthCare Clinic Team`}
                    ></textarea>
                    <div className="mt-1 text-xs text-gray-500">
                      Available variables: {'{patientName}'}, {'{doctorName}'}, {'{appointmentDate}'}, {'{appointmentTime}'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS Template
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 h-24"
                      defaultValue={`Reminder: You have an appointment with Dr. {doctorName} tomorrow at {appointmentTime}. Please call (555) 123-4567 if you need to reschedule.`}
                    ></textarea>
                    <div className="mt-1 text-xs text-gray-500">
                      Available variables: {'{patientName}'}, {'{doctorName}'}, {'{appointmentDate}'}, {'{appointmentTime}'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">Follow-up Reminder Templates</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Template
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 h-32"
                      defaultValue={`Dear {patientName},

This is a reminder that you're due for a follow-up appointment with Dr. {doctorName}. According to our records, your follow-up should be scheduled by {followUpDate}.

Please call us at (555) 123-4567 to schedule your appointment.

Best regards,
HealthCare Clinic Team`}
                    ></textarea>
                    <div className="mt-1 text-xs text-gray-500">
                      Available variables: {'{patientName}'}, {'{doctorName}'}, {'{followUpDate}'}, {'{lastAppointmentDate}'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS Template
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 h-24"
                      defaultValue={`{patientName}, it's time to schedule your follow-up with Dr. {doctorName}. Please call (555) 123-4567 to schedule before {followUpDate}.`}
                    ></textarea>
                    <div className="mt-1 text-xs text-gray-500">
                      Available variables: {'{patientName}'}, {'{doctorName}'}, {'{followUpDate}'}, {'{lastAppointmentDate}'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">
                  <div className="flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Templates
                  </div>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Security Settings</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">API Integrations</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS Provider API Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-cyan-500 focus:border-cyan-500"
                        value="••••••••••••••••••••"
                        readOnly
                      />
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors">
                        Show
                      </button>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Last updated: 3 months ago
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Service API Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-cyan-500 focus:border-cyan-500"
                        value="••••••••••••••••••••"
                        readOnly
                      />
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors">
                        Show
                      </button>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Last updated: 1 month ago
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">Data Protection</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" checked />
                      <span className="text-sm font-medium text-gray-700">Encrypt patient data</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      All patient data will be encrypted at rest
                    </p>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" checked />
                      <span className="text-sm font-medium text-gray-700">Enable audit logging</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Track all user actions in the system
                    </p>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" checked />
                      <span className="text-sm font-medium text-gray-700">Require two-factor authentication</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      All users must use 2FA to access the system
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">
                  <div className="flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Security Settings
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;