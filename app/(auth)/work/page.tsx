import { getVADashboardData } from '@/lib/dashboards';

export default function VADashboard() {
  const { clients, tasks, metrics } = getVADashboardData('sarah@jaguar-os.local');

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Workload</h2>
        <p className="text-gray-600">Manage your assigned clients and tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Assigned Clients</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.assignedClients}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Active Tasks</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.activeTasks}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Awaiting Action</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{metrics.tasksAwaitingAction}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Completed This Week</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{metrics.completedThisWeek}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Clients</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {clients.map((client) => (
            <div key={client.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.activeTasks} active tasks</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    task.status === 'done' ? 'bg-green-100 text-green-800' :
                    task.status === 'pending-approval' ? 'bg-yellow-100 text-yellow-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}