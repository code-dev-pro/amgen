interface FlagProps {
  x: number;
  y: number;
  width: string;
  height: string;
  color: string;
}

export const Flag = ({ color, width, height, x, y }: FlagProps) => {
  const encodedSVG = encodeURIComponent(`
    <svg viewBox="0 0 48 63" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" d="M44,3H3v24.5h41l-8-13L44,3z"/>
      <path fill="#FFFFFF" d="M45.6,29.5H2.2c-1.1,0-1.9-0.9-1.9-1.9v-25c0-1.1,0.9-1.9,1.9-1.9l43.4-0.2h0c0.7,0,1.4,0.4,1.7,1.1
        c0.3,0.7,0.2,1.5-0.2,2l-9,11.2l9,11.5c0.5,0.6,0.5,1.4,0.2,2C47,29,46.3,29.5,45.6,29.5L45.6,29.5z M4.1,25.6h37.4L34.1,16
        c-0.6-0.7-0.5-1.7,0-2.4l7.4-9.3L4.1,4.5V25.6z"/>
      <path fill="#FFFFFF" d="M0.3,23L0,62.3l3.9,0l0.3-39.2L0.3,23z"/>
    </svg>
  `);

  return <image href={`data:image/svg+xml;utf8,${encodedSVG}`} x={x} y={y} width={width} height={height} />;
};
