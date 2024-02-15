import { RecoilRoot, useRecoilValue } from 'recoil'
import './App.css'
import { githubInfo } from './store/atoms/githubInfo'

function App() {
  return <div>
    <RecoilRoot>
      <GithubCard/>
    </RecoilRoot>
  </div>
  
}

function GithubCard(){
  const githubData = useRecoilValue(githubInfo);
  return <div> 
    <img src={githubData.avatar_url} alt="GitHub Avatar" />
    <h2>{githubData.name}</h2>
    <p>{githubData.bio}</p>
    <p>Followers: {githubData.followers}</p>
    <p>Following: {githubData.following}</p>
    <p>Public Repos: {githubData.public_repos}</p>

  </div>
}

export default App
