import "./App.css";
import profile from "./assets/creepy_cabin_guy.png";
import { RecoilRoot, useRecoilValue } from "recoil";
import { allCount } from "./store/atoms/count";
function App() {
  return (
    <div>
      <RecoilRoot>
        <ProfileComponent />
      </RecoilRoot>
    </div>
  );
}

function ProfileComponent() {
  const network = useRecoilValue(allCount);
  return (
    <>
      <div className="enclosing">
        <div>
          <img src={profile} width={"320px"} height={"220px"} />
          <br/>
          <b>
            Rita Correia 
          </b>    32
          
          <p>  London</p>
        </div>
        <hr/>
        <div>
          <ul className="profile-stats">
            <li>
              <span className="stat-count">{network.Followers >= 1000 ? Math.floor(network.Followers/1000)+ "K": network.Followers}</span>
              <br /> Followers
            </li>
            <li>
              <span className="stat-count">{network.Likes >= 1000 ? Math.floor(network.Likes/1000)+ "K": network.Likes}</span> <br /> Likes
            </li>
            <li>
              <span className="stat-count">{network.Photos >= 1000 ? Math.floor(network.Photos/1000)+ "K": network.Photos}</span>
              <br /> Posts
            </li>
          </ul>{" "}
        </div>
      </div>
    </>
  );
}
export default App;
