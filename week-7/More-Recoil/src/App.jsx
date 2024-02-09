import { RecoilRoot, useRecoilValue } from "recoil";
import {
  jobAtom,
  messagingAtom,
  networkAtom,
  notificationAtom,
  totalNotificationSelector,
} from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobAtomCount = useRecoilValue(jobAtom);
  const messagingAtomCount = useRecoilValue(messagingAtom);
  const notificationAtomCount = useRecoilValue(notificationAtom);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  return (
    <>
      <div>
        <button>Home</button>

        <button>
          My Network(
          {networkNotificationCount >= 100 ? "99+" : networkNotificationCount})
        </button>
        <button>
          Jobs(
          {jobAtomCount >= 100 ? "99+" : jobAtomCount} )
        </button>
        <button>
          Messaging(
          {messagingAtomCount >= 100 ? "99+" : messagingAtomCount} )
        </button>
        <button>
          Notifications(
          {notificationAtomCount >= 100 ? "99+" : notificationAtomCount} )
        </button>

        <button>Me({totalNotificationCount})</button>
      </div>
    </>
  );
}
export default App;
