import './App.css'
import { useState } from 'react'
import RepoInput from './components/RepoInput'
import CommitDetails from './components/CommitDetails'
import { Commit } from './models/Commit'

function App() {
  const [commit, setCommit] = useState<Commit | null>(null);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8">
          <h1 className="text-4xl font-bold">Find First Commit</h1>
          <p className="text-gray-600">Enter a public repository URL to get started</p>
          <p className="text-sm text-gray-500">Note: URLs that are not public repositories will return a 404 error.</p>
          <RepoInput setCommit={setCommit} />
        </div>
        <div className="p-8">
          <CommitDetails commit={commit} />
        </div>
      </div>
    </div>
  )
}

export default App
