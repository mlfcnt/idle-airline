import { createContext, useContext, useEffect, useMemo, useState } from "react";
import jwt from "jsonwebtoken";
import {
  DEFAULT_OPTIONS,
  eUpgrades,
  JWT_TOKEN,
  MONEY_STEP,
  PROGRESS_STEP,
} from "../lib/constants";
import { alert } from "../lib/helpers";
import { useInterval } from "react-use";

const GlobalContext = createContext();

export function GlobalContextWrapper({ children }) {
  const [progress, setProgress] = useState(0);
  const [money, setMoney] = useState(0);
  const [upgrades, setUpgrades] = useState([]);
  const [saveJWT, setSaveJWT] = useState("");
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const setResources = ({ progress, money, upgrades }) => {
    setProgress(progress);
    setMoney(money);
    setUpgrades(upgrades);
  };

  // Recup de la sauvegarde au chargement
  useEffect(() => {
    const token = localStorage.getItem("idle-airline-save");
    if (token) {
      const { progress, money, upgrades, options } = jwt.verify(
        token,
        JWT_TOKEN
      );
      setResources({ progress, money, upgrades });
      options && setOptions(options);
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

  // A chaque fois qu'une des ressources ou options est update on update le local storage
  useEffect(() => {
    if (!resources && !options) return;
    const token = jwt.sign({ ...resources, ...options }, JWT_TOKEN);
    setSaveJWT(token);
    localStorage.setItem("idle-airline-save", token);
  }, [resources, options]);

  // Si progress est au dessus de 100 on le remet a 0
  useEffect(() => {
    if (progress >= 100) setProgress(0);
  }, [progress]);

  // Quand progress atteint les 100% on incremente la money
  useEffect(() => {
    if (progress !== 100) return;
    console.log(money + MONEY_STEP, Math.floor((money + MONEY_STEP) * 10) / 10);
    setMoney(Math.round((money + MONEY_STEP) * 10) / 10);
    alert({ message: `Money  + ${MONEY_STEP}€` });
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
    <GlobalContext.Provider
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
        options,
        setOptions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
