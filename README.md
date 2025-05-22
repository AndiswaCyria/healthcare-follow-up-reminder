# Healthcare Follow-Up Reminder System

A comprehensive web application for managing patient follow-ups and appointment reminders in healthcare settings.

![Dashboard Preview](https://images.pexels.com/photos/7089629/pexels-photo-7089629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- **Patient Management**
  - Detailed patient profiles
  - Medical history tracking
  - Emergency contact information
  - Contact method preferences

- **Appointment Tracking**
  - Schedule and manage appointments
  - Multiple appointment types (initial, follow-up, routine, emergency)
  - Appointment status tracking
  - Follow-up scheduling

- **Smart Reminders**
  - Automated reminder generation
  - Multi-channel notifications (Email, SMS, WhatsApp, Phone)
  - Customizable reminder templates
  - Emergency contact notifications for missed appointments

- **Analytics Dashboard**
  - Follow-up compliance tracking
  - Patient statistics
  - Appointment analytics
  - Reminder effectiveness monitoring

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- React Hook Form
- Zod (Form Validation)
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/andiswacyria/healthcare-follow-up-reminder.git
cd healthcare-follow-up-reminder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── dashboard/     # Dashboard-specific components
│   ├── layout/        # Layout components
│   └── patients/      # Patient-related components
├── context/           # React context providers
├── data/             # Mock data and constants
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Key Features

### Patient Management
- Create and manage patient profiles
- Track medical history and appointments
- Store emergency contact information
- Set communication preferences

### Appointment System
- Schedule new appointments
- Track appointment status
- Manage follow-ups
- Record appointment notes

### Reminder System
- Automated reminder generation
- Multiple communication channels
- Customizable templates
- Emergency contact notifications

### Analytics
- Track follow-up compliance
- Monitor missed appointments
- Analyze patient engagement
- View reminder effectiveness

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Healthcare Follow-Up Reminder
VITE_API_URL=your_api_url
```

### Reminder Settings

Configure reminder settings in the Settings page:
- Timing preferences
- Communication channels
- Message templates
- Security settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Security

This application implements several security measures:
- Data encryption
- Audit logging
- Two-factor authentication
- Role-based access control

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Medical icons by Lucide React
- UI components styled with Tailwind CSS
- Form handling with React Hook Form
- Type safety with TypeScript and Zod
