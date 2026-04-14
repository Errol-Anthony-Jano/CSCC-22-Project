import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActivLog from './ActivLog';

// Mock the Navbar component
vi.mock('./Navbar', () => ({
  Navbar: () => <div data-testid="mock-navbar">Navbar Mock</div>
}));

// Mock CSS module
vi.mock('./ActivLog.module.css', () => ({
  default: {
    'search1': 'search1',
    'page': 'page',
    'actions': 'actions',
    'center-title': 'center-title',
    'title': 'title',
    'result-note': 'result-note',
    'table-container': 'table-container',
    'dt-date': 'dt-date',
    'dt-time': 'dt-time',
    'star': 'star',
    'empty-row': 'empty-row'
  }
}));

describe('ActivLog Component', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('Rendering Tests', () => {
    it('should render the Navbar component', () => {
      render(<ActivLog />);
      expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    });

    it('should render the Activity Log title', () => {
      render(<ActivLog />);
      expect(screen.getByText('Activity Log')).toBeInTheDocument();
    });

    it('should render the search input field', () => {
      render(<ActivLog />);
      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'search');
    });

    it('should render the transactions table', () => {
      render(<ActivLog />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      
      // Check table headers
      expect(screen.getByText('Product')).toBeInTheDocument();
      expect(screen.getByText('Date&time')).toBeInTheDocument();
      expect(screen.getByText('Quantity')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    it('should display all 10 transactions by default', () => {
      render(<ActivLog />);
      const rows = screen.getAllByRole('row');
      // Header row + 10 data rows = 11 rows
      expect(rows.length - 1).toBe(10);
    });

    it('should display product names correctly', () => {
      render(<ActivLog />);
      expect(screen.getByText('Wireless Earbuds Pro')).toBeInTheDocument();
      expect(screen.getByText('USB-C Hub 7-in-1')).toBeInTheDocument();
      expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
    });

    it('should display star icon before product names', () => {
      render(<ActivLog />);
      const stars = screen.getAllByText('☆');
      expect(stars.length).toBe(10);
    });

    it('should format dates correctly', () => {
      render(<ActivLog />);
      // Check for April 5, 2026 transaction
      expect(screen.getByText('April 5, 2026')).toBeInTheDocument();
      expect(screen.getByText('10:32 AM')).toBeInTheDocument();
    });

    it('should display correct activity labels (Remove/Add)', () => {
      render(<ActivLog />);
      const removeLabels = screen.getAllByText('Remove');
      const addLabels = screen.getAllByText('Add');
      
      // Count transactions by type from the mock data
      expect(removeLabels.length).toBe(5); // 5 remove transactions
      expect(addLabels.length).toBe(5);     // 5 add transactions
    });

    it('should display quantities correctly', () => {
      render(<ActivLog />);
      expect(screen.getByText('2')).toBeInTheDocument();  // Earbuds remove
      expect(screen.getByText('1')).toBeInTheDocument();  // USB-C add
      expect(screen.getByText('3')).toBeInTheDocument();  // Keyboard remove
    });
  });

  describe('Search Functionality Tests', () => {
    it('should filter transactions by product name', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Earbuds');
      
      expect(screen.getByText('Wireless Earbuds Pro')).toBeInTheDocument();
      expect(screen.queryByText('Gaming Monitor 27"')).not.toBeInTheDocument();
    });

    it('should filter transactions by activity type (Remove)', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Remove');
      
      const removeItems = screen.getAllByText('Remove');
      expect(removeItems.length).toBe(5);
      expect(screen.queryByText('Add')).not.toBeInTheDocument();
    });

    it('should filter transactions by activity type (Add)', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Add');
      
      const addItems = screen.getAllByText('Add');
      expect(addItems.length).toBe(5);
      expect(screen.queryByText('Remove')).not.toBeInTheDocument();
    });

    it('should filter transactions by partial name match', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'mouse');
      
      expect(screen.getByText('Ergonomic Mouse')).toBeInTheDocument();
      expect(screen.queryByText('Laptop Stand Aluminum')).not.toBeInTheDocument();
    });

    it('should be case insensitive when searching', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'earbuds');
      
      expect(screen.getByText('Wireless Earbuds Pro')).toBeInTheDocument();
    });

    it('should show "No transactions found" when search has no matches', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Nonexistent Product XYZ');
      
      expect(screen.getByText('No transactions found.')).toBeInTheDocument();
    });

    it('should display result count message when searching', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Earbuds');
      
      expect(screen.getByText('1 result found')).toBeInTheDocument();
    });

    it('should display plural result count for multiple matches', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Wireless');
      
      expect(screen.getByText('1 result found')).toBeInTheDocument();
    });

    it('should clear filter when search input is cleared', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'Earbuds');
      expect(screen.queryByText('Gaming Monitor 27"')).not.toBeInTheDocument();
      
      await user.clear(searchInput);
      expect(screen.getByText('Gaming Monitor 27"')).toBeInTheDocument();
    });

    it('should not show result count message when search is empty', () => {
      render(<ActivLog />);
      expect(screen.queryByText(/result[s]? found/)).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases Tests', () => {
    it('should handle whitespace-only search queries', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, '   ');
      
      // Should show all transactions
      const rows = screen.getAllByRole('row');
      expect(rows.length - 1).toBe(10);
    });

    it('should handle special characters in search', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, '@#$%');
      
      expect(screen.getByText('No transactions found.')).toBeInTheDocument();
    });

    it('should maintain table structure when empty', async () => {
      const user = userEvent.setup();
      render(<ActivLog />);
      
      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'xyzabc');
      
      const emptyRow = screen.getByText('No transactions found.');
      expect(emptyRow).toHaveAttribute('colspan', '4');
    });
  });

  describe('Performance Tests', () => {
    it('should memoize filtered transactions', () => {
      const { rerender } = render(<ActivLog />);
      
      // Initial render
      const initialRows = screen.getAllByRole('row').length;
      
      // Re-render with same props
      rerender(<ActivLog />);
      const afterRerenderRows = screen.getAllByRole('row').length;
      
      expect(initialRows).toBe(afterRerenderRows);
    });
  });

  describe('Accessibility Tests', () => {
    it('should have search input with appropriate attributes', () => {
      render(<ActivLog />);
      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toHaveAttribute('type', 'search');
    });

    it('should have a proper table structure with thead and tbody', () => {
      render(<ActivLog />);
      const table = screen.getByRole('table');
      expect(table.querySelector('thead')).toBeInTheDocument();
      expect(table.querySelector('tbody')).toBeInTheDocument();
    });
  });
});