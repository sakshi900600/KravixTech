# 📧 MailFlow - Email & Productivity Platform

A modern, feature-rich email and productivity management application built with React, Tailwind CSS, and Vite.

![MailFlow Banner](https://via.placeholder.com/1200x400/2563eb/ffffff?text=MailFlow)

## ✨ Features

### 🔐 Authentication Module
- Secure login with email/password
- Form validation using React Hook Form & Zod
- Show/Hide password toggle
- Remember me functionality
- Persistent authentication with localStorage
- Protected routes
- Loading states & error handling

### 📊 Dashboard
- Interactive dashboard with statistics
- Quick action buttons
- Recent activity feed
- Responsive layout
- Dark/Light mode toggle
- Collapsible sidebar

### 📧 Email Management
- **Inbox**: View, filter, and manage emails
- **Email Actions**: Read, reply, star, archive, delete
- **Filters**: All, Unread, Starred, Attachments
- **Compose Email**:
  - Rich text editor (TipTap)
  - To, CC, BCC fields with chip input
  - File attachments (drag & drop)
  - Auto-save drafts
  - Send & discard emails
- **Email Folders**: Sent, Drafts, Spam, Trash, Archive

### 📅 Calendar
- Day, Week, Month views
- Create, edit, delete events
- Event reminders
- Meeting invitation UI
- Color-coded events by type
- Responsive calendar grid

### 👥 Contacts
- Add, edit, delete contacts
- Contact information: name, email, phone, company, designation
- Search contacts
- Filter by favorites
- Grid & list views
- Avatar generation

### ✅ Tasks
- Create, update, delete tasks
- Task priority levels (Low, Medium, High, Urgent)
- Due date tracking
- Mark complete/incomplete
- Task statistics (Total, Pending, Completed, Overdue)
- Search, filter, sort tasks

### 🔍 Global Search
- Search across emails, contacts, tasks, events
- Instant search with debouncing
- Recent searches
- Keyboard navigation (Arrow keys + Enter)
- Keyboard shortcuts (⌘K / Ctrl+K)
- Filter results by type

### 🎨 UI/UX
- Fully responsive design (Mobile, Tablet, Desktop)
- Dark/Light mode
- Smooth animations with Framer Motion
- Toast notifications
- Loading skeletons
- Keyboard shortcuts
- Accessibility friendly

## 🚀 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **Heroicons** - Icons
- **Headless UI** - Accessible components
- **date-fns** - Date utilities

### Rich Text Editor
- **TipTap** - Modern rich text editor
- **Lucide React** - Editor icons

### State Management
- **React Context API** - Global state
- **localStorage** - Persistent storage

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mailflow.git
cd mailflow
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

6. **Preview production build**

```bash
npm run preview
```

## 🗂️ Project Structure

```
mailflow/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Spinner/
│   │   ├── layout/          # Layout components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopNav.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   └── DashboardLayout.jsx
│   │   └── modules/         # Feature modules
│   │       ├── auth/
│   │       ├── email/
│   │       ├── calendar/
│   │       ├── contacts/
│   │       ├── tasks/
│   │       └── search/
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── styles/              # Global styles
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md               # Project documentation
```

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with a custom configuration including:

- Custom color palette with primary colors
- Dark mode support
- Custom animations
- Responsive utilities


## 📱 Responsive Design

| Screen Size | Breakpoint | Features |
|---|---|---|
| Mobile | < 768px | Bottom navigation, collapsible sidebar, compact layouts |
| Tablet | 768-1024px | Full sidebar, optimized spacing |
| Desktop | > 1024px | Full features, expanded layouts |

## 🔐 Demo Credentials

For testing purposes, use these credentials:

- **Email**: john@example.com
- **Password**: password123



## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ESLint for code linting
- Follow React best practices
- Write meaningful comments
- Use descriptive variable names
- Keep components small and focused

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Heroicons** - for beautiful icons
- **Tailwind CSS** - for styling
- **Framer Motion** - for animations
- **TipTap** - for rich text editing
- **Vite** - for fast builds

## 📞 Support

For support, open an issue in the repository.


---


Happy coding! 🚀

