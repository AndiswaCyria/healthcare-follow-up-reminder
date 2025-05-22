import { Patient, Appointment, Provider } from '../types';
import { addDays, addHours } from '../utils/dateUtils';

// Mock Providers
export const mockProviders: Provider[] = [
  {
    id: 'prov-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'dr.smith@healthclinic.com',
    phone: '555-123-4567',
    specialty: 'Cardiology',
    department: 'Cardiology',
    role: 'doctor',
    notificationPreferences: {
      missedAppointments: true,
      followUpReminders: true,
      patientConfirmations: true
    }
  },
  {
    id: 'prov-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'dr.johnson@healthclinic.com',
    phone: '555-765-4321',
    specialty: 'Pediatrics',
    department: 'Pediatrics',
    role: 'doctor',
    notificationPreferences: {
      missedAppointments: true,
      followUpReminders: true,
      patientConfirmations: false
    }
  },
  {
    id: 'prov-3',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'nurse.chen@healthclinic.com',
    phone: '555-987-6543',
    specialty: 'General',
    role: 'nurse',
    notificationPreferences: {
      missedAppointments: true,
      followUpReminders: true,
      patientConfirmations: true
    }
  }
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'pat-1',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    phone: '555-111-2222',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    address: '123 Main St, Anytown, USA',
    medicalRecordNumber: 'MRN10001',
    preferredContactMethod: 'email',
    notes: 'Patient has history of hypertension.',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-08-21')
  },
  {
    id: 'pat-2',
    firstName: 'Jennifer',
    lastName: 'Davis',
    email: 'jennifer.davis@example.com',
    phone: '555-333-4444',
    dateOfBirth: '1992-09-22',
    gender: 'female',
    address: '456 Oak Ave, Somewhere, USA',
    medicalRecordNumber: 'MRN10002',
    preferredContactMethod: 'sms',
    notes: 'Allergic to penicillin.',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-09-05')
  },
  {
    id: 'pat-3',
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.wilson@example.com',
    phone: '555-555-6666',
    dateOfBirth: '1975-03-18',
    gender: 'male',
    address: '789 Pine Rd, Elsewhere, USA',
    medicalRecordNumber: 'MRN10003',
    preferredContactMethod: 'whatsapp',
    notes: 'Diabetic, requires regular follow-ups.',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-08-30')
  },
  {
    id: 'pat-4',
    firstName: 'Elizabeth',
    lastName: 'Taylor',
    email: 'elizabeth.taylor@example.com',
    phone: '555-777-8888',
    dateOfBirth: '1988-11-30',
    gender: 'female',
    address: '101 Cedar St, Nowhereville, USA',
    medicalRecordNumber: 'MRN10004',
    preferredContactMethod: 'call',
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-09-10')
  },
  {
    id: 'pat-5',
    firstName: 'William',
    lastName: 'Jones',
    email: 'william.jones@example.com',
    phone: '555-999-0000',
    dateOfBirth: '1965-07-05',
    gender: 'male',
    address: '202 Elm Blvd, Anystate, USA',
    medicalRecordNumber: 'MRN10005',
    preferredContactMethod: 'email',
    notes: 'Heart condition, monthly check-ups required.',
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-09-15')
  }
];

// Create appointments for the next 2 weeks
const now = new Date();
export const mockAppointments: Appointment[] = [
  {
    id: 'appt-1',
    patientId: 'pat-1',
    providerId: 'prov-1',
    date: addDays(now, 2),
    time: '09:00',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Blood pressure check',
    followUpNeeded: true,
    followUpTimeframe: 30,
    createdAt: addDays(now, -10),
    updatedAt: addDays(now, -10)
  },
  {
    id: 'appt-2',
    patientId: 'pat-2',
    providerId: 'prov-2',
    date: addDays(now, 3),
    time: '14:30',
    duration: 45,
    type: 'initial',
    status: 'scheduled',
    notes: 'New patient consultation',
    followUpNeeded: true,
    followUpTimeframe: 14,
    createdAt: addDays(now, -7),
    updatedAt: addDays(now, -7)
  },
  {
    id: 'appt-3',
    patientId: 'pat-3',
    providerId: 'prov-1',
    date: addDays(now, 1),
    time: '11:15',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Diabetes management check',
    followUpNeeded: true,
    followUpTimeframe: 90,
    createdAt: addDays(now, -14),
    updatedAt: addDays(now, -14)
  },
  {
    id: 'appt-4',
    patientId: 'pat-4',
    providerId: 'prov-2',
    date: addDays(now, 5),
    time: '15:00',
    duration: 60,
    type: 'routine',
    status: 'scheduled',
    followUpNeeded: false,
    createdAt: addDays(now, -5),
    updatedAt: addDays(now, -5)
  },
  {
    id: 'appt-5',
    patientId: 'pat-5',
    providerId: 'prov-1',
    date: addDays(now, 4),
    time: '10:45',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Monthly heart check-up',
    followUpNeeded: true,
    followUpTimeframe: 30,
    createdAt: addDays(now, -8),
    updatedAt: addDays(now, -8)
  },
  {
    id: 'appt-6',
    patientId: 'pat-1',
    providerId: 'prov-1',
    date: addDays(now, -5),
    time: '13:30',
    duration: 30,
    type: 'follow-up',
    status: 'completed',
    notes: 'Patient responded well to medication',
    followUpNeeded: true,
    followUpTimeframe: 60,
    createdAt: addDays(now, -20),
    updatedAt: addDays(now, -5)
  },
  {
    id: 'appt-7',
    patientId: 'pat-3',
    providerId: 'prov-1',
    date: addDays(now, -2),
    time: '09:15',
    duration: 45,
    type: 'emergency',
    status: 'completed',
    notes: 'Blood sugar spike, adjusted insulin dosage',
    followUpNeeded: true,
    followUpTimeframe: 7,
    createdAt: addDays(now, -2),
    updatedAt: addDays(now, -2)
  },
  {
    id: 'appt-8',
    patientId: 'pat-2',
    providerId: 'prov-3',
    date: addDays(now, 7),
    time: '11:00',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    followUpNeeded: false,
    createdAt: addDays(now, -3),
    updatedAt: addDays(now, -3)
  },
  {
    id: 'appt-9',
    patientId: 'pat-5',
    providerId: 'prov-1',
    date: addDays(now, 10),
    time: '14:00',
    duration: 45,
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Cardiac stress test',
    followUpNeeded: true,
    followUpTimeframe: 30,
    createdAt: addDays(now, -6),
    updatedAt: addDays(now, -6)
  },
  {
    id: 'appt-10',
    patientId: 'pat-4',
    providerId: 'prov-2',
    date: addDays(now, -10),
    time: '16:30',
    duration: 30,
    type: 'initial',
    status: 'no-show',
    followUpNeeded: true,
    followUpTimeframe: 14,
    createdAt: addDays(now, -25),
    updatedAt: addDays(now, -10)
  }
];