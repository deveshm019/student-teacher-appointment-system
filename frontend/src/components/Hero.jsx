import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A delectus veniam pariatur nobis, rem modi doloremque adipisci maxime. Repudiandae voluptatem accusantium beatae! Dolorem voluptate nam assumenda ab labore ea? Enim magni non provident, natus distinctio quam deleniti voluptates ad saepe ab illo odio molestiae explicabo nostrum nemo aliquid quidem rem!</p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className='animated-image'/>
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero