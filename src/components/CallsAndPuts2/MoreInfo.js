import { Modal, Typography, Box } from "@mui/material";
import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function MoreInfo({ showMoreDetails, handleCloseModal }) {
  return (
    <Modal
      open={showMoreDetails.show}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 800, overflow: "scroll", height: "80vh" }}>
        <div class="text-end" style={{ cursor: "pointer" }}>
          <i class="fas fa-times" onClick={handleCloseModal}></i>
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${showMoreDetails.data["key"]}`}
        </Typography>
        <div class="table-responsive shadow-lg p-3 my-3">
          <table class="table">
            <thead>
              <tr>
                <td scope="col">Expiration Date</td>
                <td scope="col">Call IR</td>
                <td scope="col">Put IR</td>
                <td scope="col">CP Ratio</td>
                <td scope="col">HVTF</td>
              </tr>
            </thead>
            <tbody>
              {Object.entries(showMoreDetails.data["value"]).map(
                ([key, value]) => {
                  return (
                    <tr>
                      <td>{key}</td>
                      <td>{value[0].toFixed(2)}</td>
                      <td>{value[1].toFixed(2)}</td>
                      <td>{value[2].toFixed(2)}</td>
                      <td>{value[3].toFixed(2)}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={handleCloseModal} class="btn btn-danger">
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default MoreInfo;
