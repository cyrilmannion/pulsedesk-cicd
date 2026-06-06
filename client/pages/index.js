export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '0.25rem' }}>PulseDesk</h1>
      <p style={{ color: '#6b7280', marginTop: 0 }}>Customer Support Platform — Staging Environment</p>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem 1.25rem',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #86efac'
      }}>
        <strong style={{ color: '#16a34a' }}>✓ Deployment successful</strong>
        <p style={{ margin: '0.5rem 0 0', color: '#374151', fontSize: '0.95rem' }}>
          This page was deployed automatically via GitHub Actions → Amazon S3 → AWS CodeDeploy.
        </p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#111827' }}>CI/CD Pipeline</h2>
        <ol style={{ color: '#374151', lineHeight: '1.9', paddingLeft: '1.25rem' }}>
          <li>Developer pushes to <code style={{ background: '#f3f4f6', padding: '0 4px', borderRadius: '4px' }}>staging</code> branch on GitHub</li>
          <li>GitHub Actions triggers: Jest unit tests + Newman API tests</li>
          <li>Next.js client built — <code style={{ background: '#f3f4f6', padding: '0 4px', borderRadius: '4px' }}>next build</code> runs in CI</li>
          <li>Application packaged as <code style={{ background: '#f3f4f6', padding: '0 4px', borderRadius: '4px' }}>app.zip</code> and uploaded to Amazon S3</li>
          <li>AWS CodeDeploy pulls bundle from S3 and deploys to EC2 staging instance</li>
          <li>AppSpec lifecycle: BeforeInstall → AfterInstall → ApplicationStart → ValidateService</li>
          <li>PM2 runs Express API on port 3000 and this Next.js frontend on port 3001</li>
        </ol>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#111827' }}>Services</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', border: '1px solid #e5e7eb' }}>Service</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', border: '1px solid #e5e7eb' }}>Port</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', border: '1px solid #e5e7eb' }}>Runtime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>Express API</td>
              <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>3000</td>
              <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>Node.js / PM2</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>Next.js Frontend</td>
              <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>3001</td>
              <td style={{ padding: '8px 12px', border: '1px solid #e5e7eb' }}>Next.js / PM2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
