import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Search, 
  Plus, 
  Filter, 
  RefreshCcw, 
  ChevronDown, 
  Edit,
  Trash,
  FileText,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Patients: React.FC = () => {
  const { patients } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return fullName.includes(searchLower) || 
           patient.email.toLowerCase().includes(searchLower) ||
           patient.phone.includes(searchTerm) ||
           patient.medicalRecordNumber.toLowerCase().includes(searchLower);
  });

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case 'email': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'sms': return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4 text-teal-500" />;
      case 'call': return <Phone className="w-4 h-4 text-indigo-500" />;
      default: return <Mail className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
        <button 
          className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
          onClick={() => setShowAddPatientModal(true)}
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Patient
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
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Patients table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical Record
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferred Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
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
                          {new Date(patient.dateOfBirth).toLocaleDateString()} • {patient.gender}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.phone}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.medicalRecordNumber}</div>
                    {patient.notes && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {patient.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      {getContactMethodIcon(patient.preferredContactMethod)}
                      <span className="ml-1 capitalize">{patient.preferredContactMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        to={`/patients/${patient.id}`}
                        className="text-cyan-600 hover:text-cyan-900 p-1 rounded-full hover:bg-gray-100"
                      >
                        <FileText className="w-5 h-5" />
                      </Link>
                      <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100">
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-500 mb-2">No patients found</div>
            <p className="text-gray-400 text-sm">Try a different search term or add a new patient</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;