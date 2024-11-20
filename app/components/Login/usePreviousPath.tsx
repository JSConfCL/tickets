import { useNavigationHistoryStore } from "~/utils/navigationHistoryStore";

export const usePreviousPath = () => {
  const history = useNavigationHistoryStore().history;

  return history[history.length - 2] ?? "/";
};
