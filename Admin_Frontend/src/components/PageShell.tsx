import Topbar from "./Topbar";

export default function PageShell({
  title,
  subtitle,
  actionLabel,
  onAction,
  children,
}: {
  title: string;
  subtitle: string;
  actionLabel?: string | null;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar title={title} subtitle={subtitle} actionLabel={actionLabel} onAction={onAction} />
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </>
  );
}
