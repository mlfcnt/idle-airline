import MainTemplate from "../layout/Main";
import "antd/dist/antd.dark.css";
import { ResourcesWrapper } from "../context/Resources";

function MyApp({ Component, pageProps }) {
  return (
    <ResourcesWrapper>
      <MainTemplate>
        <Component {...pageProps} />
      </MainTemplate>
    </ResourcesWrapper>
  );
}

export default MyApp;
