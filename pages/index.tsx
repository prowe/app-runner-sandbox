import styles from './index.module.css'
import { GetServerSideProps } from 'next';
import { LookupAddress, lookup } from 'node:dns';
import { promisify } from 'node:util';

const lookupAsync = promisify(lookup);

type HomeProps = {
    domain?: string;
    lookupAddress?: LookupAddress
};

export const getServerSideProps = (async (ctx) => {
    const domain = ctx.query.domain as string | undefined;
    if (domain) {
        const lookupAddress = await lookupAsync(domain);
        console.log("Looked up", domain, lookupAddress.address)
        return {
            props: {
                domain,
                lookupAddress
            }
        }
    }
    return { props: {} };
}) satisfies GetServerSideProps<HomeProps>

export default function Home(props: HomeProps) {
    console.log("Rendering", JSON.stringify(props));
    
    const {lookupAddress, domain} = props;
    return (
        <main className={styles.main}>
            <form className={styles.form} action="#">
                <label htmlFor="domain">Domain</label>
                <input name='domain' id="domain" required defaultValue={domain ?? ''}/>
                <button type="submit">Submit</button>
            </form>
            {lookupAddress && <div>{lookupAddress.address}</div>}
        </main>
    );
}
