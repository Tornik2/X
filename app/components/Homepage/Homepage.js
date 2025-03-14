import Image from 'next/image';
import './Homepage.css';

export default function Homepage() {
  return (
    <div className="container">
        <div className="flex max-width">
        <div className="hero-content">
    <p className="badge"><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path   d="M7.66907 3.16563C8.35588 2.37578 9.36943 1.875 10.5 1.875C11.6305 1.875 12.644 2.37573 13.3308 3.16551C14.3751 3.09255 15.446 3.45513 16.2455 4.25464C17.045 5.05415 17.4076 6.12507 17.3347 7.16933C18.1243 7.85613 18.625 8.86957 18.625 10C18.625 11.1306 18.1242 12.1443 17.3342 12.8311C17.407 13.8751 17.0444 14.9458 16.2451 15.7452C15.4457 16.5446 14.375 16.9072 13.3309 16.8344C12.6441 17.6242 11.6306 18.125 10.5 18.125C9.3695 18.125 8.356 17.6243 7.6692 16.8345C6.62493 16.9075 5.554 16.5449 4.75448 15.7454C3.95496 14.9459 3.59238 13.8749 3.66534 12.8307C2.87565 12.1439 2.375 11.1304 2.375 10C2.375 8.86951 2.87571 7.85602 3.66546 7.16921C3.59258 6.12504 3.95517 5.05423 4.75462 4.25478C5.55406 3.45533 6.62489 3.09274 7.66907 3.16563ZM13.5086 8.48827C13.7092 8.20739 13.6442 7.81705 13.3633 7.61642C13.0824 7.41579 12.692 7.48084 12.4914 7.76173L9.79525 11.5364L8.44194 10.1831C8.19786 9.93898 7.80214 9.93898 7.55806 10.1831C7.31398 10.4271 7.31398 10.8229 7.55806 11.0669L9.43306 12.9419C9.56297 13.0719 9.74346 13.138 9.92655 13.1229C10.1096 13.1077 10.2768 13.0128 10.3836 12.8633L13.5086 8.48827Z" fill="#CAFF33"/>
</svg>
 No LLC Required, No Credit Check.</p>
    <h1>Welcome to YourBank <br /> Empowering Your <span className="highlight">Financial Journey</span></h1>
    <p className="description">
      At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. 
      We are committed to delivering personalized and innovative services that prioritize our customers’ needs.
    </p>
    <button className="cta-button">Open Account</button>
  </div>
      {/* ESG Transactions Section */}
      <section className="esg-section">
        <h2>Visit ESG merchants, win prizes and more!</h2>
        <div className="transactions">
          <div className="transaction-card main">
            <div className="transaction-item">
              <span className="icon"></span>
              <span>ESG merchant 1</span>
              <span className="positive">+0.15 ESGC</span>
              <span className="negative">-$68.00</span>
            </div>
          </div>
          <div className="transaction-card faded">
            <div className="transaction-item">
              <span className="icon"></span>
              <span>ESG merchant 2</span>
              <span className="positive">+0.12 ESGC</span>
              <span className="negative">-$48.00</span>
            </div>
          </div>
          <div className="transaction-card faded">
            <div className="transaction-item">
              <span className="icon"></span>
              <span>ESG merchant 3</span>
              <span className="positive">+0.07 ESGC</span>
              <span className="negative">-$28.00</span>
            </div>
          </div>
        </div>
        <Image src="/esg.png" alt="ESG" width={400} height={250} className="esg-image" />
      </section>
      </div>
    </div>
  );
}
