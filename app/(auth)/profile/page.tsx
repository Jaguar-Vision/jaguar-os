export default function ProfilePage() {
  return (
    <div>
      <header className="jo-page-head">
        <p className="jo-eyebrow">Account</p>
        <h2 className="jo-title">Your <em>profile</em></h2>
      </header>

      <div style={{ maxWidth: 560 }}>
        <div className="jo-field">
          <p className="jo-field-label">Email</p>
          <p className="jo-field-value">anastasia@example.com</p>
        </div>
        <div className="jo-field">
          <p className="jo-field-label">Role</p>
          <p className="jo-field-value">Client</p>
        </div>
      </div>

      <p className="jo-lede" style={{ marginTop: 40 }}>Settings coming soon.</p>
    </div>
  );
}