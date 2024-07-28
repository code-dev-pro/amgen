import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useUserProgressStore } from '../src/stores/userProgressStore';

describe('useUserProgressStore', () => {
  beforeEach(() => {
    act(() => {
      useUserProgressStore.getState().resetProgress();
    });
  });

  it('should initialize with an empty completedMountains array', () => {
    const { result } = renderHook(() => useUserProgressStore());
    expect(result.current.completedMountains).toEqual([]);
  });

  it('should add a mountain to completedMountains', () => {
    const { result } = renderHook(() => useUserProgressStore());

    act(() => {
      result.current.markMountainAsCompleted('Everest');
    });

    expect(result.current.completedMountains).toEqual(['Everest']);
  });

  it('should add multiple mountains to completedMountains', () => {
    const { result } = renderHook(() => useUserProgressStore());

    act(() => {
      result.current.markMountainAsCompleted('Everest');
      result.current.markMountainAsCompleted('K2');
    });

    expect(result.current.completedMountains).toEqual(['Everest', 'K2']);
  });

  it('should reset progress', () => {
    const { result } = renderHook(() => useUserProgressStore());

    act(() => {
      result.current.markMountainAsCompleted('Everest');
      result.current.resetProgress();
    });

    expect(result.current.completedMountains).toEqual([]);
  });

  it('should persist state between hook calls', () => {
    const { result: result1 } = renderHook(() => useUserProgressStore());

    act(() => {
      result1.current.markMountainAsCompleted('Everest');
    });

    const { result: result2 } = renderHook(() => useUserProgressStore());
    expect(result2.current.completedMountains).toEqual(['Everest']);
  });
});
