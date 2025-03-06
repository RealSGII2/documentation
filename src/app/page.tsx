import Homepage from '@/docs/homepage';
import styles from './page.module.scss';
import Appbar from './appbar';

export default function Home() {
    return (
        <>
            <Appbar title='RealSGII2 Docs' />

            <div className={styles.wrapper}>
                <div className={styles.page + ' docbody'}>
                    <Homepage />
                </div>
            </div>
        </>
    );
}
