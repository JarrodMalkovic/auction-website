import styled from '@emotion/styled';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#d1d5db';
};

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => getColor(props)};
  background-color: white;
  color: #d1d5db;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const ImageUpload = (props) => {
  const { setFieldValue } = props;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFieldValue('image', acceptedFiles[0]);
    },
  });

  return (
    <div>
      <StyledContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </StyledContainer>
      <aside>
        <ul>
          {acceptedFiles.map((file: any) => (
            <li key={file.path}>
              {file.path} - {file.size} bytes
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default ImageUpload;
