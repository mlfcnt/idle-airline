import React, { useMemo } from "react";
import { Progress, Button, PageHeader, Typography } from "antd";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { eUpgrades, PROGRESS_STEP } from "../lib/constants";

const { Paragraph } = Typography;

function HulaHoops() {
  const {
    progress,
    setProgress,
    upgrades,
    setUpgrades,
    money,
    hasUpgrade,
  } = useGlobalContext();

  const Btn = styled(Button)`
    margin: 4rem;
  `;

  const manuallyAddProgress = () => {
    const newProgress = progress + PROGRESS_STEP;
    setProgress(newProgress >= 100 ? 100 : newProgress);
  };

  const moves = [
    "Mouvement de hanches",
    "Féssier vers l'avant",
    "Profile égyptien",
    "Danse de robot",
  ];

  const getRandomMove = () => moves[Math.floor(Math.random() * moves.length)];

  const isFirstStep = useMemo(() => [0, 100].includes(progress), [progress]);

  return (
    <>
      <PageHeader className="site-page-header" title="Hula Hoops" />
      <Paragraph>
        Pour pouvoir lancer la 1ere étape qui t'approchera de ton rève, tu dois
        faire du cash. Tu décides d'utiliser ton talent natuel : le Hula-Hoops !
        Quelques prestations de rue devraient faire le taf.
      </Paragraph>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Btn
          onClick={manuallyAddProgress}
          hidden={hasUpgrade(eUpgrades.AUTOMATE)}
          type="primary"
        >
          {isFirstStep ? "Bouge ce body" : getRandomMove()}
        </Btn>
        <Progress type="circle" percent={progress} width={80} />
      </div>
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

export default HulaHoops;
