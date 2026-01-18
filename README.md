# 🏆 Club Management System

A modern, responsive web application for managing club members, events, and attendance tracking. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### 👥 Members Management
- Add new club members with detailed information
- View all members in an organized list
- Delete members with confirmation
- Store member details:
  - Name
  - Registration Number
  - Role (Chairperson, Vice Chairperson, Secretary, Vice Secretary, Junior Core, Senior Core, Member)
  - Contact Details

### 📅 Event Calendar
- Create and manage club events
- Add event details:
  - Event Name
  - Date and Time
  - Description
- View events in two formats:
  - **List View**: Chronological list of all events
  - **Calendar View**: Monthly calendar with events highlighted
- Delete events with associated attendance records

### ✅ Attendance Marking
- Mark attendance for members per event
- View attendance summary with statistics:
  - Total Members
  - Present Count
  - Absent Count
- Toggle member attendance status (Present/Absent)
- Color-coded status badges for easy identification

### 🎨 Theme Support
- **Light Mode**: Clean and bright interface
- **Dark Mode**: Easy on the eyes with Deep Navy background
- Theme preference saved in browser localStorage
- Smooth theme transitions

### 🔔 Smart Notifications
- Beautiful custom notification system
- Success notifications with checkmark icons
- Auto-dismiss after 3 seconds
- Manual close option

## 🎨 Color Palette

### Light Mode
- **Background**: White (#FFFFFF)
- **Primary**: Electric Blue (#2563EB)
- **Accent**: Neon Cyan (#22D3EE)
- **Secondary**: Violet Glow (#7C3AED)
- **Text**: Dark Gray (#1F2937)
- **Success**: Green (#10B981)
- **Danger**: Neon Red (#F43F5E)

### Dark Mode
- **Background**: Deep Navy (#0F172A)
- **Primary**: Electric Blue (#2563EB)
- **Accent**: Neon Cyan (#22D3EE)
- **Secondary**: Violet Glow (#7C3AED)
- **Text**: Soft White (#E5E7EB)
- **Success**: Green (#10B981)
- **Danger**: Neon Red (#F43F5E)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd club-management-system
   ```

2. **Open the Project**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the Application**
   - Navigate to `http://localhost:8000` (if using a server)
   - Or directly open `index.html` in your browser

## 📁 Project Structure

```
club-management-system/
│
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles and theme variables
├── script.js           # JavaScript functionality and logic
└── README.md          # Project documentation
```

## 💻 Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with CSS Variables, Flexbox, Grid, and Animations
- **JavaScript (ES6+)**: 
  - DOM Manipulation
  - LocalStorage API for data persistence
  - Event Handling
  - Custom Notification System

## 📖 Usage Guide

### Adding a Member
1. Navigate to the **Members** section
2. Fill in the member details:
   - Name (required)
   - Registration Number (required)
   - Role (select from dropdown)
   - Contact Details (required)
3. Click **Add Member**
4. A success notification will appear confirming the addition

### Creating an Event
1. Go to the **Events** section
2. Fill in event details:
   - Event Name (required)
   - Date (required)
   - Time (required)
   - Description (optional)
3. Click **Create Event**
4. View the event in List View or switch to Calendar View

### Marking Attendance
1. Navigate to the **Attendance** section
2. Select an event from the dropdown
3. The attendance table will appear showing all members
4. Click **Mark Present** or **Mark Absent** to toggle attendance
5. View the attendance summary at the top

### Switching Themes
- Click the theme toggle button (🌙/☀️) in the top-right corner of the header
- Your preference is automatically saved

## 💾 Data Storage

All data is stored locally in your browser using the **LocalStorage API**:
- Members data persists between sessions
- Events are saved automatically
- Attendance records are maintained
- Theme preference is remembered

**Note**: Data is stored in your browser only. Clearing browser data will remove all stored information.

## 🎯 Key Features in Detail

### Responsive Design
- Fully responsive layout that works on:
  - Desktop computers
  - Tablets
  - Mobile devices
- Flexible grid system adapts to screen sizes

### User Experience
- Smooth animations and transitions
- Intuitive navigation between sections
- Clear visual feedback for all actions
- Color-coded status indicators
- Empty state messages for guidance

### Performance
- Lightweight and fast
- No external dependencies
- Efficient data management
- Optimized CSS and JavaScript

## 🛠️ Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563EB;
    --accent-color: #22D3EE;
    --secondary-color: #7C3AED;
    /* ... */
}
```

### Adding New Roles
Edit the role dropdown in `index.html`:
```html
<option value="Your Role">Your Role</option>
```

### Modifying Notification Duration
In `script.js`, change the timeout value:
```javascript
setTimeout(() => {
    // Change 3000 to desired milliseconds
}, 3000);
```

## 📝 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🤝 Contributing

This is a standalone project, but suggestions for improvements are welcome!

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Club Management System - Task 1

## 🎉 Acknowledgments

- Built with vanilla web technologies
- Designed for simplicity and ease of use
- No framework dependencies

---

**Enjoy managing your club! 🎊**
