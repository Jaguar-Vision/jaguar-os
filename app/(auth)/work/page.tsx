import { getVADashboardData } from '@/lib/dashboards';

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="jo-metric">
      <p className="jo-metric-label">{label}</p>
      <p className="jo-metric-value">{value}</p>
    </div>
  );
}

export default function VADashboard() {
  const { clients, tasks, metrics } = getVADashboardData('sarah@jaguar-os.local');

  return (
    <div>
      <header className="jo-page-head">
        <p className="jo-eyebrow">Team workload</p>
        <h2 className="jo-title">Your <em>workload</em></h2>
        <p className="jo-lede">Your assigned clients and open tasks.</p>
      </header>

      <div className="jo-metrics">
        <Metric label="Assigned clients" value={metrics.assignedClients} />
        <Metric label="Active tasks" value={metrics.activeTasks} />
        <Metric label="Awaiting action" value={metrics.tasksAwaitingAction} />
        <Metric label="Completed this week" value={metrics.completedThisWeek} />
      </div>

      <section className="jo-section">
        <h3 className="jo-section-title">Your clients</h3>
        <ul className="jo-list">
          {clients.map((client) => (
            <li key={client.id} className="jo-row">
              <div>
                <p className="jo-row-title">{client.name}</p>
                <p className="jo-row-meta">{client.activeTasks} active tasks</p>
              </div>
              <button className="jo-btn">View details</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="jo-section">
        <h3 className="jo-section-title">Your tasks</h3>
        <ul className="jo-list">
          {tasks.map((task) => (
            <li key={task.id} className="jo-row">
              <div>
                <p className="jo-row-title">{task.title}</p>
                <p className="jo-row-meta">Due {task.dueDate}</p>
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