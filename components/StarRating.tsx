type Props = {
  score?: number;
  size?: number; // px
};

export default function StarRating({ score = 0, size = 24 }: Props) {
  const fullStars = Math.floor(score);
  const halfStar = score - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  // 星の色
  const color = "#222";
  const emptyColor = "#ccc";

  // 半分星はCSSグラデーションで左半分黒(#222)、右半分灰色(#ccc)
  const halfStarStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    position: "relative",
    color: color,
    fontSize: size,
    lineHeight: 1,
    background: `linear-gradient(to right, ${color} 50%, ${emptyColor} 50%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    verticalAlign: "middle",
    fontFamily: "inherit",
    margin: 0,
    padding: 0,
  };

  return (
    <span
      style={{
        fontSize: size,
        letterSpacing: "2px",
        color,
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "middle",
        lineHeight: 1,
        fontFamily: "inherit",
        margin: 0,
        padding: 0,
      }}
    >
      {/* full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} style={{
          width: size,
          height: size,
          display: "inline-block",
          color: color,
          fontSize: size,
          lineHeight: 1,
          verticalAlign: "middle",
          fontFamily: "inherit",
          margin: 0,
          padding: 0,
        }}>★</span>
      ))}
      {/* half star */}
      {halfStar === 1 && (
        <span key="half" style={halfStarStyle}>★</span>
      )}
      {/* empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} style={{
          width: size,
          height: size,
          display: "inline-block",
          color: emptyColor,
          fontSize: size,
          lineHeight: 1,
          verticalAlign: "middle",
          fontFamily: "inherit",
          margin: 0,
          padding: 0,
        }}>☆</span>
      ))}
    </span>
  );
}