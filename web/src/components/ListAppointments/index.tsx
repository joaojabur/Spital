import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const ListAppointments = () => {
  return (
    <div className="list-appointments">
      <Link to={`/consultas/${"id"}`} className="list-appointments-unique">
        <div className="list-appoints-unique-information">
          <div className="list-appoints-unique-information-flex">
            <div className="list-appoints-unique-information-image"></div>
            <div className="list-appoints-unique-information-text">
              <h2>Dr. Jaison</h2>
              <span>Oftalmologista</span>
            </div>
          </div>
          <div className="list-appoints-unique-status">
            <div className="list-appoints-unique-status-value">Ativo</div>
            <p className="list-appoints-unique-status-text">Daqui 2 dias...</p>
          </div>
        </div>
        <footer>
          <p style={{ marginLeft: "2rem" }}>3 de Maio</p>
          <p style={{ marginRight: "2rem" }}>2:00 PM</p>
        </footer>
      </Link>

      <Link to={`/consultas/${"id"}`} className="list-appointments-unique">
        <div className="list-appoints-unique-information">
          <div className="list-appoints-unique-information-flex">
            <div className="list-appoints-unique-information-image"></div>
            <div className="list-appoints-unique-information-text">
              <h2>Dr. Jaison</h2>
              <span>Oftalmologista</span>
            </div>
          </div>
          <div className="list-appoints-unique-status">
            <div className="list-appoints-unique-status-value">Ativo</div>
            <p className="list-appoints-unique-status-text">Daqui 2 dias...</p>
          </div>
        </div>
        <footer>
          <p style={{ marginLeft: "2rem" }}>3 de Maio</p>
          <p style={{ marginRight: "2rem" }}>2:00 PM</p>
        </footer>
      </Link>

      <Link to={`/consultas/${"id"}`} className="list-appointments-unique">
        <div className="list-appoints-unique-information">
          <div className="list-appoints-unique-information-flex">
            <div className="list-appoints-unique-information-image"></div>
            <div className="list-appoints-unique-information-text">
              <h2>Dr. Jaison</h2>
              <span>Oftalmologista</span>
            </div>
          </div>
          <div className="list-appoints-unique-status">
            <div className="list-appoints-unique-status-value">Ativo</div>
            <p className="list-appoints-unique-status-text">Daqui 2 dias...</p>
          </div>
        </div>
        <footer>
          <p style={{ marginLeft: "2rem" }}>3 de Maio</p>
          <p style={{ marginRight: "2rem" }}>2:00 PM</p>
        </footer>
      </Link>

      <Link to={`/consultas/${"id"}`} className="list-appointments-unique">
        <div className="list-appoints-unique-information">
          <div className="list-appoints-unique-information-flex">
            <div className="list-appoints-unique-information-image"></div>
            <div className="list-appoints-unique-information-text">
              <h2>Dr. Jaison</h2>
              <span>Oftalmologista</span>
            </div>
          </div>
          <div className="list-appoints-unique-status">
            <div className="list-appoints-unique-status-value">Ativo</div>
            <p className="list-appoints-unique-status-text">Daqui 2 dias...</p>
          </div>
        </div>
        <footer>
          <p style={{ marginLeft: "2rem" }}>3 de Maio</p>
          <p style={{ marginRight: "2rem" }}>2:00 PM</p>
        </footer>
      </Link>
    </div>
  );
};

export default ListAppointments;
