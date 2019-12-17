import App from 'next/app';
// import './style.css';

export default class YowzaApp extends App {
  componentDidMount() {
    const style = document.getElementById('server-side-styles');

    if (style) {
      style.parentNode.removeChild(style);
    }
  }
}
