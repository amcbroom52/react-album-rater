

function StarField({ numStars }) {

  function getStarType(num) {
    if(num < numStars && num + 1 <= numStars) {
      return (
        <span className="text-secondary" key={num}>
          <i className="bi bi-star-fill"></i>
        </span>
      )
    } else if (num < numStars && num + 1 > numStars) {
      return (
        <span className="text-secondary" key={num}>
          <i className="bi bi-star-half"></i>
        </span>
      )
    } else {
      return (
        <span className="text-secondary" key={num}>
          <i className="bi bi-star"></i>
        </span>
      )
    }
  }


  return (
    <>
      {[0, 1, 2, 3, 4].map(getStarType)}
    </>
  )
}

export default StarField;