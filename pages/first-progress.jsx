import React from "react";
import { Progress, Button } from "antd";
import styled from "styled-components";
import { useResourcesContext } from "../context/Resources";
import { eUpgrades, PROGRESS_STEP } from "../lib/constants";

function FirstProgress() {
  const {
    progress,
    setProgress,
    upgrades,
    setUpgrades,
    money,
    hasUpgrade,
  } = useResourcesContext();

  const Btn = styled(Button)`
    margin: 4rem;
  `;

  const manuallyAddProgress = () => {
    const newProgress = progress + PROGRESS_STEP;
    setProgress(newProgress >= 100 ? 100 : newProgress);
  };

  return (
    <>
      <Btn
        onClick={manuallyAddProgress}
        hidden={hasUpgrade(eUpgrades.AUTOMATE)}
        type="primary"
      >
        {[0, 100].includes(progress)
          ? "Lancer un spectacle"
          : "Continuer le spectacle"}
      </Btn>
      <Progress type="circle" percent={progress} width={80} />
      <Btn
        hidden={money < 5 || hasUpgrade(eUpgrades.AUTOMATE)}
        disabled={money < 10}
        onClick={() => setUpgrades([...upgrades, eUpgrades.AUTOMATE])}
      >
        {money < 10 ? "Automate (10$)" : "Automate"}
      </Btn>
    </>
  );
}

export default FirstProgress;
