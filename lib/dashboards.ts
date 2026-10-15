// Dummy data generators for dashboards

export interface Task {
  id: string;
  title: string;
  status: 'new' | 'assigned' | 'in-progress' | 'pending-approval' | 'approved' | 'done';
  assignedTo?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Approval {
  id: string;
  title: string;
  type: 'email' | 'calendar' | 'document';
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ClientMetrics {
  totalTasks: number;
  pendingApprovals: number;
  completedThisMonth: number;
}

export interface VAMetrics {
  assignedClients: number;
  activeTasks: number;
  tasksAwaitingAction: number;
  completedThisWeek: number;
}

export interface AdminMetrics {
  totalClients: number;
  totalVAs: number;
  activeProjects: number;
  tasksCompleted: number;
}

// Client dashboard data
export function getClientDashboardData(clientEmail: string) {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Book Tokyo trip (Sept 20-25)',
      status: 'in-progress',
      assignedTo: 'Sarah Chen',
      dueDate: '2026-10-15',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Schedule team offsite planning call',
      status: 'pending-approval',
      assignedTo: 'Sarah Chen',
      dueDate: '2026-10-10',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Prepare Q4 budget presentation',
      status: 'new',
      dueDate: '2026-10-20',
      priority: 'high',
    },
    {
      id: '4',
      title: 'Update contact list for investors',
      status: 'done',
      assignedTo: 'Sarah Chen',
      dueDate: '2026-10-01',
      priority: 'low',
    },
  ];

  const approvals: Approval[] = [
    {
      id: 'a1',
      title: 'Draft email to Tokyo hotel',
      type: 'email',
      createdAt: '2026-10-08',
      status: 'pending',
    },
    {
      id: 'a2',
      title: 'Calendar invite: Team offsite planning',
      type: 'calendar',
      createdAt: '2026-10-07',
      status: 'pending',
    },
  ];

  const metrics: ClientMetrics = {
    totalTasks: 8,
    pendingApprovals: 2,
    completedThisMonth: 5,
  };

  return { tasks, approvals, metrics };
}

// VA dashboard data
export function getVADashboardData(vaEmail: string) {
  const clients = [
    { id: 'c1', name: 'Anastasia K.', activeTasks: 3 },
    { id: 'c2', name: 'Client B', activeTasks: 2 },
    { id: 'c3', name: 'Client C', activeTasks: 1 },
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Research Tokyo flights for Anastasia',
      status: 'in-progress',
      assignedTo: vaEmail,
      dueDate: '2026-10-12',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Draft email to Tokyo hotel',
      status: 'in-progress',
      assignedTo: vaEmail,
      dueDate: '2026-10-12',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Schedule planning call (Client B)',
      status: 'pending-approval',
      assignedTo: vaEmail,
      dueDate: '2026-10-10',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Update contact list',
      status: 'done',
      assignedTo: vaEmail,
      dueDate: '2026-10-01',
      priority: 'low',
    },
  ];

  const metrics: VAMetrics = {
    assignedClients: 3,
    activeTasks: 6,
    tasksAwaitingAction: 1,
    completedThisWeek: 4,
  };

  return { clients, tasks, metrics };
}

// Admin dashboard data
export function getAdminDashboardData() {
  const metrics: AdminMetrics = {
    totalClients: 8,
    totalVAs: 3,
    activeProjects: 12,
    tasksCompleted: 47,
  };

  const recentActivity = [
    { timestamp: '2026-10-08 14:30', user: 'Sarah Chen', action: 'Completed: Book Tokyo trip research' },
    { timestamp: '2026-10-08 12:15', user: 'Anastasia K.', action: 'Approved: Draft email to hotel' },
    { timestamp: '2026-10-08 10:45', user: 'Sarah Chen', action: 'Created: Schedule planning call' },
    { timestamp: '2026-10-07 16:20', user: 'Admin', action: 'Assigned Sarah to Anastasia K. (client)' },
  ];

  const teamUtilization = [
    { name: 'Sarah Chen', role: 'VA', clients: 3, tasksThisWeek: 12 },
    { name: 'Manager', role: 'Senior VA', clients: 2, tasksThisWeek: 8 },
    { name: 'Admin', role: 'Admin', clients: 0, tasksThisWeek: 2 },
  ];

  return { metrics, recentActivity, teamUtilization };
}