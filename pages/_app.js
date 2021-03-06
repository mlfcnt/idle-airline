import MainTemplate from "../layout/Main";
import "antd/dist/antd.dark.css";
import { GlobalContextWrapper } from "../context/GlobalContext";
import "../style/global.style.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <MainTemplate>
        <Component {...pageProps} />
      </MainTemplate>
    </GlobalContextWrapper>
  );
}

export default MyApp;
