import styles from './MIDL.module.css';

/* eslint-disable-next-line */
export interface MIDLProps {}

export function MIDL(props: MIDLProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MIDL!</h1>
    </div>
  );
}

export default MIDL;
