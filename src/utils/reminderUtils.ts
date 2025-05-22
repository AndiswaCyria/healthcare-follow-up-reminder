import { Appointment, Reminder, Patient } from '../types';
import { addDays } from './dateUtils';

export const generateReminders = (appointments: Appointment[], patients: Patient[]): Reminder[] => {
  const reminders: Reminder[] = [];
  
  appointments.forEach(appointment => {
    // Skip appointments that are already completed or cancelled
    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      return;
    }
    
    // Generate appointment reminder (1 day before)
    const appointmentDate = new Date(appointment.date);
    const reminderDate = addDays(appointmentDate, -1);
    
    // Skip if reminder date is in the past
    if (reminderDate > new Date()) {
      reminders.push({
        id: `rem-apt-${appointment.id}`,
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        type: 'appointment',
        method: 'email',
        scheduledFor: reminderDate,
        message: `Reminder: You have an appointment tomorrow at ${appointment.time}`,
        sent: false,
        createdAt: new Date()
      });
    }
    
    // Generate follow-up reminder if needed
    if (appointment.status === 'completed' && appointment.followUpNeeded && appointment.followUpTimeframe) {
      const followUpDate = addDays(appointmentDate, appointment.followUpTimeframe);
      const followUpReminderDate = addDays(followUpDate, -7);
      
      if (followUpReminderDate > new Date()) {
        reminders.push({
          id: `rem-fup-${appointment.id}`,
          appointmentId: appointment.id,
          patientId: appointment.patientId,
          type: 'follow-up',
          method: 'email',
          scheduledFor: followUpReminderDate,
          message: `It's time to schedule your follow-up appointment for ${followUpDate.toLocaleDateString()}`,
          sent: false,
          createdAt: new Date()
        });
      }
    }

    // Generate emergency contact notification for missed appointments
    if (appointment.status === 'no-show' && !appointment.emergencyContactNotified) {
      const patient = patients.find(p => p.id === appointment.patientId);
      if (patient && patient.missedAppointments >= 2) {
        const lastNotified = patient.emergencyContact.lastNotified;
        const shouldNotify = !lastNotified || 
          (new Date().getTime() - lastNotified.getTime()) > (30 * 24 * 60 * 60 * 1000); // 30 days

        if (shouldNotify) {
          reminders.push({
            id: `rem-emg-${appointment.id}`,
            appointmentId: appointment.id,
            patientId: appointment.patientId,
            type: 'emergency-contact',
            method: 'call', // Default to call for emergency contacts
            scheduledFor: new Date(), // Immediate notification
            message: `Your family member ${patient.firstName} ${patient.lastName} has missed multiple appointments. Please help ensure they receive necessary medical care.`,
            sent: false,
            createdAt: new Date()
          });
        }
      }
    }
  });
  
  return reminders;
};

export const getRemindersByPatient = (reminders: Reminder[], patientId: string): Reminder[] => {
  return reminders.filter(reminder => reminder.patientId === patientId);
};

export const getPendingReminders = (reminders: Reminder[]): Reminder[] => {
  return reminders.filter(reminder => !reminder.sent);
};

export const getSentReminders = (reminders: Reminder[]): Reminder[] => {
  return reminders.filter(reminder => reminder.sent);
};

export const getUpcomingReminders = (reminders: Reminder[], days: number = 7): Reminder[] => {
  const cutoffDate = addDays(new Date(), days);
  return reminders.filter(
    reminder => !reminder.sent && 
    new Date(reminder.scheduledFor) <= cutoffDate
  );
};

export const getDueReminders = (reminders: Reminder[]): Reminder[] => {
  const now = new Date();
  return reminders.filter(
    reminder => !reminder.sent && 
    new Date(reminder.scheduledFor) <= now
  );
};