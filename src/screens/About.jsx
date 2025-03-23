import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  return (
    <div className='about-screen mid flex-col'>
        <img src="/black-diamond.png" alt="" style={{width: '24%', alignSelf:'self-start'}}/>
      <h1>About Me</h1>
      <p>Hello! I’m Black Diamond, an investor with six years of experience in wealth management, market research, and strategic financial planning. I’m all about smart, data-driven investing that focuses on long-term, sustainable growth while keeping risks in check.</p>
      
      <h2>What I Do</h2>
      <p>I help people grow and protect their wealth by making well-researched, strategic investment decisions. Whether it’s trading, long-term investments, or navigating market trends, I believe in a balanced approach that maximizes returns while staying adaptable to changing conditions.</p>
      
      <h2>My Track Record</h2>
      <ul>
        <li>✔ 80% accuracy in trading, 90% in long-term investments.</li>
        <li>✔ Certified in Financial Modeling & Blockchain, trained at the Academy of Private Investor.</li>
        <li>✔ Managing investments for high-net-worth individuals.</li>
        <li>✔ Turned ₹10 lakhs into ₹38 lakhs in 2021 with smart market moves.</li>
      </ul>
      
      <h2>How I Invest</h2>
      <p>I follow a crop rotation strategy—just like in farming, I shift capital between different sectors based on market cycles. This keeps investments steady, minimizes risk, and ensures consistent growth.</p>
      
      <ul>
        <li>🔹 Strategic Reallocation: Moving assets at the right time for maximum returns.</li>
        <li>🔹 Cash Flow Focus: Investing in income-generating opportunities.</li>
        <li>🔹 Diversified Portfolio: Spreading risk across multiple sectors.</li>
        <li>🔹 Smart Trading: Using margins and futures selectively to seize the best opportunities.</li>
      </ul>
      
      <h2>Why Work With Me?</h2>
      <p>I believe in trust, transparency, and responsible investing. My goal isn’t just to make money—it’s to build wealth in a way that’s smart, sustainable, and secure. If you’re looking for a strategic approach to investing, let’s connect and grow together!</p>
      
      <h3>Proof of Work: (Managed Account Wallets - Screenshots done in 2021)</h3>
      <div className="image-container flex-row mid">
        <img src="/pk1.jpg" alt="" />
        <img src="/pk2.jpg" alt="" />
        <img src="/pk3.jpg" alt="" />
        <img src="/pk4.jpg" alt="" />
      </div>
      
      <p className='email' style={{fontSize:'12px', marginTop:'100px'}}>
        <a href="mailto:blackdiamondgg99@gmail.com" style={{ color: 'inherit', textDecoration:'underline' }}>
          Email: blackdiamondgg99@gmail.com
        </a>
      </p>
      
      <button style={{marginTop: '100px'}} onClick={()=>{navigate('/')}}>Back</button>
    </div>
  )
}

export default About
