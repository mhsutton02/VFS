// app/admin/jobs/page.tsx
"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  clearance: string;
  posted: string;
  closingDate?: string;
  status: "draft" | "published";
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  compensation: string;
  notifyEmails: string[];
  _sha?: string;
}

const EMPTY_JOB: Omit<Job, "_sha"> = {
  id: "",
  title: "",
  department: "",
  location: "Remote / US",
  type: "Full-time",
  clearance: "None required",
  posted: new Date().toISOString().slice(0, 10),
  closingDate: "",
  status: "draft",
  summary: "",
  responsibilities: [""],
  qualifications: [""],
  preferred: [""],
  compensation:
    "Competitive salary, comprehensive health coverage, 401(k), flexible PTO",
  notifyEmails: ["careers@valorforgesolutions.com"],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function slugify(t: string) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function api(path: string, token: string, opts: RequestInit = {}) {
  return fetch(path, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
      ...(opts.headers ?? {}),
    },
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AdminJobsPage() {
  /* Auth */
  const [token, setToken] = useState("");
  const [pw, setPw] = useState("");
  const [authErr, setAuthErr] = useState("");

  /* Jobs list */
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* Editor */
  const [editing, setEditing] = useState<Job | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  /* Delete modal */
  const [deleting, setDeleting] = useState<Job | null>(null);

  /* ---- Auth ---- */
  useEffect(() => {
    const stored = localStorage.getItem("vf_admin_token");
    if (stored) setToken(stored);
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthErr("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("vf_admin_token", data.token);
    } else {
      setAuthErr("Invalid password.");
    }
  }

  function logout() {
    setToken("");
    localStorage.removeItem("vf_admin_token");
  }

  /* ---- Fetch jobs ---- */
  const fetchJobs = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api("/api/jobs", token);
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      setJobs(
        (data as Job[]).sort((a, b) => b.posted.localeCompare(a.posted))
      );
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  /* ---- CRUD ---- */
  function openNew() {
    setEditing({ ...EMPTY_JOB, posted: new Date().toISOString().slice(0, 10) });
    setIsNew(true);
    setSaveMsg("");
  }

  function openEdit(job: Job) {
    setEditing({ ...job });
    setIsNew(false);
    setSaveMsg("");
  }

  async function handleSave(asStatus?: "draft" | "published") {
    if (!editing) return;
    setSaving(true);
    setSaveMsg("");

    const job = { ...editing };
    if (asStatus) job.status = asStatus;
    if (isNew && !job.id) job.id = slugify(job.title);

    // Strip empty array items
    job.responsibilities = job.responsibilities.filter((r) => r.trim());
    job.qualifications = job.qualifications.filter((q) => q.trim());
    job.preferred = job.preferred.filter((p) => p.trim());
    job.notifyEmails = job.notifyEmails.filter((e) => e.trim());

    try {
      let res: Response;
      if (isNew) {
        const { _sha, ...payload } = job;
        void _sha; // unused for create
        res = await api("/api/jobs", token, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      } else {
        res = await api(`/api/jobs/${job.id}`, token, {
          method: "PUT",
          body: JSON.stringify(job),
        });
      }

      if (res.ok) {
        setSaveMsg(asStatus === "published" ? "Published!" : "Saved!");
        setEditing(null);
        fetchJobs();
      } else {
        const err = await res.json();
        setSaveMsg(`Error: ${err.error}`);
      }
    } catch {
      setSaveMsg("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setSaving(true);
    try {
      const res = await api(`/api/jobs/${deleting.id}`, token, {
        method: "DELETE",
        body: JSON.stringify({ _sha: deleting._sha }),
      });
      if (res.ok) {
        setDeleting(null);
        fetchJobs();
      }
    } catch {
      /* ignore */
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(job: Job) {
    const newStatus = job.status === "published" ? "draft" : "published";
    const updated = { ...job, status: newStatus };
    try {
      await api(`/api/jobs/${job.id}`, token, {
        method: "PUT",
        body: JSON.stringify(updated),
      });
      fetchJobs();
    } catch {
      /* ignore */
    }
  }

  /* ---- Array field helpers ---- */
  function updateArrayField(
    field: "responsibilities" | "qualifications" | "preferred" | "notifyEmails",
    idx: number,
    value: string
  ) {
    if (!editing) return;
    const arr = [...editing[field]];
    arr[idx] = value;
    setEditing({ ...editing, [field]: arr });
  }

  function addArrayItem(
    field: "responsibilities" | "qualifications" | "preferred" | "notifyEmails"
  ) {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...editing[field], ""] });
  }

  function removeArrayItem(
    field: "responsibilities" | "qualifications" | "preferred" | "notifyEmails",
    idx: number
  ) {
    if (!editing) return;
    const arr = editing[field].filter((_, i) => i !== idx);
    setEditing({ ...editing, [field]: arr });
  }

  /* ---- Filtered list ---- */
  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase()) ||
      j.id.toLowerCase().includes(search.toLowerCase())
  );

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  /* ---- Login screen ---- */
  if (!token) {
    return (
      <div className="adm-login-wrap">
        <form className="adm-login" onSubmit={handleLogin}>
          <h1 className="adm-logo">VFS Admin</h1>
          <label>
            Password
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
              required
            />
          </label>
          {authErr && <p className="adm-err">{authErr}</p>}
          <button type="submit" className="adm-btn adm-btn-primary">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  /* ---- Delete confirmation modal ---- */
  const deleteModal = deleting && (
    <div className="adm-modal-overlay" onClick={() => setDeleting(null)}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete &ldquo;{deleting.title}&rdquo;?</h3>
        <p>This will permanently remove the job posting from the repository.</p>
        <div className="adm-modal-actions">
          <button
            className="adm-btn adm-btn-danger"
            onClick={handleDelete}
            disabled={saving}
          >
            {saving ? "Deleting…" : "Delete"}
          </button>
          <button className="adm-btn" onClick={() => setDeleting(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  /* ---- Editor form ---- */
  if (editing) {
    return (
      <div className="adm-wrap">
        <header className="adm-header">
          <span className="adm-logo">VFS Admin</span>
          <button className="adm-btn" onClick={() => setEditing(null)}>
            ← Back to list
          </button>
        </header>

        <main className="adm-main">
          <h2 className="adm-h2">
            {isNew ? "New Job Posting" : `Edit: ${editing.title}`}
          </h2>

          <div className="adm-form">
            {/* Row: Title + Department */}
            <div className="adm-row">
              <label className="adm-field">
                Title *
                <input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  required
                  placeholder="e.g. Software Engineer"
                />
              </label>
              <label className="adm-field">
                Department *
                <input
                  value={editing.department}
                  onChange={(e) =>
                    setEditing({ ...editing, department: e.target.value })
                  }
                  required
                  placeholder="e.g. Engineering"
                />
              </label>
            </div>

            {/* Row: Location + Type */}
            <div className="adm-row">
              <label className="adm-field">
                Location
                <input
                  value={editing.location}
                  onChange={(e) =>
                    setEditing({ ...editing, location: e.target.value })
                  }
                  placeholder="e.g. Remote / US"
                />
              </label>
              <label className="adm-field">
                Type
                <select
                  value={editing.type}
                  onChange={(e) =>
                    setEditing({ ...editing, type: e.target.value })
                  }
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </label>
            </div>

            {/* Row: Clearance + Posted */}
            <div className="adm-row">
              <label className="adm-field">
                Clearance
                <input
                  value={editing.clearance}
                  onChange={(e) =>
                    setEditing({ ...editing, clearance: e.target.value })
                  }
                  placeholder="e.g. Secret, TS/SCI, None required"
                />
              </label>
              <label className="adm-field">
                Posted Date
                <input
                  type="date"
                  value={editing.posted}
                  onChange={(e) =>
                    setEditing({ ...editing, posted: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Row: Closing Date + Status */}
            <div className="adm-row">
              <label className="adm-field">
                Closing Date (optional)
                <input
                  type="date"
                  value={editing.closingDate ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, closingDate: e.target.value })
                  }
                />
              </label>
              <label className="adm-field">
                Status
                <select
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
            </div>

            {/* Summary */}
            <label className="adm-field">
              Summary *
              <textarea
                value={editing.summary}
                onChange={(e) =>
                  setEditing({ ...editing, summary: e.target.value })
                }
                rows={3}
                required
                placeholder="Brief description of the role"
              />
            </label>

            {/* Compensation */}
            <label className="adm-field">
              Compensation
              <input
                value={editing.compensation}
                onChange={(e) =>
                  setEditing({ ...editing, compensation: e.target.value })
                }
                placeholder="e.g. Competitive salary, benefits..."
              />
            </label>

            {/* Array fields */}
            {(
              [
                ["responsibilities", "Responsibilities"],
                ["qualifications", "Qualifications"],
                ["preferred", "Preferred Qualifications"],
                ["notifyEmails", "Notification Emails"],
              ] as const
            ).map(([field, label]) => (
              <fieldset key={field} className="adm-fieldset">
                <legend>{label}</legend>
                {editing[field].map((item, idx) => (
                  <div key={idx} className="adm-array-row">
                    <input
                      value={item}
                      onChange={(e) =>
                        updateArrayField(field, idx, e.target.value)
                      }
                      placeholder={`${label} item ${idx + 1}`}
                    />
                    <button
                      type="button"
                      className="adm-btn adm-btn-sm adm-btn-danger"
                      onClick={() => removeArrayItem(field, idx)}
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="adm-btn adm-btn-sm"
                  onClick={() => addArrayItem(field)}
                >
                  + Add
                </button>
              </fieldset>
            ))}

            {/* Action bar */}
            {saveMsg && (
              <p
                className={
                  saveMsg.startsWith("Error") ? "adm-err" : "adm-success"
                }
              >
                {saveMsg}
              </p>
            )}

            <div className="adm-actions">
              <button
                className="adm-btn"
                onClick={() => handleSave("draft")}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save Draft"}
              </button>
              <button
                className="adm-btn adm-btn-primary"
                onClick={() => handleSave("published")}
                disabled={saving}
              >
                {saving ? "Publishing…" : "Publish"}
              </button>
              <button
                className="adm-btn"
                onClick={() => setEditing(null)}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ---- Job list (default view) ---- */
  return (
    <div className="adm-wrap">
      {deleteModal}

      <header className="adm-header">
        <span className="adm-logo">VFS Admin</span>
        <nav className="adm-header-nav">
          <span className="adm-header-label">Job Management</span>
          <button className="adm-btn adm-btn-sm" onClick={logout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="adm-main">
        <div className="adm-toolbar">
          <input
            className="adm-search"
            placeholder="Search jobs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="adm-btn adm-btn-primary" onClick={openNew}>
            + New Job
          </button>
        </div>

        {loading ? (
          <p className="adm-loading">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="adm-empty">
            {search ? "No jobs matching your search." : "No job postings yet."}
          </p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Posted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.id}>
                  <td className="adm-td-title" onClick={() => openEdit(job)}>
                    {job.title}
                  </td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>
                    <button
                      className={`adm-status-badge adm-status-${job.status ?? "published"}`}
                      onClick={() => toggleStatus(job)}
                      title="Click to toggle"
                    >
                      {job.status ?? "published"}
                    </button>
                  </td>
                  <td>{job.posted}</td>
                  <td className="adm-td-actions">
                    <button
                      className="adm-btn adm-btn-sm"
                      onClick={() => openEdit(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="adm-btn adm-btn-sm adm-btn-danger"
                      onClick={() => setDeleting(job)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
