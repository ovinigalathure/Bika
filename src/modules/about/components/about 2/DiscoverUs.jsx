import React from 'react';
import './DiscoverUs.css';
import blogo from '../../assets/bikaTNlogo.png';
import backimg from '../../assets/ab2back.jpeg';

const DiscoverUs = () => {
    return (
        <section className="discover-us-section">
            <div className="discover-us-content">
                <h2 className="discover-us-title">Discover Us</h2>
                <div className="discover-us-logo-text">
                    
                    <img 
                        src={backimg}
                        alt="Bika-back" 
                        className="disc-back"  
                    />

                    <img 
                        src={blogo} 
                        alt="Bika-Logo" 
                        className="disc-logo" 
                    />

                    <p className="discover-us-description">
                        Embilipitiya started its service in 2023 with a focus on making every dish fresh and exquisite by adding the flavors of many fresh spices produced in India. Ethnic food inspiration serving the best Biryani, Kottu and many other dishes outside of Colombo.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DiscoverUs;
