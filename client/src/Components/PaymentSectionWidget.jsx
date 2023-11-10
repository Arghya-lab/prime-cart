import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function PaymentSectionWidget() {
  const [selected, setSelected] = useState("2ndOpt");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <Box marginLeft="35px">
      <Box
        border="1px solid #D5D9D9"
        borderRadius="8px 8px 0 0"
        padding="14px 18px">
        <Typography
          variant="h6"
          fontSize="18px"
          lineHeight="24px"
          fontWeight={600}
          borderBottom="1px solid #D5D9D9"
          gutterBottom
          marginBottom="19px">
          Available payment methods
        </Typography>
        <Box>
          <Box
            padding="9px"
            border={`1px solid ${selected === "1stOpt" ? "#FBD8B4" : "#FFF"}`}
            borderRadius="5px"
            bgcolor={selected === "1stOpt" ? "#FCF5EE" : "#FFF"}>
            <label
              style={{
                paddingLeft: "15px",
                display: "flex",
              }}>
              <Box
                sx={{
                  height: "16px",
                  width: "16px",
                }}>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="1stOpt"
                  checked={selected === "1stOpt"}
                  onChange={handleChange}
                  style={{
                    verticalAlign: "top",
                    position: "relative",
                    bottom: "-3px",
                  }}
                />
              </Box>
              <Box paddingLeft="10px">
                <Typography variant="body1" fontWeight={600} paragraph>
                  Credit or debit card
                </Typography>
                {selected === "1stOpt" ? (
                  <>
                    <Typography
                      component="span"
                      color="#007185"
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          color: "#C7511F",
                          textDecoration: "underline",
                        },
                      }}
                      onClick={handleOpen}>
                      Enter card details
                    </Typography>
                    &nbsp;&rsaquo;&nbsp;
                    <Typography component="span">
                      Prime Cart accepts all major credit & cards
                    </Typography>
                    <Modal
                      open={open}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 700,
                          bgcolor: "background.paper",
                          border: "1px solid #D5D9D9",
                          borderRadius: "8px",
                          boxShadow: 24,
                        }}>
                        <Box
                          sx={{
                            borderBottom: "1px solid #D5D9D9",
                            borderRadius: "8px 8px 0 0",
                            backgroundColor: "#F0F2F2",
                            padding: "16px 24px",
                          }}>
                          <Typography id="modal-modal-title" fontWeight={600}>
                            Enter card details
                          </Typography>
                        </Box>
                        <Box padding="16px 24px" display="flex">
                          <Cards
                            number={state.number}
                            expiry={state.expiry}
                            cvc={state.cvc}
                            name={state.name}
                            focused={state.focus}
                          />
                          <form style={{ width: "50%" }}>
                            <TextField
                              label="Card Number"
                              variant="standard"
                              fullWidth
                              type="number"
                              name="number"
                              value={state.number}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                            />
                            <TextField
                              label="Name"
                              variant="standard"
                              fullWidth
                              type="text"
                              name="name"
                              value={state.name}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                            />
                            <TextField
                              label="Exp date"
                              variant="standard"
                              fullWidth
                              type="number"
                              name="expiry"
                              pattern="\d\d/\d\d"
                              value={state.expiry}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                            />
                            <TextField
                              label="CVC"
                              variant="standard"
                              fullWidth
                              type="number"
                              name="cvc"
                              value={state.cvc}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                            />
                          </form>
                        </Box>
                        <Box
                          sx={{
                            borderTop: "1px solid #D5D9D9",
                            borderRadius: "0 0 8px 8px",
                            backgroundColor: "#F0F2F2",
                            padding: "10px 16px",
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "8px",
                          }}>
                          <Button
                            size="small"
                            sx={{
                              color: "#0F1111",
                              bgcolor: "#FFF",
                              border: "1px solid #D5D9D9",
                              ":hover": { bgcolor: "#F0F0F0" },
                            }}
                            onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              color: "#0F1111",
                              bgcolor: "#FFD814",
                              ":hover": { bgcolor: "#FCD200" },
                            }}>
                            Enter card details
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </>
                ) : null}
              </Box>
            </label>
          </Box>
          <Box
            padding="9px"
            border={`1px solid ${selected === "2ndOpt" ? "#FBD8B4" : "#FFF"}`}
            borderRadius="5px"
            bgcolor={selected === "2ndOpt" ? "#FCF5EE" : "#FFF"}>
            <label
              style={{
                paddingLeft: "15px",
                display: "flex",
              }}>
              <Box
                sx={{
                  height: "16px",
                  width: "16px",
                }}>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="2ndOpt"
                  checked={selected === "2ndOpt"}
                  onChange={handleChange}
                  style={{
                    verticalAlign: "top",
                    position: "relative",
                    bottom: "-3px",
                  }}
                />
              </Box>
              <Typography variant="body1" fontWeight={600} paddingLeft="10px">
                Cash on Delivery/Pay on Delivery
              </Typography>
            </label>
          </Box>
        </Box>
      </Box>
      <Box
        borderRadius="0 0 8px 8px"
        border="1px #D5D9D9 solid"
        padding="12px 18px 11px"
        bgcolor="#F0F2F2">
        <Button
          sx={{
            color: "#0F1111",
            bgcolor: "#FFD814",
            ":hover": { bgcolor: "#FCD200" },
          }}>
          use this address
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentSectionWidget;
