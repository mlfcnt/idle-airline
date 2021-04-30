import { Button, PageHeader, Switch } from "antd";
import React, { useMemo } from "react";
import { DownloadOutlined, CloseOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { alert } from "../lib/helpers";
import { eOptions } from "../lib/constants";

const Container = styled.div`
  display: flex;
`;

const CopyBtn = styled(CopyToClipboard)`
  margin-right: 50px;
`;

function options() {
  const { setResources, saveJWT, options, setOptions } = useGlobalContext();
  const resetProgress = () => {
    localStorage.removeItem("idle-airline-save");
    setResources({
      progress: 0,
      money: 0,
      upgrades: [],
    });
  };

  return (
    <>
      <PageHeader className="site-page-header" title="Options" />
      <Container>
        <p>Sauvegarde</p>
        <CopyBtn text={saveJWT}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={() =>
              alert({
                message: "Sauvegarde copiée dans le presse papier",
                type: "info",
              })
            }
          >
            Copier
          </Button>
        </CopyBtn>
        <Button
          type="primary"
          icon={<CloseOutlined />}
          size="large"
          danger
          onClick={resetProgress}
        >
          Effacer
        </Button>
        <div style={{ marginTop: "2vh" }}>
          <span style={{ marginRight: "1vw" }}>Notifications</span>
          <Switch
            checked={!!options[eOptions.NOTIFICATIONS]}
            onChange={() => {
              // !!current &&
              //   alert({
              //     type: "info",
              //     message: "Notifications activées",
              //   });
              setOptions({
                ...options,
                [eOptions.NOTIFICATIONS]: !options[eOptions.NOTIFICATIONS],
              });
            }}
          />
        </div>
      </Container>
    </>
  );
}

export default options;
