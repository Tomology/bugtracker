import React, { Fragment, useState } from "react";
import IssueItem from "./IssueItem";
import Select from "react-select";
import { filterStyles } from "../../../utils/reactSelectStyles";

function IssuesList({ issues, projectKey, setSelectedIssue, searchTerm }) {
  const [issueFilters, setIssueFilters] = useState("All");

  const filterOptions = [
    { value: "All", label: "All" },
    { value: "Open", label: "Open" },
    { value: "Assigned To Me", label: "Assigned To Me" },
    { value: "Resolved", label: "Resolved" },
  ];

  const issuesList = issues.filter((issue) => {
    if (issueFilters === "All") {
      return issue;
    } else if (issueFilters === "Open") {
      if (issue.progress.progress === "Open") {
        return issue;
      }
    } else if (issueFilters === "Assigned To Me") {
      if (
        issue.assignee
          .map((assign) => assign._id.toString())
          .indexOf(localStorage.getItem("currentUserId")) !== -1
      ) {
        return issue;
      }
    } else if (issueFilters === "Resolved") {
      if (issue.progress.progress === "Resolved") {
        return issue;
      }
    }
  });

  const issuesListSearchFilter = issuesList.filter((issue) => {
    if (searchTerm === "") {
      return issue;
    } else if (
      `${issue.issueName.toLowerCase()} ${issue.issueNumber}`.includes(
        searchTerm.toLowerCase()
      )
    ) {
      return issue;
    }
  });

  const issuesListMapped = issuesListSearchFilter.map((issue) => (
    <IssueItem
      issue={issue}
      projectKey={projectKey}
      key={issue._id}
      setSelectedIssue={setSelectedIssue}
    />
  ));

  return (
    <div className="project__side--issuesList">
      <Select
        styles={filterStyles}
        options={filterOptions}
        onChange={(filter) => setIssueFilters(filter.value)}
        placeholder={"Issue Filters"}
        className="project__side--selectFilter"
      />
      {issuesListMapped}
    </div>
  );
}

export default IssuesList;
