// AddressSearch.js
import React, { useEffect, useState } from 'react';

function AddressSearch({ onSelectAddress }) {
  useEffect(() => {
    // Load Kakao Postcode script
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);
    script.onload = () => {
      window.daum.postcode.load();
    };
  }, []);

  const handleSearch = () => {
    const openPostcode = new window.daum.Postcode({
      oncomplete: function(data) {
        const address = data.address;
        onSelectAddress(address);
      }
    });
    openPostcode.open();
  };

  return (
    <button onClick={handleSearch} className="search-button">
      새로운 주소 검색
      <img src={`${process.env.PUBLIC_URL}/images/searchbutton.svg`} alt="Search Icon" style={{ marginLeft: '10px' }} />
    </button>
  );
}

export default AddressSearch;
