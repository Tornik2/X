import Image from 'next/image';
import Link from 'next/link';
import './merchants.css';

// Simulated API fetch function
async function fetchMerchants() {
  return [
    {
      id: 1,
      name: 'Market',
      description: 'Sustainable Groceries & Local Products',
      about: 'GreenEarth Market sources fresh, organic produce and eco-friendly products, promoting a healthier planet and community.',
      image: '/merchant1.jpg',
      value: 0.1,
    },
    {
      id: 2,
      name: 'EcoStyleFashion',
      description: 'Ethical Clothing & Accessories',
      about: 'EcoStyle Fashion designs stylish apparel using recycled materials and sustainable production methods, ensuring ethical fashion for all.',
      image: '/merchant2.jpg',
      value: 0.1,

    },
    {
      id: 3,
      name: 'SolarTechSolutions',
      description: 'Renewable Energy for Your Home',
      about: 'SolarTech Solutions provides cutting-edge solar panels and green energy solutions to help homes and businesses become energy independent.',
      image: '/merchant3.jpg',
      value: 0.15,

    }
  ];
}

export default async function Merchants() {
  const merchants = await fetchMerchants();

  return (
    <div className="container">
        <div className='max-width'>
            
        <div className='hero'>
            <div className="section-heading">
            Welcome to ESG 
            <br/>
             merchants!
            </div>
            <Image src="/caring.png" alt="taking care of nature" width={400} height={250} className="caring-image" />
        </div>

      <header className="merchants-header">
        <h1 className="page-title">Merchants</h1>
        <p className="subtitle">Explore exciting merchandise offered by our partnered stores  , offering environmentally clean items! Be part of shaping a better future!</p>
      </header>

            {/* Merchants section*/}
      <section className="merchants-list">
        {merchants.map((merchant) => (
          <div key={merchant.id} className="merchant-card">
            <div className="merchant-info">
              <h2 className="merchant-name">{merchant.name}</h2>
              <div className="merchant-value">
                <p>ESG: Environment</p>
                <p>1 GEL = {merchant.value} ESGC</p>
              </div>
              <p className='sub-title'>About This Merchant</p>
              <p className="merchant-about">{merchant.about}</p>
              <Link className="visit-button" href={`merchants/${merchant.name}`}>View Merchandise</Link>
            </div>
          </div>
        ))}
      </section>
      </div>
    </div>
  );
}
