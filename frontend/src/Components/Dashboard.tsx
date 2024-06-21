import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex space-x-4">
        <div>
          <button onClick={() => { 
            navigate("/random")
          }}>Play online</button>
        </div>
        <div>
          <button>Play Random</button>
        </div>
      </div>
    </>
  );
}
