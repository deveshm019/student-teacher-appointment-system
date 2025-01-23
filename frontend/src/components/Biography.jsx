import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="about" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae fugiat sunt nulla, unde sint animi possimus! Hic dolorum beatae aliquid animi explicabo molestias ullam quia possimus tempora in tenetur totam, cupiditate, molestiae quas obcaecati debitis, quam ea. Sed accusantium deserunt quia. Neque reprehenderit amet, saepe inventore beatae sapiente commodi doloribus?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ipsa quam molestiae itaque nobis fugiat neque quas esse. Blanditiis, sapiente. Maxime, sapiente error. Quia eaque fugit corrupti dicta modi, et cumque repudiandae amet consectetur est!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum incidunt quidem sit?</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography