import { getClientDashboardData } from '@/lib/dashboards';

export default function ClientDashboard() {
  const { tasks, approvals, metrics } = getClientDashboardData('anastasia@example.com');

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Anastasia</h2>
        <p className="text-gray-600">Here's your task overview.</p>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Tasks</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalTasks}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{metrics.pendingApprovals}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Completed This Month</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{metrics.completedThisMonth}</p>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Waiting Your Approval ({approvals.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {approvals.map((approval) => (
            <div key={approval.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">{approval.title}</p>
                <p className="text-sm text-gray-600">{approval.type} - {approval.createdAt}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                Review
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">My Tasks</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">Assigned to: {task.assignedTo || 'Unassigned'}</p>
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