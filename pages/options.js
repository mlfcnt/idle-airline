import { Button, Switch, Typography } from "antd";
import React from "react";
import { DownloadOutlined, CloseOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { alert } from "../lib/helpers";
import { eOptions } from "../lib/constants";

const { Paragraph } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerSave = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Btn = styled(CopyToClipboard)`
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
      <Container>
        <ContainerSave>
          <Paragraph level="5">Sauvegarde</Paragraph>
          <Btn text={saveJWT}>
            <Button
              style={{ marginRight: "2vw" }}
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
          </Btn>
          <Button
            type="primary"
            icon={<CloseOutlined />}
            size="large"
            danger
            onClick={resetProgress}
          >
            Effacer
          </Button>
        </ContainerSave>
        <div style={{ marginTop: "2vh" }}>
          <Paragraph style={{ marginRight: "1vw" }}>Notifications</Paragraph>
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
