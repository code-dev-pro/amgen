interface PinProps {
  x: number;
  y: number;
  width: string;
  height: string;
  color: string;
}

export const Pin = ({ color, x, y, width, height }: PinProps) => {
  const encodedSVG = encodeURIComponent(`
    <svg viewBox="0 0 42 66" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" d="M40.7,20.8C40.7,31.6,25.2,61,21.2,61C16.3,61,1.7,31.6,1.7,20.8c0-10.7,8.7-19.4,19.5-19.4
        S40.7,10.1,40.7,20.8z"/>
      <path fill="#FFFFFF" d="M20.8,65.8c-0.7,0-1.3-0.4-1.7-1c-0.7-1.3-19-33.1-19-43.8C0.1,9.6,9.4,0.3,20.8,0.3S41.5,9.6,41.5,21
        c0,10.7-18.3,42.5-19.1,43.8C22.2,65.4,21.5,65.8,20.8,65.8L20.8,65.8z M20.8,4.2C11.5,4.2,4,11.7,4,21c0,7.3,11,28.4,16.9,38.9
        C26.8,49.4,37.7,28.3,37.7,21C37.7,11.7,30.1,4.2,20.8,4.2z"/>
      <path fill="#FFFFFF" d="M21,33.6c-6.5,0-11.7-5.2-11.7-11.7S14.5,10.2,21,10.2s11.7,5.2,11.7,11.7S27.4,33.6,21,33.6z M21,14.1
        c-4.3,0-7.8,3.5-7.8,7.8s3.5,7.8,7.8,7.8s7.8-3.5,7.8-7.8S25.3,14.1,21,14.1z"/>
    </svg>
  `);

  return (
    <image
      href={`data:image/svg+xml;utf8,${encodedSVG}`}
      x={x}
      y={y}
      width={width}
      height={height}
      className="absolute"
    />
  );
};
