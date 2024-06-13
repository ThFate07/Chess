import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <>
      <div className="flex space-x-4">
        <div>
          <Link to="/random"><button>Play online</button></Link>
        </div>
        <div>
          <button>Play Random</button>
        </div>
      </div>
    </>
  );
}
