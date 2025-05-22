import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, Appointment, Reminder } from '../types';
import { mockPatients, mockAppointments } from '../data/mockData';
import { generateReminders } from '../utils/reminderUtils';

interface AppContextType {
  patients: Patient[];
  appointments: Appointment[];
  reminders: Reminder[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Patient) => void;
  deletePatient: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  markReminderSent: (id: string) => void;
  updateMissedAppointments: (patientId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Generate reminders when appointments or patients change
  useEffect(() => {
    const generatedReminders = generateReminders(appointments, patients);
    setReminders(generatedReminders);
  }, [appointments, patients]);

  const addPatient = (patient: Patient) => {
    setPatients([...patients, { ...patient, missedAppointments: 0 }]);
  };

  const updatePatient = (id: string, updatedPatient: Patient) => {
    setPatients(patients.map(patient => patient.id === id ? updatedPatient : patient));
  };

  const deletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
    setAppointments(appointments.filter(appointment => appointment.patientId !== id));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (id: string, updatedAppointment: Appointment) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? updatedAppointment : appointment
    ));

    // If status changed to no-show, update missed appointments count
    if (updatedAppointment.status === 'no-show') {
      updateMissedAppointments(updatedAppointment.patientId);
    }
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const markReminderSent = (id: string) => {
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        // If it's an emergency contact reminder, update the patient's lastNotified date
        if (reminder.type === 'emergency-contact') {
          const patient = patients.find(p => p.id === reminder.patientId);
          if (patient) {
            updatePatient(patient.id, {
              ...patient,
              emergencyContact: {
                ...patient.emergencyContact,
                lastNotified: new Date()
              }
            });
          }
        }
        return { ...reminder, sent: true, sentAt: new Date() };
      }
      return reminder;
    }));
  };

  const updateMissedAppointments = (patientId: string) => {
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          missedAppointments: (patient.missedAppointments || 0) + 1
        };
      }
      return patient;
    }));
  };

  return (
    <AppContext.Provider value={{
      patients,
      appointments,
      reminders,
      addPatient,
      updatePatient,
      deletePatient,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      markReminderSent,
      updateMissedAppointments
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};