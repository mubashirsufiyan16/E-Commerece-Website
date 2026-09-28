import "../App.css"

function HeroBanner() {
  return (
    <div className="hero">
      <div className="hero-content">
        <p>NEW COLLECTION</p>

        <h1 style={{
    background: "linear-gradient(red, yellow)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}>Upgrade Your Style</h1>

        <span>Discover amazing products at the best prices.</span>

        <button style={{fontSize:"20px"}} className="buttons">Shop Now</button>
      </div>

      <div className="hero-image">
       <img
       src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
       alt="Fashion Collection"
/>
      </div>
    </div>
  );
}

export default HeroBanner;