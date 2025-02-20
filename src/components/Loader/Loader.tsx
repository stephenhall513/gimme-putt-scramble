import React from 'react';
import Image from 'next/image';
import styles from './Loader.module.css'; // Path to your CSS module file

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Image
                src="/images/GimmePuttGolfLogo_NoBuffer.png" 
                alt="Loading..."
                width={100} // Set the width as needed
                height={100} // Set the height as needed
            />
        </div>
    );
};

export default Loader;
