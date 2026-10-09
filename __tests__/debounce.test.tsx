import { DEBOUNCE_MS } from '@constants/student';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import React from 'react';
import { act,create,type ReactTestRenderer } from 'react-test-renderer';
let current = '';
function Probe({value}: {value: string}) {current = useDebouncedValue(value, DEBOUNCE_MS); return null;}
test('rapid typing cancels the previous timer and waits exactly the student delay', () => {
  jest.useFakeTimers();
  let tree: ReactTestRenderer;
  act(() => {tree = create(<Probe value="" />);});
  act(() => {tree.update(<Probe value="co" />);});
  act(() => {jest.advanceTimersByTime(200);});
  act(() => {tree.update(<Probe value="com" />);});
  act(() => {jest.advanceTimersByTime(DEBOUNCE_MS - 1);});
  expect(current).toBe('');
  act(() => {jest.advanceTimersByTime(1);});
  expect(current).toBe('com');
  act(() => {tree.unmount();});
  expect(jest.getTimerCount()).toBe(0);
  jest.useRealTimers();
});

