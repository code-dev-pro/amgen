import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePopupStore } from '../src/stores/popupStore';

describe('usePopupStore', () => {
  beforeEach(() => {
    act(() => {
      usePopupStore.getState().closePopup();
    });
  });

  it('should initialize with popup closed', () => {
    const { result } = renderHook(() => usePopupStore());
    expect(result.current.isPopupOpen).toBe(false);
    expect(result.current.popupType).toBeNull();
    expect(result.current.popupContent).toBeNull();
  });

  it('should open popup with form type', () => {
    const { result } = renderHook(() => usePopupStore());

    act(() => {
      result.current.openPopup('form', <div>Form Content</div>);
    });

    expect(result.current.isPopupOpen).toBe(true);
    expect(result.current.popupType).toBe('form');
    expect(result.current.popupContent).toEqual(<div>Form Content</div>);
  });

  it('should open popup with learnMore type', () => {
    const { result } = renderHook(() => usePopupStore());

    act(() => {
      result.current.openPopup('learnMore', <div>Learn More Content</div>);
    });

    expect(result.current.isPopupOpen).toBe(true);
    expect(result.current.popupType).toBe('learnMore');
    expect(result.current.popupContent).toEqual(<div>Learn More Content</div>);
  });

  it('should close popup', () => {
    const { result } = renderHook(() => usePopupStore());

    act(() => {
      result.current.openPopup('form', <div>Form Content</div>);
      result.current.closePopup();
    });

    expect(result.current.isPopupOpen).toBe(false);
    expect(result.current.popupType).toBeNull();
    expect(result.current.popupContent).toBeNull();
  });

  it('should update popup content when already open', () => {
    const { result } = renderHook(() => usePopupStore());

    act(() => {
      result.current.openPopup('form', <div>Initial Content</div>);
      result.current.openPopup('learnMore', <div>Updated Content</div>);
    });

    expect(result.current.isPopupOpen).toBe(true);
    expect(result.current.popupType).toBe('learnMore');
    expect(result.current.popupContent).toEqual(<div>Updated Content</div>);
  });
});
