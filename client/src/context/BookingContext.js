import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(null);

  const resetFlow = () => {
    setBooking(null);
    setPayment(null);
    setConfirmationEmailSent(null);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        payment,
        setPayment,
        confirmationEmailSent,
        setConfirmationEmailSent,
        resetFlow,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
