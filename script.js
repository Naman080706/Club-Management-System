// Data Storage (using localStorage)
let members = JSON.parse(localStorage.getItem('clubMembers')) || [];
let events = JSON.parse(localStorage.getItem('clubEvents')) || [];
let attendance = JSON.parse(localStorage.getItem('clubAttendance')) || {};

// Notification System
function showNotification(message, type = 'success') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const titles = {
        success: 'Success',
        error: 'Error',
        info: 'Info'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </div>
        <div class="notification-content">
            <div class="notification-title">${titles[type] || titles.success}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">×</button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeNotification(closeBtn);
        }
    }, 3000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.classList.add('hiding');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Initialize page
function init() {
    initTheme();
    displayMembers();
    displayEvents();
    populateEventDropdown();
}

// Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    document.getElementById('nav-' + sectionName).classList.add('active');
}

// ========== MEMBERS MANAGEMENT ==========
function addMember(event) {
    event.preventDefault();
    
    const member = {
        id: Date.now(),
        name: document.getElementById('memberName').value,
        regNumber: document.getElementById('regNumber').value,
        role: document.getElementById('memberRole').value,
        contact: document.getElementById('memberContact').value
    };
    
    members.push(member);
    localStorage.setItem('clubMembers', JSON.stringify(members));
    
    document.getElementById('memberForm').reset();
    displayMembers();
    showNotification('Member added successfully!', 'success');
}

function displayMembers() {
    const container = document.getElementById('membersList');
    
    if (members.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No members added yet. Add your first member above!</p></div>';
        return;
    }
    
    container.innerHTML = members.map(member => `
        <div class="card">
            <h3>${member.name}</h3>
            <p><strong>Registration Number:</strong> ${member.regNumber}</p>
            <p><strong>Role:</strong> ${member.role}</p>
            <p><strong>Contact:</strong> ${member.contact}</p>
            <div class="card-actions">
                <button class="btn btn-danger" onclick="deleteMember(${member.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteMember(id) {
    if (confirm('Are you sure you want to delete this member?')) {
        members = members.filter(m => m.id !== id);
        localStorage.setItem('clubMembers', JSON.stringify(members));
        displayMembers();
        
        // Also remove from attendance records
        Object.keys(attendance).forEach(eventId => {
            if (attendance[eventId][id]) {
                delete attendance[eventId][id];
            }
        });
        localStorage.setItem('clubAttendance', JSON.stringify(attendance));
    }
}

// ========== EVENTS MANAGEMENT ==========
function addEvent(event) {
    event.preventDefault();
    
    const newEvent = {
        id: Date.now(),
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        description: document.getElementById('eventDescription').value
    };
    
    events.push(newEvent);
    localStorage.setItem('clubEvents', JSON.stringify(events));
    
    document.getElementById('eventForm').reset();
    displayEvents();
    populateEventDropdown();
    showNotification('Event created successfully!', 'success');
}

function displayEvents() {
    const container = document.getElementById('eventsListContainer');
    
    if (events.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No events created yet. Create your first event above!</p></div>';
        return;
    }
    
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    container.innerHTML = sortedEvents.map(evt => {
        const eventDate = new Date(evt.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return `
            <div class="card">
                <h3>${evt.name}</h3>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${evt.time}</p>
                ${evt.description ? `<p><strong>Description:</strong> ${evt.description}</p>` : ''}
                <div class="card-actions">
                    <button class="btn btn-danger" onclick="deleteEvent(${evt.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
    
    updateCalendarView();
}

function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event? This will also delete all attendance records for this event.')) {
        events = events.filter(e => e.id !== id);
        localStorage.setItem('clubEvents', JSON.stringify(events));
        
        delete attendance[id];
        localStorage.setItem('clubAttendance', JSON.stringify(attendance));
        
        displayEvents();
        populateEventDropdown();
    }
}

function toggleEventView(view) {
    if (view === 'list') {
        document.getElementById('eventList').classList.add('active');
        document.getElementById('eventCalendar').classList.remove('active');
        document.getElementById('view-list').classList.add('active');
        document.getElementById('view-calendar').classList.remove('active');
    } else {
        document.getElementById('eventList').classList.remove('active');
        document.getElementById('eventCalendar').classList.add('active');
        document.getElementById('view-list').classList.remove('active');
        document.getElementById('view-calendar').classList.add('active');
        updateCalendarView();
    }
}

function updateCalendarView() {
    const container = document.getElementById('calendarView');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
    
    const theme = document.documentElement.getAttribute('data-theme');
    const titleColor = theme === 'dark' ? '#ffffff' : '#333';
    
    let html = `<h3 style="text-align: center; margin-bottom: 20px; color: ${titleColor};">${monthNames[currentMonth]} ${currentYear}</h3>`;
    html += '<div class="calendar-view">';
    
    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        html += `<div class="calendar-day-header" style="font-weight: bold; padding: 10px;">${day}</div>`;
    });
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === dateStr);
        const hasEvent = dayEvents.length > 0;
        
        html += `<div class="calendar-day ${hasEvent ? 'has-event' : ''}">`;
        html += `<div class="calendar-day-number">${day}</div>`;
        if (hasEvent) {
            dayEvents.forEach(evt => {
                html += `<div class="event-item">${evt.name}</div>`;
            });
        }
        html += '</div>';
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// ========== ATTENDANCE MANAGEMENT ==========
function populateEventDropdown() {
    const dropdown = document.getElementById('attendanceEvent');
    dropdown.innerHTML = '<option value="">Select an Event</option>';
    
    events.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(evt => {
        const option = document.createElement('option');
        option.value = evt.id;
        option.textContent = `${evt.name} - ${new Date(evt.date).toLocaleDateString()}`;
        dropdown.appendChild(option);
    });
}

function loadAttendanceForEvent() {
    const eventId = document.getElementById('attendanceEvent').value;
    const summaryDiv = document.getElementById('attendanceSummary');
    
    if (!eventId) {
        summaryDiv.style.display = 'none';
        return;
    }
    
    summaryDiv.style.display = 'block';
    const tbody = document.getElementById('attendanceTableBody');
    
    if (members.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No members available. Please add members first.</td></tr>';
        updateAttendanceSummary(eventId);
        return;
    }
    
    // Initialize attendance for this event if not exists
    if (!attendance[eventId]) {
        attendance[eventId] = {};
    }
    
    tbody.innerHTML = members.map(member => {
        const status = attendance[eventId][member.id] || 'absent';
        return `
            <tr>
                <td>${member.name}</td>
                <td>${member.regNumber}</td>
                <td>${member.role}</td>
                <td>
                    <span class="status-badge ${status === 'present' ? 'status-present' : 'status-absent'}">
                        ${status === 'present' ? 'Present' : 'Absent'}
                    </span>
                </td>
                <td>
                    <button class="btn ${status === 'present' ? 'btn-secondary' : ''}" 
                            onclick="toggleAttendance(${eventId}, ${member.id})">
                        Mark ${status === 'present' ? 'Absent' : 'Present'}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    updateAttendanceSummary(eventId);
}

function toggleAttendance(eventId, memberId) {
    if (!attendance[eventId]) {
        attendance[eventId] = {};
    }
    
    const currentStatus = attendance[eventId][memberId];
    attendance[eventId][memberId] = currentStatus === 'present' ? 'absent' : 'present';
    
    localStorage.setItem('clubAttendance', JSON.stringify(attendance));
    loadAttendanceForEvent();
}

function updateAttendanceSummary(eventId) {
    if (!attendance[eventId]) {
        attendance[eventId] = {};
    }
    
    const total = members.length;
    let present = 0;
    let absent = 0;
    
    members.forEach(member => {
        if (attendance[eventId][member.id] === 'present') {
            present++;
        } else {
            absent++;
        }
    });
    
    document.getElementById('totalMembers').textContent = total;
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
}

// Initialize on page load
init();

