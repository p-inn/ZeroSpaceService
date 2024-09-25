import React from 'react';
import { useForm } from 'react-hook-form';


const ReservationForm = ({ onClose }: { onClose: () => void }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // API 호출 메서드 추가 예정
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4">
      <h2>추가하고 싶은 예약 정보를 입력해주세요</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>스페이스 위치</label>
        <input {...register('location')} className="border p-2 w-full" />

        <label>날짜</label>
        <input type="date" {...register('date')} className="border p-2 w-full" />

        <label>시간</label>
        <input type="time" {...register('timeStart')} className="border p-2 w-full" />
        <input type="time" {...register('timeEnd')} className="border p-2 w-full" />

        <label>금액</label>
        <input {...register('price')} className="border p-2 w-full" />

        <button type="submit" className="bg-blue-500 text-white p-2 mt-4 w-full">예약 확정</button>
      </form>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">X</button>
    </div>
  );
};

export default ReservationForm;
