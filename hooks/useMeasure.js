import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref.current]);
  return [{ ref }, bounds];
}

export default useMeasure;
