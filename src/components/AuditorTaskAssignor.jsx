import { useMemo, useState } from "react";

function AuditorTaskAssignor({ initialBranches, officers }) {
  const [branches, setBranches] = useState(initialBranches);

  const workloads = useMemo(() => {
    return officers.map((officer) => {
      const assignedBranches = branches.filter(
        (branch) => branch.assignedOfficerId === officer.id
      );
      const totalRisk = assignedBranches.reduce((sum, branch) => sum + branch.riskScore, 0);

      return {
        ...officer,
        assignedCount: assignedBranches.length,
        totalRisk,
        remainingSlots: officer.maxBranches - assignedBranches.length
      };
    });
  }, [branches, officers]);

  const assignOfficer = (branchId, officerId) => {
    setBranches((currentBranches) =>
      currentBranches.map((branch) =>
        branch.id === branchId ? { ...branch, assignedOfficerId: officerId } : branch
      )
    );
  };

  const getOfficer = (officerId) => officers.find((officer) => officer.id === officerId);

  const suggestedOfficerId = (branch) => {
    const availableOfficers = workloads
      .filter((officer) => officer.remainingSlots > 0 || officer.id === branch.assignedOfficerId)
      .sort((first, second) => first.assignedCount - second.assignedCount || first.totalRisk - second.totalRisk);

    return availableOfficers[0]?.id || "";
  };

  return (
    <section className="panel full-width">
      <div className="section-heading">
        <div>
          <h2>Auditor Task Assignor</h2>
          <p>
            Assign compliance officers to branches while balancing branch count and risk load.
            Suggested assignments choose the officer with the lightest workload first, then the
            lowest total branch risk.
          </p>
        </div>
      </div>

      <div className="assignor-grid">
        <div>
          <h3>Branch Assignments</h3>
          <div className="assignment-list">
            {branches.map((branch) => {
              const suggested = suggestedOfficerId(branch);

              return (
                <article className="assignment-card" key={branch.id}>
                  <div>
                    <strong>{branch.name}</strong>
                    <span>
                      {branch.region} | Risk {branch.riskScore}
                    </span>
                  </div>
                  <label>
                    Compliance Officer
                    <select
                      value={branch.assignedOfficerId}
                      onChange={(event) => assignOfficer(branch.id, event.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {officers.map((officer) => (
                        <option key={officer.id} value={officer.id}>
                          {officer.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  {suggested && branch.assignedOfficerId !== suggested && (
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => assignOfficer(branch.id, suggested)}
                    >
                      Use Suggested: {getOfficer(suggested)?.name}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div>
          <h3>Workload Balance</h3>
          <p className="helper-text">
            Workload balancing prevents one officer from receiving too many branches by tracking
            assigned branch count, capacity, and total risk load side by side.
          </p>
          <div className="workload-list">
            {workloads.map((officer) => (
              <article className="workload-card" key={officer.id}>
                <div>
                  <strong>{officer.name}</strong>
                  <span>{officer.specialization}</span>
                </div>
                <div className="workload-meter">
                  <span>{officer.assignedCount}/{officer.maxBranches} branches</span>
                  <meter min="0" max={officer.maxBranches} value={officer.assignedCount} />
                </div>
                <small>Total risk load: {officer.totalRisk}</small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuditorTaskAssignor;
