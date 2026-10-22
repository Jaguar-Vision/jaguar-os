import { getAdminDashboardData } from '@/lib/dashboards';

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="jo-metric">
      <p className="jo-metric-label">{label}</p>
      <p className="jo-metric-value">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { metrics, recentActivity, teamUtilization } = getAdminDashboardData();

  return (
    <div>
      <header className="jo-page-head">
        <p className="jo-eyebrow">Operations</p>
        <h2 className="jo-title">Operations <em>overview</em></h2>
        <p className="jo-lede">Platform metrics and team load.</p>
      </header>

      <div className="jo-metrics">
        <Metric label="Total clients" value={metrics.totalClients} />
        <Metric label="VAs active" value={metrics.totalVAs} />
        <Metric label="Active projects" value={metrics.activeProjects} />
        <Metric label="Tasks completed" value={metrics.tasksCompleted} />
      </div>

      <section className="jo-section">
        <h3 className="jo-section-title">Team utilization</h3>
        <table className="jo-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Clients</th>
              <th>Tasks (week)</th>
            </tr>
          </thead>
          <tbody>
            {teamUtilization.map((person) => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.role}</td>
                <td>{person.clients}</td>
                <td>{person.tasksThisWeek}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="jo-section">
        <h3 className="jo-section-title">Recent activity</h3>
        <ul className="jo-list">
          {recentActivity.map((activity, idx) => (
            <li key={idx} className="jo-row">
              <div>
                <p className="jo-row-title">{activity.action}</p>
                <p className="jo-row-meta">by {activity.user}</p>
              </div>
              <p className="jo-row-meta">{activity.timestamp}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}