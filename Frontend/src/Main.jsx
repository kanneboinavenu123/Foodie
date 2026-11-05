import useOnlineStatus from './context/OnlineStatus';
import './App.css';
import App from './App';

function Main() {
  const isOnline = useOnlineStatus();

  if (isOnline) return  <App/>; 
  return (
    <>
       <div
      style={{
        backgroundColor: "red",
        color: "white",
        textAlign: "center",
        padding: "10px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      ⚠️ You are offline — check your internet connection.
    </div>
    <div disabled style={{ filter: "blur(5px)", pointerEvents: "none" }}>
      <App/>
    </div>


    </>
  );
}

export default Main;
