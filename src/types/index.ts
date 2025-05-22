export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  medicalRecordNumber: string;
  preferredContactMethod: 'email' | 'sms' | 'whatsapp' | 'call';
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies?: string;
  medications?: string;
  chronicConditions?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
    lastNotified?: Date;
  };
  missedAppointments: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  date: Date;
  time: string;
  duration: number;
  type: 'initial' | 'follow-up' | 'emergency' | 'routine';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  followUpNeeded: boolean;
  followUpTimeframe?: number;
  emergencyContactNotified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reminder {
  id: string;
  appointmentId: string;
  patientId: string;
  type: 'appointment' | 'follow-up' | 'emergency-contact';
  method: 'email' | 'sms' | 'whatsapp' | 'call';
  scheduledFor: Date;
  message: string;
  sent: boolean;
  sentAt?: Date;
  deliveryStatus?: 'delivered' | 'failed' | 'pending';
  createdAt: Date;
}

export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  department?: string;
  role: 'doctor' | 'nurse' | 'assistant' | 'admin';
  notificationPreferences: {
    missedAppointments: boolean;
    followUpReminders: boolean;
    patientConfirmations: boolean;
  };
}

export type ContactMethod = 'email' | 'sms' | 'whatsapp' | 'call';

export interface ReminderTemplate {
  id: string;
  name: string;
  type: 'appointment' | 'follow-up' | 'emergency-contact';
  method: ContactMethod;
  subject?: string;
  body: string;
  variables: string[];
  createdAt: Date;
  updatedAt: Date;
}