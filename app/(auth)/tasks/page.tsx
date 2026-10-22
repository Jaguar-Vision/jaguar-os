import { getClientDashboardData } from '@/lib/dashboards';

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="jo-metric">
      <p className="jo-metric-label">{label}</p>
      <p className="jo-metric-value">{value}</p>
    </div>
  );
}

export default function ClientDashboard() {
  const { tasks, approvals, metrics } = getClientDashboardData('anastasia@example.com');

  return (
    <div>
      <header className="jo-page-head">
        <p className="jo-eyebrow">Client overview</p>
        <h2 className="jo-title">Welcome back, <em>Anastasia</em></h2>
        <p className="jo-lede">Here is where your requests stand.</p>
      </header>

      <div className="jo-metrics">
        <Metric label="Total tasks" value={metrics.totalTasks} />
        <Metric label="Pending approvals" value={metrics.pendingApprovals} />
        <Metric label="Completed this month" value={metrics.completedThisMonth} />
      </div>

      <section className="jo-section">
        <h3 className="jo-section-title">Waiting your approval ({approvals.length})</h3>
        <ul className="jo-list">
          {approvals.map((approval) => (
            <li key={approval.id} className="jo-row">
              <div>
                <p className="jo-row-title">{approval.title}</p>
                <p className="jo-row-meta">
                  {approval.type} · {approval.createdAt}
                </p>
              </div>
              <button className="jo-btn jo-btn-solid">Review</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="jo-section">
        <h3 className="jo-section-title">My tasks</h3>
        <ul className="jo-list">
          {tasks.map((task) => (
            <li key={task.id} className="jo-row">
              <div>
                <p className="jo-row-title">{task.title}</p>
                <p className="jo-row-meta">
                  {task.assignedTo ? `Assigned to ${task.assignedTo}` : 'Unassigned'} · Due {task.dueDate}
                </p>
              </div>
              <div className="jo-pills">
                <span className={task.status === 'done' ? 'jo-pill jo-pill-solid' : 'jo-pill'}>
                  {task.status}
                </span>
                <span className={task.priority === 'high' ? 'jo-pill jo-pill-solid' : 'jo-pill'}>
                  {task.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}