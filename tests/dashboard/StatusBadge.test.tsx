import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../../src/dashboard/src/components/StatusBadge';

describe('StatusBadge', () => {
  it('renders healthy badge', () => {
    render(<StatusBadge status="healthy" />);
    expect(screen.getByText('Healthy')).toBeInTheDocument();
  });

  it('renders expiring-soon badge', () => {
    render(<StatusBadge status="expiring-soon" />);
    expect(screen.getByText('Expiring Soon')).toBeInTheDocument();
  });

  it('renders expired badge', () => {
    render(<StatusBadge status="expired" />);
    expect(screen.getByText('Expired')).toBeInTheDocument();
  });

  it('renders error badge', () => {
    render(<StatusBadge status="error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders pending badge', () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('applies correct class for healthy', () => {
    const { container } = render(<StatusBadge status="healthy" />);
    expect(container.firstChild).toHaveClass('bg-green-900');
  });

  it('applies correct class for expired', () => {
    const { container } = render(<StatusBadge status="expired" />);
    expect(container.firstChild).toHaveClass('bg-red-900');
  });
});
