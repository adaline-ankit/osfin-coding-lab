import { CRM } from "@/components/atomic-crm/root/CRM";
import {
  authProvider,
  createDataProvider,
} from "@/components/atomic-crm/providers/fakerest";
import { memoryStore } from "ra-core";
import { createOsfinFixture, getLabBank } from "./osfinFixture";

const bank = getLabBank(import.meta.env.VITE_OSFIN_BANK);
const dataProvider = createDataProvider({ db: createOsfinFixture(bank) });

const App = () => (
  <CRM
    title={`Osfin Lab — ${bank} — synthetic demo`}
    disableTelemetry
    dataProvider={dataProvider}
    authProvider={authProvider}
    store={memoryStore()}
  />
);

export default App;
