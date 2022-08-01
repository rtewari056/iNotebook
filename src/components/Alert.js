import React from "react";

export default function Alert(props) {
  return (
    <>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          className={`toast toast-primary d-${props.dismissAlert} align-items-center`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              <i
                className={`fas fa-${
                  props.alertMessage.type === "success" ? "check-circle" : "ban"
                }`}
              ></i>{" "}
              {props.alertMessage.message}
            </div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => {
                props.setDismissAlert("none");
              }}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}
