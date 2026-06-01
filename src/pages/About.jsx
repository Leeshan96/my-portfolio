import React from 'react';
import { PageWrapper } from '../components/PageWrapper';

export default function About() {
  return (
    <PageWrapper>
      <main style={{ padding: 'var(--space-10) 0', minHeight: '60vh' }}>
        <div className="content-wrap">
          <h1 style={{ font: 'var(--text-h1)', marginBottom: 'var(--space-5)' }}>About</h1>
          <p style={{ font: 'var(--text-body-1-regular)', color: 'var(--color-text-secondary)' }}>
            Coming soon.
          </p>
        </div>
      </main>
    </PageWrapper>
  );
}
