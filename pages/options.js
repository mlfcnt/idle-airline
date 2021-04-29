import { Button } from "antd";
import React from "react";
import { DownloadOutlined, CloseOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import { useResourcesContext } from "../context/Resources";

const Container = styled.div`
  display: flex;
`;

const CopyBtn = styled(CopyToClipboard)`
  margin-right: 50px;
`;

function options() {
  const { setResources, saveJWT } = useResourcesContext();
  const resetProgress = () => {
    localStorage.removeItem("idle-airline-save");
    setResources({
      progress: 0,
      money: 0,
      upgrades: [],
    });
  };
  return (
    <Container>
      <CopyBtn text={saveJWT}>
        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Copier la sauvegarde
        </Button>
      </CopyBtn>
      <Button
        type="primary"
        icon={<CloseOutlined />}
        size="large"
        danger
        onClick={resetProgress}
      >
        Effacer la sauvegarde
      </Button>
    </Container>
  );
}

export default options;
