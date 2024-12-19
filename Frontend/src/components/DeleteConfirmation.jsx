import React from "react";
import PropTypes from "prop-types";

const DeleteConfirmationModal = ({ foodName, onConfirm, onCancel }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
          Are you sure you want to delete <strong>{foodName}</strong>?
        </h3>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: "#ff5c5c",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Sure!
          </button>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#ddd",
              color: "#333",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  foodName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;