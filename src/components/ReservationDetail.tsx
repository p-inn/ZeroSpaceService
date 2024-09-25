import React from "react";

interface ReservationDetailProps {
  date: string;
  onClose: () => void;
}

const ReservationDetail: React.FC<ReservationDetailProps> = ({
  date,
  onClose,
}) => {
  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-md p-6 z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <h2 className="text-xl font-semibold mb-4">예약 상세 정보</h2>
      <p className="text-gray-700">날짜: {date}</p>
      <p className="text-gray-700">장소: 홍대 오피스 스튜디오</p>
      <p className="text-gray-700">시간: 오후 3:00 ~ 오후 7:00</p>
      <p className="text-gray-700">이용 금액: 260,000원</p>
      <p className="text-gray-700">예약 상태: 예약 대기</p>

      <button className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500">
        예약 페이지 가기
      </button>
    </div>
  );
};

export default ReservationDetail;
