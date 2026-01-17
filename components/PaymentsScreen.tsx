
import React from 'react';

interface PaymentsScreenProps {
  onBack: () => void;
}

const PaymentsScreen: React.FC<PaymentsScreenProps> = ({ onBack }) => {
  const paymentMethods = {
    upi: [
      { id: '1', name: 'Google Pay', detail: 'aravind@okaxis', primary: true, icon: 'fa-google' },
      { id: '2', name: 'PhonePe', detail: 'sanka.a@ybl', primary: false, icon: 'fa-mobile-screen' }
    ],
    cards: [
      { id: '3', name: 'HDFC Bank Credit Card', detail: '•••• •••• •••• 4242', type: 'visa' },
      { id: '4', name: 'ICICI Debit Card', detail: '•••• •••• •••• 8890', type: 'mastercard' }
    ]
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-700 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Payments</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-[#0d828c] to-[#0b6e77] rounded-[32px] p-8 text-white shadow-xl shadow-[#0d828c]/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#e0f2f1] text-xs font-bold uppercase tracking-widest opacity-80">Wallet Balance</p>
              <h3 className="text-4xl font-black mt-1">₹420.50</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-wallet text-xl"></i>
            </div>
          </div>
          <button className="mt-4 bg-white text-[#0d828c] px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">
            Add Money
          </button>
        </div>

        {/* UPI Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">UPI Methods</h4>
            <button className="text-[#0d828c] text-[10px] font-bold">+ ADD NEW</button>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.upi.map((method) => (
              <div key={method.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <i className={`fa-solid ${method.icon} text-lg`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{method.name}</span>
                    {method.primary && (
                      <span className="bg-green-50 text-green-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Primary</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{method.detail}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-[10px] text-slate-200"></i>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div className="space-y-4 pb-10">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Saved Cards</h4>
            <button className="text-[#0d828c] text-[10px] font-bold">+ ADD NEW</button>
          </div>

          <div className="space-y-3">
            {paymentMethods.cards.map((card) => (
              <div key={card.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <i className={`fa-brands fa-cc-${card.type} text-2xl text-slate-400`}></i>
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-900 block">{card.name}</span>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{card.detail}</p>
                </div>
                <button className="p-2 text-slate-300 hover:text-red-400">
                  <i className="fa-solid fa-trash-can text-sm"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsScreen;
