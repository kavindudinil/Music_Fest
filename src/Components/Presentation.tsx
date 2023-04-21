import React, { useState, useEffect } from 'react';
import '../StyleSheets/presentationStyle.scss';

interface Props {
    onFinish: () => void;
}

const PresentationPage: React.FC<Props> = ({ onFinish }) => {
    const [showPresentationPage, setShowPresentationPage] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowPresentationPage(false);
            onFinish();
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [onFinish]);

    const handleClick = () => {
        setShowPresentationPage(false);
        onFinish();
    };

    return (
        <div className={`presentation-page ${showPresentationPage ? 'show' : 'hide'}`} onClick={handleClick}>
            <h1>Welcome to My Website!</h1>
            <div className={`avatar`} />
                <img src={require('../Assets/imgs/logo-white.png')} />
            <p>This is a presentation page that will automatically hide after 5 seconds.</p>
        </div>
    );
};

export default PresentationPage;