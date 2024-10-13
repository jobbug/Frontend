import React, { useEffect, useState } from 'react';
import './styles.css';
import AddressSearch from './AddressSearch'; // AddressSearch 컴포넌트 가져오기

function Home({ setSelectedAddress }) {
  // 임의로 데이터를 추가합니다.
  const [jobs, setJobs] = useState([
    { id: 1, title: '옥상 밑에 바선생 출몰이요', bugType: '바퀴벌레', reward: { text: '채팅 후 결정', color: 'orange' } },
    { id: 2, title: '이거 설마 곱등이인가요ㅠㅠ', bugType: '곱등이', reward: { text: '잡느 내공 100', color: 'red' } },
    { id: 3, title: '집에 왔는데 하루살이가 5마리 붙음 제발', bugType: '하루살이', reward: { text: '채팅 후 결정', color: 'orange' } },
    { id: 4, title: '화장실에 진짜 정체 모를 벌레 잡아주세요;;', bugType: '기타(황금말벌)', reward: { text: '잡느 내공 50', color: 'green' } },
    { id: 5, title: '아파트 복도에서 바퀴벌레 발견!', bugType: '바퀴벌레', reward: { text: '채팅 후 결정', color: 'orange' } },
    { id: 6, title: '이상한 벌레가 침대에 붙어있어요!', bugType: '진드기', reward: { text: '채팅 후 결정', color: 'orange' } },
    { id: 7, title: '주방에 벌레가 너무 많아요...', bugType: '바퀴벌레', reward: { text: '잡느 내공 100', color: 'red' } },
    { id: 8, title: '화장실에서 이상한 벌레 출현', bugType: '기타(황금말벌)', reward: { text: '잡느 내공 50', color: 'green' } }
  ]);

  const [visibleJobs, setVisibleJobs] = useState(4); // 처음에는 4개의 항목만 표시

  const handleAddressSelect = (address) => {
    setSelectedAddress(address); // 주소를 상위 컴포넌트로 전달
    // 지도에 선택한 주소를 표시
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const mapContainer = document.getElementById('map');
        const options = {
          center: coords,
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, options);
        new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });
      }
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=12d0da5598ea004ab486ab3b29e93214&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울의 위도와 경도
          level: 3, // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  const handleShowMore = () => {
    setVisibleJobs(visibleJobs + 4); // 더보기 클릭 시 4개의 항목을 더 보여줍니다.
  };

  return (
    <div className="home-container">
      <section className="job-list">
        <div className="job-list-header">
          <h2>내 주변 잡아주세요</h2>
          <AddressSearch onSelectAddress={handleAddressSelect} /> {/* 주소 검색 버튼 */}
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>벌레 종류</th>
              <th>보상</th>
            </tr>
          </thead>
          <tbody>
            {jobs.slice(0, visibleJobs).map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.bugType}</td>
                <td><span className={`badge ${job.reward.color}`}>{job.reward.text}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="show-more-btn" onClick={handleShowMore}>
          더보기 <span className="plus-icon">+</span>
        </button>
      </section>

      <div className="map-container">
        <div id="map" style={{ width: '100%', height: '100%', borderRadius: '12px' }}></div>
      </div>
    </div>
  );
}

export default Home;
