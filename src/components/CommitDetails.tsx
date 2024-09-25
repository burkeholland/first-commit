import React from 'react'
import { Commit } from '../models/Commit'

interface CommitDetailsProps {
    commit: Commit | null;
}

const CommitDetails: React.FC<CommitDetailsProps> = ({ commit }) => {
    if (!commit) {
        return <p>No commit details available</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold">First Commit Details</h2>
            <p><strong>SHA:</strong> {commit.sha}</p>
            <p><strong>Message:</strong> {commit.commit.message}</p>
            <p><strong>Author:</strong> {commit.commit.author.name} ({commit.commit.author.email})</p>
            <p><strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleString()}</p>
            <p><strong>Link:</strong> <a href={commit.html_url} target="_blank" rel="noopener noreferrer">View Commit</a></p>
        </div>
    );
};

export default CommitDetails;