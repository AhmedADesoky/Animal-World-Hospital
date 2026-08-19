const styles: Record<string, string> = {
  Confirmed: "bg-status-greenTint text-status-green",
  Active: "bg-status-greenTint text-status-green",
  Delivered: "bg-status-greenTint text-status-green",
  Sent: "bg-status-greenTint text-status-green",
  Pending: "bg-status-amberTint text-status-amber",
  Limited: "bg-status-amberTint text-status-amber",
  "In transit": "bg-status-amberTint text-status-amber",
  "On leave": "bg-status-amberTint text-status-amber",
  Upcoming: "bg-status-blueTint text-status-blue",
  Cancelled: "bg-red-tint text-red-primary",
  Owner: "bg-status-amberTint text-status-amber",
  Vet: "bg-status-blueTint text-status-blue",
  Manager: "bg-status-purpleTint text-status-purple",
  Staff: "bg-status-greenTint text-status-green",
  New: "bg-status-blueTint text-status-blue",
  Assigned: "bg-status-purpleTint text-status-purple",
};

export default function StatusPill({ status }: { status: string }) {
  return <span className={`status-pill ${styles[status] ?? "bg-grey-mid text-charcoal-light"}`}>{status}</span>;
}
