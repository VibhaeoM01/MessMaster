import "./showCard.scss";

function ShowCard() {
  const data = [
    { d: "View Menu", desc: "Easily browse daily and weekly meals" },
    {
      d: "Pre-book Meals",
      desc: "Reserve your spot for upcoming meals to ensure availability and reduce waste",
    },
    {
      d: "Give Feedback",
      desc: "Share your thoughts and suggestions on meals and services instantly"
    },
  ];
  return (
    <div className="main">
        <h1>Features</h1>
      <div className="showCard">
        {data.map((item, key) => (
          <div className="grids" key={key}>
            <div className="card-title">{item.d}</div>
            <div className="card-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCard;