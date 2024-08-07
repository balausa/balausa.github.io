import styled from "styled-components";

const LoaderWrapper = styled.div.attrs({
  className: "flex justify-center items-center min-h-screen",
})``;

const LoaderCircle = styled.div.attrs({
  className: "relative",
})`
  width: 64px;
  height: 64px;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoaderComponent = () => (
  <LoaderWrapper>
    <LoaderCircle />
  </LoaderWrapper>
);

export default LoaderComponent;
