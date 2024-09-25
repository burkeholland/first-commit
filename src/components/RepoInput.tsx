import React, { useState } from 'react';
import { Commit } from '../models/Commit';

interface RepoInputProps {
    setCommit: React.Dispatch<React.SetStateAction<Commit | null>>;
}
const RepoInput: React.FC<RepoInputProps> = ({ setCommit }) => {
    const [repoUrl, setRepoUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setErrorMessage('');

        try {
            const url = new URL(repoUrl);
            const [owner, repo] = url.pathname.split('/').slice(1);

            let response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);

            if (!response.ok) {
                setErrorMessage(`HTTP error! status: ${response.status}`);
            }

            // Extract the URL for the last page from the Link header
            const linkHeader = response.headers.get('Link');
            const lastPageUrl = linkHeader?.split(',').find(part => part.endsWith('rel="last"'))?.split(';')[0].slice(1, -1);

            if (lastPageUrl) {
                response = await fetch(lastPageUrl.substring(1));

                if (!response.ok) {
                    setErrorMessage(`HTTP error! status: ${response.status}`);
                }
            }

            const commits = await response.json();

            if (commits.length === 0) {
                setErrorMessage('No commits found');
            }

            // The first commit is the last one in the array
            const firstCommit = commits[commits.length - 1];

            setCommit(firstCommit);
        } catch (error) {
            setErrorMessage(`Failed to fetch commits: ${error}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex items-center mt-10 w-full">
                <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                    placeholder="Enter repository URL"
                />
                <button type="submit" className="ml-5 px-4 py-2 rounded-lg bg-blue-500 text-white">
                    Submit
                </button>
            </form>
            <div id="error-message" className="mt-5 text-red-500">
                {errorMessage}
            </div>
        </>
    );
};

export default RepoInput;