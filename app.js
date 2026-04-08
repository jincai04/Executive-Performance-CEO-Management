// ============================================
// DATA STORAGE (Local Storage)
// ============================================

const STORAGE_KEYS = {
    meetings: 'exec_meetings',
    decisions: 'exec_decisions',
    tasks: 'exec_tasks',
    communications: 'exec_communications',
    knowledge: 'exec_knowledge'
};

// Load data from localStorage
function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error loading data:', e);
        return [];
    }
}

// Save data to localStorage
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving data:', e);
    }
}

// ============================================
// STATE MANAGEMENT
// ============================================

let meetings = loadData(STORAGE_KEYS.meetings);
let decisions = loadData(STORAGE_KEYS.decisions);
let tasks = loadData(STORAGE_KEYS.tasks);
let communications = loadData(STORAGE_KEYS.communications);
let knowledge = loadData(STORAGE_KEYS.knowledge);

// Initialize with sample data if empty
if (meetings.length === 0) initializeSampleData();

// ============================================
// SAMPLE DATA
// ============================================

function initializeSampleData() {
    meetings = [
        {
            id: 1,
            title: 'Board Meeting - Q4 Review',
            date: new Date(Date.now() + 86400000).toISOString(),
            duration: 120,
            agenda: 'Review Q4 performance, Discuss Q1 strategy, Budget approval',
            notes: 'Q4 revenue exceeded expectations by 15%. Customer satisfaction scores improved. Need to discuss expansion plans for Q1.',
            insights: ['Revenue up 15% vs target', 'CSAT scores improved significantly', 'Discuss expansion in next meeting'],
            checklist: { review: true, prepare: false, previous: true, questions: true }
        },
        {
            id: 2,
            title: 'Strategy Session - Product Launch',
            date: new Date(Date.now() + 172800000).toISOString(),
            duration: 90,
            agenda: 'Finalize launch timeline, Marketing strategy, Resource allocation',
            notes: 'Product ready for beta launch. Marketing budget approved. Need to finalize launch date.',
            insights: ['Beta launch ready', 'Marketing budget secured', 'Finalize date this week'],
            checklist: { review: true, prepare: true, previous: false, questions: true }
        }
    ];

    decisions = [
        {
            id: 1,
            title: 'Q4 Strategy Pivot',
            category: 'strategy',
            impact: 'high',
            details: 'Decided to pivot from B2B to B2C model based on market research.',
            outcome: 'Capture consumer market segment, Increase brand awareness',
            targetDate: new Date(Date.now() + 2592000000).toISOString().split('T')[0],
            metric: 'Market share +5%',
            status: 'pending',
            progress: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: 'Hiring CTO',
            category: 'hiring',
            impact: 'critical',
            details: 'Need technical leadership for new product line.',
            outcome: 'Stronger technical foundation, Better product roadmap',
            targetDate: new Date(Date.now() + 43200000).toISOString().split('T')[0],
            metric: 'Candidate identified',
            status: 'completed',
            progress: 100,
            createdAt: new Date(Date.now() - 604800000).toISOString()
        }
    ];

    tasks = [
        {
            id: 1,
            title: 'Send proposal to ABC Corp',
            due: new Date(Date.now() + 86400000).toISOString(),
            priority: 'high',
            description: 'Follow up on partnership discussion',
            reminders: { day: true, hour: false, overdue: true },
            status: 'pending',
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: 'Review competitor analysis',
            due: new Date(Date.now() - 3600000).toISOString(),
            priority: 'medium',
            description: 'Prepare summary for team meeting',
            reminders: { day: true, hour: false, overdue: false },
            status: 'overdue',
            createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: 3,
            title: 'Email board members',
            due: new Date(Date.now() + 3600000).toISOString(),
            priority: 'urgent',
            description: 'Share Q4 results',
            reminders: { day: true, hour: true, overdue: true },
            status: 'pending',
            createdAt: new Date().toISOString()
        }
    ];

    communications = [
        {
            id: 1,
            type: 'email',
            typeIcon: '📧',
            title: 'Proposal sent to ABC Corp',
            recipient: 'john@abc.corp',
            time: new Date(Date.now() - 3600000).toISOString(),
            details: 'Partnership proposal for Q2 collaboration'
        },
        {
            id: 2,
            type: 'call',
            typeIcon: '📞',
            title: 'Follow-up call with XYZ Inc',
            recipient: 'Sarah Johnson',
            time: new Date(Date.now() - 86400000).toISOString(),
            details: 'Discussed integration timeline'
        }
    ];

    knowledge = [
        {
            id: 1,
            title: 'The 80/20 Principle',
            category: 'frameworks',
            tags: ['productivity', 'prioritization', 'efficiency'],
            content: 'Focus on the 20% of activities that generate 80% of results. Identify and prioritize high-impact tasks.',
            ref: '80% Impact from 20% Effort'
        },
        {
            id: 2,
            title: 'First Principles Thinking',
            category: 'frameworks',
            tags: ['decision-making', 'innovation', 'strategy'],
            content: 'Break down complex problems into basic truths and build up from there. Question assumptions.',
            ref: 'Question Everything, Start Fresh'
        },
        {
            id: 3,
            title: 'The 5 Whys',
            category: 'strategies',
            tags: ['problem-solving', 'root-cause', 'analysis'],
            content: 'Ask "why" five times to get to the root cause of a problem.',
            ref: 'Dig Deeper, Find Root Cause'
        }
    ];

    saveData(STORAGE_KEYS.meetings, meetings);
    saveData(STORAGE_KEYS.decisions, decisions);
    saveData(STORAGE_KEYS.tasks, tasks);
    saveData(STORAGE_KEYS.communications, communications);
    saveData(STORAGE_KEYS.knowledge, knowledge);
}

// ============================================
// NAVIGATION
// ============================================

function showModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });

    // Show selected module
    const targetModule = document.getElementById(moduleId);
    if (targetModule) {
        targetModule.classList.add('active');
    }

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.module === moduleId) {
            item.classList.add('active');
        }
    });

    // Refresh data
    switch(moduleId) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'meetings':
            renderMeetings();
            break;
        case 'decisions':
            renderDecisions();
            break;
        case 'tasks':
            renderTasks();
            break;
        case 'knowledge':
            renderKnowledge();
            break;
    }
}

// Set up navigation listeners
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const moduleId = item.dataset.module;
        showModule(moduleId);
    });
});

// ============================================
// DASHBOARD
// ============================================

function updateDashboard() {
    // Update stats
    document.getElementById('stat-meetings').textContent = meetings.length;
    document.getElementById('stat-decisions').textContent = decisions.length;
    document.getElementById('stat-tasks').textContent = tasks.filter(t => t.status === 'pending').length;
    document.getElementById('stat-insights').textContent = knowledge.length;

    // Initialize charts
    initCharts();

    // Render activity
    renderActivity();
}

let decisionsChart, kpiChart;

function initCharts() {
    // Destroy existing charts
    if (decisionsChart) decisionsChart.destroy();
    if (kpiChart) kpiChart.destroy();

    // Decisions Chart
    const decisionsCtx = document.getElementById('decisionsChart');
    if (decisionsCtx) {
        decisionsChart = new Chart(decisionsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Decisions Made',
                    data: [2, 4, 3, 5],
                    borderColor: '#0a84ff',
                    backgroundColor: 'rgba(10, 132, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0a84ff',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }, {
                    label: 'Completed',
                    data: [1, 3, 2, 4],
                    borderColor: '#30d158',
                    backgroundColor: 'rgba(48, 209, 88, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#30d158',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#8e8e93',
                            font: { size: 12 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#8e8e93', font: { size: 11 } },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    x: {
                        ticks: { color: '#8e8e93', font: { size: 11 } },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    }

    // KPI Chart
    const kpiCtx = document.getElementById('kpiChart');
    if (kpiCtx) {
        kpiChart = new Chart(kpiCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Revenue', 'CSAT', 'Market', 'Productivity'],
                datasets: [{
                    label: 'Current',
                    data: [85, 92, 78, 88],
                    backgroundColor: '#0a84ff',
                    borderRadius: 6
                }, {
                    label: 'Target',
                    data: [100, 90, 85, 90],
                    backgroundColor: '#bf5af2',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#8e8e93',
                            font: { size: 12 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#8e8e93', font: { size: 11 } },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    x: {
                        ticks: { color: '#8e8e93', font: { size: 11 } },
                        grid: { display: false }
                    }
                }
            }
        });
    }
}

function renderActivity() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;

    const activities = [
        { icon: '📅', text: 'Board meeting scheduled for tomorrow', time: '2 hours ago' },
        { icon: '✅', text: 'Q4 strategy decision logged', time: '5 hours ago' },
        { icon: '💡', text: 'New framework added to Knowledge Vault', time: '1 day ago' },
        { icon: '✅', text: 'Task completed: Send proposal', time: '1 day ago' }
    ];

    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <span class="activity-icon">${activity.icon}</span>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

// ============================================
// MEETINGS
// ============================================

function renderMeetings() {
    const container = document.getElementById('meetings-list');
    if (!container) return;

    container.innerHTML = meetings.map(meeting => {
        const date = new Date(meeting.date);
        return `
            <div class="meeting-card">
                <div class="meeting-header">
                    <div>
                        <div class="meeting-title">${meeting.title}</div>
                        <div class="meeting-time">
                            <span>📅</span>
                            <span>${date.toLocaleDateString()}</span>
                            <span>at ${date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                            <span>(${meeting.duration} min)</span>
                        </div>
                    </div>
                    <button class="icon-btn" onclick="deleteMeeting(${meeting.id})" style="width: 32px; height: 32px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        </svg>
                    </button>
                </div>
                ${meeting.agenda ? `<div class="meeting-agenda"><strong>Agenda:</strong> ${meeting.agenda}</div>` : ''}
                ${meeting.insights && meeting.insights.length > 0 ? `
                    <div class="meeting-insights">
                        <div class="insights-label">✨ AI Insights</div>
                        <ul class="insights-list">
                            ${meeting.insights.map(insight => `<li>${insight}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="checklist-items">
                    ${Object.entries(meeting.checklist).map(([key, value]) => `
                        <label class="checklist-item">
                            <input type="checkbox" ${value ? 'checked' : ''} onchange="updateMeetingChecklist(${meeting.id}, '${key}')">
                            <span>${getChecklistLabel(key)}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function getChecklistLabel(key) {
    const labels = {
        review: 'Review agenda',
        prepare: 'Prepare talking points',
        previous: 'Review previous notes',
        questions: 'Prepare questions'
    };
    return labels[key] || key;
}

function saveMeeting(event) {
    event.preventDefault();

    const form = event.target;
    const durationInput = form.querySelector('input[name="duration"]:checked');

    const meeting = {
        id: Date.now(),
        title: document.getElementById('meeting-title').value,
        date: document.getElementById('meeting-date').value,
        duration: durationInput ? parseInt(durationInput.value) : 60,
        agenda: document.getElementById('meeting-agenda').value,
        notes: document.getElementById('meeting-notes').value,
        insights: [],
        checklist: {
            review: document.getElementById('check1').checked,
            prepare: document.getElementById('check2').checked,
            previous: document.getElementById('check3').checked,
            questions: document.getElementById('check4').checked
        }
    };

    // Get insights if generated
    const insightsBox = document.getElementById('meeting-insights');
    if (insightsBox.dataset.insights) {
        meeting.insights = JSON.parse(insightsBox.dataset.insights);
    }

    meetings.push(meeting);
    saveData(STORAGE_KEYS.meetings, meetings);

    closeModal('meeting-modal');
    renderMeetings();
    updateDashboard();

    // Reset form
    form.reset();
    if (insightsBox) {
        delete insightsBox.dataset.insights;
        insightsBox.innerHTML = '<span class="insights-placeholder">AI will summarize your notes...</span>';
    }
}

function updateMeetingChecklist(meetingId, key) {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting) {
        meeting.checklist[key] = !meeting.checklist[key];
        saveData(STORAGE_KEYS.meetings, meetings);
        renderMeetings();
    }
}

function deleteMeeting(meetingId) {
    if (confirm('Delete this meeting?')) {
        meetings = meetings.filter(m => m.id !== meetingId);
        saveData(STORAGE_KEYS.meetings, meetings);
        renderMeetings();
        updateDashboard();
    }
}

// AI Insights Generation
function generateInsights() {
    const notes = document.getElementById('meeting-notes').value;

    if (!notes.trim()) {
        alert('Please enter some notes first');
        return;
    }

    // Simulate AI summarization
    const sentences = notes.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const insights = sentences.slice(0, 5).map(s => s.trim());

    const insightsBox = document.getElementById('meeting-insights');
    insightsBox.innerHTML = `
        <div class="insights-label">✨ AI Key Insights</div>
        <ul class="insights-list">
            ${insights.map(insight => `<li>${insight}</li>`).join('')}
        </ul>
    `;
    insightsBox.dataset.insights = JSON.stringify(insights);
}

// ============================================
// DECISIONS
// ============================================

function renderDecisions(filter = 'all') {
    const container = document.getElementById('decisions-list');
    if (!container) return;

    let filteredDecisions = decisions;
    if (filter !== 'all') {
        filteredDecisions = decisions.filter(d => d.status === filter);
    }

    container.innerHTML = filteredDecisions.map(decision => {
        const targetDate = new Date(decision.targetDate);
        const daysUntil = Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24));

        return `
            <div class="decision-card ${decision.status}">
                <div class="decision-title">${decision.title}</div>
                <div class="decision-meta">
                    <span style="text-transform: capitalize;">${decision.category}</span>
                    <span>•</span>
                    <span style="text-transform: capitalize;">${decision.impact}</span>
                </div>
                <div class="decision-content">
                    <p>${decision.details}</p>
                </div>
                <div class="decision-outcome">
                    <h4>Expected Outcome</h4>
                    <p>${decision.outcome}</p>
                    <p><strong>Metric:</strong> ${decision.metric}</p>
                    <p><strong>Target:</strong> ${targetDate.toLocaleDateString()} (${daysUntil} days)</p>
                </div>
                ${decision.status !== 'completed' ? `
                    <div class="decision-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${decision.progress}%"></div>
                        </div>
                        <span class="progress-text">${decision.progress}%</span>
                        <button class="icon-btn" onclick="updateProgress(${decision.id}, 10)" style="width: 28px; height: 28px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                ` : `
                    <div style="padding: 8px 12px; background: rgba(48, 209, 88, 0.2); border-radius: 8px; color: #30d158; font-size: 13px; font-weight: 600;">
                        ✓ Completed
                    </div>
                `}
            </div>
        `;
    }).join('');

    // Add filter event listeners
    document.querySelectorAll('.filter-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDecisions(btn.dataset.filter);
        });
    });
}

function saveDecision(event) {
    event.preventDefault();

    const categoryInput = event.target.querySelector('input[name="category"]:checked');
    const impactInput = event.target.querySelector('input[name="impact"]:checked');

    const decision = {
        id: Date.now(),
        title: document.getElementById('decision-title').value,
        category: categoryInput ? categoryInput.value : 'strategy',
        impact: impactInput ? impactInput.value : 'medium',
        details: document.getElementById('decision-details').value,
        outcome: document.getElementById('decision-outcome').value,
        targetDate: document.getElementById('decision-target-date').value,
        metric: document.getElementById('decision-metric').value,
        status: 'pending',
        progress: 0,
        createdAt: new Date().toISOString()
    };

    decisions.push(decision);
    saveData(STORAGE_KEYS.decisions, decisions);

    closeModal('decision-modal');
    renderDecisions();
    updateDashboard();

    event.target.reset();
}

function updateProgress(decisionId, increment) {
    const decision = decisions.find(d => d.id === decisionId);
    if (decision) {
        decision.progress = Math.min(100, decision.progress + increment);
        if (decision.progress >= 100) {
            decision.status = 'completed';
        }
        saveData(STORAGE_KEYS.decisions, decisions);
        renderDecisions();
        updateDashboard();
    }
}

// ============================================
// TASKS
// ============================================

function renderTasks() {
    updateTaskSummary();
    renderTaskList();
    renderCommunications();
}

function updateTaskSummary() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const overdue = tasks.filter(t => t.status === 'pending' && new Date(t.due) < today).length;
    const dueToday = tasks.filter(t => {
        const taskDate = new Date(t.due);
        return t.status === 'pending' &&
               taskDate.getDate() === today.getDate() &&
               taskDate.getMonth() === today.getMonth() &&
               taskDate.getFullYear() === today.getFullYear();
    }).length;
    const dueWeek = tasks.filter(t => t.status === 'pending' && new Date(t.due) <= weekEnd).length;
    const completed = tasks.filter(t => t.status === 'completed').length;

    document.getElementById('task-overdue').textContent = overdue;
    document.getElementById('task-today').textContent = dueToday;
    document.getElementById('task-week').textContent = dueWeek;
    document.getElementById('task-completed').textContent = completed;
}

function renderTaskList() {
    const container = document.getElementById('tasks-list');
    if (!container) return;

    const sortedTasks = [...tasks].sort((a, b) => new Date(a.due) - new Date(b.due));

    container.innerHTML = sortedTasks.map(task => {
        const dueDate = new Date(task.due);
        const isOverdue = task.status === 'pending' && dueDate < new Date();

        return `
            <div class="task-card ${task.priority} ${isOverdue ? 'overdue' : ''}">
                <div class="task-left">
                    <div class="task-header">
                        <span class="task-title">${task.title}</span>
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                    </div>
                    <div class="task-meta">
                        <span>📅 Due: ${dueDate.toLocaleDateString()} at ${dueDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                    ${task.description ? `<p style="color: #8e8e93; margin-top: 8px; font-size: 14px;">${task.description}</p>` : ''}
                </div>
                <div class="task-right">
                    <div class="task-checkbox ${task.status === 'completed' ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                    <button class="icon-btn" onclick="deleteTask(${task.id})" style="width: 32px; height: 32px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function saveTask(event) {
    event.preventDefault();

    const priorityInput = event.target.querySelector('input[name="priority"]:checked');

    const task = {
        id: Date.now(),
        title: document.getElementById('task-title').value,
        due: document.getElementById('task-due').value,
        priority: priorityInput ? priorityInput.value : 'medium',
        description: document.getElementById('task-description').value,
        reminders: {
            day: document.getElementById('reminder-24h').checked,
            hour: document.getElementById('reminder-1h').checked,
            overdue: document.getElementById('reminder-overdue').checked
        },
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    saveData(STORAGE_KEYS.tasks, tasks);

    closeModal('task-modal');
    renderTasks();
    updateDashboard();

    event.target.reset();
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = task.status === 'pending' ? 'completed' : 'pending';

        if (task.status === 'completed') {
            // Add to communications
            const comm = {
                id: Date.now(),
                type: 'system',
                typeIcon: '✅',
                title: `Task completed: ${task.title}`,
                recipient: 'System',
                time: new Date().toISOString(),
                details: 'Task was completed and moved to archive'
            };
            communications.push(comm);
            saveData(STORAGE_KEYS.communications, communications);
        }

        saveData(STORAGE_KEYS.tasks, tasks);
        renderTasks();
        updateDashboard();
    }
}

function deleteTask(taskId) {
    if (confirm('Delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveData(STORAGE_KEYS.tasks, tasks);
        renderTasks();
        updateDashboard();
    }
}

// ============================================
// COMMUNICATIONS
// ============================================

function renderCommunications() {
    const container = document.getElementById('comm-list');
    if (!container) return;

    const sortedComms = [...communications].sort((a, b) => new Date(b.time) - new Date(a.time));

    container.innerHTML = sortedComms.map(comm => `
        <div class="comm-item">
            <span class="comm-icon">${comm.typeIcon}</span>
            <div class="comm-content">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span class="comm-type">${comm.title}</span>
                    <span class="comm-time">${formatRelativeTime(new Date(comm.time))}</span>
                </div>
                <div class="comm-details">
                    <p style="margin: 0;"><strong>To:</strong> ${comm.recipient}</p>
                    <p style="margin: 4px 0 0 0;">${comm.details}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function formatRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

// ============================================
// KNOWLEDGE
// ============================================

function renderKnowledge(filter = 'all') {
    const container = document.getElementById('knowledge-list');
    if (!container) return;

    let filteredKnowledge = knowledge;
    if (filter !== 'all') {
        filteredKnowledge = knowledge.filter(k => k.category === filter);
    }

    container.innerHTML = filteredKnowledge.map(item => `
        <div class="knowledge-card">
            <div class="knowledge-header">
                <div class="knowledge-title">${item.title}</div>
                <span class="knowledge-category">${item.category}</span>
            </div>
            <div class="knowledge-content">
                ${item.content}
            </div>
            ${item.ref ? `<div class="knowledge-ref">💡 ${item.ref}</div>` : ''}
            <div class="knowledge-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="btn btn-secondary" style="margin-top: 12px; padding: 10px;" onclick="deleteKnowledge(${item.id})">Delete</button>
        </div>
    `).join('');

    // Add category event listeners
    document.querySelectorAll('.pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderKnowledge(btn.dataset.category);
        });
    });
}

function saveKnowledge(event) {
    event.preventDefault();

    const categoryInput = event.target.querySelector('input[name="kncategory"]:checked');

    const item = {
        id: Date.now(),
        title: document.getElementById('knowledge-title').value,
        category: categoryInput ? categoryInput.value : 'frameworks',
        tags: document.getElementById('knowledge-tags').value.split(',').map(t => t.trim()).filter(t => t),
        content: document.getElementById('knowledge-content').value,
        ref: document.getElementById('knowledge-ref').value
    };

    knowledge.push(item);
    saveData(STORAGE_KEYS.knowledge, knowledge);

    closeModal('knowledge-modal');
    renderKnowledge();
    updateDashboard();

    event.target.reset();
}

function searchKnowledge() {
    const query = document.getElementById('knowledge-search').value.toLowerCase();
    const container = document.getElementById('knowledge-list');
    if (!container) return;

    const filtered = knowledge.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.content.toLowerCase().includes(query) ||
               item.tags.some(tag => tag.toLowerCase().includes(query));
    });

    container.innerHTML = filtered.map(item => `
        <div class="knowledge-card">
            <div class="knowledge-header">
                <div class="knowledge-title">${item.title}</div>
                <span class="knowledge-category">${item.category}</span>
            </div>
            <div class="knowledge-content">
                ${item.content}
            </div>
            ${item.ref ? `<div class="knowledge-ref">💡 ${item.ref}</div>` : ''}
            <div class="knowledge-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function deleteKnowledge(id) {
    if (confirm('Delete this resource?')) {
        knowledge = knowledge.filter(k => k.id !== id);
        saveData(STORAGE_KEYS.knowledge, knowledge);
        renderKnowledge();
        updateDashboard();
    }
}

// ============================================
// MODALS
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function showQuickAdd() {
    openModal('quick-add-modal');
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    // Check notification permission
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Executive Command', {
            body: message,
            icon: '⚡',
            badge: type
        });
    }

    // Also show in-app notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff9f0a;
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 15px;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Smart Reminders
function checkReminders() {
    const now = new Date();
    const tasksWithReminders = tasks.filter(t => t.status === 'pending' && (t.reminders.day || t.reminders.hour || t.reminders.overdue));

    tasksWithReminders.forEach(task => {
        const due = new Date(task.due);
        const timeUntilDue = due - now;
        const hoursUntil = Math.floor(timeUntilDue / (1000 * 60 * 60));
        const daysUntil = Math.floor(hoursUntil / 24);

        if (task.reminders.day && daysUntil === 1 && hoursUntil < 24) {
            showNotification(`Task Due Tomorrow: ${task.title}`, 'due');
        }

        if (task.reminders.hour && hoursUntil === 1) {
            showNotification(`Task Due in 1 Hour: ${task.title}`, 'urgent');
        }

        if (task.reminders.overdue && timeUntilDue < 0) {
            showNotification(`Task Overdue: ${task.title}`, 'overdue');
        }
    });
}

// Check reminders every 5 minutes
setInterval(checkReminders, 300000);

// Update greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Morning';

    if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17) {
        greeting = 'Good Evening';
    }

    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Update task summary every minute
setInterval(() => {
    if (document.getElementById('tasks').classList.contains('active')) {
        updateTaskSummary();
        renderTaskList();
    }
}, 60000);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    updateDashboard();
});

// Update greeting every minute
setInterval(updateGreeting, 60000);
