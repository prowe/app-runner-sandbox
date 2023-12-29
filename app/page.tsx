import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <label htmlFor="domain">Domain</label>
        <input name='domain' id="domain" required />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
