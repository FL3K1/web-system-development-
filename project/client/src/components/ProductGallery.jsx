import React, { useState } from 'react';

function ProductGallery({ images }) {
  const [activeImg, setActiveImg] = useState(images[0] || "https://via.placeholder.com/300");

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      
      {/* Lista de miniaturas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt="thumbnail" 
            onClick={() => setActiveImg(img)} // Actualizar imagen activa al hacer clic
            style={{ 
              width: '50px', height: '50px', objectFit: 'cover', 
              cursor: 'pointer', border: activeImg === img ? '2px solid blue' : '1px solid #ccc' 
            }}
          />
        ))}
      </div>

      {/* Imagen principal */}
      <div>
        <img 
          src={activeImg} 
          alt="Main" 
          style={{ width: '250px', height: '300px', objectFit: 'contain' }} 
        />
      </div>
    </div>
  );
}

export default ProductGallery;