import "./showCard.scss";

function ShowCard() {
    const data=[
        {d:"View Daily & Weekly Menus"},
        {d:"Pre-book Meals Before Deadline"},
        {d:" Admin Dashboard for Waste Tracking"},
        {d:" Real-Time Feedback & Ratings"},
        {d:" Secure Login for Students/Admins"},
        {d:"Automated Notifications & Reminders"}
    ]
  return (
    <div className="main">
        <div className="showCard">
     {data.map((item,key)=>(
        <div className="grids">
            {item.d}
        </div>
      ))}
    </div>
    </div>
  );
}

export default ShowCard;