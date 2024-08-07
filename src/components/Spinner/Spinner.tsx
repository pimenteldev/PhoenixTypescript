import logo from "/logo.svg"
import "./spinner.css"
const Spinner = () => {
  return (
    <div className="spinner">
      <img
        src={logo}
        alt="Chef Cuisine"
        className={"spinImg"}
      />
      <div className={"spin"}>
        <div className={"c1"}></div>
        <div className={"c2"}></div>
        <div className={"c3"}></div>
      </div>
    </div>
  )
}

export default Spinner
