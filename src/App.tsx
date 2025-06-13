import { useState } from "react";
import Button from "./components/Button";
import Calculator from "./components/Calculator";
import InfoModal from "./components/InfoModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-4">
      <Button label="Info" onClick={() => setShowModal(true)} />
      <Calculator />
      <InfoModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;
