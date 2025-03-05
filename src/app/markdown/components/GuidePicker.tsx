'use client';

import { useGuidePage } from '@/app/context/GuidePageContext';
import styles from './GuidePicker.module.scss';
import { useCallback } from 'react';

export default function GuidePicker() {
    const guidePage = useGuidePage();

    const start = useCallback(() => guidePage.start(), [guidePage]);
    const showFull = useCallback(() => guidePage.showFullPage(), [guidePage]);

    return (
        <>
            <button className={styles.ctaButton} onClick={start}>Start guide</button>
            {!guidePage.showingFullPage && <button className={styles.mutedButton} onClick={showFull}>View full page</button>}
        </>
    );
}

