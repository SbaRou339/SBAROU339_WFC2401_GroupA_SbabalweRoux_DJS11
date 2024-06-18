const EchoPodLogo = () => {
  const svgNS = "http://www.w3.org/2000/svg";
  const primaryColor = '#4A90E2';
  const secondaryColor = '#50E3C2';
  const textColor = '#63C5DA';
  const fontFamily = 'Arial';

  return (
    <svg width="150" height="50" viewBox="0 0 300 100" xmlns={svgNS}>
      <circle cx="50" cy="50" r="40" fill={primaryColor} />
      <circle cx="50" cy="50" r="30" fill={secondaryColor} />
      <text x="100" y="70" fill={textColor} fontSize="40px" fontFamily={fontFamily}>
        EchoPod
      </text>
    </svg>
  );
};

export default EchoPodLogo;
