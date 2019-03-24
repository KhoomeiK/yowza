import Head from '../components/head';
import Navbar from '../components/navbar';

const contentStyle = {
  padding: '0.5em 1em',
  paddingTop: '3em'
};

export default function MainLayout ({ children }) {
  return (
    <div>
      <Head />
      <Navbar />
      <div style={contentStyle}>
        { children }
      </div>
    </div>
  );
}
