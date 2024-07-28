import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useIdleTimer } from './useIdleTimer';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useIdleTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should set isIdle to true after timeout', () => {
    const { result } = renderHook(() => useIdleTimer(1000), {
      wrapper: MemoryRouter,
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isIdle).toBe(true);
  });

  it('should reset timer on activity', () => {
    const { result } = renderHook(() => useIdleTimer(1000), {
      wrapper: MemoryRouter,
    });

    act(() => {
      vi.advanceTimersByTime(500);
      result.current.resetTimer();
      vi.advanceTimersByTime(500);
    });

    expect(result.current.isIdle).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.isIdle).toBe(true);
  });
});
