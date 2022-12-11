import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import './markDown.css';

const DirectionsMarkDown = ({ directions }) => {
  return <ReactMarkdown className="styles">{directions}</ReactMarkdown>;
};

export default DirectionsMarkDown;
