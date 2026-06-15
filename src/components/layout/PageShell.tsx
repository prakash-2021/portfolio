import styles from "./PageShell.module.scss";

type PageShellProps = {
  title: string;
  lede?: string;
  children?: React.ReactNode;
};

export function PageShell({ title, lede, children }: PageShellProps) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
      {children}
    </main>
  );
}
