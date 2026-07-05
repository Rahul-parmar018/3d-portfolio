import { Link } from "react-router-dom";
import { config } from "../config";
import { trackEvent } from "../utils/analytics";
import "./styles/CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable" onClick={() => trackEvent('AI Playground Opened', { source: 'cta' })}>
          Play With Me →
        </Link>
        
        <a 
          href={config.contact.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
          onClick={() => trackEvent('LinkedIn Clicked', { source: 'cta' })}
        >
          Hire Me →
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
