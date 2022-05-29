import pagePhoto from './homepage-image.jpg';
import styles from './homepage.module.css';

const Homepage = () => (
  <section className={styles.homepage}>
    <img src={pagePhoto} alt="main page photo" />
  </section>
);

export default Homepage;
