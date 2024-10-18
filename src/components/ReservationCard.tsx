import React from "react";

interface ReservationCardProps {
  reservationNumber: string;
  platform: string;
  reserver: string;
  price: string;
  link: string;
  date: string;
  duration: string;
  title: string;
  onClose: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservationNumber,
  platform,
  reserver,
  price,
  link,
  date,
  duration,
  title,
  onClose, // 닫기 핸들러
}) => {
  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-xl relative border-t-4 border-purple-500">
      {/* 닫기 버튼 */}
      <button
        className="btn btn-sm btn-circle absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>

      {/* 예약 확정 */}
      <div className="badge badge-primary mb-4">예약확정</div>

      {/* 타이틀 */}
      <h2 className="mt-2 text-xl font-bold text-gray-900 leading-snug">
        {title}
      </h2>

      {/* 날짜 및 시간 */}
      <p className="text-gray-600 mt-2">
        {date}, <span className="text-blue-500 underline">{duration}</span>
      </p>

      {/* 예약 정보 */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">예약번호</span>
          <span className="text-gray-900">{reservationNumber}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">플랫폼</span>
          <span className="text-gray-900">{platform}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">예약자</span>
          <span className="text-gray-900">{reserver}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">가격</span>
          <span className="text-gray-900">{price}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">예약링크</span>
          <a href={link} className="text-blue-500 hover:underline">
            {link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
