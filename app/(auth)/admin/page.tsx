import { getAdminDashboardData } from '@/lib/dashboards';

export default function AdminDashboard() {
  const { metrics, recentActivity, teamUtilization } = getAdminDashboardData();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Operations Dashboard</h2>
        <p className="text-gray-600">Platform metrics and team overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Clients</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalClients}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">VAs Active</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalVAs}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Active Projects</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.activeProjects}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{metrics.tasksCompleted}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Team Utilization</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Clients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tasks (Week)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamUtilization.map((person) => (
                <tr key={person.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{person.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{person.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{person.clients}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{person.tasksThisWeek}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">by {activity.user}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}