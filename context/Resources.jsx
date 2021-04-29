import { createContext, useContext, useEffect, useMemo, useState } from "react";
import jwt from "jsonwebtoken";
import { eUpgrades, JWT_TOKEN, MONEY_STEP } from "../lib/constants";
import { alert } from "../lib/helpers";
import { useInterval } from "react-use";

const ResourcesContext = createContext();

export function ResourcesWrapper({ children }) {
  const [progress, setProgress] = useState(0);
  const [money, setMoney] = useState(0);
  const [upgrades, setUpgrades] = useState([]);
  const [saveJWT, setSaveJWT] = useState("");

  const setResources = ({ progress, money, upgrades }) => {
    setProgress(progress);
    setMoney(money);
    setUpgrades(upgrades);
  };

  // Recup de la sauvegarde au chargement
  useEffect(() => {
    const token = localStorage.getItem("idle-airline-save");
    if (token) {
      const { progress, money, upgrades } = jwt.verify(token, JWT_TOKEN);
      setResources({ progress, money, upgrades });
    }
  }, []);

  const resources = useMemo(
    () => ({
      progress,
      money,
      upgrades,
    }),
    [progress, money, upgrades]
  );

  // A chaque fois qu'une des ressources est update on update le local storage
  useEffect(() => {
    if (!resources) return;
    const token = jwt.sign(resources, JWT_TOKEN);
    setSaveJWT(token);
    localStorage.setItem("idle-airline-save", token);
  }, [resources]);

  // Si progress est au dessus de 100 on le remet a 0
  useEffect(() => {
    if (progress >= 100) setProgress(0);
  }, [progress]);

  // Quand progress atteint les 100% on incremente la money
  useEffect(() => {
    if (progress !== 100) return;
    setMoney(money + MONEY_STEP);
    alert({ message: "Money  + 1" });
  }, [progress]);

  const hasUpgrade = (upgrade) => upgrades.includes(upgrade);

  // Lorsque l'upgrade automation est achetée, met a jour le progress toutes les PROGRESS_STEP secondes
  useInterval(
    () => {
      setProgress(progress + PROGRESS_STEP);
    },
    hasUpgrade(eUpgrades.AUTOMATE) ? 1000 : null
  );

  return (
    <ResourcesContext.Provider
      value={{
        resources,
        progress,
        money,
        upgrades,
        setProgress,
        setMoney,
        setUpgrades,
        setResources,
        hasUpgrade,
        saveJWT,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
}

export function useResourcesContext() {
  return useContext(ResourcesContext);
}
