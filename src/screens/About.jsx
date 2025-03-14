import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
          const navigate = useNavigate()
  return (
    <div className='about-screen mid flex-col'>
          <div className="flex-row mid gap" >
          <img src="/image2.jpg" alt="" style={{width: '30%', alignSelf:'self-start'}}/>

          </div>
          <h1>About me</h1>
          <p>With six years of experience in investing, I specialize in wealth management, market research, and strategic financial planning. My approach is disciplined, data-driven, and focused on long-term, sustainable growth.</p>
          <ul>
                    <li><strong>Proven Accuracy:</strong> 80% in trading, 90% in long-term investments.</li>
                    <li><strong>Certified Expertise:</strong>  Trained at Academy of Private Investor, obtained Certifications in Financial Modeling and Blockchain.
                    </li>
                    <li><strong>Trusted Fund Manager:</strong>  Managing investments for high-net-worth individuals.
                    </li>
                    <li><strong>Market Success:</strong>   4X returns in 2021, turning ₹10 lakhs into ₹38 lakhs.
                    </li>
          </ul>
          <h2>My Investment Philosophy</h2>
          <p>I follow a crop rotation strategy, shifting capital between sectors based on market cycles. This approach ensures steady returns, minimizes risks, and keeps investments adaptive to changing conditions.</p>
          <h1 style={{margin:'20px 0 0'}}>My Strategy</h1>
          <ul>
                    <li><strong>Strategic Reallocation:</strong> Timely asset shifts for optimal growth.
                    </li>
                    <li><strong>Cash Flow Focus:</strong> Investing in income-generating assets.
                    </li>
                    <li><strong>Diversified Portfolio:</strong>  Spreading risk across multiple sectors.
                    </li>
                    <li><strong>Smart Trading:</strong> Using margins and futures selectively to capitalize on opportunities.</li>
          </ul>
          <h1 style={{margin:'20px 0 0'}}>Why Work With Me?</h1>
          <p>I value trust, transparency, and responsible investing. My goal is to help you grow and protect your wealth with well-researched, risk-managed strategies.</p>
          <h3>Proof of Work: (Managed Account Wallets - Screenshots done in 2021)</h3>
          <div className="image-container flex-row mid">
                    <img src="/pk1.jpg" alt="" />
                    <img src="/pk2.jpg" alt="" />
                    <img src="/pk3.jpg" alt="" />
                    <img src="/pk4.jpg" alt="" />
          </div>
          <p className=' email' style={{fontSize:'12px', marginTop:'100px', }}>
  <a href="mailto:blackdiamondgg99@gmail.com" style={{ color: 'inherit', textDecoration:'underline' }}>
    Email: blackdiamondgg99@gmail.com
  </a>
</p>

          <button style={{marginTop: '100px'}} onClick={()=>{navigate('/')}}>Back</button>
    </div>
  )
}

export default About