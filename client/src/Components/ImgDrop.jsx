import { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { useDropzone } from "react-dropzone";
import { Masonry } from "@mui/lab";
import { Box, Typography } from "@mui/material";

// dropzone style //
const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px",
  borderWidth: 2,
  borderRadius: 6,
  borderColor: "rgb(113 113 122)",
  borderStyle: "dashed",
  color: "#A7A3B0",
  fontFamily: "Poppins, ui-serif, Georgia, Cambria, Times, serif",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function ImgDrop({ onDropzoneValue }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 10,
      onDrop: (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFiles(newFiles);
        onDropzoneValue(newFiles);
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box className="container" sx={{ width: "100%" }}>
      <Masonry columns={{ xs: 4, sm: 6 }} spacing={2}>
        {files.map((file) => (
          <div style={{ padding: 4 }} key={file.name}>
            <img
              style={{ display: "block", width: "95px", maxHeight: "300px" }}
              src={file.preview}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        ))}
      </Masonry>
      <Box {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        <Typography>
          Drag & drop some images here, or click to select images
        </Typography>
      </Box>
    </Box>
  );
}

ImgDrop.propTypes = {
  onDropzoneValue: PropTypes.func.isRequired,
};

export default ImgDrop;
