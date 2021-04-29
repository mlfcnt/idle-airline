import MainTemplate from "../layout/Main";
import "antd/dist/antd.dark.css";

function MyApp({ Component, pageProps }) {
  return (
    <MainTemplate>
      <Component {...pageProps} />
    </MainTemplate>
  );
}

export default MyApp;
