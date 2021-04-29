import { Progress, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useInterval } from "react-use";
import styled from "styled-components";
import jwt from "jsonwebtoken";

function FirstProgress() {
  const [progress, setProgress] = useState(0);
  const [money, setMoney] = useState(0);
  const [upgrades, setUpgrades] = useState([]);

  const PROGRESS_STEP = 10;
  const MONEY_STEP = 1;
  const JWT_TOKEN = "coucou";

  const eUpgrades = {
    AUTOMATE: "AUTOMATE",
  };

  const BuyBtn = styled(Button)`
    margin: 4rem;
  `;
  const AutomateBtn = styled(BuyBtn)``;

  const manuallyAddProgress = () => {
    const newProgress = progress + PROGRESS_STEP;
    setProgress(newProgress >= 100 ? 100 : newProgress);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { progress, money, upgrades } = jwt.verify(token, JWT_TOKEN);
      setProgress(progress);
      setMoney(money);
      setUpgrades(upgrades);
    }
  }, []);

  useEffect(() => {
    if (progress >= 100) setProgress(0);
  }, [progress]);

  useEffect(() => {
    const token = jwt.sign({ progress, money, upgrades }, JWT_TOKEN);
    localStorage.setItem("token", token);
  }, [progress, money, upgrades]);

  const hasUpgrade = (upgrade) => upgrades.includes(upgrade);

  useEffect(() => {
    if (progress !== 100) return;
    setMoney(money + MONEY_STEP);
  }, [progress]);

  useInterval(
    () => {
      setProgress(progress + PROGRESS_STEP);
    },
    hasUpgrade(eUpgrades.AUTOMATE) ? 1000 : null
  );

  return (
    <>
      <BuyBtn
        onClick={manuallyAddProgress}
        hidden={hasUpgrade(eUpgrades.AUTOMATE)}
      >
        {[0, 100].includes(progress)
          ? "Faire un spectacle"
          : "Continuer le spectacle"}
      </BuyBtn>
      <Progress type="circle" percent={progress} width={80} />
      <AutomateBtn
        hidden={money < 5 || hasUpgrade(eUpgrades.AUTOMATE)}
        disabled={money < 10}
        onClick={() => setUpgrades([...upgrades, eUpgrades.AUTOMATE])}
      >
        {money < 10 ? "Automate (10$)" : "Automate"}
      </AutomateBtn>
      <p>{`Money: ${money} $`}</p>
    </>
  );
}

export default FirstProgress;
